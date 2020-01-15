import { BoundFrustum } from "../math/BoundFrustum";
import { Matrix4x4 } from "../math/Matrix4x4";
import { Mesh } from "../resource/models/Mesh";
import { BaseRender } from "./render/BaseRender";
import { RenderContext3D } from "./render/RenderContext3D";
import { RenderElement } from "./render/RenderElement";
import { RenderableSprite3D } from "./RenderableSprite3D";
import { Transform3D } from "./Transform3D";
/**
 * <code>MeshRenderer</code> 类用于网格渲染器。
 */
export declare class MeshRenderer extends BaseRender {
    /** @internal */
    protected _revertStaticBatchDefineUV1: boolean;
    /** @internal */
    protected _revertStaticBatchDefineLightMapUV: boolean;
    /** @internal */
    protected _projectionViewWorldMatrix: Matrix4x4;
    /**
     * 创建一个新的 <code>MeshRender</code> 实例。
     */
    constructor(owner: RenderableSprite3D);
    /**
     * @internal
     */
    _createRenderElement(): RenderElement;
    /**
     * @internal
     */
    _onMeshChange(mesh: Mesh): void;
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
    _needRender(boundFrustum: BoundFrustum, context: RenderContext3D): boolean;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _renderUpdate(context: RenderContext3D, transform: Transform3D): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _renderUpdateWithCamera(context: RenderContext3D, transform: Transform3D): void;
    /**
     * @internal
     * @override
     */
    _revertBatchRenderUpdate(context: RenderContext3D): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _destroy(): void;
}
