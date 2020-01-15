import { LightSprite } from "./LightSprite";
/**
 * <code>PointLight</code> 类用于创建点光。
 */
export declare class PointLight extends LightSprite {
    /** @internal */
    private _range;
    /**
     * 点光的范围。
     * @return 点光的范围。
     */
    range: number;
    /**
     * 创建一个 <code>PointLight</code> 实例。
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
