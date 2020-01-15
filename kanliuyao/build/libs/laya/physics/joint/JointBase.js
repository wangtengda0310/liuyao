import { Component } from "../../components/Component";
import { Physics } from "../Physics";
import { ClassUtils } from "../../utils/ClassUtils";
/**
 * 关节基类
 */
export class JointBase extends Component {
    /**[只读]原生关节对象*/
    get joint() {
        if (!this._joint)
            this._createJoint();
        return this._joint;
    }
    /**
     * @internal
     * @override
     */
    _onEnable() {
        this._createJoint();
    }
    /**
     * @internal
     * @override
     */
    _onAwake() {
        this._createJoint();
    }
    _createJoint() {
    }
    /**
     * @internal
     * @override
     */
    _onDisable() {
        if (this._joint) {
            Physics.I._removeJoint(this._joint);
            this._joint = null;
        }
    }
}
ClassUtils.regClass("laya.physics.joint.JointBase", JointBase);
ClassUtils.regClass("Laya.JointBase", JointBase);
