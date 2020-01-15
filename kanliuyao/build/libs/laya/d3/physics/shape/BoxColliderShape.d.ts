import { ColliderShape } from "./ColliderShape";
/**
 * <code>BoxColliderShape</code> 类用于创建盒子形状碰撞器。
 */
export declare class BoxColliderShape extends ColliderShape {
    /** @internal */
    private static _btSize;
    /**
    * @internal
    */
    static __init__(): void;
    /**@internal */
    private _sizeX;
    /**@internal */
    private _sizeY;
    /**@internal */
    private _sizeZ;
    /**
     * X轴尺寸。
     */
    readonly sizeX: number;
    /**
     * Y轴尺寸。
     */
    readonly sizeY: number;
    /**
     * Z轴尺寸。
     */
    readonly sizeZ: number;
    /**
     * 创建一个新的 <code>BoxColliderShape</code> 实例。
     * @param sizeX 盒子X轴尺寸。
     * @param sizeY 盒子Y轴尺寸。
     * @param sizeZ 盒子Z轴尺寸。
     */
    constructor(sizeX?: number, sizeY?: number, sizeZ?: number);
    /**
     * @inheritDoc
     * @override
     */
    clone(): any;
}
