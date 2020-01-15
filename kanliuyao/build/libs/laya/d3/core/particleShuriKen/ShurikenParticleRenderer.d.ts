import { BoundFrustum } from "../../math/BoundFrustum";
import { Mesh } from "../../resource/models/Mesh";
import { Bounds } from "../Bounds";
import { BaseRender } from "../render/BaseRender";
import { RenderContext3D } from "../render/RenderContext3D";
import { Transform3D } from "../Transform3D";
import { ShuriKenParticle3D } from "./ShuriKenParticle3D";
/**
 * <code>ShurikenParticleRender</code> 类用于创建3D粒子渲染器。
 */
export declare class ShurikenParticleRenderer extends BaseRender {
    /** @internal */
    private _finalGravity;
    /** @internal */
    private _tempRotationMatrix;
    /**@internal */
    private _defaultBoundBox;
    /**@internal */
    private _renderMode;
    /**@internal */
    private _mesh;
    /**拉伸广告牌模式摄像机速度缩放,暂不支持。*/
    stretchedBillboardCameraSpeedScale: number;
    /**拉伸广告牌模式速度缩放。*/
    stretchedBillboardSpeedScale: number;
    /**拉伸广告牌模式长度缩放。*/
    stretchedBillboardLengthScale: number;
    /**
     * 获取渲染模式,0为BILLBOARD、1为STRETCHEDBILLBOARD、2为HORIZONTALBILLBOARD、3为VERTICALBILLBOARD、4为MESH。
     */
    renderMode: number;
    /**
     * 获取网格渲染模式所使用的Mesh,rendderMode为4时生效。
     */
    mesh: Mesh;
    /**
     * 创建一个 <code>ShurikenParticleRender</code> 实例。
     */
    constructor(owner: ShuriKenParticle3D);
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
     * @inheritDoc
     * @internal
     * @override
     */
    _renderUpdate(context: RenderContext3D, transfrom: Transform3D): void;
    /**
     * @inheritDoc
     * @override
     */
    readonly bounds: Bounds;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _destroy(): void;
}
