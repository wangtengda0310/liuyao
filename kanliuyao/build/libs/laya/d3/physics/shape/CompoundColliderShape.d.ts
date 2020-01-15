import { ColliderShape } from "./ColliderShape";
/**
 * <code>CompoundColliderShape</code> 类用于创建盒子形状碰撞器。
 */
export declare class CompoundColliderShape extends ColliderShape {
    /**@internal */
    private static _btVector3One;
    /**@internal */
    private static _btTransform;
    /**@internal */
    private static _btOffset;
    /**@internal */
    private static _btRotation;
    /**
     * @internal
     */
    static __init__(): void;
    /**@internal */
    private _childColliderShapes;
    /**
     * 创建一个新的 <code>CompoundColliderShape</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    private _clearChildShape;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _addReference(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _removeReference(): void;
    /**
     * @internal
     */
    _updateChildTransform(shape: ColliderShape): void;
    /**
     * 添加子碰撞器形状。
     * @param	shape 子碰撞器形状。
     */
    addChildShape(shape: ColliderShape): void;
    /**
     * 移除子碰撞器形状。
     * @param	shape 子碰撞器形状。
     */
    removeChildShape(shape: ColliderShape): void;
    /**
     * 清空子碰撞器形状。
     */
    clearChildShape(): void;
    /**
     * 获取子形状数量。
     * @return
     */
    getChildShapeCount(): number;
    /**
     * @inheritDoc
     * @override
     */
    cloneTo(destObject: any): void;
    /**
     * @inheritDoc
     * @override
     */
    clone(): any;
    /**
     * @inheritDoc
     * @override
     */
    destroy(): void;
}
