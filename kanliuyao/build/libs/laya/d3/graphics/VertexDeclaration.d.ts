import { VertexElement } from "./VertexElement";
import { ShaderData } from "../shader/ShaderData";
/**
 * <code>VertexDeclaration</code> 类用于生成顶点声明。
 */
export declare class VertexDeclaration {
    /**@internal */
    private static _uniqueIDCounter;
    /**@internal */
    private _id;
    /**@internal */
    private _vertexStride;
    /**@internal */
    private _vertexElementsDic;
    /**@internal */
    _shaderValues: ShaderData;
    /**@internal [只读]*/
    _vertexElements: Array<VertexElement>;
    /**
     * 获取唯一标识ID(通常用于优化或识别)。
     * @return 唯一标识ID
     */
    readonly id: number;
    /**
     * 顶点跨度，以字节为单位。
     */
    readonly vertexStride: number;
    /**
     * 顶点元素的数量。
     */
    readonly vertexElementCount: number;
    /**
     * 创建一个 <code>VertexDeclaration</code> 实例。
     * @param	vertexStride 顶点跨度。
     * @param	vertexElements 顶点元素集合。
     */
    constructor(vertexStride: number, vertexElements: Array<VertexElement>);
    /**
     * 通过索引获取顶点元素。
     * @param index 索引。
     */
    getVertexElementByIndex(index: number): VertexElement;
    /**
     * @internal
     */
    getVertexElementByUsage(usage: number): VertexElement;
}
