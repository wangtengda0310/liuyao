import { Resource } from "../../../resource/Resource";
/**
 * <code>ScreenTriangle</code> 类用于创建全屏三角形。
 */
export declare class ScreenTriangle extends Resource {
    /** @internal */
    static SCREENTRIANGLE_POSITION_UV: number;
    /** @internal */
    private static _vertexDeclaration;
    /** @internal */
    private static _vertices;
    /** @internal */
    private static _verticesInvertUV;
    /**@internal */
    static instance: ScreenTriangle;
    /**
     * @internal
     */
    static __init__(): void;
    /** @internal */
    private _vertexBuffer;
    /** @internal */
    private _bufferState;
    /** @internal */
    private _vertexBufferInvertUV;
    /** @internal */
    private _bufferStateInvertUV;
    /**
     * 创建一个 <code>ScreenTriangle</code> 实例,禁止使用。
     */
    constructor();
    /**
     * @internal
     */
    render(): void;
    /**
     * @internal
     */
    renderInvertUV(): void;
    /**
     * @inheritDoc
     * @override
     */
    destroy(): void;
}
