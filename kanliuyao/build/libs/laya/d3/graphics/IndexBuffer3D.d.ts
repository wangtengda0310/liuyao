import { Buffer } from "../../webgl/utils/Buffer";
import { IndexFormat } from "./IndexFormat";
/**
 * <code>IndexBuffer3D</code> 类用于创建索引缓冲。
 */
export declare class IndexBuffer3D extends Buffer {
    /** @internal */
    private _indexType;
    /** @internal */
    private _indexTypeByteCount;
    /** @internal */
    private _indexCount;
    /** @internal */
    private _canRead;
    /**
     * 索引类型。
     */
    readonly indexType: IndexFormat;
    /**
     * 索引类型字节数量。
     */
    readonly indexTypeByteCount: number;
    /**
     * 索引个数。
     */
    readonly indexCount: number;
    /**
     * 是否可读。
     */
    readonly canRead: boolean;
    /**
     * 创建一个 <code>IndexBuffer3D,不建议开发者使用并用IndexBuffer3D.create()代替</code> 实例。
     * @param	indexType 索引类型。
     * @param	indexCount 索引个数。
     * @param	bufferUsage IndexBuffer3D用途类型。
     * @param	canRead 是否可读。
     */
    constructor(indexType: IndexFormat, indexCount: number, bufferUsage?: number, canRead?: boolean);
    /**
     * @inheritDoc
     * @override
     */
    _bindForVAO(): void;
    /**
     * @inheritDoc
     * @override
     */
    bind(): boolean;
    /**
     * 设置数据。
     * @param	data 索引数据。
     * @param	bufferOffset 索引缓冲中的偏移。
     * @param	dataStartIndex 索引数据的偏移。
     * @param	dataCount 索引数据的数量。
     */
    setData(data: any, bufferOffset?: number, dataStartIndex?: number, dataCount?: number): void;
    /**
     * 获取索引数据。
     * @return	索引数据。
     */
    getData(): Uint16Array;
    /**
     * @inheritDoc
     * @override
     */
    destroy(): void;
}
