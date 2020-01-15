import { Vector3 } from "../../math/Vector3";
import { Mesh } from "../../resource/models/Mesh";
import { ColliderShape } from "./ColliderShape";
/**
 * <code>MeshColliderShape</code> 类用于创建网格碰撞器。
 */
export declare class MeshColliderShape extends ColliderShape {
    /** @internal */
    private _mesh;
    /** @internal */
    private _convex;
    /**
     * 网格。
     */
    mesh: Mesh;
    /**
     * 是否使用凸多边形。
     */
    convex: boolean;
    /**
     * 创建一个新的 <code>MeshColliderShape</code> 实例。
     */
    constructor();
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
    cloneTo(destObject: any): void;
    /**
     * @inheritDoc
     * @override
     */
    clone(): any;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    destroy(): void;
}
