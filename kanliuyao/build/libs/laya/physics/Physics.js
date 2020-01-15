import { RigidBody } from "./RigidBody";
import { Laya } from "../../Laya";
import { Event } from "../events/Event";
import { EventDispatcher } from "../events/EventDispatcher";
import { Point } from "../maths/Point";
import { ClassUtils } from "../utils/ClassUtils";
import { IPhysics } from "./IPhysics";
/**
 * 2D物理引擎，使用Box2d驱动
 */
export class Physics extends EventDispatcher {
    constructor() {
        super();
        /**Box2d引擎的全局引用，更多属性和api请参考 http://box2d.org */
        this.box2d = window.box2d;
        /**旋转迭代次数，增大数字会提高精度，但是会降低性能*/
        this.velocityIterations = 8;
        /**位置迭代次数，增大数字会提高精度，但是会降低性能*/
        this.positionIterations = 3;
        /**@private */
        this._eventList = [];
    }
    /**全局物理单例*/
    static get I() {
        return Physics._I || (Physics._I = new Physics());
    }
    /**
     * 开启物理世界
     * options值参考如下：
       allowSleeping:true,
       gravity:10,
       customUpdate:false 自己控制物理更新时机，自己调用Physics.update
     */
    static enable(options = null) {
        Physics.I.start(options);
        IPhysics.RigidBody = RigidBody;
        IPhysics.Physics = this;
    }
    /**
     * 开启物理世界
     * options值参考如下：
       allowSleeping:true,
       gravity:10,
       customUpdate:false 自己控制物理更新时机，自己调用Physics.update
     */
    start(options = null) {
        if (!this._enabled) {
            this._enabled = true;
            options || (options = {});
            var box2d = window.box2d;
            if (box2d == null) {
                console.error("Can not find box2d libs, you should reuqest box2d.js first.");
                return;
            }
            var gravity = new box2d.b2Vec2(0, options.gravity || 500 / Physics.PIXEL_RATIO);
            this.world = new box2d.b2World(gravity);
            this.world.SetContactListener(new ContactListener());
            this.allowSleeping = options.allowSleeping == null ? true : options.allowSleeping;
            if (!options.customUpdate)
                Laya.physicsTimer.frameLoop(1, this, this._update);
            this._emptyBody = this._createBody(new window.box2d.b2BodyDef());
        }
    }
    _update() {
        this.world.Step(1 / 60, this.velocityIterations, this.positionIterations, 3);
        var len = this._eventList.length;
        if (len > 0) {
            for (var i = 0; i < len; i += 2) {
                this._sendEvent(this._eventList[i], this._eventList[i + 1]);
            }
            this._eventList.length = 0;
        }
    }
    _sendEvent(type, contact) {
        var colliderA = contact.GetFixtureA().collider;
        var colliderB = contact.GetFixtureB().collider;
        var ownerA = colliderA.owner;
        var ownerB = colliderB.owner;
        contact.getHitInfo = function () {
            var manifold = new this.box2d.b2WorldManifold();
            this.GetWorldManifold(manifold);
            //第一点？
            var p = manifold.points[0];
            p.x *= Physics.PIXEL_RATIO;
            p.y *= Physics.PIXEL_RATIO;
            return manifold;
        };
        if (ownerA) {
            var args = [colliderB, colliderA, contact];
            if (type === 0) {
                ownerA.event(Event.TRIGGER_ENTER, args);
                if (!ownerA["_triggered"]) {
                    ownerA["_triggered"] = true;
                }
                else {
                    ownerA.event(Event.TRIGGER_STAY, args);
                }
            }
            else {
                ownerA["_triggered"] = false;
                ownerA.event(Event.TRIGGER_EXIT, args);
            }
        }
        if (ownerB) {
            args = [colliderA, colliderB, contact];
            if (type === 0) {
                ownerB.event(Event.TRIGGER_ENTER, args);
                if (!ownerB["_triggered"]) {
                    ownerB["_triggered"] = true;
                }
                else {
                    ownerB.event(Event.TRIGGER_STAY, args);
                }
            }
            else {
                ownerB["_triggered"] = false;
                ownerB.event(Event.TRIGGER_EXIT, args);
            }
        }
    }
    /**@private */
    _createBody(def) {
        if (this.world) {
            return this.world.CreateBody(def);
        }
        else {
            console.error('The physical engine should be initialized first.use "Physics.enable()"');
            return null;
        }
    }
    /**@private */
    _removeBody(body) {
        if (this.world) {
            this.world.DestroyBody(body);
        }
        else {
            console.error('The physical engine should be initialized first.use "Physics.enable()"');
        }
    }
    /**@private */
    _createJoint(def) {
        if (this.world) {
            return this.world.CreateJoint(def);
        }
        else {
            console.error('The physical engine should be initialized first.use "Physics.enable()"');
            return null;
        }
    }
    /**@private */
    _removeJoint(joint) {
        if (this.world) {
            this.world.DestroyJoint(joint);
        }
        else {
            console.error('The physical engine should be initialized first.use "Physics.enable()"');
        }
    }
    /**
     * 停止物理世界
     */
    stop() {
        Laya.physicsTimer.clear(this, this._update);
    }
    /**
     * 设置是否允许休眠，休眠可以提高稳定性和性能，但通常会牺牲准确性
     */
    get allowSleeping() {
        return this.world.GetAllowSleeping();
    }
    set allowSleeping(value) {
        this.world.SetAllowSleeping(value);
    }
    /**
     * 物理世界重力环境，默认值为{x:0,y:1}
     * 如果修改y方向重力方向向上，可以直接设置gravity.y=-1;
     */
    get gravity() {
        return this.world.GetGravity();
    }
    set gravity(value) {
        this.world.SetGravity(value);
    }
    /**获得刚体总数量*/
    getBodyCount() {
        return this.world.GetBodyCount();
    }
    /**获得碰撞总数量*/
    getContactCount() {
        return this.world.GetContactCount();
    }
    /**获得关节总数量*/
    getJointCount() {
        return this.world.GetJointCount();
    }
    /**物理世界根容器，将根据此容器作为物理世界坐标世界，进行坐标变换，默认值为stage
     * 设置特定容器后，就可整体位移物理对象，保持物理世界不变*/
    get worldRoot() {
        return this._worldRoot || Laya.stage;
    }
    set worldRoot(value) {
        this._worldRoot = value;
        if (value) {
            //TODO：
            var p = value.localToGlobal(Point.TEMP.setTo(0, 0));
            this.world.ShiftOrigin({ x: p.x / Physics.PIXEL_RATIO, y: p.y / Physics.PIXEL_RATIO });
        }
    }
}
/**2D游戏默认单位为像素，物理默认单位为米，此值设置了像素和米的转换比率，默认50像素=1米*/
Physics.PIXEL_RATIO = 50;
ClassUtils.regClass("laya.physics.Physics", Physics);
ClassUtils.regClass("Laya.Physics", Physics);
// import { Physics } from "./Physics"
/**@private */
class ContactListener {
    BeginContact(contact) {
        Physics.I._eventList.push(0, contact);
        //console.log("BeginContact", contact);	
    }
    EndContact(contact) {
        Physics.I._eventList.push(1, contact);
        //console.log("EndContact", contact);
    }
    PreSolve(contact, oldManifold) {
        //console.log("PreSolve", contact);
    }
    PostSolve(contact, impulse) {
        //console.log("PostSolve", contact);
    }
}
