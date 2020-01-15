import { Laya } from "../../Laya";
import { Component } from "../components/Component";
import { ClassUtils } from "../utils/ClassUtils";
import { IPhysics } from "./IPhysics";
/**
 * 碰撞体基类
 */
export class ColliderBase extends Component {
    constructor() {
        super(...arguments);
        /**是否是传感器，传感器能够触发碰撞事件，但不会产生碰撞反应*/
        this._isSensor = false;
        /**密度值，值可以为零或者是正数，建议使用相似的密度，这样做可以改善堆叠稳定性，默认值为10*/
        this._density = 10;
        /**摩擦力，取值范围0-1，值越大，摩擦越大，默认值为0.2*/
        this._friction = 0.2;
        /**弹性系数，取值范围0-1，值越大，弹性越大，默认值为0*/
        this._restitution = 0;
    }
    /**@private 获取碰撞体信息*/
    getDef() {
        if (!this._def) {
            var def = new window.box2d.b2FixtureDef();
            def.density = this.density;
            def.friction = this.friction;
            def.isSensor = this.isSensor;
            def.restitution = this.restitution;
            def.shape = this._shape;
            this._def = def;
        }
        return this._def;
    }
    /**
     * @internal
     * @override
     */
    _onEnable() {
        if (this.rigidBody) {
            this.refresh();
        }
        else {
            Laya.systemTimer.callLater(this, this._checkRigidBody);
        }
    }
    _checkRigidBody() {
        if (!this.rigidBody) {
            var comp = this.owner.getComponent(IPhysics.RigidBody);
            if (comp) {
                this.rigidBody = comp;
                this.refresh();
            }
        }
    }
    /**
     * @internal
     * @override
     */
    _onDestroy() {
        if (this.rigidBody) {
            if (this.fixture) {
                if (this.fixture.GetBody() == this.rigidBody.body) {
                    this.rigidBody.body.DestroyFixture(this.fixture);
                }
                //fixture.Destroy();
                this.fixture = null;
            }
            this.rigidBody = null;
            this._shape = null;
            this._def = null;
        }
    }
    /**是否是传感器，传感器能够触发碰撞事件，但不会产生碰撞反应*/
    get isSensor() {
        return this._isSensor;
    }
    set isSensor(value) {
        this._isSensor = value;
        if (this._def) {
            this._def.isSensor = value;
            this.refresh();
        }
    }
    /**密度值，值可以为零或者是正数，建议使用相似的密度，这样做可以改善堆叠稳定性，默认值为10*/
    get density() {
        return this._density;
    }
    set density(value) {
        this._density = value;
        if (this._def) {
            this._def.density = value;
            this.refresh();
        }
    }
    /**摩擦力，取值范围0-1，值越大，摩擦越大，默认值为0.2*/
    get friction() {
        return this._friction;
    }
    set friction(value) {
        this._friction = value;
        if (this._def) {
            this._def.friction = value;
            this.refresh();
        }
    }
    /**弹性系数，取值范围0-1，值越大，弹性越大，默认值为0*/
    get restitution() {
        return this._restitution;
    }
    set restitution(value) {
        this._restitution = value;
        if (this._def) {
            this._def.restitution = value;
            this.refresh();
        }
    }
    /**
     * @private
     * 碰撞体参数发生变化后，刷新物理世界碰撞信息
     */
    refresh() {
        if (this.enabled && this.rigidBody) {
            var body = this.rigidBody.body;
            if (this.fixture) {
                //trace(fixture);
                if (this.fixture.GetBody() == this.rigidBody.body) {
                    this.rigidBody.body.DestroyFixture(this.fixture);
                }
                this.fixture.Destroy();
                this.fixture = null;
            }
            var def = this.getDef();
            def.filter.groupIndex = this.rigidBody.group;
            def.filter.categoryBits = this.rigidBody.category;
            def.filter.maskBits = this.rigidBody.mask;
            this.fixture = body.CreateFixture(def);
            this.fixture.collider = this;
        }
    }
    /**
     * @private
     * 重置形状
     */
    resetShape(re = true) {
    }
    /**
     * 获取是否为单实例组件。
     * @override
     */
    get isSingleton() {
        return false;
    }
}
ClassUtils.regClass("laya.physics.ColliderBase", ColliderBase);
ClassUtils.regClass("Laya.ColliderBase", ColliderBase);
