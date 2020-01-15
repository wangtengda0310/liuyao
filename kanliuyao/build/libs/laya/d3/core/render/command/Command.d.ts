import { Shader3D } from "../../../../d3/shader/Shader3D";
import { ShaderData } from "../../../../d3/shader/ShaderData";
/**
 * <code>Command</code> 类用于创建指令。
 */
export declare class Command {
    /**@internal */
    static _screenShaderData: ShaderData;
    /** @internal */
    static _screenShader: Shader3D;
    /** @internal */
    static SCREENTEXTURE_NAME: string;
    /** @internal */
    static SCREENTEXTUREOFFSETSCALE_NAME: string;
    /** @internal */
    static MAINTEXTURE_TEXELSIZE_NAME: string;
    /** @internal */
    static SCREENTEXTURE_ID: number;
    /** @internal */
    static SCREENTEXTUREOFFSETSCALE_ID: number;
    /** @internal */
    static MAINTEXTURE_TEXELSIZE_ID: number;
    /**@internal */
    private _commandBuffer;
    /**
    * @internal
    */
    static __init__(): void;
    /**
     * 创建一个 <code>Command</code> 实例。
     */
    constructor();
    /**
     *
     */
    run(): void;
    /**
     *
     */
    recover(): void;
}
