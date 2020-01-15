import { HTMLElement } from "./HTMLElement";
import { Graphics } from "../../display/Graphics";
import { ILayout } from "../utils/ILayout";
/**
 * @private
 */
export declare class HTMLImageElement extends HTMLElement {
    private _tex;
    private _url;
    constructor();
    /**
     * @override
     */
    reset(): HTMLElement;
    src: string;
    private onloaded;
    /**@internal
     * @override
    */
    _addToLayout(out: ILayout[]): void;
    /**
     *
     * @param graphic
     * @param gX
     * @param gY
     * @param recList
     * @override
     */
    renderSelfToGraphic(graphic: Graphics, gX: number, gY: number, recList: any[]): void;
}
