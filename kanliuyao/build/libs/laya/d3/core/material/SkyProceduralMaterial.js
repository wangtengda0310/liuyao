import { Vector4 } from "../../math/Vector4";
import { Shader3D } from "../../shader/Shader3D";
import { Material } from "./Material";
/**
 * <code>SkyProceduralMaterial</code> 类用于实现SkyProceduralMaterial材质。
 */
export class SkyProceduralMaterial extends Material {
    /**
     * 创建一个 <code>SkyProceduralMaterial</code> 实例。
     */
    constructor() {
        super();
        this.setShaderName("SkyBoxProcedural");
        this.sunDisk = SkyProceduralMaterial.SUN_HIGH_QUALITY;
        this.sunSize = 0.04;
        this.sunSizeConvergence = 5;
        this.atmosphereThickness = 1.0;
        this.skyTint = new Vector4(0.5, 0.5, 0.5, 1.0);
        this.groundTint = new Vector4(0.369, 0.349, 0.341, 1.0);
        this.exposure = 1.3;
    }
    /**
     * @internal
     */
    static __initDefine__() {
        SkyProceduralMaterial.SHADERDEFINE_SUN_HIGH_QUALITY = Shader3D.getDefineByName("SUN_HIGH_QUALITY");
        SkyProceduralMaterial.SHADERDEFINE_SUN_SIMPLE = Shader3D.getDefineByName("SUN_SIMPLE");
    }
    /**
     * 太阳状态。
     */
    get sunDisk() {
        return this._sunDisk;
    }
    set sunDisk(value) {
        switch (value) {
            case SkyProceduralMaterial.SUN_HIGH_QUALITY:
                this._shaderValues.removeDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_SIMPLE);
                this._shaderValues.addDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_HIGH_QUALITY);
                break;
            case SkyProceduralMaterial.SUN_SIMPLE:
                this._shaderValues.removeDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_HIGH_QUALITY);
                this._shaderValues.addDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_SIMPLE);
                break;
            case SkyProceduralMaterial.SUN_NODE:
                this._shaderValues.removeDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_HIGH_QUALITY);
                this._shaderValues.removeDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_SIMPLE);
                break;
            default:
                throw "SkyBoxProceduralMaterial: unknown sun value.";
        }
        this._sunDisk = value;
    }
    /**
     * 太阳尺寸,范围是0到1。
     */
    get sunSize() {
        return this._shaderValues.getNumber(SkyProceduralMaterial.SUNSIZE);
    }
    set sunSize(value) {
        value = Math.min(Math.max(0.0, value), 1.0);
        this._shaderValues.setNumber(SkyProceduralMaterial.SUNSIZE, value);
    }
    /**
     * 太阳尺寸收缩,范围是0到20。
     */
    get sunSizeConvergence() {
        return this._shaderValues.getNumber(SkyProceduralMaterial.SUNSIZECONVERGENCE);
    }
    set sunSizeConvergence(value) {
        value = Math.min(Math.max(0.0, value), 20.0);
        this._shaderValues.setNumber(SkyProceduralMaterial.SUNSIZECONVERGENCE, value);
    }
    /**
     * 大气厚度,范围是0到5。
     */
    get atmosphereThickness() {
        return this._shaderValues.getNumber(SkyProceduralMaterial.ATMOSPHERETHICKNESS);
    }
    set atmosphereThickness(value) {
        value = Math.min(Math.max(0.0, value), 5.0);
        this._shaderValues.setNumber(SkyProceduralMaterial.ATMOSPHERETHICKNESS, value);
    }
    /**
     * 天空颜色。
     */
    get skyTint() {
        return this._shaderValues.getVector(SkyProceduralMaterial.SKYTINT);
    }
    set skyTint(value) {
        this._shaderValues.setVector(SkyProceduralMaterial.SKYTINT, value);
    }
    /**
     * 地面颜色。
     */
    get groundTint() {
        return this._shaderValues.getVector(SkyProceduralMaterial.GROUNDTINT);
    }
    set groundTint(value) {
        this._shaderValues.setVector(SkyProceduralMaterial.GROUNDTINT, value);
    }
    /**
     * 曝光强度,范围是0到8。
     */
    get exposure() {
        return this._shaderValues.getNumber(SkyProceduralMaterial.EXPOSURE);
    }
    set exposure(value) {
        value = Math.min(Math.max(0.0, value), 8.0);
        this._shaderValues.setNumber(SkyProceduralMaterial.EXPOSURE, value);
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone() {
        var dest = new SkyProceduralMaterial();
        this.cloneTo(dest);
        return dest;
    }
}
/** 太阳_无*/
SkyProceduralMaterial.SUN_NODE = 0;
/** 太阳_精简*/
SkyProceduralMaterial.SUN_SIMPLE = 1;
/** 太阳_高质量*/
SkyProceduralMaterial.SUN_HIGH_QUALITY = 2;
/**@internal */
SkyProceduralMaterial.SUNSIZE = Shader3D.propertyNameToID("u_SunSize");
/**@internal */
SkyProceduralMaterial.SUNSIZECONVERGENCE = Shader3D.propertyNameToID("u_SunSizeConvergence");
/**@internal */
SkyProceduralMaterial.ATMOSPHERETHICKNESS = Shader3D.propertyNameToID("u_AtmosphereThickness");
/**@internal */
SkyProceduralMaterial.SKYTINT = Shader3D.propertyNameToID("u_SkyTint");
/**@internal */
SkyProceduralMaterial.GROUNDTINT = Shader3D.propertyNameToID("u_GroundTint");
/**@internal */
SkyProceduralMaterial.EXPOSURE = Shader3D.propertyNameToID("u_Exposure");
