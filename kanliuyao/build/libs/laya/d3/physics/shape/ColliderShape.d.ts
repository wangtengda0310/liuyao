import { IClone } from "../../core/IClone";
import { Matrix4x4 } from "../../math/Matrix4x4";
import { Quaternion } from "../../math/Quaternion";
import { Vector3 } from "../../math/Vector3";
import { PhysicsComponent } from "../PhysicsComponent";
import { CompoundColliderShape } from "./CompoundColliderShape";
/**
 * <code>ColliderShape</code> 类用于创建形状碰撞器的父类，该类为抽象类。
 */
export declare class ColliderShape implements IClone {
    /** 形状方向_X轴正向 */
    static SHAPEORIENTATION_UPX: number;
    /** 形状方向_Y轴正向 */
    static SHAPEORIENTATION_UPY: number;
    /** 形状方向_Z轴正向 */
    static SHAPEORIENTATION_UPZ: number;
    /** @internal */
    static SHAPETYPES_BOX: number;
    /** @internal */
    static SHAPETYPES_SPHERE: number;
    /** @internal */
    static SHAPETYPES_CYLINDER: number;
    /** @internal */
    static SHAPETYPES_CAPSULE: number;
    /** @internal */
    static SHAPETYPES_CONVEXHULL: number;
    /** @internal */
    static SHAPETYPES_COMPOUND: number;
    /** @internal */
    static SHAPETYPES_STATICPLANE: number;
    /** @internal */
    static SHAPETYPES_CONE: number;
    /** @internal */
    static _tempVector30: Vector3;
    /** @internal */
    protected static _btScale: number;
    /**@internal */
    protected static _btVector30: number;
    /**@internal */
    protected static _btQuaternion0: number;
    /**@internal */
    protected static _btTransform0: number;
    /**
     * @internal
     */
    static __init__(): void;
    /**
     * @internal
     */
    static _createAffineTransformation(trans: Vector3, rot: Quaternion, outE: Float32Array): void;
    /**@internal */
    protected _scale: Vector3;
    /**@internal */
    _btShape: number;
    /**@internal */
    _type: number;
    /**@internal */
    _centerMatrix: Matrix4x4;
    /**@internal */
    _attatched: boolean;
    /**@internal */
    _indexInCompound: number;
    /**@internal */
    _compoundParent: CompoundColliderShape;
    /**@internal */
    _attatchedCollisionObject: PhysicsComponent;
    /**@internal */
    _referenceCount: number;
    /**@internal */
    private _localOffset;
    /**@internal */
    private _localRotation;
    needsCustomCollisionCallback: boolean;
    /**
     * 碰撞类型。
     */
    readonly type: number;
    /**
     * Shape的本地偏移。
     */
    localOffset: Vector3;
    /**
     * Shape的本地旋转。
     */
    localRotation: Quaternion;
    /**
     * 创建一个新的 <code>ColliderShape</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    _setScale(value: Vector3): void;
    /**
     * @internal
     */
    _addReference(): void;
    /**
     * @internal
     */
    _removeReference(): void;
    /**
     * 更新本地偏移,如果修改LocalOffset或LocalRotation需要调用。
     */
    updateLocalTransformations(): void;
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject: any): void;
    /**
     * 克隆。
     * @return 克隆副本。
     */
    clone(): any;
    /**
     * 销毁。
     */
    destroy(): void;
}
