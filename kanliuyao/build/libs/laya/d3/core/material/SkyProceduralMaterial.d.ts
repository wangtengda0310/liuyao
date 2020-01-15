import { Vector4 } from "../../math/Vector4";
import { Material } from "./Material";
import { ShaderDefine } from "../../shader/ShaderDefine";
/**
 * <code>SkyProceduralMaterial</code> 类用于实现SkyProceduralMaterial材质。
 */
export declare class SkyProceduralMaterial extends Material {
    /** 太阳_无*/
    static SUN_NODE: number;
    /** 太阳_精简*/
    static SUN_SIMPLE: number;
    /** 太阳_高质量*/
    static SUN_HIGH_QUALITY: number;
    /**@internal */
    static SUNSIZE: number;
    /**@internal */
    static SUNSIZECONVERGENCE: number;
    /**@internal */
    static ATMOSPHERETHICKNESS: number;
    /**@internal */
    static SKYTINT: number;
    /**@internal */
    static GROUNDTINT: number;
    /**@internal */
    static EXPOSURE: number;
    /**@internal */
    static SHADERDEFINE_SUN_HIGH_QUALITY: ShaderDefine;
    /**@internal */
    static SHADERDEFINE_SUN_SIMPLE: ShaderDefine;
    /** 默认材质，禁止修改*/
    static defaultMaterial: SkyProceduralMaterial;
    /**
     * @internal
     */
    static __initDefine__(): void;
    /**@internal */
    private _sunDisk;
    /**
     * 太阳状态。
     */
    sunDisk: number;
    /**
     * 太阳尺寸,范围是0到1。
     */
    sunSize: number;
    /**
     * 太阳尺寸收缩,范围是0到20。
     */
    sunSizeConvergence: number;
    /**
     * 大气厚度,范围是0到5。
     */
    atmosphereThickness: number;
    /**
     * 天空颜色。
     */
    skyTint: Vector4;
    /**
     * 地面颜色。
     */
    groundTint: Vector4;
    /**
     * 曝光强度,范围是0到8。
     */
    exposure: number;
    /**
     * 创建一个 <code>SkyProceduralMaterial</code> 实例。
     */
    constructor();
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone(): any;
}
