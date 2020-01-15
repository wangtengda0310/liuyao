import { Node } from "../../display/Node";
import { Animator } from "../component/Animator";
import { Mesh } from "../resource/models/Mesh";
import { Avatar } from "./Avatar";
import { MeshFilter } from "./MeshFilter";
import { RenderableSprite3D } from "./RenderableSprite3D";
import { SkinnedMeshRenderer } from "./SkinnedMeshRenderer";
/**
 * <code>SkinnedMeshSprite3D</code> 类用于创建网格。
 */
export declare class SkinnedMeshSprite3D extends RenderableSprite3D {
    /**@internal */
    static _tempArray0: any[];
    /**着色器变量名，蒙皮动画。*/
    static BONES: number;
    /**
     * @internal
     */
    static __init__(): void;
    /** @internal */
    private _meshFilter;
    /**
     * 网格过滤器。
     */
    readonly meshFilter: MeshFilter;
    /**
     * 网格渲染器。
     */
    readonly skinnedMeshRenderer: SkinnedMeshRenderer;
    /**
     * 创建一个 <code>MeshSprite3D</code> 实例。
     * @param mesh 网格,同时会加载网格所用默认材质。
     * @param name 名字。
     */
    constructor(mesh?: Mesh, name?: string);
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data: any, spriteMap: any): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    protected _changeHierarchyAnimator(animator: Animator): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    protected _changeAnimatorAvatar(avatar: Avatar): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _cloneTo(destObject: any, srcRoot: Node, dstRoot: Node): void;
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
