import { BaseTexture } from "../../../resource/BaseTexture";
import { Vector4 } from "../../math/Vector4";
import { Material } from "./Material";
import { ShaderDefine } from "../../shader/ShaderDefine";
/**
 * <code>PBRStandardMaterial</code> 类用于实现PBR(Standard)材质。
 */
export declare class PBRStandardMaterial extends Material {
    /**光滑度数据源_金属度贴图的Alpha通道。*/
    static SmoothnessSource_MetallicGlossTexture_Alpha: number;
    /**光滑度数据源_反射率贴图的Alpha通道。*/
    static SmoothnessSource_AlbedoTexture_Alpha: number;
    /**渲染状态_不透明。*/
    static RENDERMODE_OPAQUE: number;
    /**渲染状态_透明测试。*/
    static RENDERMODE_CUTOUT: number;
    /**渲染状态_透明混合_游戏中经常使用的透明。*/
    static RENDERMODE_FADE: number;
    /**渲染状态_透明混合_物理上看似合理的透明。*/
    static RENDERMODE_TRANSPARENT: number;
    static SHADERDEFINE_ALBEDOTEXTURE: ShaderDefine;
    static SHADERDEFINE_NORMALTEXTURE: ShaderDefine;
    static SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA: ShaderDefine;
    static SHADERDEFINE_METALLICGLOSSTEXTURE: ShaderDefine;
    static SHADERDEFINE_OCCLUSIONTEXTURE: ShaderDefine;
    static SHADERDEFINE_PARALLAXTEXTURE: ShaderDefine;
    static SHADERDEFINE_EMISSION: ShaderDefine;
    static SHADERDEFINE_EMISSIONTEXTURE: ShaderDefine;
    static SHADERDEFINE_REFLECTMAP: ShaderDefine;
    static SHADERDEFINE_TILINGOFFSET: ShaderDefine;
    static SHADERDEFINE_ALPHAPREMULTIPLY: ShaderDefine;
    static ALBEDOTEXTURE: number;
    static METALLICGLOSSTEXTURE: number;
    static NORMALTEXTURE: number;
    static PARALLAXTEXTURE: number;
    static OCCLUSIONTEXTURE: number;
    static EMISSIONTEXTURE: number;
    static ALBEDOCOLOR: number;
    static EMISSIONCOLOR: number;
    static METALLIC: number;
    static SMOOTHNESS: number;
    static SMOOTHNESSSCALE: number;
    static SMOOTHNESSSOURCE: number;
    static OCCLUSIONSTRENGTH: number;
    static NORMALSCALE: number;
    static PARALLAXSCALE: number;
    static ENABLEEMISSION: number;
    static ENABLEREFLECT: number;
    static TILINGOFFSET: number;
    static CULL: number;
    static BLEND: number;
    static BLEND_SRC: number;
    static BLEND_DST: number;
    static DEPTH_TEST: number;
    static DEPTH_WRITE: number;
    /** 默认材质，禁止修改*/
    static defaultMaterial: PBRStandardMaterial;
    /**
     * @internal
     */
    static __initDefine__(): void;
    /** @internal */
    private _albedoColor;
    /** @internal */
    private _emissionColor;
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
    _Metallic: number;
    /**
     * @internal
     */
    _Glossiness: number;
    /**
     * @internal
     */
    _GlossMapScale: number;
    /**
     * @internal
     */
    _BumpScale: number;
    /**
     * @internal
     */
    _Parallax: number;
    /**
     * @internal
     */
    _OcclusionStrength: number;
    /**
     * @internal
     */
    _EmissionColorR: number;
    /**
     * @internal
     */
    _EmissionColorG: number;
    /**
     * @internal
     */
    _EmissionColorB: number;
    /**
     * @internal
     */
    _EmissionColorA: number;
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
     * 反射率颜色R分量。
     */
    albedoColorR: number;
    /**
     * 反射率颜色G分量。
     */
    albedoColorG: number;
    /**
     * 反射率颜色B分量。
     */
    albedoColorB: number;
    /**
     * 反射率颜色Z分量。
     */
    albedoColorA: number;
    /**
     * 漫反射颜色。
     */
    albedoColor: Vector4;
    /**
     * 漫反射贴图。
     */
    albedoTexture: BaseTexture;
    /**
     * 法线贴图。
     */
    normalTexture: BaseTexture;
    /**
     * 法线贴图缩放系数。
     */
    normalTextureScale: number;
    /**
     * 视差贴图。
     */
    parallaxTexture: BaseTexture;
    /**
     * 视差贴图缩放系数。
     */
    parallaxTextureScale: number;
    /**
     * 遮挡贴图。
     */
    occlusionTexture: BaseTexture;
    /**
     * 遮挡贴图强度,范围为0到1。
     */
    occlusionTextureStrength: number;
    /**
     * 金属光滑度贴图。
     */
    metallicGlossTexture: BaseTexture;
    /**
     * 获取金属度,范围为0到1。
     */
    metallic: number;
    /**
     * 光滑度,范围为0到1。
     */
    smoothness: number;
    /**
     * 光滑度缩放系数,范围为0到1。
     */
    smoothnessTextureScale: number;
    /**
     * 光滑度数据源,0或1。
     */
    smoothnessSource: number;
    /**
     * 是否激活放射属性。
     */
    enableEmission: boolean;
    /**
     * 放射颜色R分量。
     */
    emissionColorR: number;
    /**
     * 放射颜色G分量。
     */
    emissionColorG: number;
    /**
     * 放射颜色B分量。
     */
    emissionColorB: number;
    /**
     * 放射颜色A分量。
     */
    emissionColorA: number;
    /**
     * 放射颜色。
     */
    emissionColor: Vector4;
    /**
     * 放射贴图。
     */
    emissionTexture: BaseTexture;
    /**
     * 是否开启反射。
     */
    enableReflection: boolean;
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
    /**
     * 创建一个 <code>PBRStandardMaterial</code> 实例。
     */
    constructor();
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone(): any;
    /**
     * @inheritDoc
     * @override
     */
    cloneTo(destObject: any): void;
}
