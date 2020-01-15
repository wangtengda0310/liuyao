import { Component } from "../../components/Component";
import { KeyframeNode } from "../animation/KeyframeNode";
import { Avatar } from "../core/Avatar";
import { RenderableSprite3D } from "../core/RenderableSprite3D";
import { Scene3D } from "../core/scene/Scene3D";
import { Sprite3D } from "../core/Sprite3D";
import { AnimatorControllerLayer } from "./AnimatorControllerLayer";
import { AnimatorPlayState } from "./AnimatorPlayState";
import { AnimatorState } from "./AnimatorState";
import { KeyframeNodeOwner } from "./KeyframeNodeOwner";
/**
 * <code>Animator</code> 类用于创建动画组件。
 */
export declare class Animator extends Component {
    /**@internal */
    private static _tempVector30;
    /**@internal */
    private static _tempVector31;
    /**@internal */
    private static _tempQuaternion0;
    /**@internal */
    private static _tempQuaternion1;
    /** 裁剪模式_始终播放动画。*/
    static CULLINGMODE_ALWAYSANIMATE: number;
    /** 裁剪模式_不可见时完全不播放动画。*/
    static CULLINGMODE_CULLCOMPLETELY: number;
    /**
     * @internal
     */
    static _update(scene: Scene3D): void;
    /**@internal */
    private _speed;
    /**@internal */
    private _keyframeNodeOwnerMap;
    /**@internal */
    private _keyframeNodeOwners;
    /**@internal */
    private _updateMark;
    /**@internal */
    private _controllerLayers;
    /**@internal */
    _linkSprites: any;
    /**@internal	*/
    _avatarNodeMap: any;
    /**@internal */
    _linkAvatarSpritesData: any;
    /**@internal */
    _linkAvatarSprites: Sprite3D[];
    /**@internal */
    _renderableSprites: RenderableSprite3D[];
    /**	裁剪模式*/
    cullingMode: number;
    /**@internal	[NATIVE]*/
    _animationNodeLocalPositions: Float32Array;
    /**@internal	[NATIVE]*/
    _animationNodeLocalRotations: Float32Array;
    /**@internal	[NATIVE]*/
    _animationNodeLocalScales: Float32Array;
    /**@internal	[NATIVE]*/
    _animationNodeWorldMatrixs: Float32Array;
    /**@internal	[NATIVE]*/
    _animationNodeParentIndices: Int16Array;
    /**
     * 获取动画的播放速度,1.0为正常播放速度。
     * @return 动画的播放速度。
     */
    /**
    * 设置动画的播放速度,1.0为正常播放速度。
    * @param 动画的播放速度。
    */
    speed: number;
    /**
     * 创建一个 <code>Animation</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    private _linkToSprites;
    /**
     * @internal
     */
    private _addKeyframeNodeOwner;
    /**
     * @internal
     */
    _removeKeyframeNodeOwner(nodeOwners: KeyframeNodeOwner[], node: KeyframeNode): void;
    /**
     * @internal
     */
    _getOwnersByClip(clipStateInfo: AnimatorState): void;
    /**
     * @internal
     */
    private _updatePlayer;
    /**
     * @internal
     */
    private _eventScript;
    /**
     * @internal
     */
    private _updateEventScript;
    /**
     * @internal
     */
    private _updateClipDatas;
    /**
     * @internal
     */
    private _applyFloat;
    /**
     * @internal
     */
    private _applyPositionAndRotationEuler;
    /**
     * @internal
     */
    private _applyRotation;
    /**
     * @internal
     */
    private _applyScale;
    /**
     * @internal
     */
    private _applyCrossData;
    /**
     * @internal
     */
    private _setClipDatasToNode;
    /**
     * @internal
     */
    private _setCrossClipDatasToNode;
    /**
     * @internal
     */
    private _setFixedCrossClipDatasToNode;
    /**
     * @internal
     */
    private _revertDefaultKeyframeNodes;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _onAdded(): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    protected _onDestroy(): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    protected _onEnable(): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    protected _onDisable(): void;
    /**
     * @internal
     */
    _handleSpriteOwnersBySprite(isLink: boolean, path: string[], sprite: Sprite3D): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _parse(data: any): void;
    /**
     * @internal
     */
    _update(): void;
    /**
     * @internal
     * @override
     */
    _cloneTo(dest: Component): void;
    /**
     * 获取默认动画状态。
     * @param	layerIndex 层索引。
     * @return 默认动画状态。
     */
    getDefaultState(layerIndex?: number): AnimatorState;
    /**
     * 添加动画状态。
     * @param	state 动画状态。
     * @param   layerIndex 层索引。
     */
    addState(state: AnimatorState, layerIndex?: number): void;
    /**
     * 移除动画状态。
     * @param	state 动画状态。
     * @param   layerIndex 层索引。
     */
    removeState(state: AnimatorState, layerIndex?: number): void;
    /**
     * 添加控制器层。
     */
    addControllerLayer(controllderLayer: AnimatorControllerLayer): void;
    /**
     * 获取控制器层。
     */
    getControllerLayer(layerInex?: number): AnimatorControllerLayer;
    /**
     * 播放动画。
     * @param	name 如果为null则播放默认动画，否则按名字播放动画片段。
     * @param	layerIndex 层索引。
     * @param	normalizedTime 归一化的播放起始时间。
     */
    play(name?: string, layerIndex?: number, normalizedTime?: number): void;
    /**
     * 在当前动画状态和目标动画状态之间进行融合过渡播放。
     * @param	name 目标动画状态。
     * @param	transitionDuration 过渡时间,该值为当前动画状态的归一化时间，值在0.0~1.0之间。
     * @param	layerIndex 层索引。
     * @param	normalizedTime 归一化的播放起始时间。
     */
    crossFade(name: string, transitionDuration: number, layerIndex?: number, normalizedTime?: number): void;
    private _avatar;
    /**
     * 获取avatar。
     * @return avator。
     */
    /**
    * 设置avatar。
    * @param value avatar。
    */
    avatar: Avatar;
    private _getAvatarOwnersAndInitDatasAsync;
    private _isLinkSpriteToAnimationNode;
    private _isLinkSpriteToAnimationNodeData;
    /**
     *@internal
     */
    _updateAvatarNodesToSprite(): void;
    /**
     * 关联精灵节点到Avatar节点,此Animator必须有Avatar文件。
     * @param nodeName 关联节点的名字。
     * @param sprite3D 精灵节点。
     * @return 是否关联成功。
     */
    linkSprite3DToAvatarNode(nodeName: string, sprite3D: Sprite3D): boolean;
    /**
     * 解除精灵节点到Avatar节点的关联,此Animator必须有Avatar文件。
     * @param sprite3D 精灵节点。
     * @return 是否解除关联成功。
     */
    unLinkSprite3DToAvatarNode(sprite3D: Sprite3D): boolean;
    /**
     * @deprecated
     * 获取当前的播放状态。
     * @param   layerIndex 层索引。
     * @return  动画播放状态。
     */
    getCurrentAnimatorPlayState(layerInex?: number): AnimatorPlayState;
    /**
     *@internal
     * [NATIVE]
     */
    _updateAnimationNodeWorldMatix(localPositions: Float32Array, localRotations: Float32Array, localScales: Float32Array, worldMatrixs: Float32Array, parentIndices: Int16Array): void;
}
