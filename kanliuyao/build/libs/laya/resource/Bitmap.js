import { Resource } from "./Resource";
/**
     * @private
     * <code>Bitmap</code> 图片资源类。
     */
export class Bitmap extends Resource {
    /**
     * 创建一个 <code>Bitmap</code> 实例。
     */
    constructor() {
        super();
        this._width = -1;
        this._height = -1;
    }
    /**
     * 获取宽度。
     */
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
    }
    /***
     * 获取高度。
     */
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }
    /**
     * @internal
     * 获取纹理资源。
     */
    //TODO:coverage
    _getSource() {
        throw "Bitmap: must override it.";
    }
}
