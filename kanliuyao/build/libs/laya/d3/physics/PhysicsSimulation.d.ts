import { Quaternion } from "../math/Quaternion";
import { Ray } from "../math/Ray";
import { Vector3 } from "../math/Vector3";
import { CharacterController } from "./CharacterController";
import { PhysicsUpdateList } from "./PhysicsUpdateList";
import { Constraint3D } from "./Constraint3D";
import { HitResult } from "./HitResult";
import { PhysicsCollider } from "./PhysicsCollider";
import { PhysicsSettings } from "./PhysicsSettings";
import { Rigidbody3D } from "./Rigidbody3D";
import { ColliderShape } from "./shape/ColliderShape";
/**
 * <code>Simulation</code> 类用于创建物理模拟器。
 */
export declare class PhysicsSimulation {
    /** @internal */
    static PHYSICSENGINEFLAGS_NONE: number;
    /** @internal */
    static PHYSICSENGINEFLAGS_COLLISIONSONLY: number;
    /** @internal */
    static PHYSICSENGINEFLAGS_SOFTBODYSUPPORT: number;
    /** @internal */
    static PHYSICSENGINEFLAGS_MULTITHREADED: number;
    /** @internal */
    static PHYSICSENGINEFLAGS_USEHARDWAREWHENPOSSIBLE: number;
    /** @internal */
    static SOLVERMODE_RANDMIZE_ORDER: number;
    /** @internal */
    static SOLVERMODE_FRICTION_SEPARATE: number;
    /** @internal */
    static SOLVERMODE_USE_WARMSTARTING: number;
    /** @internal */
    static SOLVERMODE_USE_2_FRICTION_DIRECTIONS: number;
    /** @internal */
    static SOLVERMODE_ENABLE_FRICTION_DIRECTION_CACHING: number;
    /** @internal */
    static SOLVERMODE_DISABLE_VELOCITY_DEPENDENT_FRICTION_DIRECTION: number;
    /** @internal */
    static SOLVERMODE_CACHE_FRIENDLY: number;
    /** @internal */
    static SOLVERMODE_SIMD: number;
    /** @internal */
    static SOLVERMODE_INTERLEAVE_CONTACT_AND_FRICTION_CONSTRAINTS: number;
    /** @internal */
    static SOLVERMODE_ALLOW_ZERO_LENGTH_FRICTION_DIRECTIONS: number;
    /** @internal */
    private static _btTempVector30;
    /** @internal */
    private static _btTempVector31;
    /** @internal */
    private static _btTempQuaternion0;
    /** @internal */
    private static _btTempQuaternion1;
    /** @internal */
    private static _btTempTransform0;
    /** @internal */
    private static _btTempTransform1;
    /** @internal */
    private static _tempVector30;
    static disableSimulation: boolean;
    /**
    * @internal
    */
    static __init__(): void;
    /**
     * 创建限制刚体运动的约束条件。
     */
    static createConstraint(): void;
    /** @internal */
    private _btDiscreteDynamicsWorld;
    /** @internal */
    private _btCollisionWorld;
    /** @internal */
    private _btDispatcher;
    /** @internal */
    private _btCollisionConfiguration;
    /** @internal */
    private _btBroadphase;
    /** @internal */
    private _btSolverInfo;
    /** @internal */
    private _btDispatchInfo;
    /** @internal */
    private _gravity;
    /** @internal */
    private _btVector3Zero;
    /** @internal */
    private _btDefaultQuaternion;
    /** @internal */
    private _btClosestRayResultCallback;
    /** @internal */
    private _btAllHitsRayResultCallback;
    /** @internal */
    private _btClosestConvexResultCallback;
    /** @internal */
    private _btAllConvexResultCallback;
    /** @internal */
    private _collisionsUtils;
    /** @internal */
    private _previousFrameCollisions;
    /** @internal */
    private _currentFrameCollisions;
    /** @internal */
    _physicsUpdateList: PhysicsUpdateList;
    /**@internal	*/
    _characters: CharacterController[];
    /**@internal	*/
    _updatedRigidbodies: number;
    /**物理引擎在一帧中用于补偿减速的最大次数：模拟器每帧允许的最大模拟次数，如果引擎运行缓慢,可能需要增加该次数，否则模拟器会丢失“时间",引擎间隔时间小于maxSubSteps*fixedTimeStep非常重要。*/
    maxSubSteps: number;
    /**物理模拟器帧的间隔时间:通过减少fixedTimeStep可增加模拟精度，默认是1.0 / 60.0。*/
    fixedTimeStep: number;
    /**
     * 是否进行连续碰撞检测。
     */
    continuousCollisionDetection: boolean;
    /**
     * 获取重力。
     */
    gravity: Vector3;
    /**
     * @internal
     */
    /**
    * @internal
    */
    speculativeContactRestitution: boolean;
    /**
     * @internal
     * 创建一个 <code>Simulation</code> 实例。
     */
    constructor(configuration: PhysicsSettings, flags?: number);
    /**
     * @internal
     */
    _simulate(deltaTime: number): void;
    /**
     * @internal
     */
    _destroy(): void;
    /**
     * @internal
     */
    _addPhysicsCollider(component: PhysicsCollider, group: number, mask: number): void;
    /**
     * @internal
     */
    _removePhysicsCollider(component: PhysicsCollider): void;
    /**
     * @internal
     */
    _addRigidBody(rigidBody: Rigidbody3D, group: number, mask: number): void;
    /**
     * @internal
     */
    _removeRigidBody(rigidBody: Rigidbody3D): void;
    /**
     * @internal
     */
    _addCharacter(character: CharacterController, group: number, mask: number): void;
    /**
     * @internal
     */
    _removeCharacter(character: CharacterController): void;
    /**
     * 射线检测第一个碰撞物体。
     * @param	from 起始位置。
     * @param	to 结束位置。
     * @param	out 碰撞结果。
     * @param   collisonGroup 射线所属碰撞组。
     * @param   collisionMask 与射线可产生碰撞的组。
     * @return 	是否成功。
     */
    raycastFromTo(from: Vector3, to: Vector3, out?: HitResult, collisonGroup?: number, collisionMask?: number): boolean;
    /**
     * 射线检测所有碰撞的物体。
     * @param	from 起始位置。
     * @param	to 结束位置。
     * @param	out 碰撞结果[数组元素会被回收]。
     * @param   collisonGroup 射线所属碰撞组。
     * @param   collisionMask 与射线可产生碰撞的组。
     * @return 	是否成功。
     */
    raycastAllFromTo(from: Vector3, to: Vector3, out: HitResult[], collisonGroup?: number, collisionMask?: number): boolean;
    /**
     *  射线检测第一个碰撞物体。
     * @param  	ray        射线
     * @param  	outHitInfo 与该射线发生碰撞的第一个碰撞器的碰撞信息
     * @param  	distance   射线长度,默认为最大值
     * @param   collisonGroup 射线所属碰撞组。
     * @param   collisionMask 与射线可产生碰撞的组。
     * @return 	是否检测成功。
     */
    rayCast(ray: Ray, outHitResult?: HitResult, distance?: number, collisonGroup?: number, collisionMask?: number): boolean;
    /**
     * 射线检测所有碰撞的物体。
     * @param  	ray        射线
     * @param  	out 碰撞结果[数组元素会被回收]。
     * @param  	distance   射线长度,默认为最大值
     * @param   collisonGroup 射线所属碰撞组。
     * @param   collisionMask 与射线可产生碰撞的组。
     * @return 	是否检测成功。
     */
    rayCastAll(ray: Ray, out: HitResult[], distance?: number, collisonGroup?: number, collisionMask?: number): boolean;
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
    shapeCast(shape: ColliderShape, fromPosition: Vector3, toPosition: Vector3, out?: HitResult, fromRotation?: Quaternion, toRotation?: Quaternion, collisonGroup?: number, collisionMask?: number, allowedCcdPenetration?: number): boolean;
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
    shapeCastAll(shape: ColliderShape, fromPosition: Vector3, toPosition: Vector3, out: HitResult[], fromRotation?: Quaternion, toRotation?: Quaternion, collisonGroup?: number, collisionMask?: number, allowedCcdPenetration?: number): boolean;
    /**
     * 添加刚体运动的约束条件。
     * @param constraint 约束。
     * @param disableCollisionsBetweenLinkedBodies 是否禁用
     */
    addConstraint(constraint: Constraint3D, disableCollisionsBetweenLinkedBodies?: boolean): void;
    /**
     * 移除刚体运动的约束条件。
     */
    removeConstraint(constraint: Constraint3D): void;
    /**
     * @internal
     */
    _updatePhysicsTransformFromRender(): void;
    /**
     * @internal
     */
    _updateCharacters(): void;
    /**
     * @internal
     */
    _updateCollisions(): void;
    /**
     * @internal
     */
    _eventScripts(): void;
    /**
     * 清除力。
     */
    clearForces(): void;
}
