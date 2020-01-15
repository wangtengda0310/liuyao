import { BaseShape } from "./BaseShape";
import { BoundBox } from "../../../../math/BoundBox";
import { Rand } from "../../../../math/Rand";
import { Vector2 } from "../../../../math/Vector2";
import { Vector3 } from "../../../../math/Vector3";
/**
 * <code>CircleShape</code> 类用于创建环形粒子形状。
 */
export declare class CircleShape extends BaseShape {
    /** @internal */
    protected static _tempPositionPoint: Vector2;
    /**发射器半径。*/
    radius: number;
    /**环形弧度。*/
    arc: number;
    /**从边缘发射。*/
    emitFromEdge: boolean;
    /**
     * 创建一个 <code>CircleShape</code> 实例。
     */
    constructor();
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    protected _getShapeBoundBox(boundBox: BoundBox): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    protected _getSpeedBoundBox(boundBox: BoundBox): void;
    /**
     *  用于生成粒子初始位置和方向。
     * @param	position 粒子位置。
     * @param	direction 粒子方向。
     * @override
     */
    generatePositionAndDirection(position: Vector3, direction: Vector3, rand?: Rand, randomSeeds?: Uint32Array): void;
    /**
     * @param destObject
     * @override
     */
    cloneTo(destObject: any): void;
    /**
     * @override
     * 克隆。
     * @return	 克隆副本。
     */
    clone(): any;
}
