import { IClone } from "./IClone";
import { BoundBox } from "../math/BoundBox";
import { Matrix4x4 } from "../math/Matrix4x4";
import { Vector3 } from "../math/Vector3";
/**
 * <code>Bounds</code> 类用于创建包围体。
 */
export declare class Bounds implements IClone {
    /**@internal */
    static _UPDATE_MIN: number;
    /**@internal */
    static _UPDATE_MAX: number;
    /**@internal */
    static _UPDATE_CENTER: number;
    /**@internal */
    static _UPDATE_EXTENT: number;
    private _updateFlag;
    /**@internal	*/
    _center: Vector3;
    /**@internal	*/
    _extent: Vector3;
    /***/
    _boundBox: BoundBox;
    /**
     * 设置包围盒的最小点。
     * @param value	包围盒的最小点。
     */
    setMin(value: Vector3): void;
    /**
     * 获取包围盒的最小点。
     * @return	包围盒的最小点。
     */
    getMin(): Vector3;
    /**
     * 设置包围盒的最大点。
     * @param value	包围盒的最大点。
     */
    setMax(value: Vector3): void;
    /**
     * 获取包围盒的最大点。
     * @return	包围盒的最大点。
     */
    getMax(): Vector3;
    /**
     * 设置包围盒的中心点。
     * @param value	包围盒的中心点。
     */
    setCenter(value: Vector3): void;
    /**
     * 获取包围盒的中心点。
     * @return	包围盒的中心点。
     */
    getCenter(): Vector3;
    /**
     * 设置包围盒的范围。
     * @param value	包围盒的范围。
     */
    setExtent(value: Vector3): void;
    /**
     * 获取包围盒的范围。
     * @return	包围盒的范围。
     */
    getExtent(): Vector3;
    /**
     * 创建一个 <code>Bounds</code> 实例。
     * @param	min  min 最小坐标
     * @param	max  max 最大坐标。
     */
    constructor(min: Vector3, max: Vector3);
    private _getUpdateFlag;
    private _setUpdateFlag;
    private _getCenter;
    private _getExtent;
    private _getMin;
    private _getMax;
    private _rotateExtents;
    /**
     * @internal
     */
    _tranform(matrix: Matrix4x4, out: Bounds): void;
    /**
     * @internal
     */
    _getBoundBox(): BoundBox;
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject: any): void;
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone(): any;
}
