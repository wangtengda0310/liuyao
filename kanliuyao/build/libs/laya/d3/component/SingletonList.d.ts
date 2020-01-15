/**
 * <code>SingletonList</code> 类用于实现单例队列。
 */
export declare class SingletonList<T> {
    /**@internal [只读]*/
    elements: Array<T>;
    /** @internal [只读]*/
    length: number;
    /**
     * 创建一个新的 <code>SingletonList</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    protected _add(element: T): void;
    /**
     * @internal
     */
    add(element: T): void;
}
