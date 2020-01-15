import { BaseTexture } from "../../../resource/BaseTexture";
import { Vector4 } from "../../math/Vector4";
import { Material } from "./Material";
import { ShaderDefine } from "../../shader/ShaderDefine";
/**
 * ...
 * @author ...
 */
export declare class ExtendTerrainMaterial extends Material {
    /**渲染状态_不透明。*/
    static RENDERMODE_OPAQUE: number;
    /**渲染状态_透明混合。*/
    static RENDERMODE_TRANSPARENT: number;
    /**渲染状态_透明混合。*/
    static SPLATALPHATEXTURE: number;
    static DIFFUSETEXTURE1: number;
    static DIFFUSETEXTURE2: number;
    static DIFFUSETEXTURE3: number;
    static DIFFUSETEXTURE4: number;
    static DIFFUSETEXTURE5: number;
    static DIFFUSESCALEOFFSET1: number;
    static DIFFUSESCALEOFFSET2: number;
    static DIFFUSESCALEOFFSET3: number;
    static DIFFUSESCALEOFFSET4: number;
    static DIFFUSESCALEOFFSET5: number;
    static CULL: number;
    static BLEND: number;
    static BLEND_SRC: number;
    static BLEND_DST: number;
    static DEPTH_TEST: number;
    static DEPTH_WRITE: number;
    /**地形细节宏定义。*/
    static SHADERDEFINE_DETAIL_NUM1: ShaderDefine;
    static SHADERDEFINE_DETAIL_NUM2: ShaderDefine;
    static SHADERDEFINE_DETAIL_NUM3: ShaderDefine;
    static SHADERDEFINE_DETAIL_NUM4: ShaderDefine;
    static SHADERDEFINE_DETAIL_NUM5: ShaderDefine;
    /**
     * @internal
     */
    static __initDefine__(): void;
    /** @internal */
    private _enableLighting;
    /**
     * splatAlpha贴图。
     */
    splatAlphaTexture: BaseTexture;
    /**
     * 第一层贴图。
     */
    diffuseTexture1: BaseTexture;
    /**
     * 第二层贴图。
     */
    diffuseTexture2: BaseTexture;
    /**
     * 第三层贴图。
     */
    diffuseTexture3: BaseTexture;
    /**
     * 第四层贴图。
     */
    diffuseTexture4: BaseTexture;
    /**
     * 第五层贴图。
     */
    diffuseTexture5: BaseTexture;
    /**
     * 第一层贴图缩放偏移。
     */
    diffuseScaleOffset1: Vector4;
    /**
     * 第二层贴图缩放偏移。
     */
    diffuseScaleOffset2: Vector4;
    /**
     * 第三层贴图缩放偏移。
     */
    diffuseScaleOffset3: Vector4;
    /**
     * 第四层贴图缩放偏移。
     */
    diffuseScaleOffset4: Vector4;
    /**
     * 第五层贴图缩放偏移。
     */
    diffuseScaleOffset5: Vector4;
    /**
     * 是否启用光照。
     */
    enableLighting: boolean;
    /**
     * 设置渲染模式。
     */
    renderMode: number;
    /**
     * 是否写入深度。
     */
    depthWrite: boolean;
    /**
     * 剔除方式。
     */
    cull: number;
    /**
     * 混合方式。
     */
    blend: number;
    /**
     * 混合源。
     */
    blendSrc: number;
    /**
     * 混合目标。
     */
    blendDst: number;
    /**
     * 深度测试方式。
     */
    depthTest: number;
    constructor();
    /**
     * @internal
     */
    private _setDetailNum;
    /**
    * 克隆。
    * @return	 克隆副本。
    * @override
    */
    clone(): any;
}
