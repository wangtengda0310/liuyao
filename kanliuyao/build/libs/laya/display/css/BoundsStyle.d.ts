import { Rectangle } from "../../maths/Rectangle";
/**
 * @internal
 * Graphic bounds数据类
 */
export declare class BoundsStyle {
    /**@private */
    bounds: Rectangle | null;
    /**用户设的bounds*/
    userBounds: Rectangle | null;
    /**缓存的bounds顶点,sprite计算bounds用*/
    temBM: any[] | null;
    /**
     * 重置
     */
    reset(): BoundsStyle;
    /**
     * 回收
     */
    recover(): void;
    /**
     * 创建
     */
    static create(): BoundsStyle;
}
