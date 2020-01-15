import { Camera } from "../core/Camera";
import { CommandBuffer } from "../core/render/command/CommandBuffer";
import { PostProcessEffect } from "../core/render/PostProcessEffect";
import { PostProcessRenderContext } from "../core/render/PostProcessRenderContext";
import { ShaderDefine } from "../shader/ShaderDefine";
/**
 * <code>PostProcess</code> 类用于创建后期处理组件。
 */
export declare class PostProcess {
    /**@internal */
    static SHADERDEFINE_BLOOM_LOW: ShaderDefine;
    /**@internal */
    static SHADERDEFINE_BLOOM: ShaderDefine;
    /**@internal */
    static SHADERDEFINE_FINALPASS: ShaderDefine;
    /**@internal */
    static SHADERVALUE_MAINTEX: number;
    /**@internal */
    static SHADERVALUE_BLOOMTEX: number;
    /**@internal */
    static SHADERVALUE_AUTOEXPOSURETEX: number;
    /**@internal */
    static SHADERVALUE_BLOOM_DIRTTEX: number;
    /**@internal */
    static SHADERVALUE_BLOOMTEX_TEXELSIZE: number;
    /**@internal */
    static SHADERVALUE_BLOOM_DIRTTILEOFFSET: number;
    /**@internal */
    static SHADERVALUE_BLOOM_SETTINGS: number;
    /**@internal */
    static SHADERVALUE_BLOOM_COLOR: number;
    /**
     * @internal
     */
    static __init__(): void;
    /**@internal */
    private _compositeShader;
    /**@internal */
    private _compositeShaderData;
    /**@internal */
    private _effects;
    /**@internal */
    _context: PostProcessRenderContext;
    /**
     * 创建一个 <code>PostProcess</code> 实例。
     */
    constructor();
    /**
     *@internal
     */
    _init(camera: Camera, command: CommandBuffer): void;
    /**
     * @internal
     */
    _render(): void;
    /**
     * 添加后期处理效果。
     */
    addEffect(effect: PostProcessEffect): void;
    /**
     * 移除后期处理效果。
     */
    removeEffect(effect: PostProcessEffect): void;
}
