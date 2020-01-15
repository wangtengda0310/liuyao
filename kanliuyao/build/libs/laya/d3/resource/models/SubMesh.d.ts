import { GeometryElement } from "../../core/GeometryElement";
import { RenderContext3D } from "../../core/render/RenderContext3D";
import { IndexBuffer3D } from "../../graphics/IndexBuffer3D";
import { VertexBuffer3D } from "../../graphics/VertexBuffer3D";
import { Mesh } from "./Mesh";
/**
 * <code>SubMesh</code> 类用于创建子网格数据模板。
 */
export declare class SubMesh extends GeometryElement {
    /** @internal */
    private static _uniqueIDCounter;
    /**@internal */
    private static _type;
    /** @internal */
    _mesh: Mesh;
    /** @internal */
    _boneIndicesList: Uint16Array[];
    /** @internal */
    _subIndexBufferStart: number[];
    /** @internal */
    _subIndexBufferCount: number[];
    /** @internal */
    _skinAnimationDatas: Float32Array[];
    /** @internal */
    _indexInMesh: number;
    /** @internal */
    _vertexStart: number;
    /** @internal */
    _indexStart: number;
    /** @internal */
    _indexCount: number;
    /** @internal */
    _indices: Uint16Array;
    /**@internal [只读]*/
    _vertexBuffer: VertexBuffer3D;
    /**@internal [只读]*/
    _indexBuffer: IndexBuffer3D;
    /** @internal */
    _id: number;
    /**
     * 获取索引数量。
     */
    readonly indexCount: number;
    /**
     * 创建一个 <code>SubMesh</code> 实例。
     * @param	mesh  网格数据模板。
     */
    constructor(mesh: Mesh);
    /**
     * @internal
     */
    _setIndexRange(indexStart: number, indexCount: number): void;
    /**
     * @internal
     * @override
     */
    _getType(): number;
    /**
     * @internal
     * @override
     */
    _prepareRender(state: RenderContext3D): boolean;
    /**
     * @internal
     * @override
     */
    _render(state: RenderContext3D): void;
    /**
     * 拷贝并获取子网格索引数据的副本。
     */
    getIndices(): Uint16Array;
    /**
     * 设置子网格索引。
     * @param indices
     */
    setIndices(indices: Uint16Array): void;
    /**
     * {@inheritDoc GeometryElement.destroy}
     * @override
     */
    destroy(): void;
}
