import { Matrix4x4 } from "../../math/Matrix4x4";
import { BaseRender } from "../render/BaseRender";
import { RenderContext3D } from "../render/RenderContext3D";
import { Transform3D } from "../Transform3D";
import { PixelLineSprite3D } from "./PixelLineSprite3D";
/**
 * <code>PixelLineRenderer</code> 类用于线渲染器。
 */
export declare class PixelLineRenderer extends BaseRender {
    /** @internal */
    protected _projectionViewWorldMatrix: Matrix4x4;
    constructor(owner: PixelLineSprite3D);
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    protected _calculateBoundingBox(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _renderUpdateWithCamera(context: RenderContext3D, transform: Transform3D): void;
}
