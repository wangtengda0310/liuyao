import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
/**
 * 马达关节：用来限制两个刚体，使其相对位置和角度保持不变
 */
export declare class MotorJoint extends JointBase {
    /**@private */
    private static _temp;
    /**[首次设置有效]关节的自身刚体*/
    selfBody: RigidBody;
    /**[首次设置有效]关节的连接刚体*/
    otherBody: RigidBody;
    /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
    collideConnected: boolean;
    /**基于otherBody坐标位置的偏移量，也是selfBody的目标位置*/
    private _linearOffset;
    /**基于otherBody的角度偏移量，也是selfBody的目标角度*/
    private _angularOffset;
    /**当selfBody偏离目标位置时，为使其恢复到目标位置，马达关节所施加的最大作用力*/
    private _maxForce;
    /**当selfBody角度与目标角度不同时，为使其达到目标角度，马达关节施加的最大扭力*/
    private _maxTorque;
    /**selfBody向目标位置移动时的缓动因子，取值0~1，值越大速度越快*/
    private _correctionFactor;
    /**
     * @override
     *
     */
    protected _createJoint(): void;
    /**基于otherBody坐标位置的偏移量，也是selfBody的目标位置*/
    linearOffset: any[];
    /**基于otherBody的角度偏移量，也是selfBody的目标角度*/
    angularOffset: number;
    /**当selfBody偏离目标位置时，为使其恢复到目标位置，马达关节所施加的最大作用力*/
    maxForce: number;
    /**当selfBody角度与目标角度不同时，为使其达到目标角度，马达关节施加的最大扭力*/
    maxTorque: number;
    /**selfBody向目标位置移动时的缓动因子，取值0~1，值越大速度越快*/
    correctionFactor: number;
}
