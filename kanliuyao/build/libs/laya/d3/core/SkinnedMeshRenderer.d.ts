import { Animator } from "../component/Animator";
import { Mesh } from "../resource/models/Mesh";
import { Avatar } from "./Avatar";
import { Bounds } from "./Bounds";
import { MeshRenderer } from "./MeshRenderer";
import { RenderableSprite3D } from "./RenderableSprite3D";
import { Sprite3D } from "./Sprite3D";
import { Transform3D } from "./Transform3D";
import { RenderContext3D } from "./render/RenderContext3D";
import { RenderElement } from "./render/RenderElement";
/**
 * <code>SkinMeshRenderer</code> 类用于蒙皮渲染器。
 */
export declare class SkinnedMeshRenderer extends MeshRenderer {
    /**@internal */
    private static _tempMatrix4x4;
    /**@internal */
    private _cacheMesh;
    /** @internal */
    private _bones;
    /** @internal */
    _skinnedData: any[];
    /** @internal */
    private _skinnedDataLoopMarks;
    /**@internal */
    private _localBounds;
    /**@internal */
    private _cacheAnimator;
    /**@internal */
    private _cacheRootBone;
    /**
     * 局部边界。
     */
    localBounds: Bounds;
    /**
     * 根节点。
     */
    rootBone: Sprite3D;
    /**
     * 用于蒙皮的骨骼。
     */
    readonly bones: Sprite3D[];
    /**
     * 创建一个 <code>SkinnedMeshRender</code> 实例。
     */
    constructor(owner: RenderableSprite3D);
    /**
     * @internal
     */
    private _computeSkinnedData;
    /**
     * @internal
     */
    private _computeSubSkinnedData;
    /**
     * @internal
     * @override
     */
    protected _onWorldMatNeedChange(flag: number): void;
    /**
     *@inheritDoc
     *@override
     *@internal
     */
    _createRenderElement(): RenderElement;
    /**
    *@inheritDoc
    *@override
    *@internal
    */
    _onMeshChange(value: Mesh): void;
    /**
     * @internal
     */
    _setCacheAnimator(animator: Animator): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    protected _calculateBoundingBox(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _renderUpdate(context: RenderContext3D, transform: Transform3D): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _renderUpdateWithCamera(context: RenderContext3D, transform: Transform3D): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _destroy(): void;
    /**@internal */
    _rootBone: string;
    /**@internal */
    private _cacheAvatar;
    /**@internal */
    private _cacheRootAnimationNode;
    /** @internal */
    private _cacheAnimationNode;
    /**
     * @override
     * 包围盒。
     */
    readonly bounds: Bounds;
    /**
     * @internal
     */
    _setRootBone(name: string): void;
    /**
     * @internal
     */
    private _setRootNode;
    /**
     * @internal
     */
    private _getCacheAnimationNodes;
    /**
     * @internal
     */
    _setCacheAvatar(value: Avatar): void;
    /**@internal [NATIVE]*/
    private _cacheAnimationNodeIndices;
    /**
     * @internal [NATIVE]
     */
    private _computeSubSkinnedDataNative;
    /**
     * @internal
     */
    private _computeSkinnedDataForNative;
}
