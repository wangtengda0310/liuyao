import { Handler } from "../utils/Handler";
import { Sprite } from "../display/Sprite";
import { Tween } from "../utils/Tween";
import { Component } from "../components/Component";
/**
 * 效果插件基类，基于对象池管理
 */
export declare class EffectBase extends Component {
    /**动画持续时间，单位为毫秒*/
    duration: number;
    /**动画延迟时间，单位为毫秒*/
    delay: number;
    /**重复次数，默认为播放一次*/
    repeat: number;
    /**缓动类型，如果为空，则默认为匀速播放*/
    ease: string;
    /**触发事件，如果为空，则创建时触发*/
    eventName: string;
    /**效用作用的目标对象，如果为空，则是脚本所在的节点本身*/
    target: Sprite;
    /**效果结束后，是否自动移除节点*/
    autoDestroyAtComplete: boolean;
    protected _comlete: Handler;
    protected _tween: Tween;
    /**
     * @internal
     * @override
     */
    protected _onAwake(): void;
    protected _exeTween(): void;
    protected _doTween(): Tween;
    /**
     * @override
     */
    onReset(): void;
}
