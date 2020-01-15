import { Rectangle } from "../../maths/Rectangle";
import { Pool } from "../../utils/Pool";
import { ClassUtils } from "../../utils/ClassUtils";
/**
 * @private
 */
export class HTMLHitRect {
    //TODO:coverage
    constructor() {
        this.rec = new Rectangle();
        this.reset();
    }
    reset() {
        this.rec.reset();
        this.href = null;
        return this;
    }
    recover() {
        Pool.recover("HTMLHitRect", this.reset());
    }
    static create() {
        return Pool.getItemByClass("HTMLHitRect", HTMLHitRect);
    }
}
ClassUtils.regClass("laya.html.dom.HTMLHitRect", HTMLHitRect);
ClassUtils.regClass("Laya.HTMLHitRect", HTMLHitRect);
