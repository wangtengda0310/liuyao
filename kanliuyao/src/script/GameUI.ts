import { ui } from "./../ui/layaMaxUI";
import GameControl from "./GameControl"
import { MouseManager } from "laya/events/MouseManager";
import { Event } from "laya/events/Event";

import {六爻工具, 卦象} from "./六爻";

/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
    /**设置单例的引用方式，方便其他类引用 */
    static instance: GameUI;
    /**游戏控制脚本引用，避免每次获取组件带来不必要的性能开销 */
    private _control: GameControl;
    private 六爻:六爻工具;
    private 卦:卦象;

    constructor() {
        super();
        GameUI.instance = this;
        //关闭多点触控，否则就无敌了
        MouseManager.multiTouchEnabled = false;
        this.六爻 = new 六爻工具();
    }

    onEnable(): void {
        this._control = this.getComponent(GameControl);
        //点击提示文字，开始游戏
        this.on(Event.CLICK, this, this.onclick);
    }

    onclick(e: Event): void {
        let 六爻 = this.六爻;
        
        if(!六爻.卦已经成了()) {
            六爻.起卦();
            if(六爻.卦已经成了()) {
                this.卦 = 六爻.卦象;
                alert(this.卦.卦名)
                this._control.startGame();
            }
        }
    }


    /**停止游戏 */
    stopGame(): void {
        this._control.stopGame();
    }
}