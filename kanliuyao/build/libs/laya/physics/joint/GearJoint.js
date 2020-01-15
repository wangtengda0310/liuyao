import { JointBase } from "./JointBase";
import { Physics } from "../Physics";
import { RigidBody } from "../RigidBody";
import { ClassUtils } from "../../utils/ClassUtils";
/**
 * 齿轮关节：用来模拟两个齿轮间的约束关系，齿轮旋转时，产生的动量有两种输出方式，一种是齿轮本身的角速度，另一种是齿轮表面的线速度
 */
export class GearJoint extends JointBase {
    constructor() {
        super(...arguments);
        /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
        this.collideConnected = false;
        /**两个齿轮角速度比例，默认1*/
        this._ratio = 1;
    }
    /**
     * @override
     *
     */
    _createJoint() {
        if (!this._joint) {
            if (!this.joint1)
                throw "Joint1 can not be empty";
            if (!this.joint2)
                throw "Joint2 can not be empty";
            var box2d = window.box2d;
            var def = GearJoint._temp || (GearJoint._temp = new box2d.b2GearJointDef());
            def.bodyA = this.joint1.owner.getComponent(RigidBody).getBody();
            def.bodyB = this.joint2.owner.getComponent(RigidBody).getBody();
            def.joint1 = this.joint1.joint;
            def.joint2 = this.joint2.joint;
            def.ratio = this._ratio;
            def.collideConnected = this.collideConnected;
            this._joint = Physics.I._createJoint(def);
        }
    }
    /**两个齿轮角速度比例，默认1*/
    get ratio() {
        return this._ratio;
    }
    set ratio(value) {
        this._ratio = value;
        if (this._joint)
            this._joint.SetRatio(value);
    }
}
ClassUtils.regClass("laya.physics.joint.GearJoint", GearJoint);
ClassUtils.regClass("Laya.GearJoint", GearJoint);
