import { DirectionLight } from "./DirectionLight";
import { LightSprite } from "./LightSprite";
/**
 * @internal
 */
export declare class LightQueue<T extends LightSprite> {
    _length: number;
    _elements: T[];
    add(light: T): void;
    remove(light: T): void;
    shift(): T;
}
/**
 * @internal
 */
export declare class DirectionLightQueue extends LightQueue<DirectionLight> {
    getSunLight(): number;
}
/**
 * @internal
 */
export declare class AlternateLightQueue extends LightQueue<LightSprite> {
    remove(light: LightSprite): void;
}
