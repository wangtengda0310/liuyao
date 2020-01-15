import { JointBase } from "./JointBase";
import { RigidBody } from "../RigidBody";
/**
 * 绳索关节：限制了两个点之间的最大距离。它能够阻止连接的物体之间的拉伸，即使在很大的负载下
 */
export declare class RopeJoint extends JointBase {
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
    /**selfAnchor和otherAnchor之间的最大距离*/
    private _maxLength;
    /**
     * @override
     */
    protected _createJoint(): void;
    /**selfAnchor和otherAnchor之间的最大距离*/
    maxLength: number;
}
