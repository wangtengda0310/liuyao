import { Laya } from "Laya";
import { URL } from "laya/net/URL";
import { Utils } from "laya/utils/Utils";
import { Stat } from "laya/utils/Stat";
import { Handler } from "laya/utils/Handler";
import { ResourceVersion } from "laya/net/ResourceVersion";
import { AtlasInfoManager } from "laya/net/AtlasInfoManager";
import { Scene } from "laya/display/Scene";
import GameConfig from "./GameConfig";
import { WebGL } from "laya/webgl/WebGL";
import { Physics } from "laya/physics/Physics";
import { PhysicsDebugDraw } from "laya/physics/PhysicsDebugDraw";
class Main {
    constructor() {
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            window["Laya3D"].init(GameConfig.width, GameConfig.height);
        else
            Laya.init(GameConfig.width, GameConfig.height, WebGL);
        Physics.enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig.scaleMode;
        Laya.stage.screenMode = GameConfig.screenMode;
        Laya.stage.alignV = GameConfig.alignV;
        Laya.stage.alignH = GameConfig.alignH;
        //兼容微信不支持加载scene后缀场景
        URL.exportSceneToJson = GameConfig.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig.debug || Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig.physicsDebug)
            PhysicsDebugDraw.enable();
        if (GameConfig.stat)
            Stat.show();
        Laya.alertGlobalError = true;
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        ResourceVersion.enable("version.json", Handler.create(this, this.onVersionLoaded), ResourceVersion.FILENAME_VERSION);
    }
    onVersionLoaded() {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        AtlasInfoManager.enable("fileconfig.json", Handler.create(this, this.onConfigLoaded));
    }
    onConfigLoaded() {
        //加载IDE指定的场景
        GameConfig.startScene && Scene.open(GameConfig.startScene);
    }
}
//激活启动类
new Main();
