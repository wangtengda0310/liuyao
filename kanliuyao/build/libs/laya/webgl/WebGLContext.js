import { ILaya } from "../../ILaya";
import { LayaGL } from "../layagl/LayaGL";
/**
 * @private
 */
export class WebGLContext {
    /**
     * @internal
     */
    static __init__() {
        var gl = LayaGL.instance;
        WebGLContext._depthFunc = gl.LESS;
        WebGLContext._blendEquation = gl.FUNC_ADD;
        WebGLContext._blendEquationRGB = gl.FUNC_ADD;
        WebGLContext._blendEquationAlpha = gl.FUNC_ADD;
        WebGLContext._sFactor = gl.ONE;
        WebGLContext._dFactor = gl.ZERO;
        WebGLContext._sFactorAlpha = gl.ONE;
        WebGLContext._dFactorAlpha = gl.ZERO;
        WebGLContext._activedTextureID = gl.TEXTURE0; //默认激活纹理区为0
        WebGLContext._glTextureIDs = [gl.TEXTURE0, gl.TEXTURE1, gl.TEXTURE2, gl.TEXTURE3, gl.TEXTURE4, gl.TEXTURE5, gl.TEXTURE6, gl.TEXTURE7];
    }
    /**
     * @internal
     */
    static useProgram(gl, program) {
        if (WebGLContext._useProgram === program)
            return false;
        gl.useProgram(program);
        WebGLContext._useProgram = program;
        return true;
    }
    /**
     * @internal
     */
    static setDepthTest(gl, value) {
        value !== WebGLContext._depthTest && (WebGLContext._depthTest = value, value ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST));
    }
    /**
     * @internal
     */
    static setDepthMask(gl, value) {
        value !== WebGLContext._depthMask && (WebGLContext._depthMask = value, gl.depthMask(value));
    }
    /**
     * @internal
     */
    static setDepthFunc(gl, value) {
        value !== WebGLContext._depthFunc && (WebGLContext._depthFunc = value, gl.depthFunc(value));
    }
    /**
     * @internal
     */
    static setBlend(gl, value) {
        value !== WebGLContext._blend && (WebGLContext._blend = value, value ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND));
    }
    /**
     * @internal
     */
    static setBlendEquation(gl, blendEquation) {
        if (blendEquation !== WebGLContext._blendEquation) {
            WebGLContext._blendEquation = blendEquation;
            WebGLContext._blendEquationRGB = WebGLContext._blendEquationAlpha = null;
            gl.blendEquation(blendEquation);
        }
    }
    /**
     * @internal
     */
    static setBlendEquationSeparate(gl, blendEquationRGB, blendEquationAlpha) {
        if (blendEquationRGB !== WebGLContext._blendEquationRGB || blendEquationAlpha !== WebGLContext._blendEquationAlpha) {
            WebGLContext._blendEquationRGB = blendEquationRGB;
            WebGLContext._blendEquationAlpha = blendEquationAlpha;
            WebGLContext._blendEquation = null;
            gl.blendEquationSeparate(blendEquationRGB, blendEquationAlpha);
        }
    }
    /**
     * @internal
     */
    static setBlendFunc(gl, sFactor, dFactor) {
        if (sFactor !== WebGLContext._sFactor || dFactor !== WebGLContext._dFactor) {
            WebGLContext._sFactor = sFactor;
            WebGLContext._dFactor = dFactor;
            WebGLContext._sFactorRGB = null;
            WebGLContext._dFactorRGB = null;
            WebGLContext._sFactorAlpha = null;
            WebGLContext._dFactorAlpha = null;
            gl.blendFunc(sFactor, dFactor);
        }
    }
    /**
     * @internal
     */
    static setBlendFuncSeperate(gl, srcRGB, dstRGB, srcAlpha, dstAlpha) {
        if (srcRGB !== WebGLContext._sFactorRGB || dstRGB !== WebGLContext._dFactorRGB || srcAlpha !== WebGLContext._sFactorAlpha || dstAlpha !== WebGLContext._dFactorAlpha) {
            WebGLContext._sFactorRGB = srcRGB;
            WebGLContext._dFactorRGB = dstRGB;
            WebGLContext._sFactorAlpha = srcAlpha;
            WebGLContext._dFactorAlpha = dstAlpha;
            WebGLContext._sFactor = null;
            WebGLContext._dFactor = null;
            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
        }
    }
    /**
     * @internal
     */
    static setCullFace(gl, value) {
        value !== WebGLContext._cullFace && (WebGLContext._cullFace = value, value ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE));
    }
    /**
     * @internal
     */
    static setFrontFace(gl, value) {
        value !== WebGLContext._frontFace && (WebGLContext._frontFace = value, gl.frontFace(value));
    }
    /**
     * @internal
     */
    static activeTexture(gl, textureID) {
        if (WebGLContext._activedTextureID !== textureID) {
            gl.activeTexture(textureID);
            WebGLContext._activedTextureID = textureID;
        }
    }
    /**
     * @internal
     */
    static bindTexture(gl, target, texture) {
        if (WebGLContext._activeTextures[WebGLContext._activedTextureID - gl.TEXTURE0] !== texture) {
            gl.bindTexture(target, texture);
            WebGLContext._activeTextures[WebGLContext._activedTextureID - gl.TEXTURE0] = texture;
        }
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /**
     * @internal
     */
    static __init_native() {
        if (!ILaya.Render.supportWebGLPlusRendering)
            return;
        var webGLContext = WebGLContext;
        webGLContext.activeTexture = webGLContext.activeTextureForNative;
        webGLContext.bindTexture = webGLContext.bindTextureForNative;
        /*webGLContext.useProgram = webGLContext.useProgramForNative;
        webGLContext.bindVertexArray = webGLContext.bindVertexArrayForNative;
        webGLContext.setDepthTest = webGLContext.setDepthTestForNative;
        webGLContext.setDepthMask = webGLContext.setDepthMaskForNative;
        webGLContext.setDepthFunc = webGLContext.setDepthFuncForNative;
        webGLContext.setBlend = webGLContext.setBlendForNative;
        webGLContext.setBlendFunc = webGLContext.setBlendFuncForNative;
        webGLContext.setCullFace = webGLContext.setCullFaceForNative;
        webGLContext.setFrontFace = webGLContext.setFrontFaceForNative;*/
    }
    /**
     * @internal
     */
    static useProgramForNative(gl, program) {
        gl.useProgram(program);
        return true;
    }
    /**
     * @internal
     */
    static setDepthTestForNative(gl, value) {
        if (value)
            gl.enable(gl.DEPTH_TEST);
        else
            gl.disable(gl.DEPTH_TEST);
    }
    /**
     * @internal
     */
    static setDepthMaskForNative(gl, value) {
        gl.depthMask(value);
    }
    /**
     * @internal
     */
    static setDepthFuncForNative(gl, value) {
        gl.depthFunc(value);
    }
    /**
     * @internal
     */
    static setBlendForNative(gl, value) {
        if (value)
            gl.enable(gl.BLEND);
        else
            gl.disable(gl.BLEND);
    }
    /**
     * @internal
     */
    static setBlendFuncForNative(gl, sFactor, dFactor) {
        gl.blendFunc(sFactor, dFactor);
    }
    /**
     * @internal
     */
    static setCullFaceForNative(gl, value) {
        if (value)
            gl.enable(gl.CULL_FACE);
        else
            gl.disable(gl.CULL_FACE);
    }
    /**
     * @internal
     */
    static setFrontFaceForNative(gl, value) {
        gl.frontFace(value);
    }
    /**
     * @internal
     */
    static activeTextureForNative(gl, textureID) {
        gl.activeTexture(textureID);
    }
    /**
     * @internal
     */
    static bindTextureForNative(gl, target, texture) {
        gl.bindTexture(target, texture);
    }
    /**
     * @internal
     */
    static bindVertexArrayForNative(gl, vertexArray) {
        gl.bindVertexArray(vertexArray);
    }
}
/**@internal */
WebGLContext._activeTextures = new Array(8);
/**@internal */
WebGLContext._useProgram = null;
/**@internal */
WebGLContext._depthTest = true;
/**@internal */
WebGLContext._depthMask = true;
/**@internal */
WebGLContext._blend = false;
/**@internal */
WebGLContext._cullFace = false;
/**@internal */
WebGLContext.mainContext = null;
