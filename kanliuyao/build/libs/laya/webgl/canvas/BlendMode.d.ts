import { WebGLContext } from "../WebGLContext";
export declare class BlendMode {
    static activeBlendFunction: Function;
    static NAMES: any[];
    static TOINT: any;
    static NORMAL: string;
    static ADD: string;
    static MULTIPLY: string;
    static SCREEN: string;
    static OVERLAY: string;
    static LIGHT: string;
    static MASK: string;
    static DESTINATIONOUT: string;
    static LIGHTER: string;
    static fns: any[];
    static targetFns: any[];
    /**@internal */
    static _init_(gl: WebGLContext): void;
    static BlendNormal(gl: WebGLRenderingContext): void;
    static BlendAdd(gl: WebGLRenderingContext): void;
    static BlendMultiply(gl: WebGLRenderingContext): void;
    static BlendScreen(gl: WebGLRenderingContext): void;
    static BlendOverlay(gl: WebGLRenderingContext): void;
    static BlendLight(gl: WebGLRenderingContext): void;
    static BlendNormalTarget(gl: WebGLRenderingContext): void;
    static BlendAddTarget(gl: WebGLRenderingContext): void;
    static BlendMultiplyTarget(gl: WebGLRenderingContext): void;
    static BlendScreenTarget(gl: WebGLRenderingContext): void;
    static BlendOverlayTarget(gl: WebGLRenderingContext): void;
    static BlendLightTarget(gl: WebGLRenderingContext): void;
    static BlendMask(gl: WebGLRenderingContext): void;
    static BlendDestinationOut(gl: WebGLRenderingContext): void;
}
