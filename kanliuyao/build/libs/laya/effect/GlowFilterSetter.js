import { FilterSetterBase } from "././FilterSetterBase";
import { GlowFilter } from "../filters/GlowFilter";
/**
 * ...
 * @author ww
 */
export class GlowFilterSetter extends FilterSetterBase {
    constructor() {
        super();
        /**
         * 滤镜的颜色
         */
        this._color = "#ff0000";
        /**
         * 边缘模糊的大小 0~20
         */
        this._blur = 4;
        /**
         * X轴方向的偏移
         */
        this._offX = 6;
        /**
         * Y轴方向的偏移
         */
        this._offY = 6;
        this._filter = new GlowFilter(this._color);
    }
    /**
    * @override
     */
    buildFilter() {
        this._filter = new GlowFilter(this.color, this.blur, this.offX, this.offY);
        super.buildFilter();
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this.paramChanged();
    }
    get blur() {
        return this._blur;
    }
    set blur(value) {
        this._blur = value;
        this.paramChanged();
    }
    get offX() {
        return this._offX;
    }
    set offX(value) {
        this._offX = value;
        this.paramChanged();
    }
    get offY() {
        return this._offY;
    }
    set offY(value) {
        this._offY = value;
        this.paramChanged();
    }
}
