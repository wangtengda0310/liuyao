import { ColliderShape } from "./ColliderShape";
import { Physics3D } from "../Physics3D";
/**
 * <code>CompoundColliderShape</code> 类用于创建盒子形状碰撞器。
 */
export class CompoundColliderShape extends ColliderShape {
    /**
     * 创建一个新的 <code>CompoundColliderShape</code> 实例。
     */
    constructor() {
        super();
        /**@internal */
        this._childColliderShapes = [];
        this._type = ColliderShape.SHAPETYPES_COMPOUND;
        this._btShape = Physics3D._bullet.btCompoundShape_create();
    }
    /**
     * @internal
     */
    static __init__() {
        var bt = Physics3D._bullet;
        CompoundColliderShape._btVector3One = bt.btVector3_create(1, 1, 1);
        CompoundColliderShape._btTransform = bt.btTransform_create();
        CompoundColliderShape._btOffset = bt.btVector3_create(0, 0, 0);
        CompoundColliderShape._btRotation = bt.btQuaternion_create(0, 0, 0, 1);
    }
    /**
     * @internal
     */
    _clearChildShape(shape) {
        shape._attatched = false;
        shape._compoundParent = null;
        shape._indexInCompound = -1;
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _addReference() {
        //TODO:
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _removeReference() {
        //TODO:
    }
    /**
     * @internal
     */
    _updateChildTransform(shape) {
        var bt = Physics3D._bullet;
        var offset = shape.localOffset;
        var rotation = shape.localRotation;
        var btOffset = ColliderShape._btVector30;
        var btQuaternion = ColliderShape._btQuaternion0;
        var btTransform = ColliderShape._btTransform0;
        bt.btVector3_setValue(btOffset, -offset.x, offset.y, offset.z);
        bt.btQuaternion_setValue(btQuaternion, -rotation.x, rotation.y, rotation.z, -rotation.w);
        bt.btTransform_setOrigin(btTransform, btOffset);
        bt.btTransform_setRotation(btTransform, btQuaternion);
        bt.btCompoundShape_updateChildTransform(this._btShape, shape._indexInCompound, btTransform, true);
    }
    /**
     * 添加子碰撞器形状。
     * @param	shape 子碰撞器形状。
     */
    addChildShape(shape) {
        if (shape._attatched)
            throw "CompoundColliderShape: this shape has attatched to other entity.";
        shape._attatched = true;
        shape._compoundParent = this;
        shape._indexInCompound = this._childColliderShapes.length;
        this._childColliderShapes.push(shape);
        var offset = shape.localOffset;
        var rotation = shape.localRotation;
        var bt = Physics3D._bullet;
        bt.btVector3_setValue(CompoundColliderShape._btOffset, -offset.x, offset.y, offset.z);
        bt.btQuaternion_setValue(CompoundColliderShape._btRotation, -rotation.x, rotation.y, rotation.z, -rotation.w);
        bt.btTransform_setOrigin(CompoundColliderShape._btTransform, CompoundColliderShape._btOffset);
        bt.btTransform_setRotation(CompoundColliderShape._btTransform, CompoundColliderShape._btRotation);
        var btScale = bt.btCollisionShape_getLocalScaling(this._btShape);
        bt.btCollisionShape_setLocalScaling(this._btShape, CompoundColliderShape._btVector3One);
        bt.btCompoundShape_addChildShape(this._btShape, CompoundColliderShape._btTransform, shape._btShape);
        bt.btCollisionShape_setLocalScaling(this._btShape, btScale);
        (this._attatchedCollisionObject) && (this._attatchedCollisionObject.colliderShape = this); //修改子Shape需要重新赋值父Shape以及将物理精灵重新加入物理世界等操作
    }
    /**
     * 移除子碰撞器形状。
     * @param	shape 子碰撞器形状。
     */
    removeChildShape(shape) {
        if (shape._compoundParent === this) {
            var index = shape._indexInCompound;
            this._clearChildShape(shape);
            var endShape = this._childColliderShapes[this._childColliderShapes.length - 1];
            endShape._indexInCompound = index;
            this._childColliderShapes[index] = endShape;
            this._childColliderShapes.pop();
            Physics3D._bullet.btCompoundShape_removeChildShapeByIndex(this._btShape, index);
        }
    }
    /**
     * 清空子碰撞器形状。
     */
    clearChildShape() {
        for (var i = 0, n = this._childColliderShapes.length; i < n; i++) {
            this._clearChildShape(this._childColliderShapes[i]);
            Physics3D._bullet.btCompoundShape_removeChildShapeByIndex(this._btShape, 0);
        }
        this._childColliderShapes.length = 0;
    }
    /**
     * 获取子形状数量。
     * @return
     */
    getChildShapeCount() {
        return this._childColliderShapes.length;
    }
    /**
     * @inheritDoc
     * @override
     */
    cloneTo(destObject) {
        var destCompoundColliderShape = destObject;
        destCompoundColliderShape.clearChildShape();
        for (var i = 0, n = this._childColliderShapes.length; i < n; i++)
            destCompoundColliderShape.addChildShape(this._childColliderShapes[i].clone());
    }
    /**
     * @inheritDoc
     * @override
     */
    clone() {
        var dest = new CompoundColliderShape();
        this.cloneTo(dest);
        return dest;
    }
    /**
     * @inheritDoc
     * @override
     */
    destroy() {
        super.destroy();
        for (var i = 0, n = this._childColliderShapes.length; i < n; i++) {
            var childShape = this._childColliderShapes[i];
            if (childShape._referenceCount === 0)
                childShape.destroy();
        }
    }
}
