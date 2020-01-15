import { Vector3 } from "../../math/Vector3";
import { Camera } from "../Camera";
import { GeometryElement } from "../GeometryElement";
import { RenderContext3D } from "../render/RenderContext3D";
import { TrailFilter } from "./TrailFilter";
/**
 * <code>TrailGeometry</code> 类用于创建拖尾渲染单元。
 */
export declare class TrailGeometry extends GeometryElement {
    /** 轨迹准线_面向摄像机。*/
    static ALIGNMENT_VIEW: number;
    /** 轨迹准线_面向运动方向。*/
    static ALIGNMENT_TRANSFORM_Z: number;
    /**@internal */
    private static _tempVector30;
    /**@internal */
    private static _tempVector31;
    /**@internal */
    private static _tempVector32;
    /**@internal */
    private static _tempVector33;
    /**@internal */
    private static _tempVector34;
    /**@internal */
    private static _tempVector35;
    /**@internal */
    private static _tempVector36;
    /**@internal */
    private static _type;
    /**@internal */
    private _floatCountPerVertices1;
    /**@internal */
    private _floatCountPerVertices2;
    /**@internal */
    private _increaseSegementCount;
    /**@internal */
    private _activeIndex;
    /**@internal */
    private _endIndex;
    /**@internal */
    private _needAddFirstVertex;
    /**@internal */
    private _isTempEndVertex;
    /**@internal */
    private _subBirthTime;
    /**@internal */
    private _subDistance;
    /**@internal */
    private _segementCount;
    /**@internal */
    private _vertices1;
    /**@internal */
    private _vertices2;
    /**@internal */
    private _vertexBuffer1;
    /**@internal */
    private _vertexBuffer2;
    /**@internal */
    private _lastFixedVertexPosition;
    /**@internal */
    private _owner;
    /** @internal */
    private _bufferState;
    private tmpColor;
    /** @private */
    private _disappearBoundsMode;
    constructor(owner: TrailFilter);
    /**
     * @internal
     */
    private _resizeData;
    /**
     * @internal
     */
    private _resetData;
    /**
     * @internal
     * 更新Trail数据
     */
    _updateTrail(camera: Camera, lastPosition: Vector3, position: Vector3): void;
    /**
     * @internal
     * 通过起始位置添加TrailRenderElement起始数据
     */
    private _addTrailByFirstPosition;
    /**
     * @internal
     * 通过位置更新TrailRenderElement数据
     */
    private _addTrailByNextPosition;
    /**
     * @internal
     * 通过位置更新顶点数据
     */
    private _updateVerticesByPositionData;
    /**
     * @internal
     * 通过位置更新顶点数据、距离、出生时间
     */
    private _updateVerticesByPosition;
    /**
     * @internal
     * 更新VertexBuffer2数据
     */
    _updateVertexBufferUV(): void;
    /**
     * @internal
     */
    _updateDisappear(): void;
    /**
     * @inheritDoc
     * @override
     */
    _getType(): number;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _prepareRender(state: RenderContext3D): boolean;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _render(state: RenderContext3D): void;
    /**
     * @inheritDoc
     * @override
     */
    destroy(): void;
    /**
     *@internal [NATIVE]
     */
    _calculateBoundingBoxForNative(): void;
}
