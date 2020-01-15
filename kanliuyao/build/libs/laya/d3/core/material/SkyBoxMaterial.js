import { Vector4 } from "../../math/Vector4";
import { Shader3D } from "../../shader/Shader3D";
import { Material } from "./Material";
/**
 * <code>SkyBoxMaterial</code> 类用于实现SkyBoxMaterial材质。
 */
export class SkyBoxMaterial extends Material {
    /**
     * 创建一个 <code>SkyBoxMaterial</code> 实例。
     */
    constructor() {
        super();
        this.setShaderName("SkyBox");
        this.tintColor = new Vector4(0.5, 0.5, 0.5, 0.5);
        this.exposure = 1.0;
        this.rotation = 0;
    }
    /**
    * @internal
    */
    static __initDefine__() {
    }
    /**
     * 颜色。
     */
    get tintColor() {
        return this._shaderValues.getVector(SkyBoxMaterial.TINTCOLOR);
    }
    set tintColor(value) {
        this._shaderValues.setVector(SkyBoxMaterial.TINTCOLOR, value);
    }
    /**
     * 曝光强度。
     */
    get exposure() {
        return this._shaderValues.getNumber(SkyBoxMaterial.EXPOSURE);
    }
    set exposure(value) {
        this._shaderValues.setNumber(SkyBoxMaterial.EXPOSURE, value);
    }
    /**
     * 曝光强度。
     */
    get rotation() {
        return this._shaderValues.getNumber(SkyBoxMaterial.ROTATION);
    }
    set rotation(value) {
        this._shaderValues.setNumber(SkyBoxMaterial.ROTATION, value);
    }
    /**
     * 天空盒纹理。
     */
    get textureCube() {
        return this._shaderValues.getTexture(SkyBoxMaterial.TEXTURECUBE);
    }
    set textureCube(value) {
        this._shaderValues.setTexture(SkyBoxMaterial.TEXTURECUBE, value);
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone() {
        var dest = new SkyBoxMaterial();
        this.cloneTo(dest);
        return dest;
    }
}
SkyBoxMaterial.TINTCOLOR = Shader3D.propertyNameToID("u_TintColor");
SkyBoxMaterial.EXPOSURE = Shader3D.propertyNameToID("u_Exposure");
SkyBoxMaterial.ROTATION = Shader3D.propertyNameToID("u_Rotation");
SkyBoxMaterial.TEXTURECUBE = Shader3D.propertyNameToID("u_CubeTexture");
