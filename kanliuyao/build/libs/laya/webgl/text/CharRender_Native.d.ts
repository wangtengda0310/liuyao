import { CharRenderInfo } from "./CharRenderInfo";
import { ICharRender } from "./ICharRender";
export declare class CharRender_Native extends ICharRender {
    private lastFont;
    private lastScaleX;
    private lastScaleY;
    constructor();
    /**
     *
     * @param font
     * @param str
     * @override
     */
    getWidth(font: string, str: string): number;
    /**
     *
     * @param sx
     * @param sy
     * @override
     */
    scale(sx: number, sy: number): void;
    /**
     *TODO stroke
     * @param	char
     * @param	font
     * @param	size  返回宽高
     * @return
     * @override
     */
    getCharBmp(char: string, font: string, lineWidth: number, colStr: string, strokeColStr: string, size: CharRenderInfo, margin_left: number, margin_top: number, margin_right: number, margin_bottom: number, rect?: any[] | null): ImageData | null;
}
