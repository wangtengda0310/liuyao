import { Script } from "laya/components/Script";
import { Sprite } from "laya/display/Sprite";
import { Pool } from "laya/utils/Pool";
import { RigidBody } from "laya/physics/RigidBody";

/**
 * 子弹脚本，实现子弹飞行逻辑及对象池回收机制
 */
export default class Bullet extends Script {
    constructor() { super(); }

    onEnable(): void {
        //设置初始速度
        var rig: RigidBody = this.owner.getComponent(RigidBody);
        rig.setVelocity({ x: 0, y: -10 });
    }

    onTriggerEnter(other: any, self: any, contact: any): void {
        //如果被碰到，则移除子弹
        this.owner.removeSelf();
    }

    onUpdate(): void {
        //如果子弹超出屏幕，则移除子弹
        if ((this.owner as Sprite).y < -10) {
            this.owner.removeSelf();
        }
    }

    onDisable(): void {
        //子弹被移除时，回收子弹到对象池，方便下次复用，减少对象创建开销
        Pool.recover("bullet", this.owner);
    }
}