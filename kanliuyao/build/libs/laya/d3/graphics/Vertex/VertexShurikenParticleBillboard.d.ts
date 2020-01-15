import { VertexShuriKenParticle } from "./VertexShuriKenParticle";
import { VertexDeclaration } from "../VertexDeclaration";
import { Vector3 } from "../../math/Vector3";
import { Vector4 } from "../../math/Vector4";
/**
 * <code>VertexShurikenParticle</code> 类用于创建粒子顶点结构。
 */
export declare class VertexShurikenParticleBillboard extends VertexShuriKenParticle {
    /**@internal */
    private static _vertexDeclaration;
    static readonly vertexDeclaration: VertexDeclaration;
    /**
    * @internal
    */
    static __init__(): void;
    /**@internal */
    private _cornerTextureCoordinate;
    /**@internal */
    private _positionStartLifeTime;
    /**@internal */
    private _velocity;
    /**@internal */
    private _startColor;
    /**@internal */
    private _startSize;
    /**@internal */
    private _startRotation0;
    /**@internal */
    private _startRotation1;
    /**@internal */
    private _startRotation2;
    /**@internal */
    private _startLifeTime;
    /**@internal */
    private _time;
    /**@internal */
    private _startSpeed;
    /**@internal */
    private _randoms0;
    /**@internal */
    private _randoms1;
    /**@internal */
    private _simulationWorldPostion;
    readonly cornerTextureCoordinate: Vector4;
    readonly positionStartLifeTime: Vector4;
    readonly velocity: Vector3;
    readonly startColor: Vector4;
    readonly startSize: Vector3;
    readonly startRotation0: Vector3;
    readonly startRotation1: Vector3;
    readonly startRotation2: Vector3;
    readonly startLifeTime: number;
    readonly time: number;
    readonly startSpeed: number;
    readonly random0: Vector4;
    readonly random1: Vector4;
    readonly simulationWorldPostion: Vector3;
    constructor(cornerTextureCoordinate: Vector4, positionStartLifeTime: Vector4, velocity: Vector3, startColor: Vector4, startSize: Vector3, startRotation0: Vector3, startRotation1: Vector3, startRotation2: Vector3, ageAddScale: number, time: number, startSpeed: number, randoms0: Vector4, randoms1: Vector4, simulationWorldPostion: Vector3);
}
