import { TrailSprite3D } from "./TrailSprite3D";
import { Transform3D } from "../Transform3D";
import { BaseRender } from "../render/BaseRender";
import { RenderContext3D } from "../render/RenderContext3D";
import { BoundFrustum } from "../../math/BoundFrustum";
import { Matrix4x4 } from "../../math/Matrix4x4";
/**
 * <code>TrailRenderer</code> 类用于创建拖尾渲染器。
 */
export declare class TrailRenderer extends BaseRender {
    constructor(owner: TrailSprite3D);
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    protected _calculateBoundingBox(): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _needRender(boundFrustum: BoundFrustum, context: RenderContext3D): boolean;
    /**
     *@internal [NATIVE]
     */
    _updateForNative(context: RenderContext3D): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _renderUpdate(state: RenderContext3D, transform: Transform3D): void;
    protected _projectionViewWorldMatrix: Matrix4x4;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _renderUpdateWithCamera(context: RenderContext3D, transform: Transform3D): void;
}
