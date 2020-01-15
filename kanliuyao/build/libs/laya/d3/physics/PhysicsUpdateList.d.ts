import { PhysicsComponent } from "./PhysicsComponent";
import { SingletonList } from "../component/SingletonList";
import { ISingletonElement } from "../../resource/ISingletonElement";
/**
 * <code>PhysicsUpdateList</code> 类用于实现物理更新队列。
 */
export declare class PhysicsUpdateList extends SingletonList<ISingletonElement> {
    /**
     * 创建一个新的 <code>PhysicsUpdateList</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    add(element: PhysicsComponent): void;
    /**
     * @internal
     */
    remove(element: PhysicsComponent): void;
}
