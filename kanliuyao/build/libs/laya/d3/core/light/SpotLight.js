import { Vector3 } from "../../math/Vector3";
import { LightSprite } from "./LightSprite";
/**
 * <code>SpotLight</code> 类用于创建聚光。
 */
export class SpotLight extends LightSprite {
    /**
     * 创建一个 <code>SpotLight</code> 实例。
     */
    constructor() {
        super();
        this._spotAngle = 30.0;
        this._range = 10.0;
        this._direction = new Vector3();
    }
    /**
    * 聚光灯的锥形角度。
    */
    get spotAngle() {
        return this._spotAngle;
    }
    set spotAngle(value) {
        this._spotAngle = Math.max(Math.min(value, 179), 0);
    }
    /**
     * 聚光的范围。
     */
    get range() {
        return this._range;
    }
    set range(value) {
        this._range = value;
    }
    /**
     * @internal
     * @override
     */
    _addToLightQueue() {
        this._scene._spotLights.add(this);
    }
    /**
     * @internal
     * @override
     */
    _removeFromLightQueue() {
        this._scene._spotLights.remove(this);
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        this.range = data.range;
        this.spotAngle = data.spotAngle;
    }
}
