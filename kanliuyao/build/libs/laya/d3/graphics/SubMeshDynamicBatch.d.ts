import { GeometryElement } from "../core/GeometryElement";
import { RenderContext3D } from "../core/render/RenderContext3D";
import { IndexBuffer3D } from "./IndexBuffer3D";
import { VertexBuffer3D } from "./VertexBuffer3D";
/**
 * @internal
 * <code>SubMeshDynamicBatch</code> 类用于网格动态合并。
 */
export declare class SubMeshDynamicBatch extends GeometryElement {
    /** @internal
     * //MI6 (微信) 大于12个顶点微小提升
     * //MI6 (QQ浏览器8.2 X5内核038230GPU-UU) 大于12个顶点微小提升
     * //MI6 (chrome63) 大于10个顶点微小提升
     * //IPHONE7PLUS  IOS11 微信 大于12个顶点微小提升
     * //IPHONE5s  IOS8 微信 大于12仍有较大提升
     */
    static maxAllowVertexCount: number;
    /** @internal */
    static maxAllowAttribueCount: number;
    /** @internal */
    static maxIndicesCount: number;
    /** @internal */
    static instance: SubMeshDynamicBatch;
    /**
    * @internal
    */
    static __init__(): void;
    /**@internal */
    private _vertices;
    /**@internal */
    private _indices;
    /**@internal */
    private _positionOffset;
    /**@internal */
    private _normalOffset;
    /**@internal */
    private _colorOffset;
    /**@internal */
    private _uv0Offset;
    /**@internal */
    private _uv1Offset;
    /**@internal */
    private _sTangentOffset;
    /**@internal */
    _vertexBuffer: VertexBuffer3D;
    /**@internal */
    _indexBuffer: IndexBuffer3D;
    /** @internal */
    private _bufferState;
    /**
     * 创建一个 <code>SubMeshDynamicBatch</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    private _getBatchVertices;
    /**
     * @internal
     */
    private _getBatchIndices;
    /**
     * @internal
     */
    private _flush;
    /**
     * @inheritDoc
     * @override
     */
    _prepareRender(state: RenderContext3D): boolean;
    /**
     * @inheritDoc
     * @override
     */
    _render(context: RenderContext3D): void;
}
