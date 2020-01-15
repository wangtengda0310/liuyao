import { ContactPoint } from "./ContactPoint";
import { HitResult } from "./HitResult";
import { Collision } from "./Collision";
import { PhysicsComponent } from "./PhysicsComponent";
/**
 * <code>CollisionMap</code> 类用于实现碰撞组合实例图。
 */
export declare class CollisionTool {
    /**@internal	*/
    private _hitResultsPoolIndex;
    /**@internal	*/
    private _hitResultsPool;
    /**@internal	*/
    private _contactPonintsPoolIndex;
    /**@internal	*/
    private _contactPointsPool;
    /**@internal */
    private _collisionsPool;
    /**@internal */
    private _collisions;
    /**
     * 创建一个 <code>CollisionMap</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    getHitResult(): HitResult;
    /**
     * @internal
     */
    recoverAllHitResultsPool(): void;
    /**
     * @internal
     */
    getContactPoints(): ContactPoint;
    /**
     * @internal
     */
    recoverAllContactPointsPool(): void;
    /**
     * @internal
     */
    getCollision(physicComponentA: PhysicsComponent, physicComponentB: PhysicsComponent): Collision;
    /**
     * @internal
     */
    recoverCollision(collision: Collision): void;
    /**
     * @internal
     */
    garbageCollection(): void;
}
