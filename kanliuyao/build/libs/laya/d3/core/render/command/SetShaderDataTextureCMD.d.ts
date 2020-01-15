import { Command } from "./Command";
import { ShaderData } from "../../../shader/ShaderData";
import { BaseTexture } from "../../../../resource/BaseTexture";
/**
 * @internal
 * <code>SetShaderDataTextureCMD</code> 类用于创建设置渲染目标指令。
 */
export declare class SetShaderDataTextureCMD extends Command {
    /**@internal */
    private static _pool;
    /**@internal */
    private _shaderData;
    /**@internal */
    private _nameID;
    /**@internal */
    private _texture;
    /**
     * @internal
     */
    static create(shaderData: ShaderData, nameID: number, texture: BaseTexture): SetShaderDataTextureCMD;
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
