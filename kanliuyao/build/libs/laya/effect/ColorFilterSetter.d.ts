import { FilterSetterBase } from "./FilterSetterBase";
/**
 * ...
 * @author ww
 */
export declare class ColorFilterSetter extends FilterSetterBase {
    /**
     * brightness 亮度,范围:-100~100
     */
    private _brightness;
    /**
     * contrast 对比度,范围:-100~100
     */
    private _contrast;
    /**
     * saturation 饱和度,范围:-100~100
     */
    private _saturation;
    /**
     * hue 色调,范围:-180~180
     */
    private _hue;
    /**
     * red red增量,范围:0~255
     */
    private _red;
    /**
     * green green增量,范围:0~255
     */
    private _green;
    /**
     * blue blue增量,范围:0~255
     */
    private _blue;
    /**
     * alpha alpha增量,范围:0~255
     */
    private _alpha;
    constructor();
    /**
     * @override
     */
    protected buildFilter(): void;
    brightness: number;
    contrast: number;
    saturation: number;
    hue: number;
    red: number;
    green: number;
    blue: number;
    private _color;
    color: string;
    alpha: number;
}
