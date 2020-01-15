import { BaseTexture } from "../../../resource/BaseTexture";
import { Vector4 } from "../../math/Vector4";
import { Material } from "./Material";
import { ShaderDefine } from "../../shader/ShaderDefine";
/**
 * <code>EffectMaterial</code> 类用于实现Mesh特效材质。
 */
export declare class EffectMaterial extends Material {
    /**渲染状态_加色法混合。*/
    static RENDERMODE_ADDTIVE: number;
    /**渲染状态_透明混合。*/
    static RENDERMODE_ALPHABLENDED: number;
    /** 默认材质，禁止修改*/
    static defaultMaterial: EffectMaterial;
    static SHADERDEFINE_MAINTEXTURE: ShaderDefine;
    static SHADERDEFINE_TILINGOFFSET: ShaderDefine;
    static SHADERDEFINE_ADDTIVEFOG: ShaderDefine;
    static MAINTEXTURE: number;
    static TINTCOLOR: number;
    static TILINGOFFSET: number;
    static CULL: number;
    static BLEND: number;
    static BLEND_SRC: number;
    static BLEND_DST: number;
    static DEPTH_TEST: number;
    static DEPTH_WRITE: number;
    /**
     * @internal
     */
    static __initDefine__(): void;
    private _color;
    /**
     * @internal
     */
    _TintColorR: number;
    /**
     * @internal
     */
    _TintColorG: number;
    /**
     * @internal
     */
    _TintColorB: number;
    /**@internal */
    _TintColorA: number;
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
     * 设置渲染模式。
     */
    renderMode: number;
    /**
     * 颜色R分量。
     */
    colorR: number;
    /**
     * 颜色G分量。
     */
    colorG: number;
    /**
     * 颜色B分量。
     */
    colorB: number;
    /**
     * 颜色A分量。
     */
    colorA: number;
    /**
     * 获取颜色。
     */
    color: Vector4;
    /**
     * 贴图。
     */
    texture: BaseTexture;
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
