/**
 * @internal
 */
export declare class LayaGPU {
    /**@internal */
    private static _extentionVendorPrefixes;
    /**
     * @internal
     */
    static _forceSupportVAOPlatform(): boolean;
    /**@internal */
    private _gl;
    /**@internal */
    private _vaoExt;
    /**@internal */
    private _angleInstancedArrays;
    /**@internal */
    _isWebGL2: boolean;
    /**@internal */
    _oesTextureHalfFloat: any;
    /**@internal */
    _oes_element_index_uint: any;
    /**@internal */
    _oesTextureHalfFloatLinear: any;
    /**@internal */
    _oesTextureFloat: any;
    /**@internal */
    _extTextureFilterAnisotropic: any;
    /**@internal */
    _compressedTextureS3tc: any;
    /**@internal */
    _compressedTexturePvrtc: any;
    /**@internal */
    _compressedTextureEtc1: any;
    /**
     * @internal
     */
    constructor(gl: any, isWebGL2: boolean);
    /**
     * @internal
     */
    private _getExtension;
    /**
     * @internal
     */
    createVertexArray(): any;
    /**
     * @internal
     */
    bindVertexArray(vertexArray: any): void;
    /**
     * @internal
     */
    deleteVertexArray(vertexArray: any): void;
    /**
     * @internal
     */
    isVertexArray(vertexArray: any): void;
    /**
     * @internal
     */
    drawElementsInstanced(mode: number, count: number, type: number, offset: number, instanceCount: number): void;
    /**
     * @internal
     */
    drawArraysInstanced(mode: number, first: number, count: number, instanceCount: number): void;
    /**
     * @internal
     */
    vertexAttribDivisor(index: number, divisor: number): void;
    /**
     * @internal
     */
    supportInstance(): boolean;
    /**
    * @internal
    */
    supportElementIndexUint32(): boolean;
}
