import { Vector4 } from "../math/Vector4";
import { Shader3D } from "../shader/Shader3D";
import { Sprite3D } from "./Sprite3D";
import { ILaya3D } from "../../../ILaya3D";
/**
 * <code>RenderableSprite3D</code> 类用于可渲染3D精灵的父类，抽象类不允许实例。
 */
export class RenderableSprite3D extends Sprite3D {
    /**
     * 创建一个 <code>RenderableSprite3D</code> 实例。
     */
    constructor(name) {
        super(name);
    }
    /**
     * @internal
     */
    static __init__() {
        RenderableSprite3D.SHADERDEFINE_RECEIVE_SHADOW = Shader3D.getDefineByName("RECEIVESHADOW");
        RenderableSprite3D.SHADERDEFINE_SCALEOFFSETLIGHTINGMAPUV = Shader3D.getDefineByName("SCALEOFFSETLIGHTINGMAPUV");
        RenderableSprite3D.SAHDERDEFINE_LIGHTMAP = Shader3D.getDefineByName("LIGHTMAP");
    }
    /**
     * @inheritDoc
     * @override
     */
    _onInActive() {
        super._onInActive();
        this._scene._removeRenderObject(this._render);
    }
    /**
     * @inheritDoc
     * @override
     */
    _onActive() {
        super._onActive();
        this._scene._addRenderObject(this._render);
    }
    /**
     * @inheritDoc
     * @override
     */
    _onActiveInScene() {
        super._onActiveInScene();
        if (ILaya3D.Laya3D._editerEnvironment) {
            var scene = this._scene;
            var pickColor = new Vector4();
            scene._allotPickColorByID(this.id, pickColor);
            scene._pickIdToSprite[this.id] = this;
            this._render._shaderValues.setVector(RenderableSprite3D.PICKCOLOR, pickColor);
        }
    }
    /**
     * @internal
     */
    _addToInitStaticBatchManager() {
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _setBelongScene(scene) {
        super._setBelongScene(scene);
        this._render._setBelongScene(scene);
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _setUnBelongScene() {
        this._render._shaderValues.removeDefine(RenderableSprite3D.SAHDERDEFINE_LIGHTMAP);
        super._setUnBelongScene();
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _changeHierarchyAnimator(animator) {
        if (this._hierarchyAnimator) {
            var renderableSprites = this._hierarchyAnimator._renderableSprites;
            renderableSprites.splice(renderableSprites.indexOf(this), 1);
        }
        if (animator)
            animator._renderableSprites.push(this);
        super._changeHierarchyAnimator(animator);
    }
    /**
     * @inheritDoc
     * @override
     */
    destroy(destroyChild = true) {
        super.destroy(destroyChild);
        this._render._destroy();
        this._render = null;
    }
    /**
     * @internal
     */
    _create() {
        return new RenderableSprite3D(this.name);
    }
}
/**着色器变量名，光照贴图缩放和偏移。*/
RenderableSprite3D.LIGHTMAPSCALEOFFSET = Shader3D.propertyNameToID("u_LightmapScaleOffset");
/**着色器变量名，光照贴图。*/
RenderableSprite3D.LIGHTMAP = Shader3D.propertyNameToID("u_LightMap");
/**拾取颜色。*/
RenderableSprite3D.PICKCOLOR = Shader3D.propertyNameToID("u_PickColor");
