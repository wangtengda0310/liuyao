import { FilterSetterBase } from "./FilterSetterBase";
import { ColorFilter } from "../filters/ColorFilter";
import { ColorUtils } from "../utils/ColorUtils";
/**
 * ...
 * @author ww
 */
export class ColorFilterSetter extends FilterSetterBase {
    constructor() {
        super();
        /**
         * brightness 亮度,范围:-100~100
         */
        this._brightness = 0;
        /**
         * contrast 对比度,范围:-100~100
         */
        this._contrast = 0;
        /**
         * saturation 饱和度,范围:-100~100
         */
        this._saturation = 0;
        /**
         * hue 色调,范围:-180~180
         */
        this._hue = 0;
        /**
         * red red增量,范围:0~255
         */
        this._red = 0;
        /**
         * green green增量,范围:0~255
         */
        this._green = 0;
        /**
         * blue blue增量,范围:0~255
         */
        this._blue = 0;
        /**
         * alpha alpha增量,范围:0~255
         */
        this._alpha = 0;
        this._filter = new ColorFilter();
    }
    /**
     * @override
     */
    buildFilter() {
        this._filter.reset();
        //_filter = new ColorFilter();
        this._filter.color(this.red, this.green, this.blue, this.alpha);
        this._filter.adjustHue(this.hue);
        this._filter.adjustContrast(this.contrast);
        this._filter.adjustBrightness(this.brightness);
        this._filter.adjustSaturation(this.saturation);
        super.buildFilter();
    }
    get brightness() {
        return this._brightness;
    }
    set brightness(value) {
        this._brightness = value;
        this.paramChanged();
    }
    get contrast() {
        return this._contrast;
    }
    set contrast(value) {
        this._contrast = value;
        this.paramChanged();
    }
    get saturation() {
        return this._saturation;
    }
    set saturation(value) {
        this._saturation = value;
        this.paramChanged();
    }
    get hue() {
        return this._hue;
    }
    set hue(value) {
        this._hue = value;
        this.paramChanged();
    }
    get red() {
        return this._red;
    }
    set red(value) {
        this._red = value;
        this.paramChanged();
    }
    get green() {
        return this._green;
    }
    set green(value) {
        this._green = value;
        this.paramChanged();
    }
    get blue() {
        return this._blue;
    }
    set blue(value) {
        this._blue = value;
        this.paramChanged();
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        var colorO;
        colorO = ColorUtils.create(value);
        this._red = colorO.arrColor[0] * 255;
        this._green = colorO.arrColor[1] * 255;
        this._blue = colorO.arrColor[2] * 255;
        this.paramChanged();
    }
    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        this._alpha = value;
        this.paramChanged();
    }
}
