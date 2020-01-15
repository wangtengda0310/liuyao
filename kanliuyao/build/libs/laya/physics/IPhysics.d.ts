import { RigidBody } from "./RigidBody";
import { Physics } from "./Physics";
/**
* 使用全局类的时候，避免引用其他模块
*/
export declare class IPhysics {
    static RigidBody: typeof RigidBody;
    static Physics: typeof Physics;
}
