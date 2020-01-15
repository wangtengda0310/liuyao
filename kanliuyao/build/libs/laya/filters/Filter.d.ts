import { IFilter } from "./IFilter";
import { Sprite } from "../display/Sprite";
import { Context } from "../resource/Context";
/**
 * <code>Filter</code> 是滤镜基类。
 */
export declare class Filter implements IFilter {
    /**@private 模糊滤镜。*/
    static BLUR: number;
    /**@private 颜色滤镜。*/
    static COLOR: number;
    /**@private 发光滤镜。*/
    static GLOW: number;
    /** @internal*/
    _glRender: any;
    /**
     * 创建一个 <code>Filter</code> 实例。
     * */
    constructor();
    /**@private 滤镜类型。*/
    readonly type: number;
    static _filter: (sprite: Sprite, context: Context, x: number, y: number) => void;
}
