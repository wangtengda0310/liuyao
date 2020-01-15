import { AnimatorState } from "./AnimatorState";
/**
 * <code>AnimatorPlayState</code> 类用于创建动画播放状态信息。
 */
export declare class AnimatorPlayState {
    /**@internal */
    _finish: boolean;
    /**@internal */
    _startPlayTime: number;
    /**@internal */
    _lastElapsedTime: number;
    /**@internal */
    _elapsedTime: number;
    /**@internal */
    _normalizedTime: number;
    /**@internal */
    _normalizedPlayTime: number;
    /**@internal */
    _duration: number;
    /**@internal */
    _playEventIndex: number;
    /**@internal */
    _lastIsFront: boolean;
    /**@internal */
    _currentState: AnimatorState;
    /**
     * 获取播放状态的归一化时间,整数为循环次数，小数为单次播放时间。
     */
    readonly normalizedTime: number;
    /**
     * 获取当前动画的持续时间，以秒为单位。
     */
    readonly duration: number;
    /**
     * 动画状态机。
     */
    readonly animatorState: AnimatorState;
    /**
     * 创建一个 <code>AnimatorPlayState</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    _resetPlayState(startTime: number): void;
    /**
     * @internal
     */
    _cloneTo(dest: AnimatorPlayState): void;
}
