import { Laya } from "../../Laya";
import { Graphics } from "../display/Graphics";
import { Sprite } from "../display/Sprite";
import { Browser } from "../utils/Browser";
import { Physics } from "./Physics";
import { ClassUtils } from "../utils/ClassUtils";
/**
 * 物理辅助线，调用PhysicsDebugDraw.enable()开启，或者通过IDE设置打开
 */
export class PhysicsDebugDraw extends Sprite {
    constructor() {
        super();
        /**@private */
        this.m_drawFlags = 99;
        if (!PhysicsDebugDraw._inited) {
            PhysicsDebugDraw._inited = true;
            PhysicsDebugDraw.init();
        }
        this._camera = {};
        this._camera.m_center = new PhysicsDebugDraw.box2d.b2Vec2(0, 0);
        this._camera.m_extent = 25;
        this._camera.m_zoom = 1;
        this._camera.m_width = 1280;
        this._camera.m_height = 800;
        this._mG = new Graphics();
        this.graphics = this._mG;
        this._textSp = new Sprite();
        this._textG = this._textSp.graphics;
        this.addChild(this._textSp);
    }
    /**@private */
    static init() {
        PhysicsDebugDraw.box2d = Browser.window.box2d;
        PhysicsDebugDraw.DrawString_s_color = new PhysicsDebugDraw.box2d.b2Color(0.9, 0.6, 0.6);
        PhysicsDebugDraw.DrawStringWorld_s_p = new PhysicsDebugDraw.box2d.b2Vec2();
        PhysicsDebugDraw.DrawStringWorld_s_cc = new PhysicsDebugDraw.box2d.b2Vec2();
        PhysicsDebugDraw.DrawStringWorld_s_color = new PhysicsDebugDraw.box2d.b2Color(0.5, 0.9, 0.5);
    }
    /**@private
     * @override
    */
    render(ctx, x, y) {
        this._renderToGraphic();
        super.render(ctx, x, y);
    }
    /**@private */
    _renderToGraphic() {
        if (this.world) {
            this._textG.clear();
            this._mG.clear();
            this._mG.save();
            this._mG.scale(Physics.PIXEL_RATIO, Physics.PIXEL_RATIO);
            this.lineWidth = 1 / Physics.PIXEL_RATIO;
            this.world.DrawDebugData();
            this._mG.restore();
        }
    }
    /**@private */
    SetFlags(flags) {
        this.m_drawFlags = flags;
    }
    /**@private */
    GetFlags() {
        return this.m_drawFlags;
    }
    /**@private */
    AppendFlags(flags) {
        this.m_drawFlags |= flags;
    }
    /**@private */
    ClearFlags(flags) {
        this.m_drawFlags &= ~flags;
    }
    /**@private */
    PushTransform(xf) {
        this._mG.save();
        this._mG.translate(xf.p.x, xf.p.y);
        this._mG.rotate(xf.q.GetAngle());
    }
    /**@private */
    PopTransform(xf) {
        this._mG.restore();
    }
    /**@private */
    DrawPolygon(vertices, vertexCount, color) {
        var i, len;
        len = vertices.length;
        var points;
        points = [];
        for (i = 0; i < vertexCount; i++) {
            points.push(vertices[i].x, vertices[i].y);
        }
        this._mG.drawPoly(0, 0, points, null, color.MakeStyleString(1), this.lineWidth);
    }
    /**@private */
    DrawSolidPolygon(vertices, vertexCount, color) {
        var i, len;
        len = vertices.length;
        var points;
        points = [];
        for (i = 0; i < vertexCount; i++) {
            points.push(vertices[i].x, vertices[i].y);
        }
        this._mG.drawPoly(0, 0, points, color.MakeStyleString(0.5), color.MakeStyleString(1), this.lineWidth);
    }
    /**@private */
    DrawCircle(center, radius, color) {
        this._mG.drawCircle(center.x, center.y, radius, null, color.MakeStyleString(1), this.lineWidth);
    }
    /**@private */
    DrawSolidCircle(center, radius, axis, color) {
        var cx = center.x;
        var cy = center.y;
        this._mG.drawCircle(cx, cy, radius, color.MakeStyleString(0.5), color.MakeStyleString(1), this.lineWidth);
        this._mG.drawLine(cx, cy, (cx + axis.x * radius), (cy + axis.y * radius), color.MakeStyleString(1), this.lineWidth);
    }
    /**@private */
    DrawParticles(centers, radius, colors, count) {
        if (colors !== null) {
            for (var i = 0; i < count; ++i) {
                var center = centers[i];
                var color = colors[i];
                this._mG.drawCircle(center.x, center.y, radius, color.MakeStyleString(), null, this.lineWidth);
            }
        }
        else {
            for (i = 0; i < count; ++i) {
                center = centers[i];
                this._mG.drawCircle(center.x, center.y, radius, "#ffff00", null, this.lineWidth);
            }
        }
    }
    /**@private */
    DrawSegment(p1, p2, color) {
        this._mG.drawLine(p1.x, p1.y, p2.x, p2.y, color.MakeStyleString(1), this.lineWidth);
    }
    /**@private */
    DrawTransform(xf) {
        this.PushTransform(xf);
        this._mG.drawLine(0, 0, 1, 0, PhysicsDebugDraw.box2d.b2Color.RED.MakeStyleString(1), this.lineWidth);
        this._mG.drawLine(0, 0, 0, 1, PhysicsDebugDraw.box2d.b2Color.GREEN.MakeStyleString(1), this.lineWidth);
        this.PopTransform(xf);
    }
    /**@private */
    DrawPoint(p, size, color) {
        size *= this._camera.m_zoom;
        size /= this._camera.m_extent;
        var hsize = size / 2;
        this._mG.drawRect(p.x - hsize, p.y - hsize, size, size, color.MakeStyleString(), null);
    }
    /**@private */
    DrawString(x, y, message) {
        this._textG.fillText(message, x, y, "15px DroidSans", PhysicsDebugDraw.DrawString_s_color.MakeStyleString(), "left");
    }
    /**@private */
    DrawStringWorld(x, y, message) {
        this.DrawString(x, y, message);
    }
    /**@private */
    DrawAABB(aabb, color) {
        var x = aabb.lowerBound.x;
        var y = aabb.lowerBound.y;
        var w = aabb.upperBound.x - aabb.lowerBound.x;
        var h = aabb.upperBound.y - aabb.lowerBound.y;
        this._mG.drawRect(x, y, w, h, null, color.MakeStyleString(), this.lineWidth);
    }
    /**
     * 激活物理辅助线
     * @param	flags 位标记值，其值是AND的结果，其值有-1:显示形状，2:显示关节，4:显示AABB包围盒,8:显示broad-phase pairs,16:显示质心
     * @return	返回一个Sprite对象，本对象用来显示物理辅助线
     */
    static enable(flags = 99) {
        if (!PhysicsDebugDraw.I) {
            var debug = new PhysicsDebugDraw();
            debug.world = Physics.I.world;
            debug.world.SetDebugDraw(debug);
            debug.zOrder = 1000;
            debug.m_drawFlags = flags;
            Laya.stage.addChild(debug);
            PhysicsDebugDraw.I = debug;
        }
        return debug;
    }
}
/**@private */
PhysicsDebugDraw._inited = false;
ClassUtils.regClass("laya.physics.PhysicsDebugDraw", PhysicsDebugDraw);
ClassUtils.regClass("Laya.PhysicsDebugDraw", PhysicsDebugDraw);
