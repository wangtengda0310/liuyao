import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
/**
 * 滑轮关节：它将两个物体接地(ground)并彼此连接，当一个物体上升，另一个物体就会下降
 */
export declare class PulleyJoint extends JointBase {
    /**@private */
    private static _temp;
    /**[首次设置有效]关节的自身刚体*/
    selfBody: RigidBody;
    /**[首次设置有效]关节的连接刚体*/
    otherBody: RigidBody;
    /**[首次设置有效]自身刚体链接点，是相对于自身刚体的左上角位置偏移*/
    selfAnchor: any[];
    /**[首次设置有效]链接刚体链接点，是相对于otherBody的左上角位置偏移*/
    otherAnchor: any[];
    /**[首次设置有效]滑轮上与节点selfAnchor相连接的节点，是相对于自身刚体的左上角位置偏移*/
    selfGroundPoint: any[];
    /**[首次设置有效]滑轮上与节点otherAnchor相连接的节点，是相对于otherBody的左上角位置偏移*/
    otherGroundPoint: any[];
    /**[首次设置有效]两刚体移动距离比率*/
    ratio: number;
    /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
    collideConnected: boolean;
    /**
     * @override
     */
    protected _createJoint(): void;
}
