import { HTMLElement } from "./HTMLElement";
import { Graphics } from "../../display/Graphics";
/**
 * @private
 */
export declare class HTMLLinkElement extends HTMLElement {
    static _cuttingStyle: RegExp;
    type: string;
    private _loader;
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
    /**@internal */
    _onload(data: string): void;
    /**
     * @override
     */
    href: string;
}
