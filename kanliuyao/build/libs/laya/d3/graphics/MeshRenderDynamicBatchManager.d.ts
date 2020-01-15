import { DynamicBatchManager } from "./DynamicBatchManager";
import { VertexDeclaration } from "./VertexDeclaration";
import { BufferState } from "../core/BufferState";
import { BatchMark } from "../core/render/BatchMark";
import { RenderElement } from "../core/render/RenderElement";
/**
 * @internal
 * <code>MeshSprite3DDynamicBatchManager</code> 类用于网格精灵动态批处理管理。
 */
export declare class MeshRenderDynamicBatchManager extends DynamicBatchManager {
    /** @internal */
    static instance: MeshRenderDynamicBatchManager;
    /**@internal */
    private _instanceBatchOpaqueMarks;
    /**@internal */
    private _vertexBatchOpaqueMarks;
    /**@internal */
    private _cacheBufferStates;
    /**@internal [只读]*/
    _updateCountMark: number;
    /**
     * 创建一个 <code>MeshSprite3DDynamicBatchManager</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    getInstanceBatchOpaquaMark(receiveShadow: boolean, materialID: number, subMeshID: number, invertFace: boolean): BatchMark;
    /**
     * @internal
     */
    getVertexBatchOpaquaMark(lightMapIndex: number, receiveShadow: boolean, materialID: number, verDecID: number): BatchMark;
    /**
     * @internal
     */
    _getBufferState(vertexDeclaration: VertexDeclaration): BufferState;
    /**
     * @inheritDoc
     * @override
     */
    _getBatchRenderElementFromPool(): RenderElement;
    /**
     * @inheritDoc
     * @override
     */
    _clear(): void;
}
