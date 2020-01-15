import { Physics3D } from "../Physics3D";
import { ColliderShape } from "./ColliderShape";
/**
 * <code>CylinderColliderShape</code> 类用于创建圆柱碰撞器。
 */
export class CylinderColliderShape extends ColliderShape {
    /**
     * 创建一个新的 <code>CylinderColliderShape</code> 实例。
     * @param height 高。
     * @param radius 半径。
     */
    constructor(radius = 0.5, height = 1.0, orientation = ColliderShape.SHAPEORIENTATION_UPY) {
        super();
        this._radius = 1;
        this._height = 0.5;
        this._radius = radius;
        this._height = height;
        this._orientation = orientation;
        this._type = ColliderShape.SHAPETYPES_CYLINDER;
        var bt = Physics3D._bullet;
        switch (orientation) {
            case ColliderShape.SHAPEORIENTATION_UPX:
                bt.btVector3_setValue(CylinderColliderShape._btSize, height / 2, radius, radius);
                this._btShape = bt.btCylinderShapeX_create(CylinderColliderShape._btSize);
                break;
            case ColliderShape.SHAPEORIENTATION_UPY:
                bt.btVector3_setValue(CylinderColliderShape._btSize, radius, height / 2, radius);
                this._btShape = bt.btCylinderShape_create(CylinderColliderShape._btSize);
                break;
            case ColliderShape.SHAPEORIENTATION_UPZ:
                bt.btVector3_setValue(CylinderColliderShape._btSize, radius, radius, height / 2);
                this._btShape = bt.btCylinderShapeZ_create(CylinderColliderShape._btSize);
                break;
            default:
                throw "CapsuleColliderShape:unknown orientation.";
        }
    }
    /**
    * @internal
    */
    static __init__() {
        CylinderColliderShape._btSize = Physics3D._bullet.btVector3_create(0, 0, 0);
    }
    /**
     * 半径。
     */
    get radius() {
        return this._radius;
    }
    /**
     * 高度。
     */
    get height() {
        return this._height;
    }
    /**
     * 方向。
     */
    get orientation() {
        return this._orientation;
    }
    /**
     * @inheritDoc
     * @override
     */
    clone() {
        var dest = new CylinderColliderShape(this._radius, this._height, this._orientation);
        this.cloneTo(dest);
        return dest;
    }
}
