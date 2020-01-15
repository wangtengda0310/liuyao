import { Touch } from "./Touch";
import { Scene3D } from "./core/scene/Scene3D";
/**
 * <code>Input3D</code> 类用于实现3D输入。
 */
export declare class Input3D {
    /**@internal */
    private static _tempPoint;
    /**@internal */
    private static _tempVector20;
    /**@internal */
    private static _tempRay0;
    /**@internal */
    private static _tempHitResult0;
    /**@internal */
    private _scene;
    /**@internal */
    private _eventList;
    /**@internal */
    private _mouseTouch;
    /**@internal */
    private _touchPool;
    /**@internal */
    private _touches;
    /**@internal */
    private _multiTouchEnabled;
    /**
     *@internal
     */
    __init__(canvas: any, scene: Scene3D): void;
    /**
     * @internal
     */
    private _pushEventList;
    /**
     * @internal
     */
    _onCanvasEvent(canvas: any): void;
    /**
     * @internal
     */
    _offCanvasEvent(canvas: any): void;
    /**
     * 获取触摸点个数。
     * @return 触摸点个数。
     */
    touchCount(): number;
    /**
     * 获取是否可以使用多点触摸。
     * @return 是否可以使用多点触摸。
     */
    /**
    * 设置是否可以使用多点触摸。
    * @param 是否可以使用多点触摸。
    */
    multiTouchEnabled: boolean;
    /**
     * @internal
     * 创建一个 <code>Input3D</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    private _getTouch;
    /**
     * @internal
     */
    private _mouseTouchDown;
    /**
     * @internal
     */
    private _mouseTouchUp;
    /**
     * @internal
     */
    private _mouseTouchRayCast;
    /**
     * @internal
     * @param flag 0:add、1:remove、2:change
     */
    _changeTouches(changedTouches: TouchList, flag: number): void;
    /**
     * @internal
     */
    _update(): void;
    /**
     *	获取触摸点。
     * 	@param	index 索引。
     * 	@return 触摸点。
     */
    getTouch(index: number): Touch;
}
