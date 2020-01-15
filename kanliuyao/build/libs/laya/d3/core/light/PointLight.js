import { LightSprite } from "./LightSprite";
/**
 * <code>PointLight</code> 类用于创建点光。
 */
export class PointLight extends LightSprite {
    /**
     * 创建一个 <code>PointLight</code> 实例。
     */
    constructor() {
        super();
        this._range = 6.0;
    }
    /**
     * 点光的范围。
     * @return 点光的范围。
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
        this._scene._pointLights.add(this);
    }
    /**
     * @internal
     * @override
     */
    _removeFromLightQueue() {
        this._scene._pointLights.remove(this);
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        this.range = data.range;
    }
}
