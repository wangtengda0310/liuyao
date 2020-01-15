import { ColliderShape } from "./ColliderShape";
import { Physics3D } from "../Physics3D";
/**
 * <code>MeshColliderShape</code> 类用于创建网格碰撞器。
 */
export class MeshColliderShape extends ColliderShape {
    /**
     * 创建一个新的 <code>MeshColliderShape</code> 实例。
     */
    constructor() {
        super();
        /** @internal */
        this._mesh = null;
        /** @internal */
        this._convex = false;
    }
    /**
     * 网格。
     */
    get mesh() {
        return this._mesh;
    }
    set mesh(value) {
        if (this._mesh !== value) {
            var bt = Physics3D._bullet;
            if (this._mesh) {
                bt.destroy(this._btShape);
            }
            if (value) {
                this._btShape = bt.btGImpactMeshShape_create(value._getPhysicMesh());
                bt.btGImpactShapeInterface_updateBound(this._btShape);
            }
            this._mesh = value;
        }
    }
    /**
     * 是否使用凸多边形。
     */
    get convex() {
        return this._convex;
    }
    set convex(value) {
        this._convex = value;
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _setScale(value) {
        if (this._compoundParent) { //TODO:待查,这里有问题
            this.updateLocalTransformations(); //TODO:
        }
        else {
            var bt = Physics3D._bullet;
            bt.btVector3_setValue(ColliderShape._btScale, value.x, value.y, value.z);
            bt.btCollisionShape_setLocalScaling(this._btShape, ColliderShape._btScale);
            bt.btGImpactShapeInterface_updateBound(this._btShape); //更新缩放后需要更新包围体,有性能损耗
        }
    }
    /**
     * @inheritDoc
     * @override
     */
    cloneTo(destObject) {
        var destMeshCollider = destObject;
        destMeshCollider.convex = this._convex;
        destMeshCollider.mesh = this._mesh;
        super.cloneTo(destObject);
    }
    /**
     * @inheritDoc
     * @override
     */
    clone() {
        var dest = new MeshColliderShape();
        this.cloneTo(dest);
        return dest;
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    destroy() {
        if (this._btShape) {
            Physics3D._bullet.btCollisionShape_destroy(this._btShape);
            this._btShape = null;
        }
    }
}
