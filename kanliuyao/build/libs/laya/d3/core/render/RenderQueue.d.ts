import { SingletonList } from "../../component/SingletonList";
import { RenderContext3D } from "./RenderContext3D";
import { RenderElement } from "./RenderElement";
/**
 * @internal
 * <code>RenderQuene</code> 类用于实现渲染队列。
 */
export declare class RenderQueue {
    /** @internal [只读]*/
    isTransparent: boolean;
    /** @internal */
    elements: SingletonList<RenderElement>;
    /** @internal */
    lastTransparentRenderElement: RenderElement;
    /** @internal */
    lastTransparentBatched: boolean;
    /**
     * 创建一个 <code>RenderQuene</code> 实例。
     */
    constructor(isTransparent?: boolean);
    /**
     * @internal
     */
    private _compare;
    /**
     * @internal
     */
    private _partitionRenderObject;
    /**
     * @internal
     */
    _quickSort(left: number, right: number): void;
    /**
     * @internal
     */
    _render(context: RenderContext3D): void;
    /**
     * @internal
     */
    clear(): void;
}
