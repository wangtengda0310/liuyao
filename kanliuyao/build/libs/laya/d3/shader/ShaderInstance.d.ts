import { CommandEncoder } from "../../layagl/CommandEncoder";
import { BaseTexture } from "../../resource/BaseTexture";
import { Resource } from "../../resource/Resource";
import { BaseCamera } from "../core/BaseCamera";
import { Material } from "../core/material/Material";
import { BaseRender } from "../core/render/BaseRender";
import { Scene3D } from "../core/scene/Scene3D";
import { Matrix4x4 } from "../math/Matrix4x4";
import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { ShaderData } from "./ShaderData";
import { ShaderPass } from "./ShaderPass";
import { ShaderVariable } from "./ShaderVariable";
/**
 * @internal
 * <code>ShaderInstance</code> 类用于实现ShaderInstance。
 */
export declare class ShaderInstance extends Resource {
    /**@internal */
    private _attributeMap;
    /**@internal */
    private _uniformMap;
    /**@internal */
    private _shaderPass;
    /**@internal */
    private _vs;
    /**@internal */
    private _ps;
    /**@internal */
    private _curActTexIndex;
    /**@internal */
    private _vshader;
    /**@internal */
    private _pshader;
    /**@internal */
    private _program;
    /**@internal */
    _sceneUniformParamsMap: CommandEncoder;
    /**@internal */
    _cameraUniformParamsMap: CommandEncoder;
    /**@internal */
    _spriteUniformParamsMap: CommandEncoder;
    /**@internal */
    _materialUniformParamsMap: CommandEncoder;
    /**@internal */
    private _customUniformParamsMap;
    /**@internal */
    private _stateParamsMap;
    /**@internal */
    _uploadMark: number;
    /**@internal */
    _uploadMaterial: Material;
    /**@internal */
    _uploadRender: BaseRender;
    /** @internal */
    _uploadRenderType: number;
    /**@internal */
    _uploadCamera: BaseCamera;
    /**@internal */
    _uploadScene: Scene3D;
    /**
     * 创建一个 <code>ShaderInstance</code> 实例。
     */
    constructor(vs: string, ps: string, attributeMap: any, uniformMap: any, shaderPass: ShaderPass);
    /**
     *@internal
     */
    private _create;
    /**
     * @internal
     */
    private _getRenderState;
    /**
     * @inheritDoc
     * @override
     */
    protected _disposeResource(): void;
    /**
     * @internal
     */
    _addShaderUnifiormFun(one: ShaderVariable): void;
    /**
     * @internal
     */
    private _createShader;
    /**
     * @internal
     */
    _uniform1f(one: any, value: any): number;
    /**
     * @internal
     */
    _uniform1fv(one: any, value: any): number;
    /**
     * @internal
     */
    _uniform_vec2(one: any, v: Vector2): number;
    /**
     * @internal
     */
    _uniform_vec2v(one: any, value: Float32Array): number;
    /**
     * @internal
     */
    _uniform_vec3(one: any, v: Vector3): number;
    /**
     * @internal
     */
    _uniform_vec3v(one: any, v: Float32Array): number;
    /**
     * @internal
     */
    _uniform_vec4(one: any, v: Vector4): number;
    /**
     * @internal
     */
    _uniform_vec4v(one: any, v: Float32Array): number;
    /**
     * @internal
     */
    _uniformMatrix2fv(one: any, value: any): number;
    /**
     * @internal
     */
    _uniformMatrix3fv(one: any, value: any): number;
    /**
     * @internal
     */
    _uniformMatrix4f(one: any, m: Matrix4x4): number;
    /**
     * @internal
     */
    _uniformMatrix4fv(one: any, m: Float32Array): number;
    /**
     * @internal
     */
    _uniform1i(one: any, value: any): number;
    /**
     * @internal
     */
    _uniform1iv(one: any, value: any): number;
    /**
     * @internal
     */
    _uniform_ivec2(one: any, value: any): number;
    /**
     * @internal
     */
    _uniform_ivec2v(one: any, value: any): number;
    /**
     * @internal
     */
    _uniform_vec3i(one: any, value: any): number;
    /**
     * @internal
     */
    _uniform_vec3vi(one: any, value: any): number;
    /**
     * @internal
     */
    _uniform_vec4i(one: any, value: any): number;
    /**
     * @internal
     */
    _uniform_vec4vi(one: any, value: any): number;
    /**
     * @internal
     */
    _uniform_sampler2D(one: any, texture: BaseTexture): number;
    _uniform_sampler3D(one: any, texture: BaseTexture): number;
    /**
     * @internal
     */
    _uniform_samplerCube(one: any, texture: BaseTexture): number;
    /**
     * @internal
     */
    bind(): boolean;
    /**
     * @internal
     */
    uploadUniforms(shaderUniform: CommandEncoder, shaderDatas: ShaderData, uploadUnTexture: boolean): void;
    /**
     * @internal
     */
    uploadRenderStateBlendDepth(shaderDatas: ShaderData): void;
    /**
     * @internal
     */
    uploadRenderStateFrontFace(shaderDatas: ShaderData, isTarget: boolean, invertFront: boolean): void;
    /**
     * @internal
     */
    uploadCustomUniform(index: number, data: any): void;
    /**
     * @internal
     * [NATIVE]
     */
    _uniformMatrix2fvForNative(one: any, value: any): number;
    /**
     * @internal
     * [NATIVE]
     */
    _uniformMatrix3fvForNative(one: any, value: any): number;
    /**
     * @internal
     * [NATIVE]
     */
    _uniformMatrix4fvForNative(one: any, m: Float32Array): number;
}
