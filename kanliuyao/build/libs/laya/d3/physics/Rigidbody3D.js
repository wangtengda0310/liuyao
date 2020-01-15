import { Vector3 } from "../math/Vector3";
import { Physics3DUtils } from "../utils/Physics3DUtils";
import { Utils3D } from "../utils/Utils3D";
import { PhysicsComponent } from "./PhysicsComponent";
import { Physics3D } from "./Physics3D";
import { PhysicsTriggerComponent } from "./PhysicsTriggerComponent";
/**
 * <code>Rigidbody3D</code> 类用于创建刚体碰撞器。
 */
export class Rigidbody3D extends PhysicsTriggerComponent {
    /**
     * 创建一个 <code>RigidBody</code> 实例。
     * @param collisionGroup 所属碰撞组。
     * @param canCollideWith 可产生碰撞的碰撞组。
     */
    constructor(collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        //LinkedConstraints = new List<Constraint>();
        super(collisionGroup, canCollideWith);
        /** @internal */
        this._isKinematic = false;
        /** @internal */
        this._mass = 1.0;
        /** @internal */
        this._gravity = new Vector3(0, -10, 0);
        /** @internal */
        this._angularDamping = 0.0;
        /** @internal */
        this._linearDamping = 0.0;
        /** @internal */
        this._overrideGravity = false;
        /** @internal */
        this._totalTorque = new Vector3(0, 0, 0);
        /** @internal */
        this._totalForce = new Vector3(0, 0, 0);
        /** @internal */
        this._linearVelocity = new Vector3();
        /** @internal */
        this._angularVelocity = new Vector3();
        /** @internal */
        this._linearFactor = new Vector3(1, 1, 1);
        /** @internal */
        this._angularFactor = new Vector3(1, 1, 1);
        /** @internal */
        this._detectCollisions = true;
    }
    /**
     * @internal
     */
    static __init__() {
        var bt = Physics3D._bullet;
        Rigidbody3D._btTempVector30 = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btTempVector31 = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btVector3Zero = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btInertia = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btImpulse = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btImpulseOffset = bt.btVector3_create(0, 0, 0);
        Rigidbody3D._btGravity = bt.btVector3_create(0, 0, 0);
    }
    //private var _linkedConstraints:Array;//TODO:
    /**
     * 质量。
     */
    get mass() {
        return this._mass;
    }
    set mass(value) {
        value = Math.max(value, 1e-07); //质量最小为1e-07
        this._mass = value;
        (this._isKinematic) || (this._updateMass(value));
    }
    /**
     * 是否为运动物体，如果为true仅可通过transform属性移动物体,而非其他力相关属性。
     */
    get isKinematic() {
        return this._isKinematic;
    }
    set isKinematic(value) {
        this._isKinematic = value;
        var bt = Physics3D._bullet;
        var canInSimulation = !!(this._simulation && this._enabled && this._colliderShape);
        canInSimulation && this._removeFromSimulation();
        var natColObj = this._btColliderObject;
        var flags = bt.btCollisionObject_getCollisionFlags(natColObj);
        if (value) {
            flags = flags | PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT;
            bt.btCollisionObject_setCollisionFlags(natColObj, flags); //加入场景前必须配置flag,加入后无效
            bt.btCollisionObject_forceActivationState(this._btColliderObject, PhysicsComponent.ACTIVATIONSTATE_DISABLE_DEACTIVATION); //触发器开启主动检测,并防止睡眠
            this._enableProcessCollisions = false;
            this._updateMass(0); //必须设置Mass为0来保证InverMass为0
        }
        else {
            if ((flags & PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT) > 0)
                flags = flags ^ PhysicsComponent.COLLISIONFLAGS_KINEMATIC_OBJECT;
            bt.btCollisionObject_setCollisionFlags(natColObj, flags); //加入场景前必须配置flag,加入后无效
            bt.btCollisionObject_setActivationState(this._btColliderObject, PhysicsComponent.ACTIVATIONSTATE_ACTIVE_TAG);
            this._enableProcessCollisions = true;
            this._updateMass(this._mass);
        }
        var btZero = Rigidbody3D._btVector3Zero;
        bt.btCollisionObject_setInterpolationLinearVelocity(natColObj, btZero);
        bt.btRigidBody_setLinearVelocity(natColObj, btZero);
        bt.btCollisionObject_setInterpolationAngularVelocity(natColObj, btZero);
        bt.btRigidBody_setAngularVelocity(natColObj, btZero);
        canInSimulation && this._addToSimulation();
    }
    /**
     * 刚体的线阻力。
     */
    get linearDamping() {
        return this._linearDamping;
    }
    set linearDamping(value) {
        this._linearDamping = value;
        if (this._btColliderObject)
            Physics3D._bullet.btRigidBody_setDamping(this._btColliderObject, value, this._angularDamping);
    }
    /**
     * 刚体的角阻力。
     */
    get angularDamping() {
        return this._angularDamping;
    }
    set angularDamping(value) {
        this._angularDamping = value;
        if (this._btColliderObject)
            Physics3D._bullet.btRigidBody_setDamping(this._btColliderObject, this._linearDamping, value);
    }
    /**
     * 是否重载重力。
     */
    get overrideGravity() {
        return this._overrideGravity;
    }
    set overrideGravity(value) {
        this._overrideGravity = value;
        var bt = Physics3D._bullet;
        if (this._btColliderObject) {
            var flag = bt.btRigidBody_getFlags(this._btColliderObject);
            if (value) {
                if ((flag & Rigidbody3D._BT_DISABLE_WORLD_GRAVITY) === 0)
                    bt.btRigidBody_setFlags(this._btColliderObject, flag | Rigidbody3D._BT_DISABLE_WORLD_GRAVITY);
            }
            else {
                if ((flag & Rigidbody3D._BT_DISABLE_WORLD_GRAVITY) > 0)
                    bt.btRigidBody_setFlags(this._btColliderObject, flag ^ Rigidbody3D._BT_DISABLE_WORLD_GRAVITY);
            }
        }
    }
    /**
     * 重力。
     */
    get gravity() {
        return this._gravity;
    }
    set gravity(value) {
        this._gravity = value;
        var bt = Physics3D._bullet;
        bt.btVector3_setValue(Rigidbody3D._btGravity, -value.x, value.y, value.z);
        bt.btRigidBody_setGravity(this._btColliderObject, Rigidbody3D._btGravity);
    }
    /**
     * 总力。
     */
    get totalForce() {
        if (this._btColliderObject) {
            var btTotalForce = Physics3D._bullet.btRigidBody_getTotalForce(this._btColliderObject);
            Utils3D._convertToLayaVec3(btTotalForce, this._totalForce, true);
            return this._totalForce;
        }
        return null;
    }
    /**
     * 每个轴的线性运动缩放因子。
     */
    get linearFactor() {
        if (this._btColliderObject)
            return this._linearFactor;
        return null;
    }
    set linearFactor(value) {
        this._linearFactor = value;
        if (this._btColliderObject) {
            var btValue = Rigidbody3D._btTempVector30;
            Utils3D._convertToBulletVec3(value, btValue, false);
            Physics3D._bullet.btRigidBody_setLinearFactor(this._btColliderObject, btValue);
        }
    }
    /**
     * 线速度
     */
    get linearVelocity() {
        if (this._btColliderObject)
            Utils3D._convertToLayaVec3(Physics3D._bullet.btRigidBody_getLinearVelocity(this._btColliderObject), this._linearVelocity, true);
        return this._linearVelocity;
    }
    set linearVelocity(value) {
        this._linearVelocity = value;
        if (this._btColliderObject) {
            var btValue = Rigidbody3D._btTempVector30;
            Utils3D._convertToBulletVec3(value, btValue, true);
            (this.isSleeping) && (this.wakeUp()); //可能会因睡眠导致设置线速度无效
            Physics3D._bullet.btRigidBody_setLinearVelocity(this._btColliderObject, btValue);
        }
    }
    /**
     * 每个轴的角度运动缩放因子。
     */
    get angularFactor() {
        if (this._btColliderObject)
            return this._angularFactor;
        return null;
    }
    set angularFactor(value) {
        this._angularFactor = value;
        if (this._btColliderObject) {
            var btValue = Rigidbody3D._btTempVector30;
            Utils3D._convertToBulletVec3(value, btValue, false);
            Physics3D._bullet.btRigidBody_setAngularFactor(this._btColliderObject, btValue);
        }
    }
    /**
     * 角速度。
     */
    get angularVelocity() {
        if (this._btColliderObject)
            Utils3D._convertToLayaVec3(Physics3D._bullet.btRigidBody_getAngularVelocity(this._btColliderObject), this._angularVelocity, true);
        return this._angularVelocity;
    }
    set angularVelocity(value) {
        this._angularVelocity = value;
        if (this._btColliderObject) {
            var btValue = Rigidbody3D._btTempVector30;
            Utils3D._convertToBulletVec3(value, btValue, true);
            (this.isSleeping) && (this.wakeUp()); //可能会因睡眠导致设置角速度无效
            Physics3D._bullet.btRigidBody_setAngularVelocity(this._btColliderObject, btValue);
        }
    }
    /**
     * 刚体所有扭力。
     */
    get totalTorque() {
        if (this._btColliderObject) {
            var btTotalTorque = Physics3D._bullet.btRigidBody_getTotalTorque(this._btColliderObject);
            Utils3D._convertToLayaVec3(btTotalTorque, this._totalTorque, true);
            return this._totalTorque;
        }
        return null;
    }
    /**
     * 是否进行碰撞检测。
     */
    get detectCollisions() {
        return this._detectCollisions;
    }
    set detectCollisions(value) {
        if (this._detectCollisions !== value) {
            this._detectCollisions = value;
            if (this._colliderShape && this._enabled && this._simulation) {
                this._simulation._removeRigidBody(this);
                this._simulation._addRigidBody(this, this._collisionGroup, value ? this._canCollideWith : 0);
                //_nativeColliderObject.getBroadphaseHandle().set_m_collisionFilterMask(value ? _canCollideWith : 0);//有延迟问题
            }
        }
    }
    /**
     * 是否处于睡眠状态。
     */
    get isSleeping() {
        if (this._btColliderObject)
            return Physics3D._bullet.btCollisionObject_getActivationState(this._btColliderObject) === PhysicsComponent.ACTIVATIONSTATE_ISLAND_SLEEPING;
        return false;
    }
    /**
     * 刚体睡眠的线速度阈值。
     */
    get sleepLinearVelocity() {
        return Physics3D._bullet.btRigidBody_getLinearSleepingThreshold(this._btColliderObject);
    }
    set sleepLinearVelocity(value) {
        var bt = Physics3D._bullet;
        bt.btRigidBody_setSleepingThresholds(this._btColliderObject, value, bt.btRigidBody_getAngularSleepingThreshold(this._btColliderObject));
    }
    /**
     * 刚体睡眠的角速度阈值。
     */
    get sleepAngularVelocity() {
        return Physics3D._bullet.btRigidBody_getAngularSleepingThreshold(this._btColliderObject);
    }
    set sleepAngularVelocity(value) {
        var bt = Physics3D._bullet;
        bt.btRigidBody_setSleepingThresholds(this._btColliderObject, bt.btRigidBody_getLinearSleepingThreshold(this._btColliderObject), value);
    }
    /**
     * @internal
     */
    _updateMass(mass) {
        if (this._btColliderObject && this._colliderShape) {
            var bt = Physics3D._bullet;
            bt.btCollisionShape_calculateLocalInertia(this._colliderShape._btShape, mass, Rigidbody3D._btInertia);
            bt.btRigidBody_setMassProps(this._btColliderObject, mass, Rigidbody3D._btInertia);
            bt.btRigidBody_updateInertiaTensor(this._btColliderObject); //this was the major headache when I had to debug Slider and Hinge constraint
        }
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _onScaleChange(scale) {
        super._onScaleChange(scale);
        this._updateMass(this._isKinematic ? 0 : this._mass); //修改缩放需要更新惯性
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _onAdded() {
        var bt = Physics3D._bullet;
        var motionState = bt.layaMotionState_create();
        bt.layaMotionState_set_rigidBodyID(motionState, this._id);
        this._btLayaMotionState = motionState;
        var constructInfo = bt.btRigidBodyConstructionInfo_create(0.0, motionState, null, Rigidbody3D._btVector3Zero);
        var btRigid = bt.btRigidBody_create(constructInfo);
        bt.btCollisionObject_setUserIndex(btRigid, this.id);
        this._btColliderObject = btRigid;
        super._onAdded();
        this.mass = this._mass;
        this.linearFactor = this._linearFactor;
        this.angularFactor = this._angularFactor;
        this.linearDamping = this._linearDamping;
        this.angularDamping = this._angularDamping;
        this.overrideGravity = this._overrideGravity;
        this.gravity = this._gravity;
        this.isKinematic = this._isKinematic;
        bt.btRigidBodyConstructionInfo_destroy(constructInfo);
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _onShapeChange(colShape) {
        super._onShapeChange(colShape);
        //TODO:此时已经加入场景,只影响mass为0,函数内部设置的flas是否为static无效			
        if (this._isKinematic) {
            this._updateMass(0);
        }
        else {
            var bt = Physics3D._bullet;
            bt.btRigidBody_setCenterOfMassTransform(this._btColliderObject, bt.btCollisionObject_getWorldTransform(this._btColliderObject)); //修改Shape会影响坐标,需要更新插值坐标,否则物理引擎motionState.setWorldTrans数据为旧数据
            this._updateMass(this._mass);
        }
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data) {
        (data.friction != null) && (this.friction = data.friction);
        (data.rollingFriction != null) && (this.rollingFriction = data.rollingFriction);
        (data.restitution != null) && (this.restitution = data.restitution);
        (data.isTrigger != null) && (this.isTrigger = data.isTrigger);
        (data.mass != null) && (this.mass = data.mass);
        (data.isKinematic != null) && (this.isKinematic = data.isKinematic);
        (data.linearDamping != null) && (this.linearDamping = data.linearDamping);
        (data.angularDamping != null) && (this.angularDamping = data.angularDamping);
        (data.overrideGravity != null) && (this.overrideGravity = data.overrideGravity);
        if (data.gravity) {
            this.gravity.fromArray(data.gravity);
            this.gravity = this.gravity;
        }
        super._parse(data);
        this._parseShape(data.shapes);
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _onDestroy() {
        Physics3D._bullet.btMotionState_destroy(this._btLayaMotionState);
        ////Remove constraints safely
        //var toremove = new FastList<Constraint>();
        //foreach (var c in LinkedConstraints)
        //{
        //toremove.Add(c);
        //}
        //foreach (var disposable in toremove)
        //{
        //disposable.Dispose();
        //}
        //LinkedConstraints.Clear();
        ////~Remove constraints
        super._onDestroy();
        this._btLayaMotionState = null;
        this._gravity = null;
        this._totalTorque = null;
        this._linearVelocity = null;
        this._angularVelocity = null;
        this._linearFactor = null;
        this._angularFactor = null;
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _addToSimulation() {
        this._simulation._addRigidBody(this, this._collisionGroup, this._detectCollisions ? this._canCollideWith : 0);
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _removeFromSimulation() {
        this._simulation._removeRigidBody(this);
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _cloneTo(dest) {
        super._cloneTo(dest);
        var destRigidbody3D = dest;
        destRigidbody3D.isKinematic = this._isKinematic;
        destRigidbody3D.mass = this._mass;
        destRigidbody3D.gravity = this._gravity;
        destRigidbody3D.angularDamping = this._angularDamping;
        destRigidbody3D.linearDamping = this._linearDamping;
        destRigidbody3D.overrideGravity = this._overrideGravity;
        //destRigidbody3D.totalTorque = _totalTorque;
        destRigidbody3D.linearVelocity = this._linearVelocity;
        destRigidbody3D.angularVelocity = this._angularVelocity;
        destRigidbody3D.linearFactor = this._linearFactor;
        destRigidbody3D.angularFactor = this._angularFactor;
        destRigidbody3D.detectCollisions = this._detectCollisions;
    }
    /**
     * 应用作用力。
     * @param	force 作用力。
     * @param	localOffset 偏移,如果为null则为中心点
     */
    applyForce(force, localOffset = null) {
        if (this._btColliderObject == null)
            throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        var bt = Physics3D._bullet;
        var btForce = Rigidbody3D._btTempVector30;
        bt.btVector3_setValue(btForce, -force.x, force.y, force.z);
        if (localOffset) {
            var btOffset = Rigidbody3D._btTempVector31;
            bt.btVector3_setValue(btOffset, -localOffset.x, localOffset.y, localOffset.z);
            bt.btRigidBody_applyForce(this._btColliderObject, btForce, btOffset);
        }
        else {
            bt.btRigidBody_applyCentralForce(this._btColliderObject, btForce);
        }
    }
    /**
     * 应用扭转力。
     * @param	torque 扭转力。
     */
    applyTorque(torque) {
        if (this._btColliderObject == null)
            throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        var bullet = Physics3D._bullet;
        var btTorque = Rigidbody3D._btTempVector30;
        bullet.btVector3_setValue(btTorque, -torque.x, torque.y, torque.z);
        bullet.btRigidBody_applyTorque(this._btColliderObject, btTorque);
    }
    /**
     * 应用冲量。
     * @param	impulse 冲量。
     * @param   localOffset 偏移,如果为null则为中心点。
     */
    applyImpulse(impulse, localOffset = null) {
        if (this._btColliderObject == null)
            throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        var bt = Physics3D._bullet;
        bt.btVector3_setValue(Rigidbody3D._btImpulse, -impulse.x, impulse.y, impulse.z);
        if (localOffset) {
            bt.btVector3_setValue(Rigidbody3D._btImpulseOffset, -localOffset.x, localOffset.y, localOffset.z);
            bt.btRigidBody_applyImpulse(this._btColliderObject, Rigidbody3D._btImpulse, Rigidbody3D._btImpulseOffset);
        }
        else {
            bt.btRigidBody_applyCentralImpulse(this._btColliderObject, Rigidbody3D._btImpulse);
        }
    }
    /**
     * 应用扭转冲量。
     * @param	torqueImpulse
     */
    applyTorqueImpulse(torqueImpulse) {
        if (this._btColliderObject == null)
            throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        var bt = Physics3D._bullet;
        var btTorqueImpulse = Rigidbody3D._btTempVector30;
        bt.btVector3_setValue(btTorqueImpulse, -torqueImpulse.x, torqueImpulse.y, torqueImpulse.z);
        bt.btRigidBody_applyTorqueImpulse(this._btColliderObject, btTorqueImpulse);
    }
    /**
     * 唤醒刚体。
     */
    wakeUp() {
        this._btColliderObject && (Physics3D._bullet.btCollisionObject_activate(this._btColliderObject, false));
    }
    /**
     *清除应用到刚体上的所有力。
     */
    clearForces() {
        var rigidBody = this._btColliderObject;
        if (rigidBody == null)
            throw "Attempted to call a Physics function that is avaliable only when the Entity has been already added to the Scene.";
        rigidBody.clearForces();
        var btZero = Rigidbody3D._btVector3Zero;
        rigidBody.setInterpolationLinearVelocity(btZero);
        rigidBody.setLinearVelocity(btZero);
        rigidBody.setInterpolationAngularVelocity(btZero);
        rigidBody.setAngularVelocity(btZero);
    }
}
/*
 * 刚体类型_静态。
 * 设定为永远不会移动刚体,引擎也不会自动更新。
 * 如果你打算移动物理,建议使用TYPE_KINEMATIC。
 */
Rigidbody3D.TYPE_STATIC = 0;
/*
 * 刚体类型_动态。
 * 可以通过forces和impulsesy移动刚体,并且不需要修改移动转换。
 */
Rigidbody3D.TYPE_DYNAMIC = 1;
/*
 * 刚体类型_运动。
 * 可以移动刚体,物理引擎会自动处理动态交互。
 * 注意：和静态或其他类型刚体不会产生动态交互。
 */
Rigidbody3D.TYPE_KINEMATIC = 2;
/** @internal */
Rigidbody3D._BT_DISABLE_WORLD_GRAVITY = 1;
/** @internal */
Rigidbody3D._BT_ENABLE_GYROPSCOPIC_FORCE = 2;
