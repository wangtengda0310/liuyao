import { Component } from "../components/Component";
import { RigidBody } from "./RigidBody";
/**
 * 碰撞体基类
 */
export declare class ColliderBase extends Component {
    /**是否是传感器，传感器能够触发碰撞事件，但不会产生碰撞反应*/
    private _isSensor;
    /**密度值，值可以为零或者是正数，建议使用相似的密度，这样做可以改善堆叠稳定性，默认值为10*/
    private _density;
    /**摩擦力，取值范围0-1，值越大，摩擦越大，默认值为0.2*/
    private _friction;
    /**弹性系数，取值范围0-1，值越大，弹性越大，默认值为0*/
    private _restitution;
    /**标签*/
    label: string;
    /**@private b2Shape对象*/
    protected _shape: any;
    /**@private b2FixtureDef对象 */
    protected _def: any;
    /**[只读]b2Fixture对象 */
    fixture: any;
    /**[只读]刚体引用*/
    rigidBody: RigidBody;
    /**@private 获取碰撞体信息*/
    protected getDef(): any;
    /**
     * @internal
     * @override
     */
    protected _onEnable(): void;
    private _checkRigidBody;
    /**
     * @internal
     * @override
     */
    protected _onDestroy(): void;
    /**是否是传感器，传感器能够触发碰撞事件，但不会产生碰撞反应*/
    isSensor: boolean;
    /**密度值，值可以为零或者是正数，建议使用相似的密度，这样做可以改善堆叠稳定性，默认值为10*/
    density: number;
    /**摩擦力，取值范围0-1，值越大，摩擦越大，默认值为0.2*/
    friction: number;
    /**弹性系数，取值范围0-1，值越大，弹性越大，默认值为0*/
    restitution: number;
    /**
     * @private
     * 碰撞体参数发生变化后，刷新物理世界碰撞信息
     */
    refresh(): void;
    /**
     * @private
     * 重置形状
     */
    resetShape(re?: boolean): void;
    /**
     * 获取是否为单实例组件。
     * @override
     */
    readonly isSingleton: boolean;
}
