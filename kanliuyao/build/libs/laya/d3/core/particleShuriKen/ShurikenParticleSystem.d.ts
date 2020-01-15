import { IndexBuffer3D } from "../../graphics/IndexBuffer3D";
import { VertexBuffer3D } from "../../graphics/VertexBuffer3D";
import { BoundBox } from "../../math/BoundBox";
import { BoundSphere } from "../../math/BoundSphere";
import { Rand } from "../../math/Rand";
import { Vector3 } from "../../math/Vector3";
import { Vector4 } from "../../math/Vector4";
import { GeometryElement } from "../GeometryElement";
import { IClone } from "../IClone";
import { RenderContext3D } from "../render/RenderContext3D";
import { ColorOverLifetime } from "./module/ColorOverLifetime";
import { Emission } from "./module/Emission";
import { GradientDataNumber } from "./module/GradientDataNumber";
import { RotationOverLifetime } from "./module/RotationOverLifetime";
import { BaseShape } from "./module/shape/BaseShape";
import { SizeOverLifetime } from "./module/SizeOverLifetime";
import { TextureSheetAnimation } from "./module/TextureSheetAnimation";
import { VelocityOverLifetime } from "./module/VelocityOverLifetime";
import { ShuriKenParticle3D } from "./ShuriKenParticle3D";
/**
 * <code>ShurikenParticleSystem</code> 类用于创建3D粒子数据模板。
 */
export declare class ShurikenParticleSystem extends GeometryElement implements IClone {
    /** @internal 0:Burst,1:预留,2:StartDelay,3:StartColor,4:StartSize,5:StartRotation,6:randomizeRotationDirection,7:StartLifetime,8:StartSpeed,9:VelocityOverLifetime,10:ColorOverLifetime,11:SizeOverLifetime,12:RotationOverLifetime,13-15:TextureSheetAnimation,16-17:Shape*/
    static _RANDOMOFFSET: Uint32Array;
    /** @internal */
    private static halfKSqrtOf2;
    /** @internal */
    static _maxElapsedTime: number;
    /**@internal */
    private static _tempVector30;
    /**@internal */
    private static _tempVector31;
    /**@internal */
    private static _tempVector32;
    /**@internal */
    private static _tempVector33;
    /**@internal */
    private static _tempVector34;
    /**@internal */
    private static _tempVector35;
    /**@internal */
    private static _tempVector36;
    /**@internal */
    private static _tempVector37;
    /**@internal */
    private static _tempVector38;
    /**@internal */
    private static _tempVector39;
    /** @internal */
    private static _tempPosition;
    /** @internal */
    private static _tempDirection;
    /**@internal */
    private static _type;
    /** @internal */
    _boundingSphere: BoundSphere;
    /** @internal */
    _boundingBox: BoundBox;
    /** @internal */
    _boundingBoxCorners: Vector3[];
    /** @internal */
    private _owner;
    /** @internal */
    private _ownerRender;
    /**@internal */
    private _vertices;
    /**@internal */
    private _floatCountPerVertex;
    /**@internal */
    private _startLifeTimeIndex;
    /**@internal */
    private _timeIndex;
    /**@internal */
    private _simulateUpdate;
    /**@internal */
    private _firstActiveElement;
    /**@internal */
    private _firstNewElement;
    /**@internal */
    private _firstFreeElement;
    /**@internal */
    private _firstRetiredElement;
    /**@internal */
    private _drawCounter;
    /**@internal */
    private _bufferMaxParticles;
    /**@internal */
    private _emission;
    /**@internal */
    private _shape;
    /**@internal */
    private _isEmitting;
    /**@internal */
    private _isPlaying;
    /**@internal */
    private _isPaused;
    /**@internal */
    private _playStartDelay;
    /**@internal 发射的累计时间。*/
    private _frameRateTime;
    /**@internal 一次循环内的累计时间。*/
    private _emissionTime;
    /**@internal */
    private _totalDelayTime;
    /**@internal */
    private _burstsIndex;
    /**@internal */
    private _velocityOverLifetime;
    /**@internal */
    private _colorOverLifetime;
    /**@internal */
    private _sizeOverLifetime;
    /**@internal */
    private _rotationOverLifetime;
    /**@internal */
    private _textureSheetAnimation;
    /**@internal */
    private _startLifetimeType;
    /**@internal */
    private _startLifetimeConstant;
    /**@internal */
    private _startLifeTimeGradient;
    /**@internal */
    private _startLifetimeConstantMin;
    /**@internal */
    private _startLifetimeConstantMax;
    /**@internal */
    private _startLifeTimeGradientMin;
    /**@internal */
    private _startLifeTimeGradientMax;
    /**@internal */
    private _maxStartLifetime;
    /** @internal */
    private _uvLength;
    /** @internal */
    private _vertexStride;
    /** @internal */
    private _indexStride;
    /**@internal */
    private _vertexBuffer;
    /**@internal */
    private _indexBuffer;
    /** @internal */
    private _bufferState;
    /**@internal */
    _currentTime: number;
    /**@internal */
    _startUpdateLoopCount: number;
    /**@internal */
    _rand: Rand;
    /**@internal */
    _randomSeeds: Uint32Array;
    /**粒子运行的总时长，单位为秒。*/
    duration: number;
    /**是否循环。*/
    looping: boolean;
    /**是否预热。暂不支持*/
    prewarm: boolean;
    /**开始延迟类型，0为常量模式,1为随机随机双常量模式，不能和prewarm一起使用。*/
    startDelayType: number;
    /**开始播放延迟，不能和prewarm一起使用。*/
    startDelay: number;
    /**开始播放最小延迟，不能和prewarm一起使用。*/
    startDelayMin: number;
    /**开始播放最大延迟，不能和prewarm一起使用。*/
    startDelayMax: number;
    /**开始速度模式，0为恒定速度，2为两个恒定速度的随机插值。缺少1、3模式*/
    startSpeedType: number;
    /**开始速度,0模式。*/
    startSpeedConstant: number;
    /**最小开始速度,1模式。*/
    startSpeedConstantMin: number;
    /**最大开始速度,1模式。*/
    startSpeedConstantMax: number;
    /**开始尺寸是否为3D模式。*/
    threeDStartSize: boolean;
    /**开始尺寸模式,0为恒定尺寸，2为两个恒定尺寸的随机插值。缺少1、3模式和对应的二种3D模式*/
    startSizeType: number;
    /**开始尺寸，0模式。*/
    startSizeConstant: number;
    /**开始三维尺寸，0模式。*/
    startSizeConstantSeparate: Vector3;
    /**最小开始尺寸，2模式。*/
    startSizeConstantMin: number;
    /**最大开始尺寸，2模式。*/
    startSizeConstantMax: number;
    /**最小三维开始尺寸，2模式。*/
    startSizeConstantMinSeparate: Vector3;
    /**最大三维开始尺寸，2模式。*/
    startSizeConstantMaxSeparate: Vector3;
    /**3D开始旋转。*/
    threeDStartRotation: boolean;
    /**开始旋转模式,0为恒定尺寸，2为两个恒定旋转的随机插值,缺少2种模式,和对应的四种3D模式。*/
    startRotationType: number;
    /**开始旋转，0模式。*/
    startRotationConstant: number;
    /**开始三维旋转，0模式。*/
    startRotationConstantSeparate: Vector3;
    /**最小开始旋转，1模式。*/
    startRotationConstantMin: number;
    /**最大开始旋转，1模式。*/
    startRotationConstantMax: number;
    /**最小开始三维旋转，1模式。*/
    startRotationConstantMinSeparate: Vector3;
    /**最大开始三维旋转，1模式。*/
    startRotationConstantMaxSeparate: Vector3;
    /**随机旋转方向，范围为0.0到1.0*/
    randomizeRotationDirection: number;
    /**开始颜色模式，0为恒定颜色，2为两个恒定颜色的随机插值,缺少2种模式。*/
    startColorType: number;
    /**开始颜色，0模式。*/
    startColorConstant: Vector4;
    /**最小开始颜色，1模式。*/
    startColorConstantMin: Vector4;
    /**最大开始颜色，1模式。*/
    startColorConstantMax: Vector4;
    /**重力敏感度。*/
    gravityModifier: number;
    /**模拟器空间,0为World,1为Local。暂不支持Custom。*/
    simulationSpace: number;
    /**粒子的播放速度。 */
    simulationSpeed: number;
    /**缩放模式，0为Hiercachy,1为Local,2为World。*/
    scaleMode: number;
    /**激活时是否自动播放。*/
    playOnAwake: boolean;
    /**随机种子,注:play()前设置有效。*/
    randomSeed: Uint32Array;
    /**是否使用随机种子。 */
    autoRandomSeed: boolean;
    /**是否为性能模式,性能模式下会延迟粒子释放。*/
    isPerformanceMode: boolean;
    /**最大粒子数。*/
    maxParticles: number;
    /**
     * 获取发射器。
     */
    readonly emission: Emission;
    /**
     * 粒子存活个数。
     */
    readonly aliveParticleCount: number;
    /**
     * 获取一次循环内的累计时间。
     * @return 一次循环内的累计时间。
     */
    readonly emissionTime: number;
    /**
     * 形状。
     */
    shape: BaseShape;
    /**
     * 是否存活。
     */
    readonly isAlive: boolean;
    /**
     * 是否正在发射。
     */
    readonly isEmitting: boolean;
    /**
     * 是否正在播放。
     */
    readonly isPlaying: boolean;
    /**
     * 是否已暂停。
     */
    readonly isPaused: boolean;
    /**
     * 开始生命周期模式,0为固定时间，1为渐变时间，2为两个固定之间的随机插值,3为两个渐变时间的随机插值。
     */
    startLifetimeType: number;
    /**
     * 开始生命周期，0模式,单位为秒。
     */
    startLifetimeConstant: number;
    /**
     * 开始渐变生命周期，1模式,单位为秒。
     */
    startLifeTimeGradient: GradientDataNumber;
    /**
     * 最小开始生命周期，2模式,单位为秒。
     */
    startLifetimeConstantMin: number;
    /**
     * 最大开始生命周期，2模式,单位为秒。
     */
    startLifetimeConstantMax: number;
    /**
     * 开始渐变最小生命周期，3模式,单位为秒。
     */
    startLifeTimeGradientMin: GradientDataNumber;
    /**
     * 开始渐变最大生命周期，3模式,单位为秒。
     */
    startLifeTimeGradientMax: GradientDataNumber;
    /**
     * 生命周期速度,注意:如修改该值的某些属性,需重新赋值此属性才可生效。
     */
    velocityOverLifetime: VelocityOverLifetime;
    /**
     * 生命周期颜色,注意:如修改该值的某些属性,需重新赋值此属性才可生效。
     */
    colorOverLifetime: ColorOverLifetime;
    /**
     * 生命周期尺寸,注意:如修改该值的某些属性,需重新赋值此属性才可生效。
     */
    sizeOverLifetime: SizeOverLifetime;
    /**
     * 生命周期旋转,注意:如修改该值的某些属性,需重新赋值此属性才可生效。
     */
    rotationOverLifetime: RotationOverLifetime;
    /**
     * 生命周期纹理动画,注意:如修改该值的某些属性,需重新赋值此属性才可生效。
     */
    textureSheetAnimation: TextureSheetAnimation;
    constructor(owner: ShuriKenParticle3D);
    /**
     * @internal
     */
    _getVertexBuffer(index?: number): VertexBuffer3D;
    /**
     * @internal
     */
    _getIndexBuffer(): IndexBuffer3D;
    /**
     * @internal
     */
    _generateBoundingSphere(): void;
    /**
     * @internal
     */
    _generateBoundingBox(): void;
    /**
     * @internal
     */
    private _updateEmission;
    /**
     * @internal
     */
    private _updateParticles;
    /**
     * @internal
     */
    private _updateParticlesSimulationRestart;
    /**
     * @internal
     */
    private _retireActiveParticles;
    /**
     * @internal
     */
    private _freeRetiredParticles;
    /**
     * @internal
     */
    private _burst;
    /**
     * @internal
     */
    private _advanceTime;
    /**
     * @internal
     */
    _initBufferDatas(): void;
    /**
     * @internal
     * @override
     */
    destroy(): void;
    /**
     * 发射一个粒子。
     */
    emit(time: number): boolean;
    addParticle(position: Vector3, direction: Vector3, time: number): boolean;
    addNewParticlesToVertexBuffer(): void;
    /**
     * @inheritDoc
     * @override
     */
    _getType(): number;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _prepareRender(state: RenderContext3D): boolean;
    /**
     * @internal
     * @override
     */
    _render(state: RenderContext3D): void;
    /**
     * 开始发射粒子。
     */
    play(): void;
    /**
     * 暂停发射粒子。
     */
    pause(): void;
    /**
     * 通过指定时间增加粒子播放进度，并暂停播放。
     * @param time 进度时间.如果restart为true,粒子播放时间会归零后再更新进度。
     * @param restart 是否重置播放状态。
     */
    simulate(time: number, restart?: boolean): void;
    /**
     * 停止发射粒子。
     */
    stop(): void;
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject: any): void;
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone(): any;
}
