import { BatchMark } from "../core/render/BatchMark";
import { RenderElement } from "../core/render/RenderElement";
import { RenderableSprite3D } from "../core/RenderableSprite3D";
import { Sprite3D } from "../core/Sprite3D";
import { StaticBatchManager } from "./StaticBatchManager";
import { VertexDeclaration } from "./VertexDeclaration";
/**
 * @internal
 * <code>MeshSprite3DStaticBatchManager</code> 类用于网格精灵静态批处理管理。
 */
export declare class MeshRenderStaticBatchManager extends StaticBatchManager {
    /** @internal */
    static _verDec: VertexDeclaration;
    /** @internal */
    static instance: MeshRenderStaticBatchManager;
    /**
     * @internal
     */
    static __init__(): void;
    /**@internal */
    _opaqueBatchMarks: any[];
    /**@internal [只读]*/
    _updateCountMark: number;
    /**
     * 创建一个 <code>MeshSprite3DStaticBatchManager</code> 实例。
     */
    constructor();
    /**
     * @inheritDoc
     * @override
     */
    protected _compare(left: RenderableSprite3D, right: RenderableSprite3D): number;
    /**
     * @inheritDoc
     * @override
     */
    _getBatchRenderElementFromPool(): RenderElement;
    /**
     * @internal
     */
    private _getStaticBatch;
    /**
     * @inheritDoc
     * @override
     */
    protected _initStaticBatchs(rootOwner: Sprite3D): void;
    /**
     * @internal
     */
    _removeRenderSprite(sprite: RenderableSprite3D): void;
    /**
     * @inheritDoc
     * @override
     */
    _clear(): void;
    /**
     * @inheritDoc
     * @override
     */
    _garbageCollection(): void;
    /**
     * @internal
     */
    getBatchOpaquaMark(lightMapIndex: number, receiveShadow: boolean, materialID: number, staticBatchID: number): BatchMark;
}
