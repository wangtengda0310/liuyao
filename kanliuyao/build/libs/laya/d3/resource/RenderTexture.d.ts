import { BaseTexture } from "../../resource/BaseTexture";
import { RenderTextureDepthFormat, RenderTextureFormat } from "../../resource/RenderTextureFormat";
/**
 * <code>RenderTexture</code> 类用于创建渲染目标。
 */
export declare class RenderTexture extends BaseTexture {
    /** @internal */
    private static _pool;
    /** @internal */
    private static _currentActive;
    /**
     * 获取当前激活的Rendertexture。
     */
    static readonly currentActive: RenderTexture;
    /**
     *从对象池获取临时渲染目标。
     */
    static createFromPool(width: number, height: number, format?: number, depthStencilFormat?: number, filterMode?: number): RenderTexture;
    /**
     * 回收渲染目标到对象池,释放后可通过createFromPool复用。
     */
    static recoverToPool(renderTexture: RenderTexture): void;
    /** @internal */
    private _frameBuffer;
    /** @internal */
    private _depthStencilBuffer;
    /** @internal */
    private _depthStencilFormat;
    /** @internal */
    private _inPool;
    /** @internal */
    _isCameraTarget: boolean;
    /**
     * 深度格式。
     */
    readonly depthStencilFormat: number;
    /**
     * @override
     */
    readonly defaulteTexture: BaseTexture;
    /**
     * @param width  宽度。
     * @param height 高度。
     * @param format 纹理格式。
     * @param depthStencilFormat 深度格式。
     * 创建一个 <code>RenderTexture</code> 实例。
     */
    constructor(width: number, height: number, format?: RenderTextureFormat, depthStencilFormat?: RenderTextureDepthFormat);
    /**
     * @internal
     */
    private _texImage2D;
    /**
     * @internal
     */
    private _create;
    /**
     * @internal
     */
    _start(): void;
    /**
     * @internal
     */
    _end(): void;
    /**
     * 获得像素数据。
     * @param x X像素坐标。
     * @param y Y像素坐标。
     * @param width 宽度。
     * @param height 高度。
     * @return 像素数据。
     */
    getData(x: number, y: number, width: number, height: number, out: Uint8Array): Uint8Array;
    /**
     * @internal
     * native多线程
     */
    getDataAsync(x: number, y: number, width: number, height: number, callBack: Function): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _disposeResource(): void;
}
