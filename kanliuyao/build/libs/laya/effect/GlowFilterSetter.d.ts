import { FilterSetterBase } from "././FilterSetterBase";
/**
 * ...
 * @author ww
 */
export declare class GlowFilterSetter extends FilterSetterBase {
    /**
     * 滤镜的颜色
     */
    private _color;
    /**
     * 边缘模糊的大小 0~20
     */
    private _blur;
    /**
     * X轴方向的偏移
     */
    private _offX;
    /**
     * Y轴方向的偏移
     */
    private _offY;
    constructor();
    /**
    * @override
     */
    protected buildFilter(): void;
    color: string;
    blur: number;
    offX: number;
    offY: number;
}
