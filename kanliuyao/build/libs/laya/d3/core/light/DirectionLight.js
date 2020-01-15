import { Vector3 } from "../../math/Vector3";
import { ParallelSplitShadowMap } from "../../shadowMap/ParallelSplitShadowMap";
import { Scene3DShaderDeclaration } from "../scene/Scene3DShaderDeclaration";
import { LightSprite } from "./LightSprite";
/**
 * <code>DirectionLight</code> 类用于创建平行光。
 */
export class DirectionLight extends LightSprite {
    /**
     * 创建一个 <code>DirectionLight</code> 实例。
     */
    constructor() {
        super();
        this._direction = new Vector3();
    }
    /**
     * @inheritDoc
     * @override
     */
    set shadow(value) {
        if (this._shadow !== value) {
            this._shadow = value;
            (this.scene) && (this._initShadow());
        }
    }
    /**
     * @internal
     */
    _initShadow() {
        if (this._shadow) {
            this._parallelSplitShadowMap = new ParallelSplitShadowMap();
            this.scene.parallelSplitShadowMaps.push(this._parallelSplitShadowMap);
            this.transform.worldMatrix.getForward(this._direction);
            Vector3.normalize(this._direction, this._direction);
            this._parallelSplitShadowMap.setInfo(this.scene, this._shadowFarPlane, this._direction, this._shadowMapSize, this._shadowMapCount, this._shadowMapPCFType);
        }
        else {
            var defineDatas = this._scene._shaderValues;
            var parallelSplitShadowMaps = this.scene.parallelSplitShadowMaps;
            parallelSplitShadowMaps.splice(parallelSplitShadowMaps.indexOf(this._parallelSplitShadowMap), 1);
            this._parallelSplitShadowMap.disposeAllRenderTarget();
            this._parallelSplitShadowMap = null;
            defineDatas.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_PSSM1);
            defineDatas.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_PSSM2);
            defineDatas.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_PSSM3);
        }
    }
    /**
     * @internal
     * @override
     */
    _addToLightQueue() {
        this._scene._directionLights.add(this);
    }
    /**
     * @internal
     * @override
     */
    _removeFromLightQueue() {
        this._scene._directionLights.remove(this);
    }
}
