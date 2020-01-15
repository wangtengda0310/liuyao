import { Handler } from "../../../utils/Handler";
import { ShaderDefine } from "../../shader/ShaderDefine";
/**
 * BaseMaterial has deprecated,please use Material instead.
 * @deprecated
 */
export declare class BaseMaterial {
    /** @deprecated use Material.MATERIAL instead*/
    static MATERIAL: string;
    /** @deprecated use Material.RENDERQUEUE_OPAQUE instead*/
    static RENDERQUEUE_OPAQUE: number;
    /** @deprecated use Material.RENDERQUEUE_ALPHATEST instead*/
    static RENDERQUEUE_ALPHATEST: number;
    /** @deprecated use Material.RENDERQUEUE_TRANSPARENT instead*/
    static RENDERQUEUE_TRANSPARENT: number;
    /** @deprecated use Material.ALPHATESTVALUE instead*/
    static ALPHATESTVALUE: number;
    /** @deprecated use Material.SHADERDEFINE_ALPHATEST instead*/
    static SHADERDEFINE_ALPHATEST: ShaderDefine;
    /**
     * @deprecated
     * BaseMaterial has deprecated,please use Material instead.
     */
    static load(url: string, complete: Handler): void;
    /**
     * @internal
     */
    static __initDefine__(): void;
}
