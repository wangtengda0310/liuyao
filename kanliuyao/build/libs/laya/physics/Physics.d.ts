import { Sprite } from "../display/Sprite";
import { EventDispatcher } from "../events/EventDispatcher";
/**
 * 2D物理引擎，使用Box2d驱动
 */
export declare class Physics extends EventDispatcher {
    /**2D游戏默认单位为像素，物理默认单位为米，此值设置了像素和米的转换比率，默认50像素=1米*/
    static PIXEL_RATIO: number;
    /**@private */
    private static _I;
    /**Box2d引擎的全局引用，更多属性和api请参考 http://box2d.org */
    box2d: any;
    /**[只读]物理世界引用，更多属性请参考官网 */
    world: any;
    /**旋转迭代次数，增大数字会提高精度，但是会降低性能*/
    velocityIterations: number;
    /**位置迭代次数，增大数字会提高精度，但是会降低性能*/
    positionIterations: number;
    /**@private 是否已经激活*/
    private _enabled;
    /**@private 根容器*/
    private _worldRoot;
    /**@private 空的body节点，给一些不需要节点的关节使用*/
    _emptyBody: any;
    /**@private */
    _eventList: any[];
    /**全局物理单例*/
    static readonly I: Physics;
    constructor();
    /**
     * 开启物理世界
     * options值参考如下：
       allowSleeping:true,
       gravity:10,
       customUpdate:false 自己控制物理更新时机，自己调用Physics.update
     */
    static enable(options?: any): void;
    /**
     * 开启物理世界
     * options值参考如下：
       allowSleeping:true,
       gravity:10,
       customUpdate:false 自己控制物理更新时机，自己调用Physics.update
     */
    start(options?: any): void;
    private _update;
    private _sendEvent;
    /**@private */
    _createBody(def: any): any;
    /**@private */
    _removeBody(body: any): void;
    /**@private */
    _createJoint(def: any): any;
    /**@private */
    _removeJoint(joint: any): void;
    /**
     * 停止物理世界
     */
    stop(): void;
    /**
     * 设置是否允许休眠，休眠可以提高稳定性和性能，但通常会牺牲准确性
     */
    allowSleeping: boolean;
    /**
     * 物理世界重力环境，默认值为{x:0,y:1}
     * 如果修改y方向重力方向向上，可以直接设置gravity.y=-1;
     */
    gravity: any;
    /**获得刚体总数量*/
    getBodyCount(): number;
    /**获得碰撞总数量*/
    getContactCount(): number;
    /**获得关节总数量*/
    getJointCount(): number;
    /**物理世界根容器，将根据此容器作为物理世界坐标世界，进行坐标变换，默认值为stage
     * 设置特定容器后，就可整体位移物理对象，保持物理世界不变*/
    worldRoot: Sprite;
}
