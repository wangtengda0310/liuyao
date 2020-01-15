import { Command } from "./Command";
import { RenderTexture } from "../../../resource/RenderTexture";
/**
 * @internal
 * <code>SetRenderTargetCMD</code> 类用于创建设置渲染目标指令。
 */
export declare class SetRenderTargetCMD extends Command {
    /**@internal */
    private static _pool;
    /**@internal */
    private _renderTexture;
    /**
     * @internal
     */
    static create(renderTexture: RenderTexture): SetRenderTargetCMD;
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
