import { Bitmap } from "../../resource/Bitmap";
/**
 * @internal
 */
export declare class HtmlVideo extends Bitmap {
    protected video: HTMLVideoElement;
    protected _source: any;
    protected _w: number;
    protected _h: number;
    constructor();
    static create: Function;
    private createDomElement;
    setSource(url: string, extension: number): void;
    private appendSource;
    getVideo(): any;
    /**
     * @internal
     * @override
     */
    _getSource(): any;
    /**
     * @override
     */
    destroy(): void;
}
