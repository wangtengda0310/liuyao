import { Buffer } from "../../webgl/utils/Buffer";
import { VertexDeclaration } from "./VertexDeclaration";
/**
 * <code>VertexBuffer3D</code> 类用于创建顶点缓冲。
 */
export declare class VertexBuffer3D extends Buffer {
    /**数据类型_Float32Array类型。*/
    static DATATYPE_FLOAT32ARRAY: number;
    /**数据类型_Uint8Array类型。*/
    static DATATYPE_UINT8ARRAY: number;
    /** @internal */
    private _canRead;
    /** @internal */
    _vertexDeclaration: VertexDeclaration;
    /** @internal */
    _float32Reader: Float32Array;
    /**
     * 获取顶点声明。
     */
    vertexDeclaration: VertexDeclaration;
    /**
     * 是否可读。
     */
    readonly canRead: boolean;
    /**
     * 创建一个 <code>VertexBuffer3D</code> 实例。
     * @param	byteLength 字节长度。
     * @param	bufferUsage VertexBuffer3D用途类型。
     * @param	canRead 是否可读。
     */
    constructor(byteLength: number, bufferUsage: number, canRead?: boolean);
    /**
     * @inheritDoc
     * @override
     */
    bind(): boolean;
    /**
     * 设置数据。
     * @param	data 顶点数据。
     * @param	bufferOffset 顶点缓冲中的偏移,以字节为单位。
     * @param	dataStartIndex 顶点数据的偏移,以字节为单位。
     * @param	dataCount 顶点数据的长度,以字节为单位。
     */
    setData(buffer: ArrayBuffer, bufferOffset?: number, dataStartIndex?: number, dataCount?: number): void;
    /**
     * 获取顶点数据。
     * @return	顶点数据。
     */
    getUint8Data(): Uint8Array;
    /**
     * @ignore
     */
    getFloat32Data(): Float32Array;
    /**
     * @ignore
     */
    markAsUnreadbale(): void;
    /**
     * @inheritDoc
     * @override
     */
    destroy(): void;
}
