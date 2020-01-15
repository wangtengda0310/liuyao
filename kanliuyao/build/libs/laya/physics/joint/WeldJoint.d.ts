import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
/**
 * 焊接关节：焊接关节的用途是使两个物体不能相对运动，受到关节的限制，两个刚体的相对位置和角度都保持不变，看上去像一个整体
 */
export declare class WeldJoint extends JointBase {
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
    /**弹簧系统的震动频率，可以视为弹簧的弹性系数*/
    private _frequency;
    /**刚体在回归到节点过程中受到的阻尼，取值0~1*/
    private _damping;
    /**
     * @override
     */
    protected _createJoint(): void;
    /**弹簧系统的震动频率，可以视为弹簧的弹性系数*/
    frequency: number;
    /**刚体在回归到节点过程中受到的阻尼，建议取值0~1*/
    damping: number;
}
