import { HTMLElement } from "./HTMLElement";
import { Graphics } from "../../display/Graphics";
/**
 * @private
 */
export declare class HTMLStyleElement extends HTMLElement {
    /**
     * @override
     */
    protected _creates(): void;
    /**
     *
     * @param graphic
     * @param gX
     * @param gY
     * @param recList
     * @override
     */
    drawToGraphic(graphic: Graphics, gX: number, gY: number, recList: any[]): void;
    /**
     * @override
     */
    reset(): HTMLElement;
    /**
     * 解析样式
     * @override
     */
    innerTEXT: string;
}
