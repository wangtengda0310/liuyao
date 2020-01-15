import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
/**
 * 轮子关节：围绕节点旋转，包含弹性属性，使得刚体在节点位置发生弹性偏移
 */
export declare class WheelJoint extends JointBase {
    /**@private */
    private static _temp;
    /**[首次设置有效]关节的自身刚体*/
    selfBody: RigidBody;
    /**[首次设置有效]关节的连接刚体*/
    otherBody: RigidBody;
    /**[首次设置有效]关节的链接点，是相对于自身刚体的左上角位置偏移*/
    anchor: any[];
    /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
    collideConnected: boolean;
    /**[首次设置有效]一个向量值，描述运动方向，比如1,0是沿X轴向右*/
    axis: any[];
    /**弹簧系统的震动频率，可以视为弹簧的弹性系数*/
    private _frequency;
    /**刚体在回归到节点过程中受到的阻尼，取值0~1*/
    private _damping;
    /**是否开启马达，开启马达可使目标刚体运动*/
    private _enableMotor;
    /**启用马达后，可以达到的最大旋转速度*/
    private _motorSpeed;
    /**启用马达后，可以施加的最大扭距，如果最大扭矩太小，会导致不旋转*/
    private _maxMotorTorque;
    /**
     * @override
     */
    protected _createJoint(): void;
    /**弹簧系统的震动频率，可以视为弹簧的弹性系数*/
    frequency: number;
    /**刚体在回归到节点过程中受到的阻尼，取值0~1*/
    damping: number;
    /**是否开启马达，开启马达可使目标刚体运动*/
    enableMotor: boolean;
    /**启用马达后，可以达到的最大旋转速度*/
    motorSpeed: number;
    /**启用马达后，可以施加的最大扭距，如果最大扭矩太小，会导致不旋转*/
    maxMotorTorque: number;
}
