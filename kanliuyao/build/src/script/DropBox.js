import GameUI from "./GameUI";
import { Script } from "laya/components/Script";
import { SoundManager } from "laya/media/SoundManager";
import { Animation } from "laya/display/Animation";
import { Pool } from "laya/utils/Pool";
import { Event } from "laya/events/Event";
import { RigidBody } from "laya/physics/RigidBody";
/**
 * 掉落盒子脚本，实现盒子碰撞及回收流程
 */
export default class DropBox extends Script {
    constructor() {
        super();
        /**盒子等级 */
        this.level = 1;
    }
    onEnable() {
        /**获得组件引用，避免每次获取组件带来不必要的查询开销 */
        this._rig = this.owner.getComponent(RigidBody);
        this.level = Math.round(Math.random() * 5) + 1;
        this._text = this.owner.getChildByName("levelTxt");
        this._text.text = this.level + "";
    }
    onUpdate() {
        //让持续盒子旋转
        this.owner.rotation++;
    }
    onTriggerEnter(other, self, contact) {
        var owner = this.owner;
        if (other.label === "buttle") {
            //碰撞到子弹后，增加积分，播放声音特效
            if (this.level > 1) {
                this.level--;
                this._text.changeText(this.level + "");
                owner.getComponent(RigidBody).setVelocity({ x: 0, y: -10 });
                SoundManager.playSound("sound/hit.wav");
            }
            else {
                if (owner.parent) {
                    let effect = Pool.getItemByCreateFun("effect", this.createEffect, this);
                    effect.pos(owner.x, owner.y);
                    owner.parent.addChild(effect);
                    effect.play(0, true);
                    owner.removeSelf();
                    SoundManager.playSound("sound/destroy.wav");
                }
            }
            GameUI.instance.addScore(1);
        }
        else if (other.label === "ground") {
            //只要有一个盒子碰到地板，则停止游戏
            owner.removeSelf();
            GameUI.instance.stopGame();
        }
    }
    /**使用对象池创建爆炸动画 */
    createEffect() {
        let ani = new Animation();
        ani.loadAnimation("test/TestAni.ani");
        ani.on(Event.COMPLETE, null, recover);
        function recover() {
            ani.removeSelf();
            Pool.recover("effect", ani);
        }
        return ani;
    }
    onDisable() {
        //盒子被移除时，回收盒子到对象池，方便下次复用，减少对象创建开销。
        Pool.recover("dropBox", this.owner);
    }
}
