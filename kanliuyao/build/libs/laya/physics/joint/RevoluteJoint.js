import { JointBase } from "./JointBase";
import { Point } from "../../maths/Point";
import { Physics } from "../Physics";
import { RigidBody } from "../RigidBody";
import { ClassUtils } from "../../utils/ClassUtils";
/**
 * 旋转关节强制两个物体共享一个锚点，两个物体相对旋转
 */
export class RevoluteJoint extends JointBase {
    constructor() {
        super(...arguments);
        /**[首次设置有效]关节的链接点，是相对于自身刚体的左上角位置偏移*/
        this.anchor = [0, 0];
        /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
        this.collideConnected = false;
        /**是否开启马达，开启马达可使目标刚体运动*/
        this._enableMotor = false;
        /**启用马达后，可以达到的最大旋转速度*/
        this._motorSpeed = 0;
        /**启用马达后，可以施加的最大扭距，如果最大扭矩太小，会导致不旋转*/
        this._maxMotorTorque = 10000;
        /**是否对刚体的旋转范围加以约束*/
        this._enableLimit = false;
        /**启用约束后，刚体旋转范围的下限弧度*/
        this._lowerAngle = 0;
        /**启用约束后，刚体旋转范围的上限弧度*/
        this._upperAngle = 0;
    }
    /**
     * @override
     */
    _createJoint() {
        if (!this._joint) {
            //if (!otherBody) throw "otherBody can not be empty";
            this.selfBody = this.selfBody || this.owner.getComponent(RigidBody);
            if (!this.selfBody)
                throw "selfBody can not be empty";
            var box2d = window.box2d;
            var def = RevoluteJoint._temp || (RevoluteJoint._temp = new box2d.b2RevoluteJointDef());
            var anchorPos = this.selfBody.owner.localToGlobal(Point.TEMP.setTo(this.anchor[0], this.anchor[1]), false, Physics.I.worldRoot);
            var anchorVec = new box2d.b2Vec2(anchorPos.x / Physics.PIXEL_RATIO, anchorPos.y / Physics.PIXEL_RATIO);
            def.Initialize(this.otherBody ? this.otherBody.getBody() : Physics.I._emptyBody, this.selfBody.getBody(), anchorVec);
            def.enableMotor = this._enableMotor;
            def.motorSpeed = this._motorSpeed;
            def.maxMotorTorque = this._maxMotorTorque;
            def.enableLimit = this._enableLimit;
            def.lowerAngle = this._lowerAngle;
            def.upperAngle = this._upperAngle;
            def.collideConnected = this.collideConnected;
            this._joint = Physics.I._createJoint(def);
        }
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
    /**是否对刚体的旋转范围加以约束*/
    get enableLimit() {
        return this._enableLimit;
    }
    set enableLimit(value) {
        this._enableLimit = value;
        if (this._joint)
            this._joint.EnableLimit(value);
    }
    /**启用约束后，刚体旋转范围的下限弧度*/
    get lowerAngle() {
        return this._lowerAngle;
    }
    set lowerAngle(value) {
        this._lowerAngle = value;
        if (this._joint)
            this._joint.SetLimits(value, this._upperAngle);
    }
    /**启用约束后，刚体旋转范围的上限弧度*/
    get upperAngle() {
        return this._upperAngle;
    }
    set upperAngle(value) {
        this._upperAngle = value;
        if (this._joint)
            this._joint.SetLimits(this._lowerAngle, value);
    }
}
ClassUtils.regClass("laya.physics.joint.RevoluteJoint", RevoluteJoint);
ClassUtils.regClass("Laya.RevoluteJoint", RevoluteJoint);
