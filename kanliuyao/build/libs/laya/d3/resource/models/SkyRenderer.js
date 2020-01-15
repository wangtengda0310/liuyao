import { ILaya } from "../../../../ILaya";
import { LayaGL } from "../../../layagl/LayaGL";
import { Stat } from "../../../utils/Stat";
import { WebGLContext } from "../../../webgl/WebGLContext";
import { Matrix4x4 } from "../../math/Matrix4x4";
import { Vector3 } from "../../math/Vector3";
import { DefineDatas } from "../../shader/DefineDatas";
import { ShaderData } from "../../shader/ShaderData";
import { SkyBox } from "./SkyBox";
/**
 * <code>SkyRenderer</code> 类用于实现天空渲染器。
 */
export class SkyRenderer {
    /**
     * 创建一个新的 <code>SkyRenderer</code> 实例。
     */
    constructor() {
        /** @internal */
        this._mesh = SkyBox.instance;
    }
    /**
     * 材质。
     */
    get material() {
        return this._material;
    }
    set material(value) {
        if (this._material !== value) {
            (this._material) && (this._material._removeReference());
            (value) && (value._addReference());
            this._material = value;
        }
    }
    /**
     * 网格。
     */
    get mesh() {
        return this._mesh;
    }
    set mesh(value) {
        if (this._mesh !== value) {
            //(_mesh) && (_mesh._removeReference());//TODO:SkyMesh换成Mesh
            //value._addReference();
            this._mesh = value;
        }
    }
    /**
     * @internal
     * 是否可用。
     */
    _isAvailable() {
        return this._material && this._mesh ? true : false;
    }
    /**
     * @internal
     */
    _render(context) {
        if (this._material && this._mesh) {
            var gl = LayaGL.instance;
            var scene = context.scene;
            var camera = context.camera;
            var noteValue = ShaderData._SET_RUNTIME_VALUE_MODE_REFERENCE_;
            ILaya.Render.supportWebGLPlusRendering && ShaderData.setRuntimeValueMode(false);
            WebGLContext.setCullFace(gl, false);
            WebGLContext.setDepthFunc(gl, gl.LEQUAL);
            WebGLContext.setDepthMask(gl, false);
            var comDef = SkyRenderer._compileDefine;
            this._material._shaderValues._defineDatas.cloneTo(comDef);
            var shader = context.shader = this._material._shader.getSubShaderAt(0)._passes[0].withCompile(comDef); //TODO:调整SubShader代码
            var switchShader = shader.bind(); //纹理需要切换shader时重新绑定 其他uniform不需要
            var switchShaderLoop = (Stat.loopCount !== shader._uploadMark);
            var uploadScene = (shader._uploadScene !== scene) || switchShaderLoop;
            if (uploadScene || switchShader) {
                shader.uploadUniforms(shader._sceneUniformParamsMap, scene._shaderValues, uploadScene);
                shader._uploadScene = scene;
            }
            var renderTex = camera._getRenderTexture();
            var uploadCamera = (shader._uploadCamera !== camera) || switchShaderLoop;
            if (uploadCamera || switchShader) {
                var viewMatrix = SkyRenderer._tempMatrix0;
                var projectionMatrix = SkyRenderer._tempMatrix1;
                camera.viewMatrix.cloneTo(viewMatrix); //视图矩阵逆矩阵的转置矩阵，移除平移和缩放
                camera.projectionMatrix.cloneTo(projectionMatrix);
                viewMatrix.setTranslationVector(Vector3._ZERO);
                if (camera.orthographic)
                    Matrix4x4.createPerspective(camera.fieldOfView, camera.aspectRatio, camera.nearPlane, camera.farPlane, projectionMatrix);
                //无穷投影矩阵算法,DirectX右手坐标系推导
                //http://terathon.com/gdc07_lengyel.pdf
                //xScale  0     0                          0
                //0     yScale  0                          0
                //0       0    	-zfar /(zfar-znear)        -1.0
                //0       0     -znear*zfar /(zfar-znear)  0
                //xScale  0     0       0        mul   [x,y,z,0] =[xScale*x,yScale*y,-z,-z]
                //0     yScale  0       0		
                //0       0    	-1      -1.0	
                //0       0     -0      0
                //[xScale*x,yScale*y,-z,-z]=>[-xScale*x/z,-yScale*y/z,1]
                //xScale  0     0       0      
                //0     yScale  0       0		
                //0       0    	-1+e    -1.0	
                //0       0     -0  0
                var epsilon = 1e-6;
                var yScale = 1.0 / Math.tan(3.1416 * camera.fieldOfView / 180 * 0.5);
                projectionMatrix.elements[0] = yScale / camera.aspectRatio;
                projectionMatrix.elements[5] = yScale;
                projectionMatrix.elements[10] = epsilon - 1.0;
                projectionMatrix.elements[11] = -1.0;
                projectionMatrix.elements[14] = -0; //znear无穷小
                camera._applyViewProject(context, viewMatrix, projectionMatrix); //TODO:优化 不应设置给Camera直接提交
                shader.uploadUniforms(shader._cameraUniformParamsMap, camera._shaderValues, uploadCamera);
                shader._uploadCamera = camera;
            }
            var uploadMaterial = (shader._uploadMaterial !== this._material) || switchShaderLoop;
            if (uploadMaterial || switchShader) {
                shader.uploadUniforms(shader._materialUniformParamsMap, this._material._shaderValues, uploadMaterial);
                shader._uploadMaterial = this._material;
            }
            this._mesh._bufferState.bind();
            this._mesh._render(context);
            ILaya.Render.supportWebGLPlusRendering && ShaderData.setRuntimeValueMode(noteValue);
            WebGLContext.setDepthFunc(gl, gl.LESS);
            WebGLContext.setDepthMask(gl, true);
            camera._applyViewProject(context, camera.viewMatrix, camera.projectionMatrix);
        }
    }
    /**
     * @internal
     */
    destroy() {
        if (this._material) {
            this._material._removeReference();
            this._material = null;
        }
    }
}
/** @internal */
SkyRenderer._tempMatrix0 = new Matrix4x4();
/** @internal */
SkyRenderer._tempMatrix1 = new Matrix4x4();
/** @internal */
SkyRenderer._compileDefine = new DefineDatas();
