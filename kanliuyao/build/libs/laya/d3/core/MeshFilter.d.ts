import { Mesh } from "../resource/models/Mesh";
import { RenderableSprite3D } from "./RenderableSprite3D";
/**
 * <code>MeshFilter</code> 类用于创建网格过滤器。
 */
export declare class MeshFilter {
    /** @internal */
    private static _meshVerticeDefine;
    /** @internal */
    private _owner;
    /** @internal */
    private _sharedMesh;
    /**
     * 共享网格。
     */
    sharedMesh: Mesh;
    /**
     * 创建一个新的 <code>MeshFilter</code> 实例。
     * @param owner 所属网格精灵。
     */
    constructor(owner: RenderableSprite3D);
    /**
     * @internal
     * @param mesh
     * @param out
     */
    private _getMeshDefine;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
