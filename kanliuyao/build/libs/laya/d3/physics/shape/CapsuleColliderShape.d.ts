import { Vector3 } from "../../math/Vector3";
import { ColliderShape } from "./ColliderShape";
/**
 * <code>CapsuleColliderShape</code> 类用于创建胶囊形状碰撞器。
 */
export declare class CapsuleColliderShape extends ColliderShape {
    /** @internal */
    static _tempVector30: Vector3;
    /**@internal */
    private _radius;
    /**@internal */
    private _length;
    /**@internal */
    private _orientation;
    /**
     * 半径。
     */
    readonly radius: number;
    /**
     * 长度。
     */
    readonly length: number;
    /**
     * 方向。
     */
    readonly orientation: number;
    /**
     * 创建一个新的 <code>CapsuleColliderShape</code> 实例。
     * @param 半径。
     * @param 高(包含半径)。
     * @param orientation 胶囊体方向。
     */
    constructor(radius?: number, length?: number, orientation?: number);
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _setScale(value: Vector3): void;
    /**
     * @inheritDoc
     * @override
     */
    clone(): any;
}
