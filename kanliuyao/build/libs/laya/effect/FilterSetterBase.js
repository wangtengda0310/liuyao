import { Laya } from "../../Laya";
import { Utils } from "../utils/Utils";
/**
 * ...
 * @author ww
 */
export class FilterSetterBase {
    constructor() {
    }
    paramChanged() {
        Laya.systemTimer.callLater(this, this.buildFilter);
    }
    buildFilter() {
        if (this._target) {
            this.addFilter(this._target);
        }
    }
    addFilter(sprite) {
        if (!sprite)
            return;
        if (!sprite.filters) {
            sprite.filters = [this._filter];
        }
        else {
            var preFilters;
            preFilters = sprite.filters;
            if (preFilters.indexOf(this._filter) < 0) {
                preFilters.push(this._filter);
                sprite.filters = Utils.copyArray([], preFilters);
            }
        }
    }
    removeFilter(sprite) {
        if (!sprite)
            return;
        sprite.filters = null;
    }
    set target(value) {
        if (this._target != value) {
            //removeFilter(_target as Sprite);
            //addFilter(value as Sprite);
            this._target = value;
            this.paramChanged();
        }
    }
}
