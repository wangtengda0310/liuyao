import { Vector4 } from "../../math/Vector4";
import { TextureCube } from "../../resource/TextureCube";
import { Material } from "./Material";
/**
 * <code>SkyBoxMaterial</code> 类用于实现SkyBoxMaterial材质。
 */
export declare class SkyBoxMaterial extends Material {
    static TINTCOLOR: number;
    static EXPOSURE: number;
    static ROTATION: number;
    static TEXTURECUBE: number;
    /** 默认材质，禁止修改*/
    static defaultMaterial: SkyBoxMaterial;
    /**
    * @internal
    */
    static __initDefine__(): void;
    /**
     * 颜色。
     */
    tintColor: Vector4;
    /**
     * 曝光强度。
     */
    exposure: number;
    /**
     * 曝光强度。
     */
    rotation: number;
    /**
     * 天空盒纹理。
     */
    textureCube: TextureCube;
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone(): any;
    /**
     * 创建一个 <code>SkyBoxMaterial</code> 实例。
     */
    constructor();
}
