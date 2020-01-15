import { UIComponent } from "../../laya/ui/UIComponent";
/**
 * 微信开放数据展示组件，直接实例本组件，即可根据组件宽高，位置，以最优的方式显示开放域数据
 */
export declare class WXOpenDataViewer extends UIComponent {
    constructor();
    /**
     * @override
     */
    onEnable(): void;
    /**
     * @override
     */
    onDisable(): void;
    private _onLoop;
    /**
     * @override
     */
    /**
    * @override
    */
    width: number;
    /**
     * @override
     */
    /**
    * @override
    */
    height: number;
    /**
     * @override
     */
    /**
    * @override
    */
    x: number;
    /**
     * @override
     */
    /**
    * @override
    */
    y: number;
    private _postMsg;
    /**向开放数据域发送消息*/
    postMsg(msg: any): void;
}
