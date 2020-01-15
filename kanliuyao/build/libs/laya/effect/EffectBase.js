import { Handler } from "../utils/Handler";
import { Component } from "../components/Component";
/**
 * 效果插件基类，基于对象池管理
 */
export class EffectBase extends Component {
    constructor() {
        super(...arguments);
        /**动画持续时间，单位为毫秒*/
        this.duration = 1000;
        /**动画延迟时间，单位为毫秒*/
        this.delay = 0;
        /**重复次数，默认为播放一次*/
        this.repeat = 0;
        /**效果结束后，是否自动移除节点*/
        this.autoDestroyAtComplete = true;
    }
    /**
     * @internal
     * @override
     */
    _onAwake() {
        this.target = this.target || this.owner;
        if (this.autoDestroyAtComplete)
            this._comlete = Handler.create(this.target, this.target.destroy, null, false);
        if (this.eventName)
            this.owner.on(this.eventName, this, this._exeTween);
        else
            this._exeTween();
    }
    _exeTween() {
        this._tween = this._doTween();
        this._tween.repeat = this.repeat;
    }
    _doTween() {
        return null;
    }
    /**
     * @override
     */
    onReset() {
        this.duration = 1000;
        this.delay = 0;
        this.repeat = 0;
        this.ease = null;
        this.target = null;
        if (this.eventName) {
            this.owner.off(this.eventName, this, this._exeTween);
            this.eventName = null;
        }
        if (this._comlete) {
            this._comlete.recover();
            this._comlete = null;
        }
        if (this._tween) {
            this._tween.clear();
            this._tween = null;
        }
    }
}
