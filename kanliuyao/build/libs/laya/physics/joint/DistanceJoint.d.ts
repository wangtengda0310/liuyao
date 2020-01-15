import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
/**
 * 距离关节：两个物体上面各自有一点，两点之间的距离固定不变
 */
export declare class DistanceJoint extends JointBase {
    /**@private */
    private static _temp;
    /**[首次设置有效]关节的自身刚体*/
    selfBody: RigidBody;
    /**[首次设置有效]关节的连接刚体，可不设置，默认为左上角空刚体*/
    otherBody: RigidBody;
    /**[首次设置有效]自身刚体链接点，是相对于自身刚体的左上角位置偏移*/
    selfAnchor: any[];
    /**[首次设置有效]链接刚体链接点，是相对于otherBody的左上角位置偏移*/
    otherAnchor: any[];
    /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
    collideConnected: boolean;
    /**约束的目标静止长度*/
    private _length;
    /**弹簧系统的震动频率，可以视为弹簧的弹性系数*/
    private _frequency;
    /**刚体在回归到节点过程中受到的阻尼，建议取值0~1*/
    private _damping;
    /**
     * @override
     */
    protected _createJoint(): void;
    /**约束的目标静止长度*/
    length: number;
    /**弹簧系统的震动频率，可以视为弹簧的弹性系数*/
    frequency: number;
    /**刚体在回归到节点过程中受到的阻尼，建议取值0~1*/
    damping: number;
}
