import { UIComponent } from "../../laya/ui/UIComponent";
import { Laya } from "./../../Laya";
import { Matrix } from "../../laya/maths/Matrix";
import { Texture } from "../../laya/resource/Texture";
import { Texture2D } from "../resource/Texture2D";
import { ILaya } from "../../ILaya";
import { ClassUtils } from "../utils/ClassUtils";
/**
 * 微信开放数据展示组件，直接实例本组件，即可根据组件宽高，位置，以最优的方式显示开放域数据
 */
export class WXOpenDataViewer extends UIComponent {
    //private _texture:Texture;
    constructor() {
        super();
        this._width = this._height = 200;
        var tex = new Texture();
        tex.bitmap = new Texture2D();
        this.texture = tex;
    }
    /**
     * @override
     */
    onEnable() {
        this.postMsg({ type: "display", rate: Laya.stage.frameRate });
        if (window.wx && window.sharedCanvas)
            Laya.timer.frameLoop(1, this, this._onLoop);
    }
    /**
     * @override
     */
    onDisable() {
        this.postMsg({ type: "undisplay" });
        Laya.timer.clear(this, this._onLoop);
    }
    _onLoop() {
        this.texture.bitmap.loadImageSource(window.sharedCanvas);
    }
    /**
     * @override
     */
    set width(value) {
        super.width = value;
        if (window.sharedCanvas)
            window.sharedCanvas.width = value;
        this.callLater(this._postMsg);
    }
    /**
     * @override
     */
    get width() {
        return super.width;
    }
    /**
     * @override
     */
    set height(value) {
        super.height = value;
        if (window.sharedCanvas)
            window.sharedCanvas.height = value;
        this.callLater(this._postMsg);
    }
    /**
     * @override
     */
    get height() {
        return super.height;
    }
    /**
     * @override
     */
    set x(value) {
        super.x = value;
        this.callLater(this._postMsg);
    }
    /**
     * @override
     */
    get x() {
        return super.x;
    }
    /**
     * @override
     */
    set y(value) {
        super.y = value;
        this.callLater(this._postMsg);
    }
    /**
     * @override
     */
    get y() {
        return super.y;
    }
    _postMsg() {
        var mat = new Matrix();
        mat.translate(this.x, this.y);
        var stage = Laya.stage;
        mat.scale(stage._canvasTransform.getScaleX() * this.globalScaleX * stage.transform.getScaleX(), stage._canvasTransform.getScaleY() * this.globalScaleY * stage.transform.getScaleY());
        this.postMsg({ type: "changeMatrix", a: mat.a, b: mat.b, c: mat.c, d: mat.d, tx: mat.tx, ty: mat.ty, w: this.width, h: this.height });
    }
    /**向开放数据域发送消息*/
    postMsg(msg) {
        if (window.wx && window.wx.getOpenDataContext) {
            var openDataContext = window.wx.getOpenDataContext();
            openDataContext.postMessage(msg);
        }
    }
}
ILaya.regClass(WXOpenDataViewer);
ClassUtils.regClass("laya.ui.WXOpenDataViewer", WXOpenDataViewer);
ClassUtils.regClass("Laya.WXOpenDataViewer", WXOpenDataViewer);
