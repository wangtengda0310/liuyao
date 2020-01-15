import { ILaya } from "./ILaya";
import { Graphics } from "./laya/display/Graphics";
import { GraphicsBounds } from "./laya/display/GraphicsBounds";
import { Input } from "./laya/display/Input";
import { Node } from "./laya/display/Node";
import { Sprite } from "./laya/display/Sprite";
import { Stage } from "./laya/display/Stage";
import { Text } from "./laya/display/Text";
import { KeyBoardManager } from "./laya/events/KeyBoardManager";
import { MouseManager } from "./laya/events/MouseManager";
import { LayaGL } from "./laya/layagl/LayaGL";
import { AudioSound } from "./laya/media/h5audio/AudioSound";
import { SoundManager } from "./laya/media/SoundManager";
import { WebAudioSound } from "./laya/media/webaudio/WebAudioSound";
import { Loader } from "./laya/net/Loader";
import { LoaderManager } from "./laya/net/LoaderManager";
import { LocalStorage } from "./laya/net/LocalStorage";
import { TTFLoader } from "./laya/net/TTFLoader";
import { URL } from "./laya/net/URL";
import { Render } from "./laya/renders/Render";
import { RenderSprite } from "./laya/renders/RenderSprite";
import { Context } from "./laya/resource/Context";
import { HTMLCanvas } from "./laya/resource/HTMLCanvas";
import { RenderTexture2D } from "./laya/resource/RenderTexture2D";
import { Resource } from "./laya/resource/Resource";
import { Browser } from "./laya/utils/Browser";
import { CacheManger } from "./laya/utils/CacheManger";
import { ClassUtils } from "./laya/utils/ClassUtils";
import { ColorUtils } from "./laya/utils/ColorUtils";
import { Dragging } from "./laya/utils/Dragging";
import { Pool } from "./laya/utils/Pool";
import { SceneUtils } from "./laya/utils/SceneUtils";
import { Stat } from "./laya/utils/Stat";
import { StatUI } from "./laya/utils/StatUI";
import { Timer } from "./laya/utils/Timer";
import { Utils } from "./laya/utils/Utils";
import { WeakObject } from "./laya/utils/WeakObject";
import { ShaderDefines2D } from "./laya/webgl/shader/d2/ShaderDefines2D";
import { SkinSV } from "./laya/webgl/shader/d2/skinAnishader/SkinSV";
import { PrimitiveSV } from "./laya/webgl/shader/d2/value/PrimitiveSV";
import { TextureSV } from "./laya/webgl/shader/d2/value/TextureSV";
import { Value2D } from "./laya/webgl/shader/d2/value/Value2D";
import { Shader } from "./laya/webgl/shader/Shader";
import { Submit } from "./laya/webgl/submit/Submit";
import { TextRender } from "./laya/webgl/text/TextRender";
import { RenderState2D } from "./laya/webgl/utils/RenderState2D";
import { ShaderCompile } from "./laya/webgl/utils/ShaderCompile";
import { WebGL } from "./laya/webgl/WebGL";
import { WebGLContext } from "./laya/webgl/WebGLContext";
import { WorkerLoader } from "./laya/net/WorkerLoader";
import { Mouse } from "./laya/utils/Mouse";
import { MeshVG } from "./laya/webgl/utils/MeshVG";
import { MeshParticle2D } from "./laya/webgl/utils/MeshParticle2D";
import { MeshQuadTexture } from "./laya/webgl/utils/MeshQuadTexture";
import { MeshTexture } from "./laya/webgl/utils/MeshTexture";
import { SoundChannel } from "./laya/media/SoundChannel";
import { EventDispatcher } from "./laya/events/EventDispatcher";
import { Handler } from "./laya/utils/Handler";
import { RunDriver } from "./laya/utils/RunDriver";
import { Matrix } from "./laya/maths/Matrix";
import { HTMLImage } from "./laya/resource/HTMLImage";
import { Event } from "./laya/events/Event";
import { Config } from "./Config";
/**
 * <code>Laya</code> 是全局对象的引用入口集。
 * Laya类引用了一些常用的全局对象，比如Laya.stage：舞台，Laya.timer：时间管理器，Laya.loader：加载管理器，使用时注意大小写。
 */
export class Laya {
    /**
     * 兼容as3编译工具
     */
    static __init(_classs) {
        _classs.forEach(function (o) { o.__init$ && o.__init$(); });
    }
    /**
     * 初始化引擎。使用引擎需要先初始化引擎，否则可能会报错。
     * @param	width 初始化的游戏窗口宽度，又称设计宽度。
     * @param	height	初始化的游戏窗口高度，又称设计高度。
     * @param	plugins 插件列表，比如 WebGL（使用WebGL方式渲染）。
     * @return	返回原生canvas引用，方便对canvas属性进行修改
     */
    static init(width, height, ...plugins) {
        if (Laya._isinit)
            return;
        Laya._isinit = true;
        ArrayBuffer.prototype.slice || (ArrayBuffer.prototype.slice = Laya._arrayBufferSlice);
        Browser.__init__();
        // 创建主画布
        //这个其实在Render中感觉更合理，但是runtime要求第一个canvas是主画布，所以必须在下面的那个离线画布之前
        var mainCanv = Browser.mainCanvas = new HTMLCanvas(true);
        //Render._mainCanvas = mainCanv;
        var style = mainCanv.source.style;
        style.position = 'absolute';
        style.top = style.left = "0px";
        style.background = "#000000";
        if (!Browser.onKGMiniGame && !Browser.onAlipayMiniGame) {
            Browser.container.appendChild(mainCanv.source); //xiaosong add
        }
        // 创建离屏画布
        //创建离线画布
        Browser.canvas = new HTMLCanvas(true);
        Browser.context = Browser.canvas.getContext('2d');
        Browser.supportWebAudio = SoundManager.__init__();
        ;
        Browser.supportLocalStorage = LocalStorage.__init__();
        //temp TODO 以后分包
        Laya.systemTimer = new Timer(false);
        systemTimer = Timer.gSysTimer = Laya.systemTimer;
        Laya.startTimer = new Timer(false);
        Laya.physicsTimer = new Timer(false);
        Laya.updateTimer = new Timer(false);
        Laya.lateTimer = new Timer(false);
        Laya.timer = new Timer(false);
        startTimer = ILaya.startTimer = Laya.startTimer;
        lateTimer = ILaya.lateTimer = Laya.lateTimer;
        updateTimer = ILaya.updateTimer = Laya.updateTimer;
        ILaya.systemTimer = Laya.systemTimer;
        timer = ILaya.timer = Laya.timer;
        physicsTimer = ILaya.physicsTimer = Laya.physicsTimer;
        Laya.loader = new LoaderManager();
        ILaya.Laya = Laya;
        loader = ILaya.loader = Laya.loader;
        WeakObject.__init__();
        SceneUtils.__init();
        Mouse.__init__();
        WebGL.inner_enable();
        if (plugins) {
            for (var i = 0, n = plugins.length; i < n; i++) {
                if (plugins[i] && plugins[i].enable) {
                    plugins[i].enable();
                }
            }
        }
        if (ILaya.Render.isConchApp) {
            Laya.enableNative();
        }
        Laya.enableWebGLPlus();
        CacheManger.beginCheck();
        stage = Laya.stage = new Stage();
        ILaya.stage = Laya.stage;
        Utils.gStage = Laya.stage;
        URL.rootPath = URL._basePath = Laya._getUrlPath();
        MeshQuadTexture.__int__();
        MeshVG.__init__();
        MeshTexture.__init__();
        Laya.render = new Render(0, 0, Browser.mainCanvas);
        render = Laya.render;
        Laya.stage.size(width, height);
        window.stage = Laya.stage;
        WebGLContext.__init__();
        MeshParticle2D.__init__();
        ShaderCompile.__init__();
        RenderSprite.__init__();
        KeyBoardManager.__init__();
        MouseManager.instance.__init__(Laya.stage, Render.canvas);
        Input.__init__();
        SoundManager.autoStopMusic = true;
        Stat._StatRender = new StatUI();
        Value2D._initone(ShaderDefines2D.TEXTURE2D, TextureSV);
        Value2D._initone(ShaderDefines2D.TEXTURE2D | ShaderDefines2D.FILTERGLOW, TextureSV);
        Value2D._initone(ShaderDefines2D.PRIMITIVE, PrimitiveSV);
        Value2D._initone(ShaderDefines2D.SKINMESH, SkinSV);
        return Render.canvas;
    }
    /**@internal */
    static _getUrlPath() {
        var location = Browser.window.location;
        var pathName = location.pathname;
        // 索引为2的字符如果是':'就是windows file协议
        pathName = pathName.charAt(2) == ':' ? pathName.substring(1) : pathName;
        return URL.getPath(location.protocol == "file:" ? pathName : location.protocol + "//" + location.host + location.pathname);
    }
    /**@internal */
    static _arrayBufferSlice(start, end) {
        var arr = this;
        var arrU8List = new Uint8Array(arr, start, end - start);
        var newU8List = new Uint8Array(arrU8List.length);
        newU8List.set(arrU8List);
        return newU8List.buffer;
    }
    /**
     * 表示是否捕获全局错误并弹出提示。默认为false。
     * 适用于移动设备等不方便调试的时候，设置为true后，如有未知错误，可以弹窗抛出详细错误堆栈。
     */
    static set alertGlobalError(value) {
        var erralert = 0;
        if (value) {
            Browser.window.onerror = function (msg, url, line, column, detail) {
                if (erralert++ < 5 && detail)
                    this.alert("出错啦，请把此信息截图给研发商\n" + msg + "\n" + detail.stack);
            };
        }
        else {
            Browser.window.onerror = null;
        }
    }
    /**@internal */
    static _runScript(script) {
        return Browser.window[Laya._evcode](script);
    }
    /**
     * 开启DebugPanel
     * @param	debugJsPath laya.debugtool.js文件路径
     */
    static enableDebugPanel(debugJsPath = "libs/laya.debugtool.js") {
        if (!window['Laya']["DebugPanel"]) {
            var script = Browser.createElement("script");
            script.onload = function () {
                window['Laya']["DebugPanel"].enable();
            };
            script.src = debugJsPath;
            Browser.document.body.appendChild(script);
        }
        else {
            window['Laya']["DebugPanel"].enable();
        }
    }
    /**@private */
    static enableWebGLPlus() {
        WebGLContext.__init_native();
    }
    /**@private */
    static enableNative() {
        if (Laya.isNativeRender_enable)
            return;
        Laya.isNativeRender_enable = true;
        Shader.prototype.uploadTexture2D = function (value) {
            var gl = LayaGL.instance;
            gl.bindTexture(gl.TEXTURE_2D, value);
        };
        RenderState2D.width = Browser.window.innerWidth;
        RenderState2D.height = Browser.window.innerHeight;
        Browser.measureText = function (txt, font) {
            window["conchTextCanvas"].font = font;
            return window["conchTextCanvas"].measureText(txt);
        };
        Stage.clear = function (color) {
            Context.set2DRenderConfig(); //渲染2D前要还原2D状态,否则可能受3D影响
            var c = ColorUtils.create(color).arrColor;
            var gl = LayaGL.instance;
            if (c)
                gl.clearColor(c[0], c[1], c[2], c[3]);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            RenderState2D.clear();
        };
        Sprite.drawToCanvas = Sprite.drawToTexture = function (sprite, _renderType, canvasWidth, canvasHeight, offsetX, offsetY) {
            offsetX -= sprite.x;
            offsetY -= sprite.y;
            offsetX |= 0;
            offsetY |= 0;
            canvasWidth |= 0;
            canvasHeight |= 0;
            var canv = new HTMLCanvas(false);
            var ctx = canv.getContext('2d');
            canv.size(canvasWidth, canvasHeight);
            ctx.asBitmap = true;
            ctx._targets.start();
            RenderSprite.renders[_renderType]._fun(sprite, ctx, offsetX, offsetY);
            ctx.flush();
            ctx._targets.end();
            ctx._targets.restore();
            return canv;
        };
        //RenderTexture2D.prototype._uv = RenderTexture2D.flipyuv;
        Object["defineProperty"](RenderTexture2D.prototype, "uv", {
            "get": function () {
                return this._uv;
            },
            "set": function (v) {
                this._uv = v;
            }
        });
        HTMLCanvas.prototype.getTexture = function () {
            if (!this._texture) {
                this._texture = this.context._targets;
                this._texture.uv = RenderTexture2D.flipyuv;
                this._texture.bitmap = this._texture;
            }
            return this._texture;
        };
    }
}
/*[COMPILER OPTIONS:normal]*/
/** 舞台对象的引用。*/
Laya.stage = null;
/**@private 系统时钟管理器，引擎内部使用*/
Laya.systemTimer = null;
/**@private 组件的start时钟管理器*/
Laya.startTimer = null;
/**@private 组件的物理时钟管理器*/
Laya.physicsTimer = null;
/**@private 组件的update时钟管理器*/
Laya.updateTimer = null;
/**@private 组件的lateUpdate时钟管理器*/
Laya.lateTimer = null;
/**游戏主时针，同时也是管理场景，动画，缓动等效果时钟，通过控制本时针缩放，达到快进慢播效果*/
Laya.timer = null;
/** 加载管理器的引用。*/
Laya.loader = null;
/** 当前引擎版本。*/
Laya.version = "2.4.0beta";
/**@internal */
Laya._isinit = false;
/**是否是微信小游戏子域，默认为false**/
Laya.isWXOpenDataContext = false;
/**微信小游戏是否需要在主域中自动将加载的文本数据自动传递到子域，默认 false**/
Laya.isWXPosMsg = false;
/**@internal*/
Laya.__classmap = null;
/**@internal*/
Laya.Config = Config; //这种写法是为了防止被混淆掉，不能用其他技巧，例如 assin({Config,Stage,...})
/**@internal*/
Laya.TextRender = TextRender;
/**@internal*/
Laya.EventDispatcher = EventDispatcher;
/**@internal*/
Laya.SoundChannel = SoundChannel;
/**@internal*/
Laya.Stage = Stage;
/**@internal*/
Laya.Render = Render;
/**@internal*/
Laya.Browser = Browser;
/**@internal*/
Laya.Sprite = Sprite;
/**@internal*/
Laya.Node = Node;
/**@internal*/
Laya.Context = Context;
/**@internal*/
Laya.WebGL = WebGL;
/**@internal*/
Laya.Handler = Handler;
/**@internal*/
Laya.RunDriver = RunDriver;
/**@internal*/
Laya.Utils = Utils;
/**@internal*/
Laya.Input = Input;
/**@internal*/
Laya.Loader = Loader;
/**@internal*/
Laya.LocalStorage = LocalStorage;
/**@internal*/
Laya.SoundManager = SoundManager;
/**@internal*/
Laya.URL = URL;
/**@internal*/
Laya.Event = Event;
/**@internal*/
Laya.Matrix = Matrix;
/**@internal*/
Laya.HTMLImage = HTMLImage;
/**@internal*/
Laya.Laya = Laya;
/**@internal */
Laya._evcode = "eva" + "l";
Laya.isNativeRender_enable = false;
Laya.__classmap = ILaya.__classMap;
ILaya.Timer = Timer;
ILaya.Dragging = Dragging;
ILaya.GraphicsBounds = GraphicsBounds;
ILaya.Sprite = Sprite;
ILaya.TextRender = TextRender;
ILaya.Loader = Loader;
ILaya.TTFLoader = TTFLoader;
ILaya.WebAudioSound = WebAudioSound;
ILaya.SoundManager = SoundManager;
ILaya.ShaderCompile = ShaderCompile;
ILaya.ClassUtils = ClassUtils;
ILaya.SceneUtils = SceneUtils;
ILaya.Context = Context;
ILaya.Render = Render;
ILaya.MouseManager = MouseManager;
ILaya.Text = Text;
ILaya.Browser = Browser;
ILaya.WebGL = WebGL;
ILaya.AudioSound = AudioSound;
ILaya.Pool = Pool;
ILaya.Utils = Utils;
ILaya.Graphics = Graphics;
ILaya.Submit = Submit;
ILaya.Stage = Stage;
ILaya.Resource = Resource;
ILaya.WorkerLoader = WorkerLoader;
//初始化引擎库
var libs = window._layalibs;
if (libs) {
    libs.sort(function (a, b) {
        return a.i - b.i;
    });
    for (var j = 0; j < libs.length; j++) {
        libs[j].f(window, window.document, Laya);
    }
}
let win = window;
if (win.Laya) {
    win.Laya.Laya = Laya;
    Object.assign(win.Laya, Laya);
}
else
    win.Laya = Laya;
export var __init = Laya.__init;
export var init = Laya.init;
export var stage;
export var systemTimer;
export var startTimer;
export var physicsTimer;
export var updateTimer;
export var lateTimer;
export var timer;
export var loader;
export var version = Laya.version;
export var render;
export var isWXOpenDataContext;
export var isWXPosMsg;
export var alertGlobalError = Laya.alertGlobalError;
export var enableDebugPanel = Laya.enableDebugPanel;
export function _static(_class, def) {
    for (var i = 0, sz = def.length; i < sz; i += 2) {
        if (def[i] == 'length')
            _class.length = def[i + 1].call(_class);
        else {
            function tmp() {
                var name = def[i];
                var getfn = def[i + 1];
                Object.defineProperty(_class, name, {
                    get: function () { delete this[name]; return this[name] = getfn.call(this); },
                    set: function (v) { delete this[name]; this[name] = v; }, enumerable: true, configurable: true
                });
            }
            tmp();
        }
    }
}
