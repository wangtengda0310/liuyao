import { JointBase } from "./JointBase";
import { Point } from "../../maths/Point";
import { Physics } from "../Physics";
import { RigidBody } from "../RigidBody";
import { ClassUtils } from "../../utils/ClassUtils";
/**
 * 平移关节：移动关节允许两个物体沿指定轴相对移动，它会阻止相对旋转
 */
export class PrismaticJoint extends JointBase {
    constructor() {
        super(...arguments);
        /**[首次设置有效]关节的控制点，是相对于自身刚体的左上角位置偏移*/
        this.anchor = [0, 0];
        /**[首次设置有效]一个向量值，描述运动方向，比如1,0是沿X轴向右*/
        this.axis = [1, 0];
        /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
        this.collideConnected = false;
        /**是否开启马达，开启马达可使目标刚体运动*/
        this._enableMotor = false;
        /**启用马达后，在axis坐标轴上移动可以达到的最大速度*/
        this._motorSpeed = 0;
        /**启用马达后，可以施加的最大作用力*/
        this._maxMotorForce = 10000;
        /**是否对刚体的移动范围加以约束*/
        this._enableLimit = false;
        /**启用约束后，刚体移动范围的下限，是距离anchor的偏移量*/
        this._lowerTranslation = 0;
        /**启用约束后，刚体移动范围的上限，是距离anchor的偏移量*/
        this._upperTranslation = 0;
    }
    /**
     * @override
     *
     */
    _createJoint() {
        if (!this._joint) {
            //if (!otherBody) throw "otherBody can not be empty";
            this.selfBody = this.selfBody || this.owner.getComponent(RigidBody);
            if (!this.selfBody)
                throw "selfBody can not be empty";
            var box2d = window.box2d;
            var def = PrismaticJoint._temp || (PrismaticJoint._temp = new box2d.b2PrismaticJointDef());
            var anchorPos = this.selfBody.owner.localToGlobal(Point.TEMP.setTo(this.anchor[0], this.anchor[1]), false, Physics.I.worldRoot);
            var anchorVec = new box2d.b2Vec2(anchorPos.x / Physics.PIXEL_RATIO, anchorPos.y / Physics.PIXEL_RATIO);
            def.Initialize(this.otherBody ? this.otherBody.getBody() : Physics.I._emptyBody, this.selfBody.getBody(), anchorVec, new box2d.b2Vec2(this.axis[0], this.axis[1]));
            def.enableMotor = this._enableMotor;
            def.motorSpeed = this._motorSpeed;
            def.maxMotorForce = this._maxMotorForce;
            def.enableLimit = this._enableLimit;
            def.lowerTranslation = this._lowerTranslation / Physics.PIXEL_RATIO;
            def.upperTranslation = this._upperTranslation / Physics.PIXEL_RATIO;
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
    /**启用马达后，在axis坐标轴上移动可以达到的最大速度*/
    get motorSpeed() {
        return this._motorSpeed;
    }
    set motorSpeed(value) {
        this._motorSpeed = value;
        if (this._joint)
            this._joint.SetMotorSpeed(value);
    }
    /**启用马达后，可以施加的最大作用力*/
    get maxMotorForce() {
        return this._maxMotorForce;
    }
    set maxMotorForce(value) {
        this._maxMotorForce = value;
        if (this._joint)
            this._joint.SetMaxMotorForce(value);
    }
    /**是否对刚体的移动范围加以约束*/
    get enableLimit() {
        return this._enableLimit;
    }
    set enableLimit(value) {
        this._enableLimit = value;
        if (this._joint)
            this._joint.EnableLimit(value);
    }
    /**启用约束后，刚体移动范围的下限，是距离anchor的偏移量*/
    get lowerTranslation() {
        return this._lowerTranslation;
    }
    set lowerTranslation(value) {
        this._lowerTranslation = value;
        if (this._joint)
            this._joint.SetLimits(value, this._upperTranslation);
    }
    /**启用约束后，刚体移动范围的上限，是距离anchor的偏移量*/
    get upperTranslation() {
        return this._upperTranslation;
    }
    set upperTranslation(value) {
        this._upperTranslation = value;
        if (this._joint)
            this._joint.SetLimits(this._lowerTranslation, value);
    }
}
ClassUtils.regClass("laya.physics.joint.PrismaticJoint", PrismaticJoint);
ClassUtils.regClass("Laya.PrismaticJoint", PrismaticJoint);
