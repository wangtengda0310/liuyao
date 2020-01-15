import { Node } from "../../display/Node";
import { Handler } from "../../utils/Handler";
import { Animator } from "../component/Animator";
import { Script3D } from "../component/Script3D";
import { Quaternion } from "../math/Quaternion";
import { Vector3 } from "../math/Vector3";
import { Avatar } from "./Avatar";
import { Transform3D } from "./Transform3D";
import { ICreateResource } from "../../resource/ICreateResource";
/**
 * <code>Sprite3D</code> 类用于实现3D精灵。
 */
export declare class Sprite3D extends Node implements ICreateResource {
    /**Hierarchy资源。*/
    static HIERARCHY: string;
    /**@internal 着色器变量名，世界矩阵。*/
    static WORLDMATRIX: number;
    /**@internal 着色器变量名，世界视图投影矩阵。*/
    static MVPMATRIX: number;
    /**@internal */
    protected static _uniqueIDCounter: number;
    /**
     * @internal
     */
    static __init__(): void;
    /**
     * 创建精灵的克隆实例。
     * @param	original  原始精灵。
     * @param   parent    父节点。
     * @param   worldPositionStays 是否保持自身世界变换。
     * @param	position  世界位置,worldPositionStays为false时生效。
     * @param	rotation  世界旋转,worldPositionStays为false时生效。
     * @return  克隆实例。
     */
    static instantiate(original: Sprite3D, parent?: Node, worldPositionStays?: boolean, position?: Vector3, rotation?: Quaternion): Sprite3D;
    /**
     * 加载网格模板。
     * @param url 模板地址。
     * @param complete 完成回掉。
     */
    static load(url: string, complete: Handler): void;
    /** @internal */
    private _id;
    /**@internal */
    private _url;
    /** @internal */
    _isStatic: boolean;
    /** @internal */
    _layer: number;
    /** @internal */
    _scripts: Script3D[];
    /**@internal */
    _transform: Transform3D;
    /** @internal */
    _hierarchyAnimator: Animator;
    /** @internal */
    _needProcessCollisions: boolean;
    /** @internal */
    _needProcessTriggers: boolean;
    /**
     * 唯一标识ID。
     */
    readonly id: number;
    /**
     * 蒙版层。
     */
    layer: number;
    /**
     * 资源的URL地址。
     */
    readonly url: string;
    /**
     * 是否为静态。
     */
    readonly isStatic: boolean;
    /**
     * 精灵变换。
     */
    readonly transform: Transform3D;
    /**
     * 创建一个 <code>Sprite3D</code> 实例。
     * @param name 精灵名称。
     * @param isStatic 是否为静态。
     */
    constructor(name?: string, isStatic?: boolean);
    /**
     *
     */
    _setCreateURL(url: string): void;
    /**
     * @internal
     */
    private _changeAnimatorsToLinkSprite3D;
    /**
     * @internal
     */
    _setHierarchyAnimator(animator: Animator, parentAnimator: Animator): void;
    /**
     * @internal
     */
    _clearHierarchyAnimator(animator: Animator, parentAnimator: Animator): void;
    /**
     * @internal
     */
    _changeHierarchyAnimatorAvatar(animator: Animator, avatar: Avatar): void;
    /**
     * @internal
     */
    _changeAnimatorToLinkSprite3DNoAvatar(animator: Animator, isLink: boolean, path: string[]): void;
    /**
     * @internal
     */
    protected _changeHierarchyAnimator(animator: Animator): void;
    /**
     * @internal
     */
    protected _changeAnimatorAvatar(avatar: Avatar): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _onAdded(): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _onRemoved(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data: any, spriteMap: any): void;
    /**
     * @override
     * @internal
     * 克隆。
     * @param	destObject 克隆源。
     */
    _cloneTo(destObject: any, srcRoot: Node, dstRoot: Node): void;
    /**
     * @internal
     */
    private static _createSprite3DInstance;
    /**
     * @internal
     */
    private static _parseSprite3DInstance;
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone(): Node;
    /**
     * @inheritDoc
     * @override
     */
    destroy(destroyChild?: boolean): void;
    /**
     * @internal
     */
    protected _create(): Node;
}
