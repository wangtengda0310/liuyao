import { GeometryElement } from "../core/GeometryElement";
import { RenderContext3D } from "../core/render/RenderContext3D";
import { VertexBuffer3D } from "./VertexBuffer3D";
/**
 * @internal
 */
export declare class SubMeshInstanceBatch extends GeometryElement {
    /** @internal */
    static instance: SubMeshInstanceBatch;
    /**
     * @internal
     */
    static __init__(): void;
    /** @internal */
    maxInstanceCount: number;
    /** @internal */
    instanceWorldMatrixData: Float32Array;
    /** @internal */
    instanceMVPMatrixData: Float32Array;
    /** @internal */
    instanceWorldMatrixBuffer: VertexBuffer3D;
    /** @internal */
    instanceMVPMatrixBuffer: VertexBuffer3D;
    /**
     * 创建一个 <code>InstanceSubMesh</code> 实例。
     */
    constructor();
    /**
     * @inheritDoc
     * @override
     */
    _render(state: RenderContext3D): void;
}
