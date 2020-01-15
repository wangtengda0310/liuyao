import { PhysicsComponent } from "./PhysicsComponent";
import { Physics3D } from "./Physics3D";
/**
 * <code>PhysicsTriggerComponent</code> 类用于创建物理触发器组件。
 */
export class PhysicsTriggerComponent extends PhysicsComponent {
    /**
     * 创建一个 <code>PhysicsTriggerComponent</code> 实例。
     * @param collisionGroup 所属碰撞组。
     * @param canCollideWith 可产生碰撞的碰撞组。
     */
    constructor(collisionGroup, canCollideWith) {
        super(collisionGroup, canCollideWith);
        /** @internal */
        this._isTrigger = false;
    }
    /**
     * 是否为触发器。
     */
    get isTrigger() {
        return this._isTrigger;
    }
    set isTrigger(value) {
        this._isTrigger = value;
        var bt = Physics3D._bullet;
        if (this._btColliderObject) {
            var flags = bt.btCollisionObject_getCollisionFlags(this._btColliderObject);
            if (value) {
                if ((flags & PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE) === 0)
                    bt.btCollisionObject_setCollisionFlags(this._btColliderObject, flags | PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE);
            }
            else {
                if ((flags & PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE) !== 0)
                    bt.btCollisionObject_setCollisionFlags(this._btColliderObject, flags ^ PhysicsComponent.COLLISIONFLAGS_NO_CONTACT_RESPONSE);
            }
        }
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _onAdded() {
        super._onAdded();
        this.isTrigger = this._isTrigger;
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _cloneTo(dest) {
        super._cloneTo(dest);
        dest.isTrigger = this._isTrigger;
    }
}
