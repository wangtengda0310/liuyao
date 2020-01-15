import { SingletonList } from "./SingletonList";
import { ISingletonElement } from "../../resource/ISingletonElement";
/**
 * <code>SimpleSingletonList</code> 类用于实现单例队列。
 */
export declare class SimpleSingletonList extends SingletonList<ISingletonElement> {
    /**
     * 创建一个新的 <code>SimpleSingletonList</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    add(element: ISingletonElement): void;
    /**
     * @internal
     */
    remove(element: ISingletonElement): void;
    /**
     * @internal
     */
    clear(): void;
}
