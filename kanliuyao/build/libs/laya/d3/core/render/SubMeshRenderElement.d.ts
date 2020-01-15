import { VertexDeclaration } from "../../graphics/VertexDeclaration";
import { SubMesh } from "../../resource/models/SubMesh";
import { GeometryElement } from "../GeometryElement";
import { Transform3D } from "../Transform3D";
import { RenderContext3D } from "./RenderContext3D";
import { RenderElement } from "./RenderElement";
import { RenderQueue } from "./RenderQueue";
import { SingletonList } from "../../component/SingletonList";
/**
 * @internal
 */
export declare class SubMeshRenderElement extends RenderElement {
    /** @internal */
    private _dynamicWorldPositionNormalNeedUpdate;
    /** @internal */
    _dynamicVertexBatch: boolean;
    /** @internal */
    _dynamicMultiSubMesh: boolean;
    /** @internal */
    _dynamicVertexCount: number;
    /** @internal */
    _dynamicWorldPositions: Float32Array;
    /** @internal */
    _dynamicWorldNormals: Float32Array;
    /** @internal */
    staticBatchIndexStart: number;
    /** @internal */
    staticBatchIndexEnd: number;
    /** @internal */
    staticBatchElementList: SingletonList<SubMeshRenderElement>;
    /** @internal */
    instanceSubMesh: SubMesh;
    /** @internal */
    instanceBatchElementList: SingletonList<SubMeshRenderElement>;
    /** @internal */
    vertexBatchElementList: SingletonList<SubMeshRenderElement>;
    /** @internal */
    vertexBatchVertexDeclaration: VertexDeclaration;
    /**
     * 创建一个 <code>SubMeshRenderElement</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    private _onWorldMatrixChanged;
    /**
     * @inheritDoc
     */
    _computeWorldPositionsAndNormals(positionOffset: number, normalOffset: number, multiSubMesh: boolean, vertexCount: number): void;
    /**
     * @inheritDoc
     * @override
     */
    setTransform(transform: Transform3D): void;
    /**
     * @inheritDoc
     * @override
     */
    setGeometry(geometry: GeometryElement): void;
    /**
     * @inheritDoc
     * @override
     */
    addToOpaqueRenderQueue(context: RenderContext3D, queue: RenderQueue): void;
    /**
     * @inheritDoc
     * @override
     */
    addToTransparentRenderQueue(context: RenderContext3D, queue: RenderQueue): void;
    getInvertFront(): boolean;
    /**
     * @inheritDoc
     * @override
     */
    destroy(): void;
}
