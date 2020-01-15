import { RenderElement } from "./RenderElement";
import { RenderContext3D } from "./RenderContext3D";
import { Bounds } from "../Bounds";
import { GeometryElement } from "../GeometryElement";
import { RenderableSprite3D } from "../RenderableSprite3D";
import { Transform3D } from "../Transform3D";
import { Material } from "../material/Material";
import { BoundsOctreeNode } from "../scene/BoundsOctreeNode";
import { IOctreeObject } from "../scene/IOctreeObject";
import { Scene3D } from "../scene/Scene3D";
import { BoundFrustum } from "../../math/BoundFrustum";
import { Vector3 } from "../../math/Vector3";
import { Vector4 } from "../../math/Vector4";
import { ShaderData } from "../../shader/ShaderData";
import { EventDispatcher } from "../../../events/EventDispatcher";
import { ISingletonElement } from "../../../resource/ISingletonElement";
/**
 * <code>Render</code> 类用于渲染器的父类，抽象类不允许实例。
 */
export declare class BaseRender extends EventDispatcher implements ISingletonElement, IOctreeObject {
    /**@internal */
    static _tempBoundBoxCorners: Vector3[];
    /**@internal */
    private static _uniqueIDCounter;
    /**@internal */
    private _id;
    /** @internal */
    private _lightmapScaleOffset;
    /** @internal */
    private _lightmapIndex;
    /** @internal */
    private _receiveShadow;
    /** @internal */
    private _materialsInstance;
    /** @internal  [实现IListPool接口]*/
    private _indexInList;
    /** @internal */
    _indexInCastShadowList: number;
    /** @internal */
    protected _bounds: Bounds;
    /** @internal */
    protected _boundsChange: boolean;
    /** @internal */
    _castShadow: boolean;
    _supportOctree: boolean;
    /** @internal */
    _enable: boolean;
    /** @internal */
    _shaderValues: ShaderData;
    /** @internal */
    _sharedMaterials: Material[];
    /** @internal */
    _scene: Scene3D;
    /** @internal */
    _owner: RenderableSprite3D;
    /** @internal */
    _renderElements: RenderElement[];
    /** @internal */
    _distanceForSort: number;
    /**@internal */
    _visible: boolean;
    /** @internal */
    _octreeNode: BoundsOctreeNode;
    /** @internal */
    _indexInOctreeMotionList: number;
    /** @internal */
    _updateMark: number;
    /** @internal */
    _updateRenderType: number;
    /** @internal */
    _isPartOfStaticBatch: boolean;
    /** @internal */
    _staticBatch: GeometryElement;
    /**排序矫正值。*/
    sortingFudge: number;
    /**@internal	[NATIVE]*/
    _cullingBufferIndex: number;
    /**
     * 获取唯一标识ID,通常用于识别。
     */
    readonly id: number;
    /**
     * 光照贴图的索引。
     */
    lightmapIndex: number;
    /**
     * 光照贴图的缩放和偏移。
     */
    lightmapScaleOffset: Vector4;
    /**
     * 是否可用。
     */
    enable: boolean;
    /**
     * 返回第一个实例材质,第一次使用会拷贝实例对象。
     */
    material: Material;
    /**
     * 潜拷贝实例材质列表,第一次使用会拷贝实例对象。
     */
    materials: Material[];
    /**
     * 返回第一个材质。
     */
    sharedMaterial: Material;
    /**
     * 浅拷贝材质列表。
     */
    sharedMaterials: Material[];
    /**
     * 包围盒,只读,不允许修改其值。
     */
    readonly bounds: Bounds;
    /**
    * 是否接收阴影属性
    */
    receiveShadow: boolean;
    /**
     * 是否产生阴影。
     */
    castShadow: boolean;
    /**
     * 是否是静态的一部分。
     */
    readonly isPartOfStaticBatch: boolean;
    /**
     * @internal
     * 创建一个新的 <code>BaseRender</code> 实例。
     */
    constructor(owner: RenderableSprite3D);
    /**
     *
     */
    _getOctreeNode(): BoundsOctreeNode;
    /**
     *
     */
    _setOctreeNode(value: BoundsOctreeNode): void;
    /**
     *
     */
    _getIndexInMotionList(): number;
    /**
     *
     */
    _setIndexInMotionList(value: number): void;
    /**
     * @internal
     */
    private _changeMaterialReference;
    /**
     * @internal
     */
    private _getInstanceMaterial;
    /**
     * @internal
     */
    _applyLightMapParams(): void;
    /**
     * @internal
     */
    protected _onWorldMatNeedChange(flag: number): void;
    /**
     * @internal
     */
    protected _calculateBoundingBox(): void;
    /**
     *  [实现ISingletonElement接口]
     */
    _getIndexInList(): number;
    /**
     *  [实现ISingletonElement接口]
     */
    _setIndexInList(index: number): void;
    /**
     * @internal
     */
    _setBelongScene(scene: Scene3D): void;
    /**
     * @internal
     * @param boundFrustum 如果boundFrustum为空则为摄像机不裁剪模式。
     */
    _needRender(boundFrustum: BoundFrustum, context: RenderContext3D): boolean;
    /**
     * @internal
     */
    _renderUpdate(context: RenderContext3D, transform: Transform3D): void;
    /**
     * @internal
     */
    _renderUpdateWithCamera(context: RenderContext3D, transform: Transform3D): void;
    /**
     * @internal
     */
    _revertBatchRenderUpdate(context: RenderContext3D): void;
    /**
     * @internal
     */
    _destroy(): void;
    /**
     * 标记为非静态,静态合并后可用于取消静态限制。
     */
    markAsUnStatic(): void;
}
