import { Node } from "../../display/Node";
import { Animator } from "../component/Animator";
import { Vector4 } from "../math/Vector4";
import { Sprite3D } from "./Sprite3D";
import { BaseRender } from "./render/BaseRender";
import { ShaderDefine } from "../shader/ShaderDefine";
/**
 * <code>RenderableSprite3D</code> 类用于可渲染3D精灵的父类，抽象类不允许实例。
 */
export declare class RenderableSprite3D extends Sprite3D {
    /**精灵级着色器宏定义,接收阴影。*/
    static SHADERDEFINE_RECEIVE_SHADOW: ShaderDefine;
    /**精灵级着色器宏定义,光照贴图便宜和缩放。*/
    static SHADERDEFINE_SCALEOFFSETLIGHTINGMAPUV: ShaderDefine;
    /**精灵级着色器宏定义,光照贴图。*/
    static SAHDERDEFINE_LIGHTMAP: ShaderDefine;
    /**着色器变量名，光照贴图缩放和偏移。*/
    static LIGHTMAPSCALEOFFSET: number;
    /**着色器变量名，光照贴图。*/
    static LIGHTMAP: number;
    /**拾取颜色。*/
    static PICKCOLOR: number;
    pickColor: Vector4;
    /**
     * @internal
     */
    static __init__(): void;
    /** @internal */
    _render: BaseRender;
    /**
     * 创建一个 <code>RenderableSprite3D</code> 实例。
     */
    constructor(name: string);
    /**
     * @inheritDoc
     * @override
     */
    protected _onInActive(): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _onActive(): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _onActiveInScene(): void;
    /**
     * @internal
     */
    _addToInitStaticBatchManager(): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _setBelongScene(scene: Node): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _setUnBelongScene(): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    protected _changeHierarchyAnimator(animator: Animator): void;
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
