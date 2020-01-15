import { Stat } from "../../utils/Stat";
import { Vector3 } from "../math/Vector3";
import { Physics3DUtils } from "../utils/Physics3DUtils";
import { PhysicsUpdateList } from "./PhysicsUpdateList";
import { CollisionTool } from "./CollisionTool";
import { PhysicsComponent } from "./PhysicsComponent";
import { Physics3D } from "./Physics3D";
/**
 * <code>Simulation</code> 类用于创建物理模拟器。
 */
export class PhysicsSimulation {
    /**
     * @internal
     * 创建一个 <code>Simulation</code> 实例。
     */
    constructor(configuration, flags = 0) {
        /** @internal */
        this._gravity = new Vector3(0, -10, 0);
        /** @internal */
        this._btVector3Zero = Physics3D._bullet.btVector3_create(0, 0, 0);
        /** @internal */
        this._btDefaultQuaternion = Physics3D._bullet.btQuaternion_create(0, 0, 0, -1);
        /** @internal */
        this._collisionsUtils = new CollisionTool();
        /** @internal */
        this._previousFrameCollisions = [];
        /** @internal */
        this._currentFrameCollisions = [];
        /** @internal */
        this._physicsUpdateList = new PhysicsUpdateList();
        /**@internal	*/
        this._characters = [];
        /**@internal	*/
        this._updatedRigidbodies = 0;
        /**物理引擎在一帧中用于补偿减速的最大次数：模拟器每帧允许的最大模拟次数，如果引擎运行缓慢,可能需要增加该次数，否则模拟器会丢失“时间",引擎间隔时间小于maxSubSteps*fixedTimeStep非常重要。*/
        this.maxSubSteps = 1;
        /**物理模拟器帧的间隔时间:通过减少fixedTimeStep可增加模拟精度，默认是1.0 / 60.0。*/
        this.fixedTimeStep = 1.0 / 60.0;
        this.maxSubSteps = configuration.maxSubSteps;
        this.fixedTimeStep = configuration.fixedTimeStep;
        var bt = Physics3D._bullet;
        this._btCollisionConfiguration = bt.btDefaultCollisionConfiguration_create();
        this._btDispatcher = bt.btCollisionDispatcher_create(this._btCollisionConfiguration);
        this._btBroadphase = bt.btDbvtBroadphase_create();
        bt.btOverlappingPairCache_setInternalGhostPairCallback(bt.btDbvtBroadphase_getOverlappingPairCache(this._btBroadphase), bt.btGhostPairCallback_create()); //this allows characters to have proper physics behavior
        var conFlags = configuration.flags;
        if (conFlags & PhysicsSimulation.PHYSICSENGINEFLAGS_COLLISIONSONLY) {
            this._btCollisionWorld = new bt.btCollisionWorld(this._btDispatcher, this._btBroadphase, this._btCollisionConfiguration);
        }
        else if (conFlags & PhysicsSimulation.PHYSICSENGINEFLAGS_SOFTBODYSUPPORT) {
            throw "PhysicsSimulation:SoftBody processing is not yet available";
        }
        else {
            var solver = bt.btSequentialImpulseConstraintSolver_create();
            this._btDiscreteDynamicsWorld = bt.btDiscreteDynamicsWorld_create(this._btDispatcher, this._btBroadphase, solver, this._btCollisionConfiguration);
            this._btCollisionWorld = this._btDiscreteDynamicsWorld;
        }
        if (this._btDiscreteDynamicsWorld) {
            this._btSolverInfo = bt.btDynamicsWorld_getSolverInfo(this._btDiscreteDynamicsWorld); //we are required to keep this reference, or the GC will mess up
            this._btDispatchInfo = bt.btCollisionWorld_getDispatchInfo(this._btDiscreteDynamicsWorld);
        }
        this._btClosestRayResultCallback = bt.ClosestRayResultCallback_create(this._btVector3Zero, this._btVector3Zero);
        this._btAllHitsRayResultCallback = bt.AllHitsRayResultCallback_create(this._btVector3Zero, this._btVector3Zero);
        this._btClosestConvexResultCallback = bt.ClosestConvexResultCallback_create(this._btVector3Zero, this._btVector3Zero);
        this._btAllConvexResultCallback = bt.AllConvexResultCallback_create(this._btVector3Zero, this._btVector3Zero); //TODO:是否优化C++
        bt.btGImpactCollisionAlgorithm_RegisterAlgorithm(this._btDispatcher); //注册算法
    }
    /**
    * @internal
    */
    static __init__() {
        var bt = Physics3D._bullet;
        PhysicsSimulation._btTempVector30 = bt.btVector3_create(0, 0, 0);
        PhysicsSimulation._btTempVector31 = bt.btVector3_create(0, 0, 0);
        PhysicsSimulation._btTempQuaternion0 = bt.btQuaternion_create(0, 0, 0, 1);
        PhysicsSimulation._btTempQuaternion1 = bt.btQuaternion_create(0, 0, 0, 1);
        PhysicsSimulation._btTempTransform0 = bt.btTransform_create();
        PhysicsSimulation._btTempTransform1 = bt.btTransform_create();
    }
    /**
     * 创建限制刚体运动的约束条件。
     */
    static createConstraint() {
        //TODO:
    }
    /**
     * 是否进行连续碰撞检测。
     */
    get continuousCollisionDetection() {
        return Physics3D._bullet.btCollisionWorld_get_m_useContinuous(this._btDispatchInfo);
    }
    set continuousCollisionDetection(value) {
        Physics3D._bullet.btCollisionWorld_set_m_useContinuous(this._btDispatchInfo, value);
    }
    /**
     * 获取重力。
     */
    get gravity() {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        return this._gravity;
    }
    set gravity(value) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        this._gravity = value;
        var bt = Physics3D._bullet;
        var btGravity = PhysicsSimulation._btTempVector30;
        bt.btVector3_setValue(btGravity, -value.x, value.y, value.z); //TODO:是否先get省一个变量
        bt.btDiscreteDynamicsWorld_setGravity(this._btDiscreteDynamicsWorld, btGravity);
    }
    /**
     * @internal
     */
    get speculativeContactRestitution() {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot Cannot perform this action when the physics engine is set to CollisionsOnly";
        return Physics3D._bullet.btDiscreteDynamicsWorld_getApplySpeculativeContactRestitution(this._btDiscreteDynamicsWorld);
    }
    /**
     * @internal
     */
    set speculativeContactRestitution(value) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot Cannot perform this action when the physics engine is set to CollisionsOnly";
        Physics3D._bullet.btDiscreteDynamicsWorld_setApplySpeculativeContactRestitution(this._btDiscreteDynamicsWorld, value);
    }
    /**
     * @internal
     */
    _simulate(deltaTime) {
        this._updatedRigidbodies = 0;
        var bt = Physics3D._bullet;
        if (this._btDiscreteDynamicsWorld)
            bt.btDiscreteDynamicsWorld_stepSimulation(this._btDiscreteDynamicsWorld, deltaTime, this.maxSubSteps, this.fixedTimeStep);
        else
            bt.PerformDiscreteCollisionDetection(this._btCollisionWorld);
    }
    /**
     * @internal
     */
    _destroy() {
        var bt = Physics3D._bullet;
        if (this._btDiscreteDynamicsWorld) {
            bt.btCollisionWorld_destroy(this._btDiscreteDynamicsWorld);
            this._btDiscreteDynamicsWorld = null;
        }
        else {
            bt.btCollisionWorld_destroy(this._btCollisionWorld);
            this._btCollisionWorld = null;
        }
        bt.btDbvtBroadphase_destroy(this._btBroadphase);
        this._btBroadphase = null;
        bt.btCollisionDispatcher_destroy(this._btDispatcher);
        this._btDispatcher = null;
        bt.btDefaultCollisionConfiguration_destroy(this._btCollisionConfiguration);
        this._btCollisionConfiguration = null;
    }
    /**
     * @internal
     */
    _addPhysicsCollider(component, group, mask) {
        Physics3D._bullet.btCollisionWorld_addCollisionObject(this._btCollisionWorld, component._btColliderObject, group, mask);
    }
    /**
     * @internal
     */
    _removePhysicsCollider(component) {
        Physics3D._bullet.btCollisionWorld_removeCollisionObject(this._btCollisionWorld, component._btColliderObject);
    }
    /**
     * @internal
     */
    _addRigidBody(rigidBody, group, mask) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        Physics3D._bullet.btDiscreteDynamicsWorld_addRigidBody(this._btCollisionWorld, rigidBody._btColliderObject, group, mask);
    }
    /**
     * @internal
     */
    _removeRigidBody(rigidBody) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        Physics3D._bullet.btDiscreteDynamicsWorld_removeRigidBody(this._btCollisionWorld, rigidBody._btColliderObject);
    }
    /**
     * @internal
     */
    _addCharacter(character, group, mask) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        var bt = Physics3D._bullet;
        bt.btCollisionWorld_addCollisionObject(this._btCollisionWorld, character._btColliderObject, group, mask);
        bt.btDynamicsWorld_addAction(this._btCollisionWorld, character._btKinematicCharacter);
    }
    /**
     * @internal
     */
    _removeCharacter(character) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Simulation:Cannot perform this action when the physics engine is set to CollisionsOnly";
        var bt = Physics3D._bullet;
        bt.btCollisionWorld_removeCollisionObject(this._btCollisionWorld, character._btColliderObject);
        bt.btDynamicsWorld_removeAction(this._btCollisionWorld, character._btKinematicCharacter);
    }
    /**
     * 射线检测第一个碰撞物体。
     * @param	from 起始位置。
     * @param	to 结束位置。
     * @param	out 碰撞结果。
     * @param   collisonGroup 射线所属碰撞组。
     * @param   collisionMask 与射线可产生碰撞的组。
     * @return 	是否成功。
     */
    raycastFromTo(from, to, out = null, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        var bt = Physics3D._bullet;
        var rayResultCall = this._btClosestRayResultCallback;
        var rayFrom = PhysicsSimulation._btTempVector30;
        var rayTo = PhysicsSimulation._btTempVector31;
        bt.btVector3_setValue(rayFrom, -from.x, from.y, from.z);
        bt.btVector3_setValue(rayTo, -to.x, to.y, to.z);
        bt.ClosestRayResultCallback_set_m_rayFromWorld(rayResultCall, rayFrom);
        bt.ClosestRayResultCallback_set_m_rayToWorld(rayResultCall, rayTo);
        bt.RayResultCallback_set_m_collisionFilterGroup(rayResultCall, collisonGroup);
        bt.RayResultCallback_set_m_collisionFilterMask(rayResultCall, collisionMask);
        bt.RayResultCallback_set_m_collisionObject(rayResultCall, null); //还原默认值
        bt.RayResultCallback_set_m_closestHitFraction(rayResultCall, 1); //还原默认值
        bt.btCollisionWorld_rayTest(this._btCollisionWorld, rayFrom, rayTo, rayResultCall); //TODO:out为空可优化,bullet内
        if (bt.RayResultCallback_hasHit(rayResultCall)) {
            if (out) {
                out.succeeded = true;
                out.collider = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.RayResultCallback_get_m_collisionObject(rayResultCall))];
                out.hitFraction = bt.RayResultCallback_get_m_closestHitFraction(rayResultCall);
                var btPoint = bt.ClosestRayResultCallback_get_m_hitPointWorld(rayResultCall);
                var point = out.point;
                point.x = -bt.btVector3_x(btPoint);
                point.y = bt.btVector3_y(btPoint);
                point.z = bt.btVector3_z(btPoint);
                var btNormal = bt.ClosestRayResultCallback_get_m_hitPointWorld(rayResultCall);
                var normal = out.normal;
                normal.x = -bt.btVector3_x(btNormal);
                normal.y = bt.btVector3_y(btNormal);
                normal.z = bt.btVector3_z(btNormal);
            }
            return true;
        }
        else {
            if (out)
                out.succeeded = false;
            return false;
        }
    }
    /**
     * 射线检测所有碰撞的物体。
     * @param	from 起始位置。
     * @param	to 结束位置。
     * @param	out 碰撞结果[数组元素会被回收]。
     * @param   collisonGroup 射线所属碰撞组。
     * @param   collisionMask 与射线可产生碰撞的组。
     * @return 	是否成功。
     */
    raycastAllFromTo(from, to, out, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        var bt = Physics3D._bullet;
        var rayResultCall = this._btAllHitsRayResultCallback;
        var rayFrom = PhysicsSimulation._btTempVector30;
        var rayTo = PhysicsSimulation._btTempVector31;
        out.length = 0;
        bt.btVector3_setValue(rayFrom, -from.x, from.y, from.z);
        bt.btVector3_setValue(rayTo, -to.x, to.y, to.z);
        bt.AllHitsRayResultCallback_set_m_rayFromWorld(rayResultCall, rayFrom);
        bt.AllHitsRayResultCallback_set_m_rayToWorld(rayResultCall, rayTo);
        bt.RayResultCallback_set_m_collisionFilterGroup(rayResultCall, collisonGroup);
        bt.RayResultCallback_set_m_collisionFilterMask(rayResultCall, collisionMask);
        //rayResultCall.set_m_collisionObject(null);//还原默认值
        //rayResultCall.set_m_closestHitFraction(1);//还原默认值
        var collisionObjects = bt.AllHitsRayResultCallback_get_m_collisionObjects(rayResultCall);
        var btPoints = bt.AllHitsRayResultCallback_get_m_hitPointWorld(rayResultCall);
        var btNormals = bt.AllHitsRayResultCallback_get_m_hitNormalWorld(rayResultCall);
        var btFractions = bt.AllHitsRayResultCallback_get_m_hitFractions(rayResultCall);
        bt.tBtCollisionObjectArray_clear(collisionObjects); //清空检测队列
        bt.tVector3Array_clear(btPoints);
        bt.tVector3Array_clear(btNormals);
        bt.tScalarArray_clear(btFractions);
        bt.btCollisionWorld_rayTest(this._btCollisionWorld, rayFrom, rayTo, rayResultCall);
        var count = bt.tBtCollisionObjectArray_size(collisionObjects);
        if (count > 0) {
            this._collisionsUtils.recoverAllHitResultsPool();
            for (var i = 0; i < count; i++) {
                var hitResult = this._collisionsUtils.getHitResult();
                out.push(hitResult);
                hitResult.succeeded = true;
                hitResult.collider = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.tBtCollisionObjectArray_at(collisionObjects, i))];
                hitResult.hitFraction = bt.tScalarArray_at(btFractions, i);
                var btPoint = bt.tVector3Array_at(btPoints, i); //取出后需要立即赋值,防止取出法线时被覆盖
                var pointE = hitResult.point;
                pointE.x = -bt.btVector3_x(btPoint);
                pointE.y = bt.btVector3_y(btPoint);
                pointE.z = bt.btVector3_z(btPoint);
                var btNormal = bt.tVector3Array_at(btNormals, i);
                var normal = hitResult.normal;
                normal.x = -bt.btVector3_x(btNormal);
                normal.y = bt.btVector3_y(btNormal);
                normal.z = bt.btVector3_z(btNormal);
            }
            return true;
        }
        else {
            return false;
        }
    }
    /**
     *  射线检测第一个碰撞物体。
     * @param  	ray        射线
     * @param  	outHitInfo 与该射线发生碰撞的第一个碰撞器的碰撞信息
     * @param  	distance   射线长度,默认为最大值
     * @param   collisonGroup 射线所属碰撞组。
     * @param   collisionMask 与射线可产生碰撞的组。
     * @return 	是否检测成功。
     */
    rayCast(ray, outHitResult = null, distance = 2147483647 /*Int.MAX_VALUE*/, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        var from = ray.origin;
        var to = PhysicsSimulation._tempVector30;
        Vector3.normalize(ray.direction, to);
        Vector3.scale(to, distance, to);
        Vector3.add(from, to, to);
        return this.raycastFromTo(from, to, outHitResult, collisonGroup, collisionMask);
    }
    /**
     * 射线检测所有碰撞的物体。
     * @param  	ray        射线
     * @param  	out 碰撞结果[数组元素会被回收]。
     * @param  	distance   射线长度,默认为最大值
     * @param   collisonGroup 射线所属碰撞组。
     * @param   collisionMask 与射线可产生碰撞的组。
     * @return 	是否检测成功。
     */
    rayCastAll(ray, out, distance = 2147483647 /*Int.MAX_VALUE*/, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        var from = ray.origin;
        var to = PhysicsSimulation._tempVector30;
        Vector3.normalize(ray.direction, to);
        Vector3.scale(to, distance, to);
        Vector3.add(from, to, to);
        return this.raycastAllFromTo(from, to, out, collisonGroup, collisionMask);
    }
    /**
     * 形状检测第一个碰撞的物体。
     * @param   shape 形状。
     * @param	fromPosition 世界空间起始位置。
     * @param	toPosition 世界空间结束位置。
     * @param	out 碰撞结果。
     * @param	fromRotation 起始旋转。
     * @param	toRotation 结束旋转。
     * @param   collisonGroup 射线所属碰撞组。
     * @param   collisionMask 与射线可产生碰撞的组。
     * @return 	是否成功。
     */
    shapeCast(shape, fromPosition, toPosition, out = null, fromRotation = null, toRotation = null, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, allowedCcdPenetration = 0.0) {
        var bt = Physics3D._bullet;
        var convexResultCall = this._btClosestConvexResultCallback;
        var convexPosFrom = PhysicsSimulation._btTempVector30;
        var convexPosTo = PhysicsSimulation._btTempVector31;
        var convexRotFrom = PhysicsSimulation._btTempQuaternion0;
        var convexRotTo = PhysicsSimulation._btTempQuaternion1;
        var convexTransform = PhysicsSimulation._btTempTransform0;
        var convexTransTo = PhysicsSimulation._btTempTransform1;
        var sweepShape = shape._btShape;
        bt.btVector3_setValue(convexPosFrom, -fromPosition.x, fromPosition.y, fromPosition.z);
        bt.btVector3_setValue(convexPosTo, -toPosition.x, toPosition.y, toPosition.z);
        //convexResultCall.set_m_convexFromWorld(convexPosFrom);
        //convexResultCall.set_m_convexToWorld(convexPosTo);
        bt.ConvexResultCallback_set_m_collisionFilterGroup(convexResultCall, collisonGroup);
        bt.ConvexResultCallback_set_m_collisionFilterMask(convexResultCall, collisionMask);
        bt.btTransform_setOrigin(convexTransform, convexPosFrom);
        bt.btTransform_setOrigin(convexTransTo, convexPosTo);
        if (fromRotation) {
            bt.btQuaternion_setValue(convexRotFrom, -fromRotation.x, fromRotation.y, fromRotation.z, -fromRotation.w);
            bt.btTransform_setRotation(convexTransform, convexRotFrom);
        }
        else {
            bt.btTransform_setRotation(convexTransform, this._btDefaultQuaternion);
        }
        if (toRotation) {
            bt.btQuaternion_setValue(convexRotTo, -toRotation.x, toRotation.y, toRotation.z, -toRotation.w);
            bt.btTransform_setRotation(convexTransTo, convexRotTo);
        }
        else {
            bt.btTransform_setRotation(convexTransTo, this._btDefaultQuaternion);
        }
        bt.ClosestConvexResultCallback_set_m_hitCollisionObject(convexResultCall, null); //还原默认值
        bt.ConvexResultCallback_set_m_closestHitFraction(convexResultCall, 1); //还原默认值
        bt.btCollisionWorld_convexSweepTest(this._btCollisionWorld, sweepShape, convexTransform, convexTransTo, convexResultCall, allowedCcdPenetration);
        if (bt.ConvexResultCallback_hasHit(convexResultCall)) {
            if (out) {
                out.succeeded = true;
                out.collider = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.ClosestConvexResultCallback_get_m_hitCollisionObject(convexResultCall))];
                out.hitFraction = bt.ConvexResultCallback_get_m_closestHitFraction(convexResultCall);
                var btPoint = bt.ClosestConvexResultCallback_get_m_hitPointWorld(convexResultCall);
                var btNormal = bt.ClosestConvexResultCallback_get_m_hitNormalWorld(convexResultCall);
                var point = out.point;
                var normal = out.normal;
                point.x = -bt.btVector3_x(btPoint);
                point.y = bt.btVector3_y(btPoint);
                point.z = bt.btVector3_z(btPoint);
                normal.x = -bt.btVector3_x(btNormal);
                normal.y = bt.btVector3_y(btNormal);
                normal.z = bt.btVector3_z(btNormal);
            }
            return true;
        }
        else {
            if (out)
                out.succeeded = false;
            return false;
        }
    }
    /**
     * 形状检测所有碰撞的物体。
     * @param   shape 形状。
     * @param	fromPosition 世界空间起始位置。
     * @param	toPosition 世界空间结束位置。
     * @param	out 碰撞结果[数组元素会被回收]。
     * @param	fromRotation 起始旋转。
     * @param	toRotation 结束旋转。
     * @param   collisonGroup 射线所属碰撞组。
     * @param   collisionMask 与射线可产生碰撞的组。
     * @return 	是否成功。
     */
    shapeCastAll(shape, fromPosition, toPosition, out, fromRotation = null, toRotation = null, collisonGroup = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, collisionMask = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, allowedCcdPenetration = 0.0) {
        var bt = Physics3D._bullet;
        var convexResultCall = this._btAllConvexResultCallback;
        var convexPosFrom = PhysicsSimulation._btTempVector30;
        var convexPosTo = PhysicsSimulation._btTempVector31;
        var convexRotFrom = PhysicsSimulation._btTempQuaternion0;
        var convexRotTo = PhysicsSimulation._btTempQuaternion1;
        var convexTransform = PhysicsSimulation._btTempTransform0;
        var convexTransTo = PhysicsSimulation._btTempTransform1;
        var sweepShape = shape._btShape;
        out.length = 0;
        bt.btVector3_setValue(convexPosFrom, -fromPosition.x, fromPosition.y, fromPosition.z);
        bt.btVector3_setValue(convexPosTo, -toPosition.x, toPosition.y, toPosition.z);
        //convexResultCall.set_m_convexFromWorld(convexPosFrom);
        //convexResultCall.set_m_convexToWorld(convexPosTo);
        bt.ConvexResultCallback_set_m_collisionFilterGroup(convexResultCall, collisonGroup);
        bt.ConvexResultCallback_set_m_collisionFilterMask(convexResultCall, collisionMask);
        bt.btTransform_setOrigin(convexTransform, convexPosFrom);
        bt.btTransform_setOrigin(convexTransTo, convexPosTo);
        if (fromRotation) {
            bt.btQuaternion_setValue(convexRotFrom, -fromRotation.x, fromRotation.y, fromRotation.z, -fromRotation.w);
            bt.btTransform_setRotation(convexTransform, convexRotFrom);
        }
        else {
            bt.btTransform_setRotation(convexTransform, this._btDefaultQuaternion);
        }
        if (toRotation) {
            bt.btQuaternion_setValue(convexRotTo, -toRotation.x, toRotation.y, toRotation.z, -toRotation.w);
            bt.btTransform_setRotation(convexTransTo, convexRotTo);
        }
        else {
            bt.btTransform_setRotation(convexTransTo, this._btDefaultQuaternion);
        }
        var collisionObjects = bt.AllConvexResultCallback_get_m_collisionObjects(convexResultCall);
        bt.tBtCollisionObjectArray_clear(collisionObjects); //清空检测队列
        bt.btCollisionWorld_convexSweepTest(this._btCollisionWorld, sweepShape, convexTransform, convexTransTo, convexResultCall, allowedCcdPenetration);
        var count = bt.tBtCollisionObjectArray_size(collisionObjects);
        if (count > 0) {
            var btPoints = bt.AllConvexResultCallback_get_m_hitPointWorld(convexResultCall);
            var btNormals = bt.AllConvexResultCallback_get_m_hitNormalWorld(convexResultCall);
            var btFractions = bt.AllConvexResultCallback_get_m_hitFractions(convexResultCall);
            for (var i = 0; i < count; i++) {
                var hitResult = this._collisionsUtils.getHitResult();
                out.push(hitResult);
                hitResult.succeeded = true;
                hitResult.collider = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.tBtCollisionObjectArray_at(collisionObjects, i))];
                hitResult.hitFraction = bt.tScalarArray_at(btFractions, i);
                var btPoint = bt.tVector3Array_at(btPoints, i);
                var point = hitResult.point;
                point.x = -bt.btVector3_x(btPoint);
                point.y = bt.btVector3_y(btPoint);
                point.z = bt.btVector3_z(btPoint);
                var btNormal = bt.tVector3Array_at(btNormals, i);
                var normal = hitResult.normal;
                normal.x = -bt.btVector3_x(btNormal);
                normal.y = bt.btVector3_y(btNormal);
                normal.z = bt.btVector3_z(btNormal);
            }
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * 添加刚体运动的约束条件。
     * @param constraint 约束。
     * @param disableCollisionsBetweenLinkedBodies 是否禁用
     */
    addConstraint(constraint, disableCollisionsBetweenLinkedBodies = false) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Cannot perform this action when the physics engine is set to CollisionsOnly";
        // this._nativeDiscreteDynamicsWorld.addConstraint(constraint._nativeConstraint, disableCollisionsBetweenLinkedBodies);
        constraint._simulation = this;
    }
    /**
     * 移除刚体运动的约束条件。
     */
    removeConstraint(constraint) {
        if (!this._btDiscreteDynamicsWorld)
            throw "Cannot perform this action when the physics engine is set to CollisionsOnly";
        // this._nativeDiscreteDynamicsWorld.removeConstraint(constraint._nativeConstraint);
    }
    /**
     * @internal
     */
    _updatePhysicsTransformFromRender() {
        var elements = this._physicsUpdateList.elements;
        for (var i = 0, n = this._physicsUpdateList.length; i < n; i++) {
            var physicCollider = elements[i];
            physicCollider._derivePhysicsTransformation(false);
            physicCollider._inPhysicUpdateListIndex = -1; //置空索引
        }
        this._physicsUpdateList.length = 0; //清空物理更新队列
    }
    /**
     * @internal
     */
    _updateCharacters() {
        for (var i = 0, n = this._characters.length; i < n; i++) {
            var character = this._characters[i];
            character._updateTransformComponent(Physics3D._bullet.btCollisionObject_getWorldTransform(character._btColliderObject));
        }
    }
    /**
     * @internal
     */
    _updateCollisions() {
        this._collisionsUtils.recoverAllContactPointsPool();
        var previous = this._currentFrameCollisions;
        this._currentFrameCollisions = this._previousFrameCollisions;
        this._currentFrameCollisions.length = 0;
        this._previousFrameCollisions = previous;
        var loopCount = Stat.loopCount;
        var bt = Physics3D._bullet;
        var numManifolds = bt.btDispatcher_getNumManifolds(this._btDispatcher);
        for (var i = 0; i < numManifolds; i++) {
            var contactManifold = bt.btDispatcher_getManifoldByIndexInternal(this._btDispatcher, i); //1.可能同时返回A和B、B和A 2.可能同时返回A和B多次(可能和CCD有关)
            var componentA = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.btPersistentManifold_getBody0(contactManifold))];
            var componentB = PhysicsComponent._physicObjectsMap[bt.btCollisionObject_getUserIndex(bt.btPersistentManifold_getBody1(contactManifold))];
            var collision = null;
            var isFirstCollision; //可能同时返回A和B多次,需要过滤
            var contacts = null;
            var isTrigger = componentA.isTrigger || componentB.isTrigger;
            if (isTrigger && (componentA.owner._needProcessTriggers || componentB.owner._needProcessTriggers)) {
                var numContacts = bt.btPersistentManifold_getNumContacts(contactManifold);
                for (var j = 0; j < numContacts; j++) {
                    var pt = bt.btPersistentManifold_getContactPoint(contactManifold, j);
                    var distance = bt.btManifoldPoint_getDistance(pt);
                    if (distance <= 0) {
                        collision = this._collisionsUtils.getCollision(componentA, componentB);
                        contacts = collision.contacts;
                        isFirstCollision = collision._updateFrame !== loopCount;
                        if (isFirstCollision) {
                            collision._isTrigger = true;
                            contacts.length = 0;
                        }
                        break;
                    }
                }
            }
            else if (componentA.owner._needProcessCollisions || componentB.owner._needProcessCollisions) {
                if (componentA._enableProcessCollisions || componentB._enableProcessCollisions) { //例：A和B均为运动刚体或PhysicCollider
                    numContacts = bt.btPersistentManifold_getNumContacts(contactManifold);
                    for (j = 0; j < numContacts; j++) {
                        pt = bt.btPersistentManifold_getContactPoint(contactManifold, j);
                        distance = bt.btManifoldPoint_getDistance(pt);
                        if (distance <= 0) {
                            var contactPoint = this._collisionsUtils.getContactPoints();
                            contactPoint.colliderA = componentA;
                            contactPoint.colliderB = componentB;
                            contactPoint.distance = distance;
                            var btNormal = bt.btManifoldPoint_get_m_normalWorldOnB(pt);
                            var normal = contactPoint.normal;
                            normal.x = -bt.btVector3_x(btNormal);
                            normal.y = bt.btVector3_y(btNormal);
                            normal.z = bt.btVector3_z(btNormal);
                            var btPostionA = bt.btManifoldPoint_get_m_positionWorldOnA(pt);
                            var positionOnA = contactPoint.positionOnA;
                            positionOnA.x = -bt.btVector3_x(btPostionA);
                            positionOnA.y = bt.btVector3_y(btPostionA);
                            positionOnA.z = bt.btVector3_z(btPostionA);
                            var btPostionB = bt.btManifoldPoint_get_m_positionWorldOnB(pt);
                            var positionOnB = contactPoint.positionOnB;
                            positionOnB.x = -bt.btVector3_x(btPostionB);
                            positionOnB.y = bt.btVector3_y(btPostionB);
                            positionOnB.z = bt.btVector3_z(btPostionB);
                            if (!collision) {
                                collision = this._collisionsUtils.getCollision(componentA, componentB);
                                contacts = collision.contacts;
                                isFirstCollision = collision._updateFrame !== loopCount;
                                if (isFirstCollision) {
                                    collision._isTrigger = false;
                                    contacts.length = 0;
                                }
                            }
                            contacts.push(contactPoint);
                        }
                    }
                }
            }
            if (collision && isFirstCollision) {
                this._currentFrameCollisions.push(collision);
                collision._setUpdateFrame(loopCount);
            }
        }
    }
    /**
     * @internal
     */
    _eventScripts() {
        var loopCount = Stat.loopCount;
        for (var i = 0, n = this._currentFrameCollisions.length; i < n; i++) {
            var curFrameCol = this._currentFrameCollisions[i];
            var colliderA = curFrameCol._colliderA;
            var colliderB = curFrameCol._colliderB;
            if (colliderA.destroyed || colliderB.destroyed) //前一个循环可能会销毁后面循环的同一物理组件
                continue;
            if (loopCount - curFrameCol._lastUpdateFrame === 1) {
                var ownerA = colliderA.owner;
                var scriptsA = ownerA._scripts;
                if (scriptsA) {
                    if (curFrameCol._isTrigger) {
                        if (ownerA._needProcessTriggers) {
                            for (var j = 0, m = scriptsA.length; j < m; j++)
                                scriptsA[j].onTriggerStay(colliderB);
                        }
                    }
                    else {
                        if (ownerA._needProcessCollisions) {
                            for (j = 0, m = scriptsA.length; j < m; j++) {
                                curFrameCol.other = colliderB;
                                scriptsA[j].onCollisionStay(curFrameCol);
                            }
                        }
                    }
                }
                var ownerB = colliderB.owner;
                var scriptsB = ownerB._scripts;
                if (scriptsB) {
                    if (curFrameCol._isTrigger) {
                        if (ownerB._needProcessTriggers) {
                            for (j = 0, m = scriptsB.length; j < m; j++)
                                scriptsB[j].onTriggerStay(colliderA);
                        }
                    }
                    else {
                        if (ownerB._needProcessCollisions) {
                            for (j = 0, m = scriptsB.length; j < m; j++) {
                                curFrameCol.other = colliderA;
                                scriptsB[j].onCollisionStay(curFrameCol);
                            }
                        }
                    }
                }
            }
            else {
                ownerA = colliderA.owner;
                scriptsA = ownerA._scripts;
                if (scriptsA) {
                    if (curFrameCol._isTrigger) {
                        if (ownerA._needProcessTriggers) {
                            for (j = 0, m = scriptsA.length; j < m; j++)
                                scriptsA[j].onTriggerEnter(colliderB);
                        }
                    }
                    else {
                        if (ownerA._needProcessCollisions) {
                            for (j = 0, m = scriptsA.length; j < m; j++) {
                                curFrameCol.other = colliderB;
                                scriptsA[j].onCollisionEnter(curFrameCol);
                            }
                        }
                    }
                }
                ownerB = colliderB.owner;
                scriptsB = ownerB._scripts;
                if (scriptsB) {
                    if (curFrameCol._isTrigger) {
                        if (ownerB._needProcessTriggers) {
                            for (j = 0, m = scriptsB.length; j < m; j++)
                                scriptsB[j].onTriggerEnter(colliderA);
                        }
                    }
                    else {
                        if (ownerB._needProcessCollisions) {
                            for (j = 0, m = scriptsB.length; j < m; j++) {
                                curFrameCol.other = colliderA;
                                scriptsB[j].onCollisionEnter(curFrameCol);
                            }
                        }
                    }
                }
            }
        }
        for (i = 0, n = this._previousFrameCollisions.length; i < n; i++) {
            var preFrameCol = this._previousFrameCollisions[i];
            var preColliderA = preFrameCol._colliderA;
            var preColliderB = preFrameCol._colliderB;
            if (preColliderA.destroyed || preColliderB.destroyed)
                continue;
            if (loopCount - preFrameCol._updateFrame === 1) {
                this._collisionsUtils.recoverCollision(preFrameCol); //回收collision对象
                ownerA = preColliderA.owner;
                scriptsA = ownerA._scripts;
                if (scriptsA) {
                    if (preFrameCol._isTrigger) {
                        if (ownerA._needProcessTriggers) {
                            for (j = 0, m = scriptsA.length; j < m; j++)
                                scriptsA[j].onTriggerExit(preColliderB);
                        }
                    }
                    else {
                        if (ownerA._needProcessCollisions) {
                            for (j = 0, m = scriptsA.length; j < m; j++) {
                                preFrameCol.other = preColliderB;
                                scriptsA[j].onCollisionExit(preFrameCol);
                            }
                        }
                    }
                }
                ownerB = preColliderB.owner;
                scriptsB = ownerB._scripts;
                if (scriptsB) {
                    if (preFrameCol._isTrigger) {
                        if (ownerB._needProcessTriggers) {
                            for (j = 0, m = scriptsB.length; j < m; j++)
                                scriptsB[j].onTriggerExit(preColliderA);
                        }
                    }
                    else {
                        if (ownerB._needProcessCollisions) {
                            for (j = 0, m = scriptsB.length; j < m; j++) {
                                preFrameCol.other = preColliderA;
                                scriptsB[j].onCollisionExit(preFrameCol);
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * 清除力。
     */
    clearForces() {
        if (!this._btDiscreteDynamicsWorld)
            throw "Cannot perform this action when the physics engine is set to CollisionsOnly";
        Physics3D._bullet.btDiscreteDynamicsWorld_clearForces(this._btDiscreteDynamicsWorld);
    }
}
/** @internal */
PhysicsSimulation.PHYSICSENGINEFLAGS_NONE = 0x0;
/** @internal */
PhysicsSimulation.PHYSICSENGINEFLAGS_COLLISIONSONLY = 0x1;
/** @internal */
PhysicsSimulation.PHYSICSENGINEFLAGS_SOFTBODYSUPPORT = 0x2;
/** @internal */
PhysicsSimulation.PHYSICSENGINEFLAGS_MULTITHREADED = 0x4;
/** @internal */
PhysicsSimulation.PHYSICSENGINEFLAGS_USEHARDWAREWHENPOSSIBLE = 0x8;
/** @internal */
PhysicsSimulation.SOLVERMODE_RANDMIZE_ORDER = 1;
/** @internal */
PhysicsSimulation.SOLVERMODE_FRICTION_SEPARATE = 2;
/** @internal */
PhysicsSimulation.SOLVERMODE_USE_WARMSTARTING = 4;
/** @internal */
PhysicsSimulation.SOLVERMODE_USE_2_FRICTION_DIRECTIONS = 16;
/** @internal */
PhysicsSimulation.SOLVERMODE_ENABLE_FRICTION_DIRECTION_CACHING = 32;
/** @internal */
PhysicsSimulation.SOLVERMODE_DISABLE_VELOCITY_DEPENDENT_FRICTION_DIRECTION = 64;
/** @internal */
PhysicsSimulation.SOLVERMODE_CACHE_FRIENDLY = 128;
/** @internal */
PhysicsSimulation.SOLVERMODE_SIMD = 256;
/** @internal */
PhysicsSimulation.SOLVERMODE_INTERLEAVE_CONTACT_AND_FRICTION_CONSTRAINTS = 512;
/** @internal */
PhysicsSimulation.SOLVERMODE_ALLOW_ZERO_LENGTH_FRICTION_DIRECTIONS = 1024;
/** @internal */
PhysicsSimulation._tempVector30 = new Vector3();
/*是否禁用所有模拟器。*/
PhysicsSimulation.disableSimulation = false;
