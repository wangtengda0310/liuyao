import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
/**
 * 平移关节：移动关节允许两个物体沿指定轴相对移动，它会阻止相对旋转
 */
export declare class PrismaticJoint extends JointBase {
    /**@private */
    private static _temp;
    /**[首次设置有效]关节的自身刚体*/
    selfBody: RigidBody;
    /**[首次设置有效]关节的连接刚体，可不设置，默认为左上角空刚体*/
    otherBody: RigidBody;
    /**[首次设置有效]关节的控制点，是相对于自身刚体的左上角位置偏移*/
    anchor: any[];
    /**[首次设置有效]一个向量值，描述运动方向，比如1,0是沿X轴向右*/
    axis: any[];
    /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
    collideConnected: boolean;
    /**是否开启马达，开启马达可使目标刚体运动*/
    private _enableMotor;
    /**启用马达后，在axis坐标轴上移动可以达到的最大速度*/
    private _motorSpeed;
    /**启用马达后，可以施加的最大作用力*/
    private _maxMotorForce;
    /**是否对刚体的移动范围加以约束*/
    private _enableLimit;
    /**启用约束后，刚体移动范围的下限，是距离anchor的偏移量*/
    private _lowerTranslation;
    /**启用约束后，刚体移动范围的上限，是距离anchor的偏移量*/
    private _upperTranslation;
    /**
     * @override
     *
     */
    protected _createJoint(): void;
    /**是否开启马达，开启马达可使目标刚体运动*/
    enableMotor: boolean;
    /**启用马达后，在axis坐标轴上移动可以达到的最大速度*/
    motorSpeed: number;
    /**启用马达后，可以施加的最大作用力*/
    maxMotorForce: number;
    /**是否对刚体的移动范围加以约束*/
    enableLimit: boolean;
    /**启用约束后，刚体移动范围的下限，是距离anchor的偏移量*/
    lowerTranslation: number;
    /**启用约束后，刚体移动范围的上限，是距离anchor的偏移量*/
    upperTranslation: number;
}
