import { BaseRender } from "./BaseRender";
import { RenderContext3D } from "./RenderContext3D";
import { RenderQueue } from "./RenderQueue";
import { GeometryElement } from "../GeometryElement";
import { Transform3D } from "../Transform3D";
import { Material } from "../material/Material";
import { Scene3D } from "../scene/Scene3D";
import { Shader3D } from "../../shader/Shader3D";
import { SubShader } from "../../shader/SubShader";
/**
 * <code>RenderElement</code> 类用于实现渲染元素。
 */
export declare class RenderElement {
    /** @internal */
    static RENDERTYPE_NORMAL: number;
    /** @internal */
    static RENDERTYPE_STATICBATCH: number;
    /** @internal */
    static RENDERTYPE_INSTANCEBATCH: number;
    /** @internal */
    static RENDERTYPE_VERTEXBATCH: number;
    /** @internal */
    private static _compileDefine;
    /** @internal */
    _transform: Transform3D;
    /** @internal */
    _geometry: GeometryElement;
    /** @internal */
    material: Material;
    /** @internal */
    render: BaseRender;
    /** @internal */
    staticBatch: GeometryElement;
    /** @internal */
    renderSubShader: SubShader;
    /** @internal */
    renderType: number;
    /**
     * 创建一个 <code>RenderElement</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    getInvertFront(): boolean;
    /**
     * @internal
     */
    setTransform(transform: Transform3D): void;
    /**
     * @internal
     */
    setGeometry(geometry: GeometryElement): void;
    /**
     * @internal
     */
    addToOpaqueRenderQueue(context: RenderContext3D, queue: RenderQueue): void;
    /**
     * @internal
     */
    addToTransparentRenderQueue(context: RenderContext3D, queue: RenderQueue): void;
    /**
     * @internal
     */
    _update(scene: Scene3D, context: RenderContext3D, customShader: Shader3D, replacementTag: string): void;
    /**
     * @internal
     */
    _render(context: RenderContext3D): void;
    /**
     * @internal
     */
    destroy(): void;
}
