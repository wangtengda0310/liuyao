import { Tween } from "../utils/Tween";
import { Event } from "../events/Event";
import { Ease } from "../utils/Ease";
import { Handler } from "../utils/Handler";
/**
 * @Script {name:ButtonEffect}
 * @author ww
 */
export class ButtonEffect {
    constructor() {
        this._curState = 0;
        /**
         * effectScale
         * @prop {name:effectScale,type:number, tips:"缩放值",default:"1.5"}
         */
        this.effectScale = 1.5;
        /**
         * tweenTime
         * @prop {name:tweenTime,type:number, tips:"缓动时长",default:"300"}
         */
        this.tweenTime = 300;
    }
    /**
     * 设置控制对象
     * @param tar
     */
    set target(tar) {
        this._tar = tar;
        tar.on(Event.MOUSE_DOWN, this, this.toChangedState);
        tar.on(Event.MOUSE_UP, this, this.toInitState);
        tar.on(Event.MOUSE_OUT, this, this.toInitState);
    }
    toChangedState() {
        this._curState = 1;
        if (this._curTween)
            Tween.clear(this._curTween);
        this._curTween = Tween.to(this._tar, { scaleX: this.effectScale, scaleY: this.effectScale }, this.tweenTime, Ease[this.effectEase], Handler.create(this, this.tweenComplete));
    }
    toInitState() {
        if (this._curState == 2)
            return;
        if (this._curTween)
            Tween.clear(this._curTween);
        this._curState = 2;
        this._curTween = Tween.to(this._tar, { scaleX: 1, scaleY: 1 }, this.tweenTime, Ease[this.backEase], Handler.create(this, this.tweenComplete));
    }
    tweenComplete() {
        this._curState = 0;
        this._curTween = null;
    }
}
