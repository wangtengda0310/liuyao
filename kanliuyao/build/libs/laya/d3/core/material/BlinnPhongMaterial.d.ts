import { Vector4 } from "../../math/Vector4";
import { Material } from "./Material";
import { BaseTexture } from "../../../resource/BaseTexture";
import { ShaderDefine } from "../../shader/ShaderDefine";
/**
 * <code>BlinnPhongMaterial</code> 类用于实现Blinn-Phong材质。
 */
export declare class BlinnPhongMaterial extends Material {
    /**高光强度数据源_漫反射贴图的Alpha通道。*/
    static SPECULARSOURCE_DIFFUSEMAPALPHA: number;
    /**高光强度数据源_高光贴图的RGB通道。*/
    static SPECULARSOURCE_SPECULARMAP: number;
    /**渲染状态_不透明。*/
    static RENDERMODE_OPAQUE: number;
    /**渲染状态_阿尔法测试。*/
    static RENDERMODE_CUTOUT: number;
    /**渲染状态_透明混合。*/
    static RENDERMODE_TRANSPARENT: number;
    static SHADERDEFINE_DIFFUSEMAP: ShaderDefine;
    static SHADERDEFINE_NORMALMAP: ShaderDefine;
    static SHADERDEFINE_SPECULARMAP: ShaderDefine;
    static SHADERDEFINE_TILINGOFFSET: ShaderDefine;
    static SHADERDEFINE_ENABLEVERTEXCOLOR: ShaderDefine;
    static ALBEDOTEXTURE: number;
    static NORMALTEXTURE: number;
    static SPECULARTEXTURE: number;
    static ALBEDOCOLOR: number;
    static MATERIALSPECULAR: number;
    static SHININESS: number;
    static TILINGOFFSET: number;
    static CULL: number;
    static BLEND: number;
    static BLEND_SRC: number;
    static BLEND_DST: number;
    static DEPTH_TEST: number;
    static DEPTH_WRITE: number;
    /** 默认材质，禁止修改*/
    static defaultMaterial: BlinnPhongMaterial;
    /**
     * @internal
     */
    static __initDefine__(): void;
    private _albedoColor;
    private _albedoIntensity;
    private _enableLighting;
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
    _SpecColorR: number;
    /**
     * @internal
     */
    _SpecColorG: number;
    /**
     * @internal
     */
    _SpecColorB: number;
    /**
     * @internal
     */
    _SpecColorA: number;
    /**
     * @internal
     */
    _AlbedoIntensity: number;
    /**
     * @internal
     */
    _Shininess: number;
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
     * 设置渲染模式。
     */
    renderMode: number;
    /**
     * 是否支持顶点色。
     */
    enableVertexColor: boolean;
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
     * 高光颜色R轴分量。
     */
    specularColorR: number;
    /**
     * 高光颜色G分量。
     */
    specularColorG: number;
    /**
     * 高光颜色B分量。
     */
    specularColorB: number;
    /**
     * 高光颜色A分量。
     */
    specularColorA: number;
    /**
     * 高光颜色。
     */
    specularColor: Vector4;
    /**
     * 高光强度,范围为0到1。
     */
    shininess: number;
    /**
     * 反照率贴图。
     */
    albedoTexture: BaseTexture;
    /**
     * 法线贴图。
     */
    normalTexture: BaseTexture;
    /**
     * 高光贴图。
     */
    specularTexture: BaseTexture;
    /**
     * 是否启用光照。
     */
    enableLighting: boolean;
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
     * 创建一个 <code>BlinnPhongMaterial</code> 实例。
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
