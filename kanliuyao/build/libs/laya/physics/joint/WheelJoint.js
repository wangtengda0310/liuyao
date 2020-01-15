import { JointBase } from "./JointBase";
import { Point } from "../../maths/Point";
import { Physics } from "../Physics";
import { RigidBody } from "../RigidBody";
import { ClassUtils } from "../../utils/ClassUtils";
/**
 * 轮子关节：围绕节点旋转，包含弹性属性，使得刚体在节点位置发生弹性偏移
 */
export class WheelJoint extends JointBase {
    constructor() {
        super(...arguments);
        /**[首次设置有效]关节的链接点，是相对于自身刚体的左上角位置偏移*/
        this.anchor = [0, 0];
        /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
        this.collideConnected = false;
        /**[首次设置有效]一个向量值，描述运动方向，比如1,0是沿X轴向右*/
        this.axis = [1, 0];
        /**弹簧系统的震动频率，可以视为弹簧的弹性系数*/
        this._frequency = 5;
        /**刚体在回归到节点过程中受到的阻尼，取值0~1*/
        this._damping = 0.7;
        /**是否开启马达，开启马达可使目标刚体运动*/
        this._enableMotor = false;
        /**启用马达后，可以达到的最大旋转速度*/
        this._motorSpeed = 0;
        /**启用马达后，可以施加的最大扭距，如果最大扭矩太小，会导致不旋转*/
        this._maxMotorTorque = 10000;
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
            var def = WheelJoint._temp || (WheelJoint._temp = new box2d.b2WheelJointDef());
            var anchorPos = this.selfBody.owner.localToGlobal(Point.TEMP.setTo(this.anchor[0], this.anchor[1]), false, Physics.I.worldRoot);
            var anchorVec = new box2d.b2Vec2(anchorPos.x / Physics.PIXEL_RATIO, anchorPos.y / Physics.PIXEL_RATIO);
            def.Initialize(this.otherBody.getBody(), this.selfBody.getBody(), anchorVec, new box2d.b2Vec2(this.axis[0], this.axis[1]));
            def.enableMotor = this._enableMotor;
            def.motorSpeed = this._motorSpeed;
            def.maxMotorTorque = this._maxMotorTorque;
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
            this._joint.SetSpringFrequencyHz(value);
    }
    /**刚体在回归到节点过程中受到的阻尼，取值0~1*/
    get damping() {
        return this._damping;
    }
    set damping(value) {
        this._damping = value;
        if (this._joint)
            this._joint.SetSpringDampingRatio(value);
    }
    /**是否开启马达，开启马达可使目标刚体运动*/
    get enableMotor() {
        return this._enableMotor;
    }
    set enableMotor(value) {
        this._enableMotor = value;
        if (this._joint)
            this._joint.EnableMotor(value);
    }
    /**启用马达后，可以达到的最大旋转速度*/
    get motorSpeed() {
        return this._motorSpeed;
    }
    set motorSpeed(value) {
        this._motorSpeed = value;
        if (this._joint)
            this._joint.SetMotorSpeed(value);
    }
    /**启用马达后，可以施加的最大扭距，如果最大扭矩太小，会导致不旋转*/
    get maxMotorTorque() {
        return this._maxMotorTorque;
    }
    set maxMotorTorque(value) {
        this._maxMotorTorque = value;
        if (this._joint)
            this._joint.SetMaxMotorTorque(value);
    }
}
ClassUtils.regClass("laya.physics.joint.WheelJoint", WheelJoint);
ClassUtils.regClass("Laya.WheelJoint", WheelJoint);
