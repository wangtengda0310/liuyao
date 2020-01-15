import { BufferStateBase } from "../../webgl/BufferStateBase";
import { IndexBuffer3D } from "../graphics/IndexBuffer3D";
import { VertexBuffer3D } from "../graphics/VertexBuffer3D";
import { VertexDeclaration } from "../graphics/VertexDeclaration";
/**
 * @internal
 * <code>BufferState</code> 类用于实现渲染所需的Buffer状态集合。
 */
export declare class BufferState extends BufferStateBase {
    /**@readonly */
    vertexDeclaration: VertexDeclaration;
    /**
     * 创建一个 <code>BufferState</code> 实例。
     */
    constructor();
    /**
     * vertexBuffer的vertexDeclaration不能为空,该函数比较消耗性能，建议初始化时使用。
     */
    applyVertexBuffer(vertexBuffer: VertexBuffer3D): void;
    /**
     * vertexBuffers中的vertexDeclaration不能为空,该函数比较消耗性能，建议初始化时使用。
     */
    applyVertexBuffers(vertexBuffers: VertexBuffer3D[]): void;
    applyInstanceVertexBuffer(vertexBuffer: VertexBuffer3D): void;
    applyIndexBuffer(indexBuffer: IndexBuffer3D): void;
}
