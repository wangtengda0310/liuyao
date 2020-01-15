import { Vector4 } from "../../math/Vector4";
import { Transform3D } from "../Transform3D";
import { ShurikenParticleRenderer } from "./ShurikenParticleRenderer";
import { ShurikenParticleSystem } from "./ShurikenParticleSystem";
/**
 *  @internal
 */
export declare class ShurikenParticleData {
    /**@internal */
    private static _tempVector30;
    static startLifeTime: number;
    static startColor: Vector4;
    static startSize: Float32Array;
    static startRotation: Float32Array;
    static startUVInfo: Float32Array;
    constructor();
    /**
     * @internal
     */
    private static _getStartLifetimeFromGradient;
    /**
     * @internal
     */
    private static _randomInvertRoationArray;
    /**
     * @internal
     */
    private static _randomInvertRoation;
    /**
     * @internal
     */
    static create(particleSystem: ShurikenParticleSystem, particleRender: ShurikenParticleRenderer, transform: Transform3D): void;
}
