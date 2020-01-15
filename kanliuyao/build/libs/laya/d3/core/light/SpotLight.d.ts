import { Vector3 } from "../../math/Vector3";
import { LightSprite } from "./LightSprite";
/**
 * <code>SpotLight</code> 类用于创建聚光。
 */
export declare class SpotLight extends LightSprite {
    /** @internal */
    private _spotAngle;
    /** @internal */
    private _range;
    /** @internal */
    _direction: Vector3;
    /**
    * 聚光灯的锥形角度。
    */
    spotAngle: number;
    /**
     * 聚光的范围。
     */
    range: number;
    /**
     * 创建一个 <code>SpotLight</code> 实例。
     */
    constructor();
    /**
     * @internal
     * @override
     */
    protected _addToLightQueue(): void;
    /**
     * @internal
     * @override
     */
    protected _removeFromLightQueue(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data: any, spriteMap: any): void;
}
