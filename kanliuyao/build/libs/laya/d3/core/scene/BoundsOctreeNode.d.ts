import { BoundBox } from "../../math/BoundBox";
import { Ray } from "../../math/Ray";
import { Vector3 } from "../../math/Vector3";
import { PixelLineSprite3D } from "../pixelLine/PixelLineSprite3D";
import { RenderContext3D } from "../render/RenderContext3D";
import { IOctreeObject } from "./IOctreeObject";
import { BoundsOctree } from "./BoundsOctree";
import { Shader3D } from "../../shader/Shader3D";
/**
 * <code>BoundsOctreeNode</code> 类用于创建八叉树节点。
 */
export declare class BoundsOctreeNode {
    /**@internal */
    private static _tempVector3;
    /**@internal */
    private static _tempVector30;
    /**@internal */
    private static _tempVector31;
    /**@internal */
    private static _tempColor0;
    /**@internal */
    private static _tempBoundBox;
    /**@internal */
    private static _NUM_OBJECTS_ALLOWED;
    /**
     * @internal
     */
    private static _encapsulates;
    /**@internal */
    _octree: BoundsOctree;
    /**@internal */
    _parent: BoundsOctreeNode;
    /**@internal AABB包围盒*/
    private _bounds;
    /**@internal */
    private _objects;
    /**@internal */
    _children: BoundsOctreeNode[];
    /**@internal [Debug]*/
    _isContaion: boolean;
    /**@internal	[只读]*/
    center: Vector3;
    /**@internal	[只读]*/
    baseLength: number;
    /**
     * 创建一个 <code>BoundsOctreeNode</code> 实例。
     * @param octree  所属八叉树。
     * @param parent  父节点。
     * @param baseLength  节点基本长度。
     * @param center  节点的中心位置。
     */
    constructor(octree: BoundsOctree, parent: BoundsOctreeNode, baseLength: number, center: Vector3);
    /**
     * @internal
     */
    private _setValues;
    /**
     * @internal
     */
    private _getChildBound;
    /**
     * @internal
     */
    private _getChildCenter;
    /**
     * @internal
     */
    private _getChild;
    /**
     * @internal
     * 是否合并判断(如果该节点和子节点包含的物体小于_NUM_OBJECTS_ALLOWED则应将子节点合并到该节点)
     */
    private _shouldMerge;
    /**
     * @internal
     */
    private _mergeChildren;
    /**
     * @internal
     */
    private _merge;
    /**
     * @internal
     */
    private _checkAddNode;
    /**
     * @internal
     */
    private _add;
    /**
     * @internal
     */
    private _remove;
    /**
     * @internal
     */
    private _addUp;
    /**
     * @internal
     */
    private _getCollidingWithFrustum;
    /**
     * @internal
     */
    private _getCollidingWithBoundBox;
    /**
     * @internal
     */
    _bestFitChild(boundCenter: Vector3): number;
    /**
     * @internal
     * @return 是否需要扩充根节点
     */
    _update(object: IOctreeObject): boolean;
    /**
     * 添加指定物体。
     * @param	object 指定物体。
     */
    add(object: IOctreeObject): boolean;
    /**
     * 移除指定物体。
     * @param	obejct 指定物体。
     * @return 是否成功。
     */
    remove(object: IOctreeObject): boolean;
    /**
     * 更新制定物体，
     * @param	obejct 指定物体。
     * @return 是否成功。
     */
    update(object: IOctreeObject): boolean;
    /**
     * 	收缩八叉树节点。
     *	-所有物体都在根节点的八分之一区域
     * 	-该节点无子节点或有子节点但1/8的子节点不包含物体
     *	@param minLength 最小尺寸。
     * 	@return 新的根节点。
     */
    shrinkIfPossible(minLength: number): BoundsOctreeNode;
    /**
     * 检查该节点和其子节点是否包含任意物体。
     * @return 是否包含任意物体。
     */
    hasAnyObjects(): boolean;
    /**
     * 获取与指定包围盒相交的物体列表。
     * @param checkBound AABB包围盒。
     * @param result 相交物体列表
     */
    getCollidingWithBoundBox(checkBound: BoundBox, result: any[]): void;
    /**
     *	获取与指定射线相交的的物理列表。
     * 	@param	ray 射线。
     * 	@param	result 相交物体列表。
     * 	@param	maxDistance 射线的最大距离。
     */
    getCollidingWithRay(ray: Ray, result: any[], maxDistance?: number): void;
    /**
     *	获取与指定视锥相交的的物理列表。
     * 	@param	ray 射线。.
     * 	@param	result 相交物体列表。
     */
    getCollidingWithFrustum(context: RenderContext3D, customShader: Shader3D, replacementTag: string, isShadowCasterCull: boolean): void;
    /**
     * 获取是否与指定包围盒相交。
     * @param checkBound AABB包围盒。
     * @return 是否相交。
     */
    isCollidingWithBoundBox(checkBound: BoundBox): boolean;
    /**
     *	获取是否与指定射线相交。
     * 	@param	ray 射线。
     * 	@param	maxDistance 射线的最大距离。
     *  @return 是否相交。
     */
    isCollidingWithRay(ray: Ray, maxDistance?: number): boolean;
    /**
     * 获取包围盒。
     */
    getBound(): BoundBox;
    /**
     * @internal
     * [Debug]
     */
    drawAllBounds(debugLine: PixelLineSprite3D, currentDepth: number, maxDepth: number): void;
    /**
     * @internal
     * [Debug]
     */
    drawAllObjects(debugLine: PixelLineSprite3D, currentDepth: number, maxDepth: number): void;
}
