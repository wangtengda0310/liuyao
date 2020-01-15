import { HtmlVideo } from "./HtmlVideo";
/**
 * @internal
 */
export declare class WebGLVideo extends HtmlVideo {
    private gl;
    private static curBindSource;
    constructor();
    updateTexture(): void;
    readonly _glTexture: any;
    /**
     * @override
     */
    destroy(): void;
}
