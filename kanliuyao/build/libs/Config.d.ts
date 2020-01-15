/**
     *  Config 用于配置一些全局参数。如需更改，请在初始化引擎之前设置。
     */
export declare class Config {
    /**
     * 动画 Animation 的默认播放时间间隔，单位为毫秒。
     */
    static animationInterval: number;
    /**
     * 设置是否抗锯齿，只对2D(WebGL)、3D有效。
     */
    static isAntialias: boolean;
    /**
     * 设置画布是否透明，只对2D(WebGL)、3D有效。
     */
    static isAlpha: boolean;
    /**
     * 设置画布是否预乘，只对2D(WebGL)、3D有效。
     */
    static premultipliedAlpha: boolean;
    /**
     * 设置画布的是否开启模板缓冲，只对2D(WebGL)、3D有效。
     */
    static isStencil: boolean;
    /**
     * 是否保留渲染缓冲区。
     */
    static preserveDrawingBuffer: boolean;
    /**
     * 当使用webGL渲染2d的时候，每次创建vb是否直接分配足够64k个顶点的缓存。这样可以提高效率。
     */
    static webGL2D_MeshAllocMaxMem: boolean;
    /**
     * 是否强制使用像素采样。适用于像素风格游戏
     */
    static is2DPixelArtGame: boolean;
    /**
     * 是否使用webgl2
     */
    static useWebGL2: boolean;
    static useRetinalCanvas: boolean;
}