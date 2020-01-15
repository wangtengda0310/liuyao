import { BaseTexture } from "../../../resource/BaseTexture";
import { Vector4 } from "../../math/Vector4";
import { Material } from "./Material";
import { ShaderDefine } from "../../shader/ShaderDefine";
/**
 * <code>WaterPrimaryMaterial</code> 类用于实现水材质。
 */
export declare class WaterPrimaryMaterial extends Material {
    static HORIZONCOLOR: number;
    static MAINTEXTURE: number;
    static NORMALTEXTURE: number;
    static WAVESCALE: number;
    static WAVESPEED: number;
    static SHADERDEFINE_MAINTEXTURE: ShaderDefine;
    static SHADERDEFINE_NORMALTEXTURE: ShaderDefine;
    /** 默认材质，禁止修改*/
    static defaultMaterial: WaterPrimaryMaterial;
    /**
     * @internal
     */
    static __initDefine__(): void;
    /**
     * 地平线颜色。
     */
    horizonColor: Vector4;
    /**
     * 主贴图。
     */
    mainTexture: BaseTexture;
    /**
     * 法线贴图。
     */
    normalTexture: BaseTexture;
    /**
     * 波动缩放系数。
     */
    waveScale: number;
    /**
     * 波动速率。
     */
    waveSpeed: Vector4;
    constructor();
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone(): any;
}
