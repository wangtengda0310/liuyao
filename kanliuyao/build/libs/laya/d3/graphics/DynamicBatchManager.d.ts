import { RenderElement } from "../core/render/RenderElement";
/**
 * @internal
 * <code>DynamicBatchManager</code> 类用于管理动态批处理。
 */
export declare class DynamicBatchManager {
    /** @internal [只读]*/
    static _managers: DynamicBatchManager[];
    /**
     * @internal
     */
    static _registerManager(manager: DynamicBatchManager): void;
    /** @internal */
    protected _batchRenderElementPool: RenderElement[];
    /** @internal */
    protected _batchRenderElementPoolIndex: number;
    /**
     * 创建一个 <code>DynamicBatchManager</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    _clear(): void;
    /**
     * @internal
     */
    _getBatchRenderElementFromPool(): RenderElement;
    /**
     * @internal
     */
    dispose(): void;
}
