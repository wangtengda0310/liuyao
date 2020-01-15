import { Node } from "../../../display/Node";
import { Vector3 } from "../../math/Vector3";
import { ParallelSplitShadowMap } from "../../shadowMap/ParallelSplitShadowMap";
import { Sprite3D } from "../Sprite3D";
/**
 * <code>LightSprite</code> 类用于创建灯光的父类。
 */
export declare class LightSprite extends Sprite3D {
    /** 灯光烘培类型-实时。*/
    static LIGHTMAPBAKEDTYPE_REALTIME: number;
    /** 灯光烘培类型-混合。*/
    static LIGHTMAPBAKEDTYPE_MIXED: number;
    /** 灯光烘培类型-烘焙。*/
    static LIGHTMAPBAKEDTYPE_BAKED: number;
    /** @internal */
    _isAlternate: boolean;
    /** @internal */
    _intensityColor: Vector3;
    /** @internal */
    _intensity: number;
    /** @internal */
    protected _shadow: boolean;
    /** @internal */
    protected _shadowFarPlane: number;
    /** @internal */
    protected _shadowMapSize: number;
    /** @internal */
    protected _shadowMapCount: number;
    /** @internal */
    protected _shadowMapPCFType: number;
    /** @internal */
    _parallelSplitShadowMap: ParallelSplitShadowMap;
    /** @internal */
    _lightmapBakedType: number;
    /** 灯光颜色。 */
    color: Vector3;
    /**
     * 灯光强度。
     */
    intensity: number;
    /**
     * 是否产生阴影。
     */
    shadow: boolean;
    /**
     * 阴影最远范围。
     */
    shadowDistance: number;
    /**
     * 阴影贴图尺寸。
     */
    shadowResolution: number;
    /**
     * 阴影分段数。
     */
    shadowPSSMCount: number;
    /**
     * 阴影PCF类型。
     */
    shadowPCFType: number;
    /**
     * 灯光烘培类型。
     */
    lightmapBakedType: number;
    /**
     * 创建一个 <code>LightSprite</code> 实例。
     */
    constructor();
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data: any, spriteMap: any): void;
    /**
     * @internal
     */
    private _addToScene;
    /**
     * @internal
     */
    private _removeFromScene;
    /**
     * @internal
     */
    protected _addToLightQueue(): void;
    /**
     * @internal
     */
    protected _removeFromLightQueue(): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _onActive(): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _onInActive(): void;
    /**
     * @internal
     */
    protected _create(): Node;
    /**
     * 灯光的漫反射颜色。
     * @return 灯光的漫反射颜色。
     */
    diffuseColor: Vector3;
}
