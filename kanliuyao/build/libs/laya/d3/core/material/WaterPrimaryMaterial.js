import { Vector4 } from "../../math/Vector4";
import { Shader3D } from "../../shader/Shader3D";
import { Material } from "./Material";
/**
 * <code>WaterPrimaryMaterial</code> 类用于实现水材质。
 */
export class WaterPrimaryMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("WaterPrimary");
        this._shaderValues.setVector(WaterPrimaryMaterial.HORIZONCOLOR, new Vector4(0.172, 0.463, 0.435, 0));
        this._shaderValues.setNumber(WaterPrimaryMaterial.WAVESCALE, 0.15);
        this._shaderValues.setVector(WaterPrimaryMaterial.WAVESPEED, new Vector4(19, 9, -16, -7));
    }
    /**
     * @internal
     */
    static __initDefine__() {
        WaterPrimaryMaterial.SHADERDEFINE_MAINTEXTURE = Shader3D.getDefineByName("MAINTEXTURE");
        WaterPrimaryMaterial.SHADERDEFINE_NORMALTEXTURE = Shader3D.getDefineByName("NORMALTEXTURE");
    }
    /**
     * 地平线颜色。
     */
    get horizonColor() {
        return this._shaderValues.getVector(WaterPrimaryMaterial.HORIZONCOLOR);
    }
    set horizonColor(value) {
        this._shaderValues.setVector(WaterPrimaryMaterial.HORIZONCOLOR, value);
    }
    /**
     * 主贴图。
     */
    get mainTexture() {
        return this._shaderValues.getTexture(WaterPrimaryMaterial.MAINTEXTURE);
    }
    set mainTexture(value) {
        if (value)
            this._shaderValues.addDefine(WaterPrimaryMaterial.SHADERDEFINE_MAINTEXTURE);
        else
            this._shaderValues.removeDefine(WaterPrimaryMaterial.SHADERDEFINE_MAINTEXTURE);
        this._shaderValues.setTexture(WaterPrimaryMaterial.MAINTEXTURE, value);
    }
    /**
     * 法线贴图。
     */
    get normalTexture() {
        return this._shaderValues.getTexture(WaterPrimaryMaterial.NORMALTEXTURE);
    }
    set normalTexture(value) {
        if (value)
            this._shaderValues.addDefine(WaterPrimaryMaterial.SHADERDEFINE_NORMALTEXTURE);
        else
            this._shaderValues.removeDefine(WaterPrimaryMaterial.SHADERDEFINE_NORMALTEXTURE);
        this._shaderValues.setTexture(WaterPrimaryMaterial.NORMALTEXTURE, value);
    }
    /**
     * 波动缩放系数。
     */
    get waveScale() {
        return this._shaderValues.getNumber(WaterPrimaryMaterial.WAVESCALE);
    }
    set waveScale(value) {
        this._shaderValues.setNumber(WaterPrimaryMaterial.WAVESCALE, value);
    }
    /**
     * 波动速率。
     */
    get waveSpeed() {
        return this._shaderValues.getVector(WaterPrimaryMaterial.WAVESPEED);
    }
    set waveSpeed(value) {
        this._shaderValues.setVector(WaterPrimaryMaterial.WAVESPEED, value);
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone() {
        var dest = new WaterPrimaryMaterial();
        this.cloneTo(dest);
        return dest;
    }
}
WaterPrimaryMaterial.HORIZONCOLOR = Shader3D.propertyNameToID("u_HorizonColor");
WaterPrimaryMaterial.MAINTEXTURE = Shader3D.propertyNameToID("u_MainTexture");
WaterPrimaryMaterial.NORMALTEXTURE = Shader3D.propertyNameToID("u_NormalTexture");
WaterPrimaryMaterial.WAVESCALE = Shader3D.propertyNameToID("u_WaveScale");
WaterPrimaryMaterial.WAVESPEED = Shader3D.propertyNameToID("u_WaveSpeed");
