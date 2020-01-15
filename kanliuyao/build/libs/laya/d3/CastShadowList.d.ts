import { SingletonList } from "./component/SingletonList";
import { BaseRender } from "./core/render/BaseRender";
import { ISingletonElement } from "../resource/ISingletonElement";
/**
    /**
     * <code>CastShadowList</code> 类用于实现产生阴影者队列。
     */
export declare class CastShadowList extends SingletonList<ISingletonElement> {
    /**
     * 创建一个新的 <code>CastShadowList</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    add(element: BaseRender): void;
    /**
     * @internal
     */
    remove(element: BaseRender): void;
}
