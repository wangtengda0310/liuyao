import { Sprite } from "../display/Sprite";
import { Context } from "../resource/Context";
/**
 * 物理辅助线，调用PhysicsDebugDraw.enable()开启，或者通过IDE设置打开
 */
export declare class PhysicsDebugDraw extends Sprite {
    /**@private */
    m_drawFlags: number;
    /**@private */
    static box2d: any;
    /**@private */
    static DrawString_s_color: any;
    /**@private */
    static DrawStringWorld_s_p: any;
    /**@private */
    static DrawStringWorld_s_cc: any;
    /**@private */
    static DrawStringWorld_s_color: any;
    /**@private */
    world: any;
    /**@private */
    private _camera;
    /**@private */
    private static _canvas;
    /**@private */
    private static _inited;
    /**@private */
    private _mG;
    /**@private */
    private _textSp;
    /**@private */
    private _textG;
    /**@private */
    static init(): void;
    constructor();
    /**@private
     * @override
    */
    render(ctx: Context, x: number, y: number): void;
    /**@private */
    private lineWidth;
    /**@private */
    private _renderToGraphic;
    /**@private */
    SetFlags(flags: number): void;
    /**@private */
    GetFlags(): number;
    /**@private */
    AppendFlags(flags: number): void;
    /**@private */
    ClearFlags(flags: any): void;
    /**@private */
    PushTransform(xf: any): void;
    /**@private */
    PopTransform(xf: any): void;
    /**@private */
    DrawPolygon(vertices: any, vertexCount: any, color: any): void;
    /**@private */
    DrawSolidPolygon(vertices: any, vertexCount: any, color: any): void;
    /**@private */
    DrawCircle(center: any, radius: any, color: any): void;
    /**@private */
    DrawSolidCircle(center: any, radius: any, axis: any, color: any): void;
    /**@private */
    DrawParticles(centers: any, radius: any, colors: any, count: any): void;
    /**@private */
    DrawSegment(p1: any, p2: any, color: any): void;
    /**@private */
    DrawTransform(xf: any): void;
    /**@private */
    DrawPoint(p: any, size: any, color: any): void;
    /**@private */
    DrawString(x: any, y: any, message: any): void;
    /**@private */
    DrawStringWorld(x: any, y: any, message: any): void;
    /**@private */
    DrawAABB(aabb: any, color: any): void;
    /**@private */
    static I: PhysicsDebugDraw;
    /**
     * 激活物理辅助线
     * @param	flags 位标记值，其值是AND的结果，其值有-1:显示形状，2:显示关节，4:显示AABB包围盒,8:显示broad-phase pairs,16:显示质心
     * @return	返回一个Sprite对象，本对象用来显示物理辅助线
     */
    static enable(flags?: number): PhysicsDebugDraw;
}
