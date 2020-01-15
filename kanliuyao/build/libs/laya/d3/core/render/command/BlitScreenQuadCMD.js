import { LayaGL } from "../../../../layagl/LayaGL";
import { Vector4 } from "../../../math/Vector4";
import { DefineDatas } from "../../../shader/DefineDatas";
import { RenderContext3D } from "../RenderContext3D";
import { ScreenQuad } from "../ScreenQuad";
import { ScreenTriangle } from "../ScreenTriangle";
import { Command } from "./Command";
/**
 * <code>BlitScreenQuadCMD</code> 类用于创建从一张渲染目标输出到另外一张渲染目标指令。
 */
export class BlitScreenQuadCMD extends Command {
    constructor() {
        super(...arguments);
        /**@internal */
        this._source = null;
        /**@internal */
        this._dest = null;
        /**@internal */
        this._offsetScale = null;
        /**@internal */
        this._shader = null;
        /**@internal */
        this._shaderData = null;
        /**@internal */
        this._subShader = 0;
        /**@internal */
        this._sourceTexelSize = new Vector4();
        /**@internal */
        this._screenType = 0;
    }
    /**
     *
     */
    static create(source, dest, offsetScale = null, shader = null, shaderData = null, subShader = 0, screenType = BlitScreenQuadCMD._SCREENTYPE_QUAD) {
        var cmd;
        cmd = BlitScreenQuadCMD._pool.length > 0 ? BlitScreenQuadCMD._pool.pop() : new BlitScreenQuadCMD();
        cmd._source = source;
        cmd._dest = dest;
        cmd._offsetScale = offsetScale;
        cmd._shader = shader;
        cmd._shaderData = shaderData;
        cmd._subShader = subShader;
        cmd._screenType = screenType;
        return cmd;
    }
    /**
     * @inheritDoc
     * @override
     */
    run() {
        var shader = this._shader || Command._screenShader;
        var shaderData = this._shaderData || Command._screenShaderData;
        var dest = this._dest;
        LayaGL.instance.viewport(0, 0, dest ? dest.width : RenderContext3D.clientWidth, dest ? dest.height : RenderContext3D.clientHeight); //TODO:是否在此
        //TODO:优化
        shaderData.setTexture(Command.SCREENTEXTURE_ID, this._source);
        shaderData.setVector(Command.SCREENTEXTUREOFFSETSCALE_ID, this._offsetScale || BlitScreenQuadCMD._defaultOffsetScale);
        this._sourceTexelSize.setValue(1.0 / this._source.width, 1.0 / this._source.height, this._source.width, this._source.height);
        shaderData.setVector(Command.MAINTEXTURE_TEXELSIZE_ID, this._sourceTexelSize);
        (dest) && (dest._start());
        var subShader = shader.getSubShaderAt(this._subShader);
        var passes = subShader._passes;
        for (var i = 0, n = passes.length; i < n; i++) {
            var comDef = BlitScreenQuadCMD._compileDefine;
            shaderData._defineDatas.cloneTo(comDef);
            var shaderPass = passes[i].withCompile(comDef); //TODO:define处理
            shaderPass.bind();
            shaderPass.uploadUniforms(shaderPass._materialUniformParamsMap, shaderData, true); //TODO:最后一个参数处理
            shaderPass.uploadRenderStateBlendDepth(shaderData);
            shaderPass.uploadRenderStateFrontFace(shaderData, false, null); //TODO: //利用UV翻转,无需设置为true
            switch (this._screenType) {
                case BlitScreenQuadCMD._SCREENTYPE_QUAD:
                    RenderContext3D._instance.invertY ? ScreenQuad.instance.renderInvertUV() : ScreenQuad.instance.render();
                    break;
                case BlitScreenQuadCMD._SCREENTYPE_TRIANGLE:
                    RenderContext3D._instance.invertY ? ScreenTriangle.instance.renderInvertUV() : ScreenTriangle.instance.render();
                    break;
                default:
                    throw "BlitScreenQuadCMD:unknown screen Type.";
            }
        }
        (dest) && (dest._end());
    }
    /**
     * @inheritDoc
     * @override
     */
    recover() {
        BlitScreenQuadCMD._pool.push(this);
        this._source = null;
        this._dest = null;
        this._offsetScale = null;
        this._shader = null;
        this._shaderData = null;
        super.recover();
    }
}
/**@internal */
BlitScreenQuadCMD._SCREENTYPE_QUAD = 0;
/**@internal */
BlitScreenQuadCMD._SCREENTYPE_TRIANGLE = 1;
/** @internal */
BlitScreenQuadCMD._compileDefine = new DefineDatas();
/**@internal */
BlitScreenQuadCMD._pool = [];
/** @internal */
BlitScreenQuadCMD._defaultOffsetScale = new Vector4(0, 0, 1, 1);
