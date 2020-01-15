import { IClone } from "../core/IClone";
import { IReferenceCounter } from "../resource/IReferenceCounter";
import { Animator } from "./Animator";
import { AnimatorPlayState } from "./AnimatorPlayState";
import { AnimatorState } from "./AnimatorState";
import { KeyframeNodeOwner } from "./KeyframeNodeOwner";
/**
 * <code>AnimatorControllerLayer</code> 类用于创建动画控制器层。
 */
export declare class AnimatorControllerLayer implements IReferenceCounter, IClone {
    /**混合模式_覆盖。 */
    static BLENDINGMODE_OVERRIDE: number;
    /**混合模式_叠加。 */
    static BLENDINGMODE_ADDTIVE: number;
    /**@internal */
    private _defaultState;
    /**@internal */
    private _referenceCount;
    /**@internal 0:常规播放、1:动态融合播放、2:固定融合播放*/
    _playType: number;
    /**@internal */
    _crossDuration: number;
    /**@internal */
    _crossPlayState: AnimatorState;
    /**@internal */
    _crossMark: number;
    /**@internal */
    _crossNodesOwnersCount: number;
    /**@internal */
    _crossNodesOwners: KeyframeNodeOwner[];
    /**@internal */
    _crossNodesOwnersIndicesMap: any;
    /**@internal */
    _srcCrossClipNodeIndices: number[];
    /**@internal */
    _destCrossClipNodeIndices: number[];
    /**@internal */
    _animator: Animator;
    /**@internal */
    _statesMap: any;
    /**@internal */
    _states: AnimatorState[];
    /**@internal */
    _playStateInfo: AnimatorPlayState;
    /**@internal */
    _crossPlayStateInfo: AnimatorPlayState;
    /** 层的名称。*/
    name: string;
    /** 名称。*/
    blendingMode: number;
    /** 权重。*/
    defaultWeight: number;
    /**	激活时是否自动播放。*/
    playOnWake: boolean;
    /**
     * 默认动画状态机。
     */
    defaultState: AnimatorState;
    /**
     * 创建一个 <code>AnimatorControllerLayer</code> 实例。
     */
    constructor(name: string);
    /**
     * @internal
     */
    private _removeClip;
    /**
     * @implements IReferenceCounter
     */
    _getReferenceCount(): number;
    /**
     * @implements IReferenceCounter
     */
    _addReference(count?: number): void;
    /**
     * @implements IReferenceCounter
     */
    _removeReference(count?: number): void;
    /**
     * @implements IReferenceCounter
     */
    _clearReference(): void;
    /**
     * 获取当前的播放状态。
     * @return 动画播放状态。
     */
    getCurrentPlayState(): AnimatorPlayState;
    /**
     * 获取动画状态。
     * @return 动画状态。
     */
    getAnimatorState(name: string): AnimatorState;
    /**
     * 添加动画状态。
     * @param	state 动画状态。
     * @param   layerIndex 层索引。
     */
    addState(state: AnimatorState): void;
    /**
     * 移除动画状态。
     * @param	state 动画状态。
     * @param   layerIndex 层索引。
     */
    removeState(state: AnimatorState): void;
    /**
     * 销毁。
     */
    destroy(): void;
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject: any): void;
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone(): any;
}
