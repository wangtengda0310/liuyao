import { ContactPoint } from "./ContactPoint";
import { PhysicsComponent } from "./PhysicsComponent";
/**
 * <code>Collision</code> 类用于创建物理碰撞信息。
 */
export declare class Collision {
    /**@internal */
    _lastUpdateFrame: number;
    /**@internal */
    _updateFrame: number;
    /**@internal */
    _isTrigger: boolean;
    /**@internal */
    _colliderA: PhysicsComponent;
    /**@internal */
    _colliderB: PhysicsComponent;
    /**@readonly*/
    contacts: ContactPoint[];
    /**@readonly*/
    other: PhysicsComponent;
    /**
     * 创建一个 <code>Collision</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    _setUpdateFrame(farme: number): void;
}
