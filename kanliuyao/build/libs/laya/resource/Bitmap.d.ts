import { Resource } from "./Resource";
/**
     * @private
     * <code>Bitmap</code> 图片资源类。
     */
export declare class Bitmap extends Resource {
    /**@private */
    protected _width: number;
    /**@private */
    protected _height: number;
    /**
     * 获取宽度。
     */
    width: number;
    /***
     * 获取高度。
     */
    height: number;
    /**
     * 创建一个 <code>Bitmap</code> 实例。
     */
    constructor();
    /**
     * @internal
     * 获取纹理资源。
     */
    _getSource(): any;
}
