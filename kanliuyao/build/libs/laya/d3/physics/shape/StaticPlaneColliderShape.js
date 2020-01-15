import { ColliderShape } from "./ColliderShape";
import { Physics3D } from "../Physics3D";
/**
 * <code>StaticPlaneColliderShape</code> 类用于创建静态平面碰撞器。
 */
export class StaticPlaneColliderShape extends ColliderShape {
    /**
     * 创建一个新的 <code>StaticPlaneColliderShape</code> 实例。
     */
    constructor(normal, offset) {
        super();
        this._normal = normal;
        this._offset = offset;
        this._type = ColliderShape.SHAPETYPES_STATICPLANE;
        var bt = Physics3D._bullet;
        bt.btVector3_setValue(StaticPlaneColliderShape._btNormal, -normal.x, normal.y, normal.z);
        this._btShape = bt.btStaticPlaneShape_create(StaticPlaneColliderShape._btNormal, offset);
    }
    /**
     * @internal
     */
    static __init__() {
        StaticPlaneColliderShape._btNormal = Physics3D._bullet.btVector3_create(0, 0, 0);
    }
    /**
     * @inheritDoc
     * @override
     */
    clone() {
        var dest = new StaticPlaneColliderShape(this._normal, this._offset);
        this.cloneTo(dest);
        return dest;
    }
}
