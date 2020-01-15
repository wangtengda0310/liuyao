import { ColliderBase } from "./ColliderBase";
/**
     * 2D多边形碰撞体，暂时不支持凹多边形，如果是凹多边形，先手动拆分为多个凸多边形
     * 节点个数最多是b2_maxPolygonVertices，这数值默认是8，所以点的数量不建议超过8个，也不能小于3个
     */
export declare class PolygonCollider extends ColliderBase {
    /**相对节点的x轴偏移*/
    private _x;
    /**相对节点的y轴偏移*/
    private _y;
    /**用逗号隔开的点的集合，格式：x,y,x,y ...*/
    private _points;
    /**
     * @override
     */
    protected getDef(): any;
    private _setShape;
    /**相对节点的x轴偏移*/
    x: number;
    /**相对节点的y轴偏移*/
    y: number;
    /**用逗号隔开的点的集合，格式：x,y,x,y ...*/
    points: string;
}
