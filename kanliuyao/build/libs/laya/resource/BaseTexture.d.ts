import { Bitmap } from "./Bitmap";
/**
 * <code>BaseTexture</code> 纹理的父类，抽象类，不允许实例。
 */
export declare class BaseTexture extends Bitmap {
    static WARPMODE_REPEAT: number;
    static WARPMODE_CLAMP: number;
    /**寻址模式_重复。*/
    static FILTERMODE_POINT: number;
    /**寻址模式_不循环。*/
    static FILTERMODE_BILINEAR: number;
    /**寻址模式_不循环。*/
    static FILTERMODE_TRILINEAR: number;
    /** @internal */
    protected _readyed: boolean;
    /** @internal */
    protected _glTextureType: number;
    /** @internal */
    protected _glTexture: any;
    /** @internal */
    protected _format: number;
    /** @internal */
    protected _mipmap: boolean;
    /** @internal */
    protected _wrapModeU: number;
    /** @internal */
    protected _wrapModeV: number;
    /** @internal */
    protected _filterMode: number;
    /** @internal */
    protected _anisoLevel: number;
    /** @internal */
    protected _mipmapCount: number;
    /**
     * 是否使用mipLevel
     */
    readonly mipmap: boolean;
    /**
     * 纹理格式
     */
    readonly format: number;
    /**
     * 纹理横向循环模式。
     */
    wrapModeU: number;
    /**
     * 纹理纵向循环模式。
     */
    wrapModeV: number;
    /**
     * 缩小过滤器
     */
    filterMode: number;
    /**
     * 各向异性等级
     */
    anisoLevel: number;
    /**
     * 获取mipmap数量。
     */
    readonly mipmapCount: number;
    readonly defaulteTexture: BaseTexture;
    /**
     * 创建一个 <code>BaseTexture</code> 实例。
     */
    constructor(format: number, mipMap: boolean);
    /**
     * @internal
     */
    protected _getFormatByteCount(): number;
    /**
     * @internal
     */
    protected _isPot(size: number): boolean;
    /**
     * @internal
     */
    protected _getGLFormat(): number;
    /**
     * @internal
     */
    protected _setFilterMode(value: number): void;
    /**
     * @internal
     */
    protected _setWarpMode(orientation: number, mode: number): void;
    /**
     * @internal
     */
    protected _setAnisotropy(value: number): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _disposeResource(): void;
    /**
     * @internal
     * 获取纹理资源。
     * @override
     */
    _getSource(): any;
    /**
     * 通过基础数据生成mipMap。
     */
    generateMipmap(): void;
    /** @deprecated use TextureFormat.FORMAT_R8G8B8 instead.*/
    static FORMAT_R8G8B8: number;
    /** @deprecated use TextureFormat.FORMAT_R8G8B8A8 instead.*/
    static FORMAT_R8G8B8A8: number;
    /** @deprecated use TextureFormat.FORMAT_ALPHA8 instead.*/
    static FORMAT_ALPHA8: number;
    /** @deprecated use TextureFormat.FORMAT_DXT1 instead.*/
    static FORMAT_DXT1: number;
    /** @deprecated use TextureFormat.FORMAT_DXT5 instead.*/
    static FORMAT_DXT5: number;
    /** @deprecated use TextureFormat.FORMAT_ETC1RGB instead.*/
    static FORMAT_ETC1RGB: number;
    /** @deprecated use TextureFormat.FORMAT_PVRTCRGB_2BPPV instead.*/
    static FORMAT_PVRTCRGB_2BPPV: number;
    /** @deprecated use TextureFormat.FORMAT_PVRTCRGBA_2BPPV instead.*/
    static FORMAT_PVRTCRGBA_2BPPV: number;
    /** @deprecated use TextureFormat.FORMAT_PVRTCRGB_4BPPV instead.*/
    static FORMAT_PVRTCRGB_4BPPV: number;
    /** @deprecated use TextureFormat.FORMAT_PVRTCRGBA_4BPPV instead.*/
    static FORMAT_PVRTCRGBA_4BPPV: number;
    /** @deprecated use RenderTextureFormat.R16G16B16A16 instead.*/
    static RENDERTEXTURE_FORMAT_RGBA_HALF_FLOAT: number;
    /** @deprecated use TextureFormat.R32G32B32A32 instead.*/
    static FORMAT_R32G32B32A32: number;
    /** @deprecated use RenderTextureDepthFormat.DEPTH_16 instead.*/
    static FORMAT_DEPTH_16: number;
    /** @deprecated use RenderTextureDepthFormat.STENCIL_8 instead.*/
    static FORMAT_STENCIL_8: number;
    /** @deprecated use RenderTextureDepthFormat.DEPTHSTENCIL_16_8 instead.*/
    static FORMAT_DEPTHSTENCIL_16_8: number;
    /** @deprecated use RenderTextureDepthFormat.DEPTHSTENCIL_NONE instead.*/
    static FORMAT_DEPTHSTENCIL_NONE: number;
}
