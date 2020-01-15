import { Texture2D } from "./Texture2D";
import { LayaGL } from "../layagl/LayaGL";
import { BaseTexture } from "./BaseTexture";
import { WebGLContext } from "../webgl/WebGLContext";
import { BaseShader } from "../webgl/shader/BaseShader";
import { RenderState2D } from "../webgl/utils/RenderState2D";
import { ILaya } from "../../ILaya";
import { RenderTextureFormat, RenderTextureDepthFormat } from "./RenderTextureFormat";
/**
 * <code>RenderTexture</code> 类用于创建渲染目标。
 */
export class RenderTexture2D extends BaseTexture {
    /**
     * @param width  宽度。
     * @param height 高度。
     * @param format 纹理格式。
     * @param depthStencilFormat 深度格式。
     * 创建一个 <code>RenderTexture</code> 实例。
     */
    constructor(width, height, format = RenderTextureFormat.R8G8B8, depthStencilFormat = RenderTextureDepthFormat.DEPTH_16) {
        super(format, false);
        /**@internal */
        this._mgrKey = 0; //给WebGLRTMgr用的
        this._glTextureType = LayaGL.instance.TEXTURE_2D;
        this._width = width;
        this._height = height;
        this._depthStencilFormat = depthStencilFormat;
        this._create(width, height);
        this.lock = true;
    }
    /**
     * 获取当前激活的Rendertexture
     */
    static get currentActive() {
        return RenderTexture2D._currentActive;
    }
    /**
     * 获取深度格式。
     *@return 深度格式。
     */
    get depthStencilFormat() {
        return this._depthStencilFormat;
    }
    /**
     * @inheritDoc
     * @override
     */
    get defaulteTexture() {
        return Texture2D.grayTexture;
    }
    getIsReady() {
        return true;
    }
    /**
     * 获取宽度。
     */
    get sourceWidth() {
        return this._width;
    }
    /***
     * 获取高度。
     */
    get sourceHeight() {
        return this._height;
    }
    /**
     * 获取offsetX。
     */
    get offsetX() {
        return 0;
    }
    /***
     * 获取offsetY
     */
    get offsetY() {
        return 0;
    }
    /**
     * @private
     */
    _create(width, height) {
        var gl = LayaGL.instance;
        this._frameBuffer = gl.createFramebuffer();
        WebGLContext.bindTexture(gl, this._glTextureType, this._glTexture);
        var glFormat = this._getGLFormat();
        gl.texImage2D(this._glTextureType, 0, glFormat, width, height, 0, glFormat, gl.UNSIGNED_BYTE, null);
        this._setGPUMemory(width * height * 4);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._glTexture, 0);
        if (this._depthStencilFormat !== RenderTextureDepthFormat.DEPTHSTENCIL_NONE) {
            this._depthStencilBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._depthStencilBuffer);
            switch (this._depthStencilFormat) {
                case RenderTextureDepthFormat.DEPTH_16:
                    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._depthStencilBuffer);
                    break;
                case RenderTextureDepthFormat.STENCIL_8:
                    gl.renderbufferStorage(gl.RENDERBUFFER, gl.STENCIL_INDEX8, width, height);
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT, gl.RENDERBUFFER, this._depthStencilBuffer);
                    break;
                case RenderTextureDepthFormat.DEPTHSTENCIL_16_8:
                    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this._depthStencilBuffer);
                    break;
                default:
                //console.log("RenderTexture: unkonw depth format.");//2d并不需要depthbuffer
            }
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        this._setWarpMode(gl.TEXTURE_WRAP_S, this._wrapModeU);
        this._setWarpMode(gl.TEXTURE_WRAP_T, this._wrapModeV);
        this._setFilterMode(this._filterMode);
        this._setAnisotropy(this._anisoLevel);
        this._readyed = true;
        this._activeResource();
    }
    /**
     * 生成mipMap。
     * @override
     */
    generateMipmap() {
        if (this._isPot(this.width) && this._isPot(this.height)) {
            this._mipmap = true;
            LayaGL.instance.generateMipmap(this._glTextureType);
            this._setFilterMode(this._filterMode);
            this._setGPUMemory(this.width * this.height * 4 * (1 + 1 / 3));
        }
        else {
            this._mipmap = false;
            this._setGPUMemory(this.width * this.height * 4);
        }
    }
    /**
     * 保存当前的RT信息。
     */
    static pushRT() {
        RenderTexture2D.rtStack.push({ rt: RenderTexture2D._currentActive, w: RenderState2D.width, h: RenderState2D.height });
    }
    /**
     * 恢复上次保存的RT信息
     */
    static popRT() {
        var gl = LayaGL.instance;
        var top = RenderTexture2D.rtStack.pop();
        if (top) {
            if (RenderTexture2D._currentActive != top.rt) {
                LayaGL.instance.bindFramebuffer(gl.FRAMEBUFFER, top.rt ? top.rt._frameBuffer : null);
                RenderTexture2D._currentActive = top.rt;
            }
            gl.viewport(0, 0, top.w, top.h);
            RenderState2D.width = top.w;
            RenderState2D.height = top.h;
        }
    }
    /**
     * 开始绑定。
     */
    start() {
        var gl = LayaGL.instance;
        //(memorySize == 0) && recreateResource();
        LayaGL.instance.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
        this._lastRT = RenderTexture2D._currentActive;
        RenderTexture2D._currentActive = this;
        this._readyed = true;
        //var gl:LayaGL = LayaGL.instance;//TODO:这段代码影响2D、3D混合
        ////(memorySize == 0) && recreateResource();
        //LayaGL.instance.bindFramebuffer(WebGLContext.FRAMEBUFFER, _frameBuffer);
        //_lastRT = _currentActive;
        //_currentActive = this;
        ////_readyed = false;  
        //_readyed = true;	//这个没什么用。还会影响流程，比如我有时候并不调用end。所以直接改成true
        //
        ////if (_type == TYPE2D) {
        gl.viewport(0, 0, this._width, this._height); //外部设置
        this._lastWidth = RenderState2D.width;
        this._lastHeight = RenderState2D.height;
        RenderState2D.width = this._width;
        RenderState2D.height = this._height;
        BaseShader.activeShader = null;
        ////}
    }
    /**
     * 结束绑定。
     */
    end() {
        var gl = LayaGL.instance;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        RenderTexture2D._currentActive = null;
        this._readyed = true;
    }
    /**
     * 恢复上一次的RenderTarge.由于使用自己保存的，所以如果被外面打断了的话，会出错。
     */
    restore() {
        var gl = LayaGL.instance;
        if (this._lastRT != RenderTexture2D._currentActive) {
            LayaGL.instance.bindFramebuffer(gl.FRAMEBUFFER, this._lastRT ? this._lastRT._frameBuffer : null);
            RenderTexture2D._currentActive = this._lastRT;
        }
        this._readyed = true;
        //if (_type == TYPE2D)//待调整
        //{
        gl.viewport(0, 0, this._lastWidth, this._lastHeight);
        RenderState2D.width = this._lastWidth;
        RenderState2D.height = this._lastHeight;
        BaseShader.activeShader = null;
        //} else 
        //	gl.viewport(0, 0, Laya.stage.width, Laya.stage.height);
    }
    clear(r = 0.0, g = 0.0, b = 0.0, a = 1.0) {
        var gl = LayaGL.instance;
        gl.clearColor(r, g, b, a);
        var clearFlag = gl.COLOR_BUFFER_BIT;
        switch (this._depthStencilFormat) {
            //case WebGLContext.DEPTH_COMPONENT: 
            case gl.DEPTH_COMPONENT16:
                clearFlag |= gl.DEPTH_BUFFER_BIT;
                break;
            //case WebGLContext.STENCIL_INDEX:
            case gl.STENCIL_INDEX8:
                clearFlag |= gl.STENCIL_BUFFER_BIT;
                break;
            case gl.DEPTH_STENCIL:
                clearFlag |= gl.DEPTH_BUFFER_BIT;
                clearFlag |= gl.STENCIL_BUFFER_BIT;
                break;
        }
        gl.clear(clearFlag);
    }
    /**
     * 获得像素数据。
     * @param x X像素坐标。
     * @param y Y像素坐标。
     * @param width 宽度。
     * @param height 高度。
     * @return 像素数据。
     */
    getData(x, y, width, height) {
        if (ILaya.Render.isConchApp && window.conchConfig.threadMode == 2) {
            throw "native 2 thread mode use getDataAsync";
        }
        var gl = LayaGL.instance;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
        var canRead = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE);
        if (!canRead) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            return null;
        }
        var pixels = new Uint8Array(this._width * this._height * 4);
        var glFormat = this._getGLFormat();
        gl.readPixels(x, y, width, height, glFormat, gl.UNSIGNED_BYTE, pixels);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return pixels;
    }
    /**
     * native多线程
     */
    getDataAsync(x, y, width, height, callBack) {
        var gl = LayaGL.instance;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
        gl.readPixelsAsync(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, function (data) {
            callBack(new Uint8Array(data));
        });
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    recycle() {
    }
    /**
     * @inheritDoc
     * @internal
     */
    _disposeResource() {
        if (this._frameBuffer) {
            var gl = LayaGL.instance;
            gl.deleteTexture(this._glTexture);
            gl.deleteFramebuffer(this._frameBuffer);
            gl.deleteRenderbuffer(this._depthStencilBuffer);
            this._glTexture = null;
            this._frameBuffer = null;
            this._depthStencilBuffer = null;
            this._setGPUMemory(0);
        }
    }
}
//为push,pop 用的。以后和上面只保留一份。
//由于可能递归，所以不能简单的用save，restore
RenderTexture2D.rtStack = []; //rt:RenderTexture，w:int，h:int
RenderTexture2D.defuv = [0, 0, 1, 0, 1, 1, 0, 1];
RenderTexture2D.flipyuv = [0, 1, 1, 1, 1, 0, 0, 0];
