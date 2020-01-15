import { HtmlVideo } from "./HtmlVideo";
import { LayaGL } from "../../layagl/LayaGL";
import { ILaya } from "../../../ILaya";
import { WebGLContext } from "../../webgl/WebGLContext";
/**
 * @internal
 */
export class WebGLVideo extends HtmlVideo {
    constructor() {
        super();
        var gl = LayaGL.instance;
        if (!ILaya.Render.isConchApp && ILaya.Browser.onIPhone)
            return;
        this.gl = ILaya.Render.isConchApp ? window.LayaGLContext.instance : WebGLContext.mainContext;
        this._source = this.gl.createTexture();
        //preTarget = WebGLContext.curBindTexTarget; 
        //preTexture = WebGLContext.curBindTexValue;
        WebGLContext.bindTexture(this.gl, gl.TEXTURE_2D, this._source);
        this.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        this.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        WebGLContext.bindTexture(this.gl, gl.TEXTURE_2D, null);
        //(preTarget && preTexture) && (WebGLContext.bindTexture(gl, preTarget, preTexture));
    }
    updateTexture() {
        if (!ILaya.Render.isConchApp && ILaya.Browser.onIPhone)
            return;
        var gl = LayaGL.instance;
        WebGLContext.bindTexture(this.gl, gl.TEXTURE_2D, this._source);
        this.gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.video);
        WebGLVideo.curBindSource = this._source;
    }
    get _glTexture() {
        return this._source;
    }
    /**
     * @override
     */
    destroy() {
        if (this._source) {
            this.gl = ILaya.Render.isConchApp ? window.LayaGLContext.instance : WebGLContext.mainContext;
            if (WebGLVideo.curBindSource == this._source) {
                WebGLContext.bindTexture(this.gl, this.gl.TEXTURE_2D, null);
                WebGLVideo.curBindSource = null;
            }
            this.gl.deleteTexture(this._source);
        }
        super.destroy();
    }
}
