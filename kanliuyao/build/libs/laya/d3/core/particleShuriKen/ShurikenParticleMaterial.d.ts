import { Material } from "../material/Material";
import { Vector4 } from "../../math/Vector4";
import { BaseTexture } from "../../../resource/BaseTexture";
import { ShaderDefine } from "../../shader/ShaderDefine";
/**
 * <code>ShurikenParticleMaterial</code> 类用于实现粒子材质。
 */
export declare class ShurikenParticleMaterial extends Material {
    /**渲染状态_透明混合。*/
    static RENDERMODE_ALPHABLENDED: number;
    /**渲染状态_加色法混合。*/
    static RENDERMODE_ADDTIVE: number;
    static SHADERDEFINE_DIFFUSEMAP: ShaderDefine;
    static SHADERDEFINE_TINTCOLOR: ShaderDefine;
    static SHADERDEFINE_TILINGOFFSET: ShaderDefine;
    static SHADERDEFINE_ADDTIVEFOG: ShaderDefine;
    static DIFFUSETEXTURE: number;
    static TINTCOLOR: number;
    static TILINGOFFSET: number;
    static CULL: number;
    static BLEND: number;
    static BLEND_SRC: number;
    static BLEND_DST: number;
    static DEPTH_TEST: number;
    static DEPTH_WRITE: number;
    /** 默认材质，禁止修改*/
    static defaultMaterial: ShurikenParticleMaterial;
    /**
     * @internal
     */
    static __initDefine__(): void;
    /**@internal */
    private _color;
    /**
     * @internal
     */
    /**
    * @internal
    */
    _TintColorR: number;
    /**
     * @internal
     */
    /**
    * @internal
    */
    _TintColorG: number;
    /**
     * @internal
     */
    /**
    * @internal
    */
    _TintColorB: number;
    /**@internal */
    /**
    * @internal
    */
    _TintColorA: number;
    /**
     * @internal
     */
    /**
    * @internal
    */
    _MainTex_STX: number;
    /**
     * @internal
     */
    /**
    * @internal
    */
    _MainTex_STY: number;
    /**
     * @internal
     */
    /**
    * @internal
    */
    _MainTex_STZ: number;
    /**
     * @internal
     */
    /**
    * @internal
    */
    _MainTex_STW: number;
    /**
     * 渲染模式。
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
     * 颜色Z分量。
     */
    colorA: number;
    /**
     * 颜色。
     */
    color: Vector4;
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
     * 漫反射贴图。
     */
    texture: BaseTexture;
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
