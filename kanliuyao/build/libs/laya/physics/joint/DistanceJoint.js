import { JointBase } from "./JointBase";
import { Physics } from "../Physics";
import { RigidBody } from "../RigidBody";
import { ClassUtils } from "../../utils/ClassUtils";
/**
 * 距离关节：两个物体上面各自有一点，两点之间的距离固定不变
 */
export class DistanceJoint extends JointBase {
    constructor() {
        super(...arguments);
        /**[首次设置有效]自身刚体链接点，是相对于自身刚体的左上角位置偏移*/
        this.selfAnchor = [0, 0];
        /**[首次设置有效]链接刚体链接点，是相对于otherBody的左上角位置偏移*/
        this.otherAnchor = [0, 0];
        /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
        this.collideConnected = false;
        /**约束的目标静止长度*/
        this._length = 0;
        /**弹簧系统的震动频率，可以视为弹簧的弹性系数*/
        this._frequency = 0;
        /**刚体在回归到节点过程中受到的阻尼，建议取值0~1*/
        this._damping = 0;
    }
    /**
     * @override
     */
    _createJoint() {
        if (!this._joint) {
            this.selfBody = this.selfBody || this.owner.getComponent(RigidBody);
            if (!this.selfBody)
                throw "selfBody can not be empty";
            var box2d = window.box2d;
            var def = DistanceJoint._temp || (DistanceJoint._temp = new box2d.b2DistanceJointDef());
            def.bodyA = this.otherBody ? this.otherBody.getBody() : Physics.I._emptyBody;
            def.bodyB = this.selfBody.getBody();
            def.localAnchorA.Set(this.otherAnchor[0] / Physics.PIXEL_RATIO, this.otherAnchor[1] / Physics.PIXEL_RATIO);
            def.localAnchorB.Set(this.selfAnchor[0] / Physics.PIXEL_RATIO, this.selfAnchor[1] / Physics.PIXEL_RATIO);
            def.frequencyHz = this._frequency;
            def.dampingRatio = this._damping;
            def.collideConnected = this.collideConnected;
            var p1 = def.bodyA.GetWorldPoint(def.localAnchorA, new box2d.b2Vec2());
            var p2 = def.bodyB.GetWorldPoint(def.localAnchorB, new box2d.b2Vec2());
            def.length = this._length / Physics.PIXEL_RATIO || box2d.b2Vec2.SubVV(p2, p1, new box2d.b2Vec2()).Length();
            this._joint = Physics.I._createJoint(def);
        }
    }
    /**约束的目标静止长度*/
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
        if (this._joint)
            this._joint.SetLength(value / Physics.PIXEL_RATIO);
    }
    /**弹簧系统的震动频率，可以视为弹簧的弹性系数*/
    get frequency() {
        return this._frequency;
    }
    set frequency(value) {
        this._frequency = value;
        if (this._joint)
            this._joint.SetFrequency(value);
    }
    /**刚体在回归到节点过程中受到的阻尼，建议取值0~1*/
    get damping() {
        return this._damping;
    }
    set damping(value) {
        this._damping = value;
        if (this._joint)
            this._joint.SetDampingRatio(value);
    }
}
ClassUtils.regClass("laya.physics.joint.DistanceJoint", DistanceJoint);
ClassUtils.regClass("Laya.DistanceJoint", DistanceJoint);
