import { BaseTexture } from "../../../../resource/BaseTexture";
import { Vector4 } from "../../../math/Vector4";
import { RenderTexture } from "../../../resource/RenderTexture";
import { Shader3D } from "../../../shader/Shader3D";
import { ShaderData } from "../../../shader/ShaderData";
import { Command } from "./Command";
/**
 * <code>BlitScreenQuadCMD</code> 类用于创建从一张渲染目标输出到另外一张渲染目标指令。
 */
export declare class BlitScreenQuadCMD extends Command {
    /**@internal */
    static _SCREENTYPE_QUAD: number;
    /**@internal */
    static _SCREENTYPE_TRIANGLE: number;
    /** @internal */
    private static _compileDefine;
    /**@internal */
    private static _pool;
    /** @internal */
    private static _defaultOffsetScale;
    /**@internal */
    private _source;
    /**@internal */
    private _dest;
    /**@internal */
    private _offsetScale;
    /**@internal */
    private _shader;
    /**@internal */
    private _shaderData;
    /**@internal */
    private _subShader;
    /**@internal */
    private _sourceTexelSize;
    /**@internal */
    private _screenType;
    /**
     *
     */
    static create(source: BaseTexture, dest: RenderTexture, offsetScale?: Vector4, shader?: Shader3D, shaderData?: ShaderData, subShader?: number, screenType?: number): BlitScreenQuadCMD;
    /**
     * @inheritDoc
     * @override
     */
    run(): void;
    /**
     * @inheritDoc
     * @override
     */
    recover(): void;
}
