import { Config3D } from "../../../../Config3D";
import { Vector3 } from "../../math/Vector3";
import { Sprite3D } from "../Sprite3D";
/**
 * <code>LightSprite</code> 类用于创建灯光的父类。
 */
export class LightSprite extends Sprite3D {
    /**
     * 创建一个 <code>LightSprite</code> 实例。
     */
    constructor() {
        super();
        /** @internal */
        this._isAlternate = false;
        this._intensity = 1.0;
        this._intensityColor = new Vector3();
        this.color = new Vector3(1.0, 1.0, 1.0);
        this._shadow = false;
        this._shadowFarPlane = 8;
        this._shadowMapSize = 512;
        this._shadowMapCount = 1;
        this._shadowMapPCFType = 0;
        this._lightmapBakedType = LightSprite.LIGHTMAPBAKEDTYPE_REALTIME;
    }
    /**
     * 灯光强度。
     */
    get intensity() {
        return this._intensity;
    }
    set intensity(value) {
        this._intensity = value;
    }
    /**
     * 是否产生阴影。
     */
    get shadow() {
        return this._shadow;
    }
    set shadow(value) {
        throw new Error("LightSprite: must override it.");
    }
    /**
     * 阴影最远范围。
     */
    get shadowDistance() {
        return this._shadowFarPlane;
    }
    set shadowDistance(value) {
        this._shadowFarPlane = value;
        (this._parallelSplitShadowMap) && (this._parallelSplitShadowMap.setFarDistance(value));
    }
    /**
     * 阴影贴图尺寸。
     */
    get shadowResolution() {
        return this._shadowMapSize;
    }
    set shadowResolution(value) {
        this._shadowMapSize = value;
        (this._parallelSplitShadowMap) && (this._parallelSplitShadowMap.setShadowMapTextureSize(value));
    }
    /**
     * 阴影分段数。
     */
    get shadowPSSMCount() {
        return this._shadowMapCount;
    }
    set shadowPSSMCount(value) {
        this._shadowMapCount = value;
        (this._parallelSplitShadowMap) && (this._parallelSplitShadowMap.shadowMapCount = value);
    }
    /**
     * 阴影PCF类型。
     */
    get shadowPCFType() {
        return this._shadowMapPCFType;
    }
    set shadowPCFType(value) {
        this._shadowMapPCFType = value;
        (this._parallelSplitShadowMap) && (this._parallelSplitShadowMap.setPCFType(value));
    }
    /**
     * 灯光烘培类型。
     */
    get lightmapBakedType() {
        return this._lightmapBakedType;
    }
    set lightmapBakedType(value) {
        if (this._lightmapBakedType !== value) {
            this._lightmapBakedType = value;
            if (this.activeInHierarchy) {
                if (value !== LightSprite.LIGHTMAPBAKEDTYPE_BAKED)
                    this._addToScene();
                else
                    this._removeFromScene();
            }
        }
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        var colorData = data.color;
        this.color.fromArray(colorData);
        this.intensity = data.intensity;
        this.lightmapBakedType = data.lightmapBakedType;
    }
    /**
     * @internal
     */
    _addToScene() {
        var scene = this._scene;
        var maxLightCount = Config3D._config.maxLightCount;
        if (scene._lightCount < maxLightCount) {
            scene._lightCount++;
            this._addToLightQueue();
            this._isAlternate = false;
        }
        else {
            scene._alternateLights.add(this);
            this._isAlternate = true;
            console.warn("LightSprite:light count has large than maxLightCount,the latest added light will be ignore.");
        }
    }
    /**
     * @internal
     */
    _removeFromScene() {
        var scene = this._scene;
        if (this._isAlternate) {
            scene._alternateLights.remove(this);
        }
        else {
            scene._lightCount--;
            this._removeFromLightQueue();
            if (scene._alternateLights._length > 0) {
                var alternateLight = scene._alternateLights.shift();
                alternateLight._addToLightQueue();
                alternateLight._isAlternate = false;
                scene._lightCount++;
            }
        }
    }
    /**
     * @internal
     */
    _addToLightQueue() {
    }
    /**
     * @internal
     */
    _removeFromLightQueue() {
    }
    /**
     * @inheritDoc
     * @override
     */
    _onActive() {
        super._onActive();
        (this.lightmapBakedType !== LightSprite.LIGHTMAPBAKEDTYPE_BAKED) && (this._addToScene());
    }
    /**
     * @inheritDoc
     * @override
     */
    _onInActive() {
        super._onInActive();
        (this.lightmapBakedType !== LightSprite.LIGHTMAPBAKEDTYPE_BAKED) && (this._removeFromScene());
    }
    /**
     * @internal
     */
    _create() {
        return new LightSprite();
    }
    /**
     * 灯光的漫反射颜色。
     * @return 灯光的漫反射颜色。
     */
    get diffuseColor() {
        console.log("LightSprite: discard property,please use color property instead.");
        return this.color;
    }
    set diffuseColor(value) {
        console.log("LightSprite: discard property,please use color property instead.");
        this.color = value;
    }
}
/** 灯光烘培类型-实时。*/
LightSprite.LIGHTMAPBAKEDTYPE_REALTIME = 0;
/** 灯光烘培类型-混合。*/
LightSprite.LIGHTMAPBAKEDTYPE_MIXED = 1;
/** 灯光烘培类型-烘焙。*/
LightSprite.LIGHTMAPBAKEDTYPE_BAKED = 2;
