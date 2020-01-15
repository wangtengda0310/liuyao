import { Component } from "../../components/Component";
import { Matrix4x4 } from "../math/Matrix4x4";
import { Quaternion } from "../math/Quaternion";
import { Vector3 } from "../math/Vector3";
import { PhysicsSimulation } from "./PhysicsSimulation";
import { ColliderShape } from "./shape/ColliderShape";
/**
 * <code>PhysicsComponent</code> 类用于创建物理组件的父类。
 */
export declare class PhysicsComponent extends Component {
    /** @internal */
    static ACTIVATIONSTATE_ACTIVE_TAG: number;
    /** @internal */
    static ACTIVATIONSTATE_ISLAND_SLEEPING: number;
    /** @internal */
    static ACTIVATIONSTATE_WANTS_DEACTIVATION: number;
    /** @internal */
    static ACTIVATIONSTATE_DISABLE_DEACTIVATION: number;
    /** @internal */
    static ACTIVATIONSTATE_DISABLE_SIMULATION: number;
    /** @internal */
    static COLLISIONFLAGS_STATIC_OBJECT: number;
    /** @internal */
    static COLLISIONFLAGS_KINEMATIC_OBJECT: number;
    /** @internal */
    static COLLISIONFLAGS_NO_CONTACT_RESPONSE: number;
    /** @internal */
    static COLLISIONFLAGS_CUSTOM_MATERIAL_CALLBACK: number;
    /** @internal */
    static COLLISIONFLAGS_CHARACTER_OBJECT: number;
    /** @internal */
    static COLLISIONFLAGS_DISABLE_VISUALIZE_OBJECT: number;
    /** @internal */
    static COLLISIONFLAGS_DISABLE_SPU_COLLISION_PROCESSING: number;
    /** @internal */
    protected static _tempVector30: Vector3;
    /** @internal */
    protected static _tempQuaternion0: Quaternion;
    /** @internal */
    protected static _tempQuaternion1: Quaternion;
    /** @internal */
    protected static _tempMatrix4x40: Matrix4x4;
    /** @internal */
    protected static _btVector30: number;
    /** @internal */
    protected static _btQuaternion0: number;
    /** @internal */
    static _physicObjectsMap: any;
    /** @internal */
    static _addUpdateList: boolean;
    /**
    * @internal
    */
    static __init__(): void;
    /**
     * @internal
     */
    private static _createAffineTransformationArray;
    /**
     * @internal
     */
    static _creatShape(shapeData: any): ColliderShape;
    /**
     * @internal
     */
    private static physicVector3TransformQuat;
    /**
     * @internal
     */
    private static physicQuaternionMultiply;
    /** @internal */
    private _restitution;
    /** @internal */
    private _friction;
    /** @internal */
    private _rollingFriction;
    /** @internal */
    private _ccdMotionThreshold;
    /** @internal */
    private _ccdSweptSphereRadius;
    /** @internal */
    protected _collisionGroup: number;
    /** @internal */
    protected _canCollideWith: number;
    /** @internal */
    protected _colliderShape: ColliderShape;
    /** @internal */
    protected _transformFlag: number;
    /** @internal */
    _btColliderObject: number;
    /** @internal */
    _simulation: PhysicsSimulation;
    /** @internal */
    _enableProcessCollisions: boolean;
    /** @internal */
    _inPhysicUpdateListIndex: number;
    /** 是否可以缩放Shape。 */
    canScaleShape: boolean;
    /**
     * 弹力。
     */
    restitution: number;
    /**
     * 摩擦力。
     */
    friction: number;
    /**
     * 滚动摩擦力。
     */
    rollingFriction: number;
    /**
     * 用于连续碰撞检测(CCD)的速度阈值,当物体移动速度小于该值时不进行CCD检测,防止快速移动物体(例如:子弹)错误的穿过其它物体,0表示禁止。
     */
    ccdMotionThreshold: number;
    /**
     * 获取用于进入连续碰撞检测(CCD)范围的球半径。
     */
    ccdSweptSphereRadius: number;
    /**
     * 获取是否激活。
     */
    readonly isActive: boolean;
    /**
     * @inheritDoc
     * @override
     */
    /**
    * @inheritDoc
    * @override
    */
    enabled: boolean;
    /**
     * 碰撞形状。
     */
    colliderShape: ColliderShape;
    /**
     * 模拟器。
     */
    readonly simulation: PhysicsSimulation;
    /**
     * 所属碰撞组。
     */
    collisionGroup: number;
    /**
     * 可碰撞的碰撞组。
     */
    canCollideWith: number;
    /**
     * 创建一个 <code>PhysicsComponent</code> 实例。
     * @param collisionGroup 所属碰撞组。
     * @param canCollideWith 可产生碰撞的碰撞组。
     */
    constructor(collisionGroup: number, canCollideWith: number);
    /**
     * @internal
     */
    protected _parseShape(shapesData: any[]): void;
    /**
     * @internal
     */
    protected _onScaleChange(scale: Vector3): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    protected _onEnable(): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    protected _onDisable(): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    protected _onDestroy(): void;
    /**
     * @internal
     */
    _isValid(): boolean;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data: any): void;
    /**
     * @internal
     */
    _setTransformFlag(type: number, value: boolean): void;
    /**
     * @internal
     */
    _getTransformFlag(type: number): boolean;
    /**
     * @internal
     */
    _addToSimulation(): void;
    /**
     * @internal
     */
    _removeFromSimulation(): void;
    /**
     * 	@internal
     */
    _derivePhysicsTransformation(force: boolean): void;
    /**
     * 	@internal
     *	通过渲染矩阵更新物理矩阵。
     */
    _innerDerivePhysicsTransformation(physicTransformOut: number, force: boolean): void;
    /**
     * @internal
     * 通过物理矩阵更新渲染矩阵。
     */
    _updateTransformComponent(physicsTransform: number): void;
    /**
     * @internal
     */
    _onShapeChange(colShape: ColliderShape): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _onAdded(): void;
    /**
     * @internal
     */
    _onTransformChanged(flag: number): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _cloneTo(dest: Component): void;
}
