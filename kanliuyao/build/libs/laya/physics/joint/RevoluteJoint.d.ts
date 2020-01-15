import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
/**
 * 旋转关节强制两个物体共享一个锚点，两个物体相对旋转
 */
export declare class RevoluteJoint extends JointBase {
    /**@private */
    private static _temp;
    /**[首次设置有效]关节的自身刚体*/
    selfBody: RigidBody;
    /**[首次设置有效]关节的连接刚体，可不设置*/
    otherBody: RigidBody;
    /**[首次设置有效]关节的链接点，是相对于自身刚体的左上角位置偏移*/
    anchor: any[];
    /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
    collideConnected: boolean;
    /**是否开启马达，开启马达可使目标刚体运动*/
    private _enableMotor;
    /**启用马达后，可以达到的最大旋转速度*/
    private _motorSpeed;
    /**启用马达后，可以施加的最大扭距，如果最大扭矩太小，会导致不旋转*/
    private _maxMotorTorque;
    /**是否对刚体的旋转范围加以约束*/
    private _enableLimit;
    /**启用约束后，刚体旋转范围的下限弧度*/
    private _lowerAngle;
    /**启用约束后，刚体旋转范围的上限弧度*/
    private _upperAngle;
    /**
     * @override
     */
    protected _createJoint(): void;
    /**是否开启马达，开启马达可使目标刚体运动*/
    enableMotor: boolean;
    /**启用马达后，可以达到的最大旋转速度*/
    motorSpeed: number;
    /**启用马达后，可以施加的最大扭距，如果最大扭矩太小，会导致不旋转*/
    maxMotorTorque: number;
    /**是否对刚体的旋转范围加以约束*/
    enableLimit: boolean;
    /**启用约束后，刚体旋转范围的下限弧度*/
    lowerAngle: number;
    /**启用约束后，刚体旋转范围的上限弧度*/
    upperAngle: number;
}
