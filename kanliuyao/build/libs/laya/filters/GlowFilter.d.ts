import { Filter } from "./Filter";
/**
 *  发光滤镜(也可以当成阴影滤使用）
 */
export declare class GlowFilter extends Filter {
    /**数据的存储，顺序R,G,B,A,blurWidth,offX,offY;*/
    private _elements;
    /**@internal */
    _sv_blurInfo1: any[];
    /**@internal */
    _sv_blurInfo2: any[];
    /**滤镜的颜色*/
    private _color;
    /**@internal */
    _color_native: Float32Array;
    /**@internal */
    _blurInof1_native: Float32Array;
    /**@internal */
    _blurInof2_native: Float32Array;
    /**
     * 创建发光滤镜
     * @param	color	滤镜的颜色
     * @param	blur	边缘模糊的大小
     * @param	offX	X轴方向的偏移
     * @param	offY	Y轴方向的偏移
     */
    constructor(color: string, blur?: number, offX?: number, offY?: number);
    /**
     * @private
     * 滤镜类型
     * @override
     */
    readonly type: number;
    /**@private */
    /**@private */
    offY: number;
    /**@private */
    /**@private */
    offX: number;
    /**@private */
    getColor(): any[];
    /**@private */
    /**@private */
    blur: number;
    getColorNative(): Float32Array;
    getBlurInfo1Native(): Float32Array;
    getBlurInfo2Native(): Float32Array;
}
