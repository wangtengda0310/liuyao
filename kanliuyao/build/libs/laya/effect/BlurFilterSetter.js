import { FilterSetterBase } from "././FilterSetterBase";
import { BlurFilter } from "../filters/BlurFilter";
/**
 * ...
 * @author ww
 */
export class BlurFilterSetter extends FilterSetterBase {
    constructor() {
        super();
        this._strength = 4;
        this._filter = new BlurFilter(this.strength);
    }
    /**
     * @override
     */
    buildFilter() {
        this._filter = new BlurFilter(this.strength);
        super.buildFilter();
    }
    get strength() {
        return this._strength;
    }
    set strength(value) {
        this._strength = value;
    }
}
