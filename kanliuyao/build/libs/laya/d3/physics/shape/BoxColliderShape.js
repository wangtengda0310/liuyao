import { Physics3D } from "../Physics3D";
import { ColliderShape } from "./ColliderShape";
/**
 * <code>BoxColliderShape</code> 类用于创建盒子形状碰撞器。
 */
export class BoxColliderShape extends ColliderShape {
    /**
     * 创建一个新的 <code>BoxColliderShape</code> 实例。
     * @param sizeX 盒子X轴尺寸。
     * @param sizeY 盒子Y轴尺寸。
     * @param sizeZ 盒子Z轴尺寸。
     */
    constructor(sizeX = 1.0, sizeY = 1.0, sizeZ = 1.0) {
        super();
        this._sizeX = sizeX;
        this._sizeY = sizeY;
        this._sizeZ = sizeZ;
        this._type = ColliderShape.SHAPETYPES_BOX;
        var bt = Physics3D._bullet;
        bt.btVector3_setValue(BoxColliderShape._btSize, sizeX / 2, sizeY / 2, sizeZ / 2);
        this._btShape = bt.btBoxShape_create(BoxColliderShape._btSize);
    }
    /**
    * @internal
    */
    static __init__() {
        BoxColliderShape._btSize = Physics3D._bullet.btVector3_create(0, 0, 0);
    }
    /**
     * X轴尺寸。
     */
    get sizeX() {
        return this._sizeX;
    }
    /**
     * Y轴尺寸。
     */
    get sizeY() {
        return this._sizeY;
    }
    /**
     * Z轴尺寸。
     */
    get sizeZ() {
        return this._sizeZ;
    }
    /**
     * @inheritDoc
     * @override
     */
    clone() {
        var dest = new BoxColliderShape(this._sizeX, this._sizeY, this._sizeZ);
        this.cloneTo(dest);
        return dest;
    }
}
