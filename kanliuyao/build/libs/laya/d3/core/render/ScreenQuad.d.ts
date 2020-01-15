import { Resource } from "../../../resource/Resource";
/**
 * <code>ScreenQuad</code> 类用于创建全屏四边形。
 */
export declare class ScreenQuad extends Resource {
    /** @internal */
    static SCREENQUAD_POSITION_UV: number;
    /** @internal */
    private static _vertexDeclaration;
    /** @internal */
    private static _vertices;
    /** @internal */
    private static _verticesInvertUV;
    /**@internal */
    static instance: ScreenQuad;
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
     * 创建一个 <code>ScreenQuad</code> 实例,禁止使用。
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
