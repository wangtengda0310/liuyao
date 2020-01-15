import { Laya } from "../../../../Laya";
import { Shader3D } from "../../shader/Shader3D";
import { Material } from "./Material";
/**
 * BaseMaterial has deprecated,please use Material instead.
 * @deprecated
 */
export class BaseMaterial {
    /**
     * @deprecated
     * BaseMaterial has deprecated,please use Material instead.
     */
    static load(url, complete) {
        Laya.loader.create(url, complete, null, Material.MATERIAL);
    }
    /**
     * @internal
     */
    static __initDefine__() {
        BaseMaterial.SHADERDEFINE_ALPHATEST = Material.SHADERDEFINE_ALPHATEST;
    }
}
/** @deprecated use Material.MATERIAL instead*/
BaseMaterial.MATERIAL = "MATERIAL";
/** @deprecated use Material.RENDERQUEUE_OPAQUE instead*/
BaseMaterial.RENDERQUEUE_OPAQUE = 2000;
/** @deprecated use Material.RENDERQUEUE_ALPHATEST instead*/
BaseMaterial.RENDERQUEUE_ALPHATEST = 2450;
/** @deprecated use Material.RENDERQUEUE_TRANSPARENT instead*/
BaseMaterial.RENDERQUEUE_TRANSPARENT = 3000;
/** @deprecated use Material.ALPHATESTVALUE instead*/
BaseMaterial.ALPHATESTVALUE = Shader3D.propertyNameToID("u_AlphaTestValue");
/** @deprecated use Material.SHADERDEFINE_ALPHATEST instead*/
BaseMaterial.SHADERDEFINE_ALPHATEST = null;
