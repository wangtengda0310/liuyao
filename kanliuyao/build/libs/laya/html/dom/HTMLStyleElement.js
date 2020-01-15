import { HTMLElement } from "./HTMLElement";
import { HTMLStyle } from "../utils/HTMLStyle";
import { ILaya } from "../../../ILaya";
import { ClassUtils } from "../../utils/ClassUtils";
/**
 * @private
 */
export class HTMLStyleElement extends HTMLElement {
    /**
     * @override
     */
    _creates() {
    }
    /**
     *
     * @param graphic
     * @param gX
     * @param gY
     * @param recList
     * @override
     */
    drawToGraphic(graphic, gX, gY, recList) {
    }
    //TODO:coverage
    /**
     * @override
     */
    reset() {
        return this;
    }
    /**
     * 解析样式
     * @override
     */
    set innerTEXT(value) {
        HTMLStyle.parseCSS(value, null);
    }
    get innerTEXT() {
        return super.innerTEXT;
    }
}
ILaya.regClass(HTMLStyleElement);
ClassUtils.regClass("laya.html.dom.HTMLStyleElement", HTMLStyleElement);
ClassUtils.regClass("Laya.HTMLStyleElement", HTMLStyleElement);
