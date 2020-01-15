/**
 * @private
 */
export declare class WebGLContext {
    /**@internal */
    private static _activeTextures;
    /**@internal */
    private static _useProgram;
    /**@internal */
    private static _depthTest;
    /**@internal */
    private static _depthMask;
    /**@internal */
    private static _depthFunc;
    /**@internal */
    private static _blend;
    /**@internal */
    private static _blendEquation;
    /**@internal */
    private static _blendEquationRGB;
    /**@internal */
    private static _blendEquationAlpha;
    /**@internal */
    private static _sFactor;
    /**@internal */
    private static _dFactor;
    /**@internal */
    private static _sFactorRGB;
    /**@internal */
    private static _dFactorRGB;
    /**@internal */
    private static _sFactorAlpha;
    /**@internal */
    private static _dFactorAlpha;
    /**@internal */
    private static _cullFace;
    /**@internal */
    private static _frontFace;
    /**@internal */
    private static _activedTextureID;
    /**@internal */
    static _glTextureIDs: any[];
    /**@internal */
    static mainContext: WebGLRenderingContext;
    /**
     * @internal
     */
    static __init__(): void;
    /**
     * @internal
     */
    static useProgram(gl: WebGLRenderingContext, program: any): boolean;
    /**
     * @internal
     */
    static setDepthTest(gl: WebGLRenderingContext, value: boolean): void;
    /**
     * @internal
     */
    static setDepthMask(gl: WebGLRenderingContext, value: boolean): void;
    /**
     * @internal
     */
    static setDepthFunc(gl: WebGLRenderingContext, value: number): void;
    /**
     * @internal
     */
    static setBlend(gl: WebGLRenderingContext, value: boolean): void;
    /**
     * @internal
     */
    static setBlendEquation(gl: WebGLRenderingContext, blendEquation: number): void;
    /**
     * @internal
     */
    static setBlendEquationSeparate(gl: WebGLRenderingContext, blendEquationRGB: number, blendEquationAlpha: number): void;
    /**
     * @internal
     */
    static setBlendFunc(gl: WebGLRenderingContext, sFactor: number, dFactor: number): void;
    /**
     * @internal
     */
    static setBlendFuncSeperate(gl: WebGLRenderingContext, srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void;
    /**
     * @internal
     */
    static setCullFace(gl: WebGLRenderingContext, value: boolean): void;
    /**
     * @internal
     */
    static setFrontFace(gl: WebGLRenderingContext, value: number): void;
    /**
     * @internal
     */
    static activeTexture(gl: WebGLRenderingContext, textureID: number): void;
    /**
     * @internal
     */
    static bindTexture(gl: WebGLRenderingContext, target: any, texture: any): void;
    /**
     * @internal
     */
    static __init_native(): void;
    /**
     * @internal
     */
    static useProgramForNative(gl: WebGLRenderingContext, program: any): boolean;
    /**
     * @internal
     */
    static setDepthTestForNative(gl: WebGLRenderingContext, value: boolean): void;
    /**
     * @internal
     */
    static setDepthMaskForNative(gl: WebGLRenderingContext, value: boolean): void;
    /**
     * @internal
     */
    static setDepthFuncForNative(gl: WebGLRenderingContext, value: number): void;
    /**
     * @internal
     */
    static setBlendForNative(gl: WebGLRenderingContext, value: boolean): void;
    /**
     * @internal
     */
    static setBlendFuncForNative(gl: WebGLRenderingContext, sFactor: number, dFactor: number): void;
    /**
     * @internal
     */
    static setCullFaceForNative(gl: WebGLRenderingContext, value: boolean): void;
    /**
     * @internal
     */
    static setFrontFaceForNative(gl: WebGLRenderingContext, value: number): void;
    /**
     * @internal
     */
    static activeTextureForNative(gl: WebGLRenderingContext, textureID: number): void;
    /**
     * @internal
     */
    static bindTextureForNative(gl: WebGLRenderingContext, target: any, texture: any): void;
    /**
     * @internal
     */
    static bindVertexArrayForNative(gl: WebGLContext, vertexArray: any): void;
}
