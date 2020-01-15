import { JointBase } from "./JointBase";
/**
 * 齿轮关节：用来模拟两个齿轮间的约束关系，齿轮旋转时，产生的动量有两种输出方式，一种是齿轮本身的角速度，另一种是齿轮表面的线速度
 */
export declare class GearJoint extends JointBase {
    /**@private */
    private static _temp;
    /**[首次设置有效]要绑定的第1个关节，类型可以是RevoluteJoint或者PrismaticJoint*/
    joint1: any;
    /**[首次设置有效]要绑定的第2个关节，类型可以是RevoluteJoint或者PrismaticJoint*/
    joint2: any;
    /**[首次设置有效]两个刚体是否可以发生碰撞，默认为false*/
    collideConnected: boolean;
    /**两个齿轮角速度比例，默认1*/
    private _ratio;
    /**
     * @override
     *
     */
    protected _createJoint(): void;
    /**两个齿轮角速度比例，默认1*/
    ratio: number;
}
