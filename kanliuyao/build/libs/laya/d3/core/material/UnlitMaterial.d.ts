import { BaseTexture } from "../../../resource/BaseTexture";
import { Vector4 } from "../../math/Vector4";
import { ShaderDefine } from "../../shader/ShaderDefine";
import { Material } from "./Material";
/**
 * <code>UnlitMaterial</code> 类用于实现不受光照影响的材质。
 */
export declare class UnlitMaterial extends Material {
    /**渲染状态_不透明。*/
    static RENDERMODE_OPAQUE: number;
    /**渲染状态_阿尔法测试。*/
    static RENDERMODE_CUTOUT: number;
    /**渲染状态__透明混合。*/
    static RENDERMODE_TRANSPARENT: number;
    /**渲染状态__加色法混合。*/
    static RENDERMODE_ADDTIVE: number;
    static SHADERDEFINE_ALBEDOTEXTURE: ShaderDefine;
    static SHADERDEFINE_TILINGOFFSET: ShaderDefine;
    static SHADERDEFINE_ENABLEVERTEXCOLOR: ShaderDefine;
    static ALBEDOTEXTURE: number;
    static ALBEDOCOLOR: number;
    static TILINGOFFSET: number;
    static CULL: number;
    static BLEND: number;
    static BLEND_SRC: number;
    static BLEND_DST: number;
    static DEPTH_TEST: number;
    static DEPTH_WRITE: number;
    /** 默认材质，禁止修改*/
    static defaultMaterial: UnlitMaterial;
    /**
     * @internal
     */
    static __initDefine__(): void;
    private _albedoColor;
    private _albedoIntensity;
    private _enableVertexColor;
    /**
     * @internal
     */
    _ColorR: number;
    /**
     * @internal
     */
    _ColorG: number;
    /**
     * @internal
     */
    _ColorB: number;
    /**
     * @internal
     */
    _ColorA: number;
    /**
     * @internal
     */
    _AlbedoIntensity: number;
    /**
     * @internal
     */
    _MainTex_STX: number;
    /**
     * @internal
     */
    _MainTex_STY: number;
    /**
     * @internal
     */
    _MainTex_STZ: number;
    /**
     * @internal
     */
    _MainTex_STW: number;
    /**
     * @internal
     */
    _Cutoff: number;
    /**
     * 反照率颜色R分量。
     */
    albedoColorR: number;
    /**
     * 反照率颜色G分量。
     */
    albedoColorG: number;
    /**
     * 反照率颜色B分量。
     */
    albedoColorB: number;
    /**
     * 反照率颜色Z分量。
     */
    albedoColorA: number;
    /**
     * 反照率颜色。
     */
    albedoColor: Vector4;
    /**
     * 反照率强度。
     */
    albedoIntensity: number;
    /**
     * 反照率贴图。
     */
    albedoTexture: BaseTexture;
    /**
     * 纹理平铺和偏移X分量。
     */
    tilingOffsetX: number;
    /**
     * 纹理平铺和偏移Y分量。
     */
    tilingOffsetY: number;
    /**
     * 纹理平铺和偏移Z分量。
     */
    tilingOffsetZ: number;
    /**
     * 纹理平铺和偏移W分量。
     */
    tilingOffsetW: number;
    /**
     * 纹理平铺和偏移。
     */
    tilingOffset: Vector4;
    /**
     * 是否支持顶点色。
     */
    enableVertexColor: boolean;
    /**
     * 渲染模式。
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
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone(): any;
}
