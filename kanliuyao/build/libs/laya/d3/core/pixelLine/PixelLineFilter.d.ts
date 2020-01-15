import { Color } from "../../math/Color";
import { Vector3 } from "../../math/Vector3";
import { Bounds } from "../Bounds";
import { GeometryElement } from "../GeometryElement";
import { RenderContext3D } from "../render/RenderContext3D";
import { PixelLineData } from "./PixelLineData";
import { PixelLineSprite3D } from "./PixelLineSprite3D";
/**
 * <code>PixelLineFilter</code> 类用于线过滤器。
 */
export declare class PixelLineFilter extends GeometryElement {
    /** @private */
    private static _tempVector0;
    /** @private */
    private static _tempVector1;
    /**@internal */
    private static _type;
    /** @internal */
    private _floatCountPerVertices;
    /** @internal */
    private _owner;
    /** @internal */
    private _vertexBuffer;
    /** @internal */
    private _vertices;
    /** @internal */
    private _minUpdate;
    /** @internal */
    private _maxUpdate;
    /** @internal */
    private _bufferState;
    /** @internal */
    private _floatBound;
    /** @internal */
    private _calculateBound;
    /** @internal */
    _bounds: Bounds;
    /** @internal */
    _maxLineCount: number;
    /** @internal */
    _lineCount: number;
    constructor(owner: PixelLineSprite3D, maxLineCount: number);
    /**
     *	{@inheritDoc PixelLineFilter._getType}
     *	@override
     */
    _getType(): number;
    /**
     * @internal
     */
    _resizeLineData(maxCount: number): void;
    /**
     * @internal
     */
    private _updateLineVertices;
    /**
     * @internal
     */
    _reCalculateBound(): void;
    /**
     * @internal
     */
    _removeLineData(index: number): void;
    /**
     * @internal
     */
    _updateLineData(index: number, startPosition: Vector3, endPosition: Vector3, startColor: Color, endColor: Color): void;
    /**
     * @internal
     */
    _updateLineDatas(index: number, data: PixelLineData[]): void;
    /**
     * 获取线段数据
     * @return 线段数据。
     */
    _getLineData(index: number, out: PixelLineData): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _prepareRender(state: RenderContext3D): boolean;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _render(state: RenderContext3D): void;
    /**
     * @inheritDoc
     * @override
     */
    destroy(): void;
}
