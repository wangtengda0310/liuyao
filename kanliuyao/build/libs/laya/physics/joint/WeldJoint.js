import { JointBase } from "./JointBase";
import { Point } from "../../maths/Point";
import { Physics } from "../Physics";
import { RigidBody } from "../RigidBody";
import { ClassUtils } from "../../utils/ClassUtils";
/**
 * 焊接关节：焊接关节的用途是使两个物体不能相对运动，受到关节的限制，两个刚体的相对位置和角度都保持不变，看上去像一个整体
 */
export class WeldJoint extends JointBase {
    constructor() {
        super(...arguments);
        /**[首次设置有效]关节的链接点，是相对于自身刚体的左上角位置偏移*/
        this.anchor = [0, 0];
        /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
        this.collideConnected = false;
        /**弹簧系统的震动频率，可以视为弹簧的弹性系数*/
        this._frequency = 5;
        /**刚体在回归到节点过程中受到的阻尼，取值0~1*/
        this._damping = 0.7;
    }
    /**
     * @override
     */
    _createJoint() {
        if (!this._joint) {
            if (!this.otherBody)
                throw "otherBody can not be empty";
            this.selfBody = this.selfBody || this.owner.getComponent(RigidBody);
            if (!this.selfBody)
                throw "selfBody can not be empty";
            var box2d = window.box2d;
            var def = WeldJoint._temp || (WeldJoint._temp = new box2d.b2WeldJointDef());
            var anchorPos = this.selfBody.owner.localToGlobal(Point.TEMP.setTo(this.anchor[0], this.anchor[1]), false, Physics.I.worldRoot);
            var anchorVec = new box2d.b2Vec2(anchorPos.x / Physics.PIXEL_RATIO, anchorPos.y / Physics.PIXEL_RATIO);
            def.Initialize(this.otherBody.getBody(), this.selfBody.getBody(), anchorVec);
            def.frequencyHz = this._frequency;
            def.dampingRatio = this._damping;
            def.collideConnected = this.collideConnected;
            this._joint = Physics.I._createJoint(def);
        }
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
ClassUtils.regClass("laya.physics.joint.WeldJoint", WeldJoint);
ClassUtils.regClass("Laya.WeldJoint", WeldJoint);
