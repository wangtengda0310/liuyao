import { Sprite } from "../display/Sprite";
import { Context } from "../resource/Context";
import { RenderTexture2D } from "../resource/RenderTexture2D";
/**
 * @private
 * 精灵渲染器
 */
export declare class RenderSprite {
    /** @private */
    /** @private */
    /** @private */
    /** @private */
    /** @private */
    /** @private */
    /** @private */
    /** @private */
    /** @private */
    /** @private */
    /** @private */
    /** @private */
    /** @private */
    static INIT: number;
    /** @private */
    static renders: any[];
    /** @private */
    protected static NORENDER: RenderSprite;
    /** @internal */
    _next: RenderSprite;
    /** @internal */
    _fun: Function;
    /** @internal */
    static __init__(): void;
    private static _initRenderFun;
    private static _getTypeRender;
    constructor(type: number, next: RenderSprite);
    protected onCreate(type: number): void;
    /**@internal */
    _style(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _no(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _custom(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _clip(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _texture(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _graphics(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _image(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _image2(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _alpha(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _transform(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _children(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _canvas(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _canvas_repaint(sprite: Sprite, context: Context, x: number, y: number): void;
    /**@internal */
    _canvas_webgl_normal_repaint(sprite: Sprite, context: Context): void;
    /**@internal */
    _blend(sprite: Sprite, context: Context, x: number, y: number): void;
    /**
     * @internal
     * mask的渲染。 sprite有mask属性的情况下，来渲染这个sprite
     * @param	sprite
     * @param	context
     * @param	x
     * @param	y
     */
    _mask(sprite: Sprite, context: Context, x: number, y: number): void;
    static tempUV: any[];
    static tmpTarget(ctx: Context, rt: RenderTexture2D, w: number, h: number): void;
    static recycleTarget(rt: RenderTexture2D): void;
    static setBlendMode(blendMode: string): void;
}
