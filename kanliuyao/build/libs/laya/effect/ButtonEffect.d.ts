import { Sprite } from "../display/Sprite";
/**
 * @Script {name:ButtonEffect}
 * @author ww
 */
export declare class ButtonEffect {
    private _tar;
    private _curState;
    private _curTween;
    /**
     * effectScale
     * @prop {name:effectScale,type:number, tips:"缩放值",default:"1.5"}
     */
    effectScale: number;
    /**
     * tweenTime
     * @prop {name:tweenTime,type:number, tips:"缓动时长",default:"300"}
     */
    tweenTime: number;
    /**
     * effectEase
     * @prop {name:effectEase,type:ease, tips:"效果缓动类型"}
     */
    effectEase: string;
    /**
     * backEase
     * @prop {name:backEase,type:ease, tips:"恢复缓动类型"}
     */
    backEase: string;
    /**
     * 设置控制对象
     * @param tar
     */
    target: Sprite;
    private toChangedState;
    private toInitState;
    private tweenComplete;
}
