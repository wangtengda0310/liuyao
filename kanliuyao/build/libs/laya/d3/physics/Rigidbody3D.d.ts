import { Component } from "../../components/Component";
import { Vector3 } from "../math/Vector3";
import { PhysicsTriggerComponent } from "./PhysicsTriggerComponent";
import { ColliderShape } from "./shape/ColliderShape";
/**
 * <code>Rigidbody3D</code> 类用于创建刚体碰撞器。
 */
export declare class Rigidbody3D extends PhysicsTriggerComponent {
    static TYPE_STATIC: number;
    static TYPE_DYNAMIC: number;
    static TYPE_KINEMATIC: number;
    /** @internal */
    static _BT_DISABLE_WORLD_GRAVITY: number;
    /** @internal */
    static _BT_ENABLE_GYROPSCOPIC_FORCE: number;
    /** @internal */
    private static _btTempVector30;
    /** @internal */
    private static _btTempVector31;
    /** @internal */
    private static _btVector3Zero;
    /** @internal */
    private static _btInertia;
    /** @internal */
    private static _btImpulse;
    /** @internal */
    private static _btImpulseOffset;
    /** @internal */
    private static _btGravity;
    /**
     * @internal
     */
    static __init__(): void;
    /** @internal */
    private _btLayaMotionState;
    /** @internal */
    private _isKinematic;
    /** @internal */
    private _mass;
    /** @internal */
    private _gravity;
    /** @internal */
    private _angularDamping;
    /** @internal */
    private _linearDamping;
    /** @internal */
    private _overrideGravity;
    /** @internal */
    private _totalTorque;
    /** @internal */
    private _totalForce;
    /** @internal */
    private _linearVelocity;
    /** @internal */
    private _angularVelocity;
    /** @internal */
    private _linearFactor;
    /** @internal */
    private _angularFactor;
    /** @internal */
    private _detectCollisions;
    /**
     * 质量。
     */
    mass: number;
    /**
     * 是否为运动物体，如果为true仅可通过transform属性移动物体,而非其他力相关属性。
     */
    isKinematic: boolean;
    /**
     * 刚体的线阻力。
     */
    linearDamping: number;
    /**
     * 刚体的角阻力。
     */
    angularDamping: number;
    /**
     * 是否重载重力。
     */
    overrideGravity: boolean;
    /**
     * 重力。
     */
    gravity: Vector3;
    /**
     * 总力。
     */
    readonly totalForce: Vector3;
    /**
     * 每个轴的线性运动缩放因子。
     */
    linearFactor: Vector3;
    /**
     * 线速度
     */
    linearVelocity: Vector3;
    /**
     * 每个轴的角度运动缩放因子。
     */
    angularFactor: Vector3;
    /**
     * 角速度。
     */
    angularVelocity: Vector3;
    /**
     * 刚体所有扭力。
     */
    readonly totalTorque: Vector3;
    /**
     * 是否进行碰撞检测。
     */
    detectCollisions: boolean;
    /**
     * 是否处于睡眠状态。
     */
    readonly isSleeping: boolean;
    /**
     * 刚体睡眠的线速度阈值。
     */
    sleepLinearVelocity: number;
    /**
     * 刚体睡眠的角速度阈值。
     */
    sleepAngularVelocity: number;
    /**
     * 创建一个 <code>RigidBody</code> 实例。
     * @param collisionGroup 所属碰撞组。
     * @param canCollideWith 可产生碰撞的碰撞组。
     */
    constructor(collisionGroup?: number, canCollideWith?: number);
    /**
     * @internal
     */
    private _updateMass;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    protected _onScaleChange(scale: Vector3): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _onAdded(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _onShapeChange(colShape: ColliderShape): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data: any): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    protected _onDestroy(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _addToSimulation(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _removeFromSimulation(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _cloneTo(dest: Component): void;
    /**
     * 应用作用力。
     * @param	force 作用力。
     * @param	localOffset 偏移,如果为null则为中心点
     */
    applyForce(force: Vector3, localOffset?: Vector3): void;
    /**
     * 应用扭转力。
     * @param	torque 扭转力。
     */
    applyTorque(torque: Vector3): void;
    /**
     * 应用冲量。
     * @param	impulse 冲量。
     * @param   localOffset 偏移,如果为null则为中心点。
     */
    applyImpulse(impulse: Vector3, localOffset?: Vector3): void;
    /**
     * 应用扭转冲量。
     * @param	torqueImpulse
     */
    applyTorqueImpulse(torqueImpulse: Vector3): void;
    /**
     * 唤醒刚体。
     */
    wakeUp(): void;
    /**
     *清除应用到刚体上的所有力。
     */
    clearForces(): void;
}
