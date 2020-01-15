import { Camera } from "../Camera";
import { DefineDatas } from "../../shader/DefineDatas";
/**
 * <code>RenderElement</code> 类用于实现渲染元素。
 */
export class RenderElement {
    /**
     * 创建一个 <code>RenderElement</code> 实例。
     */
    constructor() {
        /** @internal */
        this.renderSubShader = null; //TODO：做缓存标记优化
        /** @internal */
        this.renderType = RenderElement.RENDERTYPE_NORMAL;
    }
    /**
     * @internal
     */
    getInvertFront() {
        return this._transform._isFrontFaceInvert;
    }
    /**
     * @internal
     */
    setTransform(transform) {
        this._transform = transform;
    }
    /**
     * @internal
     */
    setGeometry(geometry) {
        this._geometry = geometry;
    }
    /**
     * @internal
     */
    addToOpaqueRenderQueue(context, queue) {
        queue.elements.add(this);
    }
    /**
     * @internal
     */
    addToTransparentRenderQueue(context, queue) {
        queue.elements.add(this);
        queue.lastTransparentBatched = false;
        queue.lastTransparentRenderElement = this;
    }
    /**
     * @internal
     */
    _update(scene, context, customShader, replacementTag) {
        if (this.material) { //材质可能为空
            var subShader = this.material._shader.getSubShaderAt(0); //TODO:
            this.renderSubShader = null;
            if (customShader) {
                if (replacementTag) {
                    var oriTag = subShader.getFlag(replacementTag);
                    if (oriTag) {
                        var customSubShaders = customShader._subShaders;
                        for (var k = 0, p = customSubShaders.length; k < p; k++) {
                            var customSubShader = customSubShaders[k];
                            if (oriTag === customSubShader.getFlag(replacementTag)) {
                                this.renderSubShader = customSubShader;
                                break;
                            }
                        }
                        if (!this.renderSubShader)
                            return;
                    }
                    else {
                        return;
                    }
                }
                else {
                    this.renderSubShader = customShader.getSubShaderAt(0); //TODO:
                }
            }
            else {
                this.renderSubShader = subShader;
            }
            var renderQueue = scene._getRenderQueue(this.material.renderQueue);
            if (renderQueue.isTransparent)
                this.addToTransparentRenderQueue(context, renderQueue);
            else
                this.addToOpaqueRenderQueue(context, renderQueue);
        }
    }
    /**
     * @internal
     */
    _render(context) {
        var forceInvertFace = context.invertY;
        var lastStateMaterial, lastStateShaderInstance, lastStateRender;
        var updateMark = Camera._updateMark;
        var scene = context.scene;
        var camera = context.camera;
        var transform = this._transform;
        var geometry = this._geometry;
        context.renderElement = this;
        var updateRender = updateMark !== this.render._updateMark || this.renderType !== this.render._updateRenderType;
        if (updateRender) { //此处处理更新为裁剪和合并后的，可避免浪费
            this.render._renderUpdate(context, transform);
            this.render._renderUpdateWithCamera(context, transform);
            this.render._updateMark = updateMark;
            this.render._updateRenderType = this.renderType;
        }
        else {
            //InstanceBatch should update worldMatrix every renderElement,
            //because the instance matrix buffer is always different.
            if (this.renderType == RenderElement.RENDERTYPE_INSTANCEBATCH) {
                this.render._renderUpdate(context, transform);
                this.render._renderUpdateWithCamera(context, transform);
            }
        }
        if (geometry._prepareRender(context)) {
            var passes = this.renderSubShader._passes;
            for (var j = 0, m = passes.length; j < m; j++) {
                var comDef = RenderElement._compileDefine;
                scene._shaderValues._defineDatas.cloneTo(comDef);
                comDef.removeDefineDatas(this.material._disablePublicDefineDatas);
                comDef.addDefineDatas(this.render._shaderValues._defineDatas);
                comDef.addDefineDatas(this.material._shaderValues._defineDatas);
                var shaderIns = context.shader = passes[j].withCompile(comDef);
                var switchShader = shaderIns.bind(); //纹理需要切换shader时重新绑定 其他uniform不需要
                var switchUpdateMark = (updateMark !== shaderIns._uploadMark);
                var uploadScene = (shaderIns._uploadScene !== scene) || switchUpdateMark;
                if (uploadScene || switchShader) {
                    shaderIns.uploadUniforms(shaderIns._sceneUniformParamsMap, scene._shaderValues, uploadScene);
                    shaderIns._uploadScene = scene;
                }
                var uploadSprite3D = (shaderIns._uploadRender !== this.render || shaderIns._uploadRenderType !== this.renderType) || switchUpdateMark;
                if (uploadSprite3D || switchShader) {
                    shaderIns.uploadUniforms(shaderIns._spriteUniformParamsMap, this.render._shaderValues, uploadSprite3D);
                    shaderIns._uploadRender = this.render;
                    shaderIns._uploadRenderType = this.renderType;
                }
                var uploadCamera = shaderIns._uploadCamera !== camera || switchUpdateMark;
                if (uploadCamera || switchShader) {
                    shaderIns.uploadUniforms(shaderIns._cameraUniformParamsMap, camera._shaderValues, uploadCamera);
                    shaderIns._uploadCamera = camera;
                }
                var uploadMaterial = (shaderIns._uploadMaterial !== this.material) || switchUpdateMark;
                if (uploadMaterial || switchShader) {
                    shaderIns.uploadUniforms(shaderIns._materialUniformParamsMap, this.material._shaderValues, uploadMaterial);
                    shaderIns._uploadMaterial = this.material;
                }
                var matValues = this.material._shaderValues;
                if (lastStateMaterial !== this.material || lastStateShaderInstance !== shaderIns) { //lastStateMaterial,lastStateShaderInstance存到全局，多摄像机还可优化
                    shaderIns.uploadRenderStateBlendDepth(matValues);
                    shaderIns.uploadRenderStateFrontFace(matValues, forceInvertFace, this.getInvertFront());
                    lastStateMaterial = this.material;
                    lastStateShaderInstance = shaderIns;
                    lastStateRender = this.render;
                }
                else {
                    if (lastStateRender !== this.render) { //TODO:是否可以用transfrom
                        shaderIns.uploadRenderStateFrontFace(matValues, forceInvertFace, this.getInvertFront());
                        lastStateRender = this.render;
                    }
                }
                geometry._render(context);
                shaderIns._uploadMark = updateMark;
            }
        }
        if (updateRender && this.renderType !== RenderElement.RENDERTYPE_NORMAL)
            this.render._revertBatchRenderUpdate(context); //还原因合并导致的数据变化
    }
    /**
     * @internal
     */
    destroy() {
        this._transform = null;
        this._geometry = null;
        this.material = null;
        this.render = null;
    }
}
/** @internal */
RenderElement.RENDERTYPE_NORMAL = 0;
/** @internal */
RenderElement.RENDERTYPE_STATICBATCH = 1;
/** @internal */
RenderElement.RENDERTYPE_INSTANCEBATCH = 2;
/** @internal */
RenderElement.RENDERTYPE_VERTEXBATCH = 3;
/** @internal */
RenderElement._compileDefine = new DefineDatas();
