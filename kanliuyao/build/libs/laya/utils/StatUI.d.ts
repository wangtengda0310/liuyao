import { IStatRender } from "./IStatRender";
import { Sprite } from "../display/Sprite";
/**
 * 显示Stat的结果。由于stat会引入很多的循环引用，所以把显示部分拆开
 * @author laya
 */
export declare class StatUI extends IStatRender {
    private static _fontSize;
    private _txt;
    private _leftText;
    /**@internal */
    _sp: Sprite;
    /**@internal */
    _titleSp: Sprite;
    /**@internal */
    _bgSp: Sprite;
    /**@internal */
    _show: boolean;
    /**@internal */
    _useCanvas: boolean;
    private _canvas;
    private _ctx;
    private _first;
    private _vx;
    private _width;
    private _height;
    private _view;
    /**
     * @override
     * 显示性能统计信息。
     * @param	x X轴显示位置。
     * @param	y Y轴显示位置。
     */
    show(x?: number, y?: number): void;
    private createUIPre;
    private createUI;
    /**
     * @override
     * 激活性能统计
     * */
    enable(): void;
    /**
     * @override
     * 隐藏性能统计信息。
     */
    hide(): void;
    /**
     * @override
     * 点击性能统计显示区域的处理函数。
     */
    set_onclick(fn: (this: GlobalEventHandlers, ev: MouseEvent) => any): void;
    /**
     * @private
     * 性能统计参数计算循环处理函数。
     */
    loop(): void;
    private renderInfoPre;
    private renderInfo;
    /**
     * @override
     */
    isCanvasRender(): boolean;
    /**
     * @override
     * 非canvas模式的渲染
     * */
    renderNotCanvas(ctx: any, x: number, y: number): void;
}
