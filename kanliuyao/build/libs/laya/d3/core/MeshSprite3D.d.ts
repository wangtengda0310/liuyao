import { RenderableSprite3D } from "./RenderableSprite3D";
import { MeshFilter } from "./MeshFilter";
import { MeshRenderer } from "./MeshRenderer";
import { Mesh } from "../resource/models/Mesh";
import { Node } from "../../display/Node";
/**
 * <code>MeshSprite3D</code> 类用于创建网格。
 */
export declare class MeshSprite3D extends RenderableSprite3D {
    /**
     * @internal
     */
    static __init__(): void;
    private _meshFilter;
    /**
     * 网格过滤器。
     */
    readonly meshFilter: MeshFilter;
    /**
     * 网格渲染器。
     */
    readonly meshRenderer: MeshRenderer;
    /**
     * 创建一个 <code>MeshSprite3D</code> 实例。
     * @param mesh 网格,同时会加载网格所用默认材质。
     * @param name 名字。
     */
    constructor(mesh?: Mesh, name?: string);
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data: any, spriteMap: any): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _addToInitStaticBatchManager(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _cloneTo(destObject: any, rootSprite: Node, dstSprite: Node): void;
    /**
     * @inheritDoc
     * @override
     */
    destroy(destroyChild?: boolean): void;
    /**
     * @internal
     */
    protected _create(): Node;
}
