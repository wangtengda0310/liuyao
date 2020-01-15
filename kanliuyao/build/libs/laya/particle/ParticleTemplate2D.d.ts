import { ParticleTemplateWebGL } from "./ParticleTemplateWebGL";
import { ParticleSetting } from "./ParticleSetting";
import { ISubmit } from "../webgl/submit/ISubmit";
import { ParticleShaderValue } from "./shader/value/ParticleShaderValue";
import { MeshParticle2D } from "../webgl/utils/MeshParticle2D";
/**
 *  @internal
 */
export declare class ParticleTemplate2D extends ParticleTemplateWebGL implements ISubmit {
    static activeBlendType: number;
    x: number;
    y: number;
    protected _blendFn: Function;
    sv: ParticleShaderValue;
    private _startTime;
    /**@internal */
    _key: any;
    constructor(parSetting: ParticleSetting);
    getRenderType(): number;
    releaseRender(): void;
    /**
     *
     * @param position
     * @param velocity
     * @override
     */
    addParticleArray(position: Float32Array, velocity: Float32Array): void;
    /**
     * @override
     */
    addNewParticlesToVertexBuffer(): void;
    renderSubmit(): number;
    updateParticleForNative(): void;
    getMesh(): MeshParticle2D;
    getConchMesh(): any;
    getFirstNewElement(): number;
    getFirstFreeElement(): number;
    getFirstActiveElement(): number;
    getFirstRetiredElement(): number;
    setFirstFreeElement(_value: number): void;
    setFirstNewElement(_value: number): void;
    addDrawCounter(): void;
    blend(): void;
    dispose(): void;
}
