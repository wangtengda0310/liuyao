import { Event } from "../events/Event";
import { ILaya } from "../../ILaya";
import { ClassUtils } from "../utils/ClassUtils";
/**
 * <code>UIEvent</code> 类用来定义UI组件类的事件类型。
 */
export class UIEvent extends Event {
}
/**
 * 显示提示信息。
 */
UIEvent.SHOW_TIP = "showtip";
/**
 * 隐藏提示信息。
 */
UIEvent.HIDE_TIP = "hidetip";
ILaya.regClass(UIEvent);
ClassUtils.regClass("laya.ui.UIEvent", UIEvent);
ClassUtils.regClass("Laya.UIEvent", UIEvent);
