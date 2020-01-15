import { BaseCamera } from "../core/BaseCamera";
import { Camera } from "../core/Camera";
import { Scene3D } from "../core/scene/Scene3D";
import { BoundBox } from "../math/BoundBox";
import { Matrix4x4 } from "../math/Matrix4x4";
import { Vector3 } from "../math/Vector3";
/**
 * ...
 * @author ...
 */
export declare class ParallelSplitShadowMap {
    /**@internal */
    static MAX_PSSM_COUNT: number;
    /**@internal */
    static _tempVector30: Vector3;
    /**@internal */
    private lastNearPlane;
    /**@internal */
    private lastFieldOfView;
    /**@internal */
    private lastAspectRatio;
    /**@internal */
    private _spiltDistance;
    /**@internal */
    private _currentPSSM;
    /**@internal */
    private _shadowMapCount;
    /**@internal */
    private _maxDistance;
    /**@internal */
    private _ratioOfDistance;
    /**@internal */
    private _globalParallelLightDir;
    /**@internal */
    private _statesDirty;
    /**@internal */
    cameras: Camera[];
    /**@internal */
    private _shadowMapTextureSize;
    /**@internal */
    private _scene;
    /**@internal */
    private _boundingSphere;
    /**@internal */
    _boundingBox: BoundBox[];
    /**@internal */
    private _frustumPos;
    /**@internal */
    private _uniformDistance;
    /**@internal */
    private _logDistance;
    /**@internal */
    private _dimension;
    /** @internal */
    private _PCFType;
    /** @internal */
    private _tempLookAt3;
    /** @internal */
    private _tempLookAt4;
    /** @internal */
    private _tempValue;
    /** @internal */
    private _tempPos;
    /** @internal */
    private _tempLightUp;
    /** @internal */
    private _tempMin;
    /** @internal */
    private _tempMax;
    /** @internal */
    private _tempMatrix44;
    /**@internal */
    private _splitFrustumCulling;
    /** @internal */
    private _tempScaleMatrix44;
    /** @internal */
    private _shadowPCFOffset;
    /** @internal */
    private _shaderValueDistance;
    /** @internal */
    private _shaderValueLightVP;
    /** @internal */
    private _shaderValueVPs;
    constructor();
    setInfo(scene: Scene3D, maxDistance: number, globalParallelDir: Vector3, shadowMapTextureSize: number, numberOfPSSM: number, PCFType: number): void;
    setPCFType(PCFtype: number): void;
    getPCFType(): number;
    setFarDistance(value: number): void;
    getFarDistance(): number;
    shadowMapCount: number;
    private _beginSampler;
    /**
     * @internal
     */
    endSampler(sceneCamera: BaseCamera): void;
    /**
     * @internal
     */
    _calcAllLightCameraInfo(sceneCamera: BaseCamera): void;
    /**
     * @internal
     */
    private _recalculate;
    /**
     * @internal
     */
    private _update;
    /**
     * @internal
     */
    private _uploadShaderValue;
    /**
     * @internal
     */
    private _calcSplitDistance;
    /**
     * @internal
     */
    _calcBoundingBox(fieldOfView: number, aspectRatio: number): void;
    calcSplitFrustum(sceneCamera: BaseCamera): void;
    /**
     * @internal
     */
    private _rebuildRenderInfo;
    /**
     * @internal
     */
    private _calcLightViewProject;
    /**
     * 计算两个矩阵的乘法
     * @param	left left矩阵
     * @param	right  right矩阵
     * @param	out  输出矩阵
     */
    static multiplyMatrixOutFloat32Array(left: Matrix4x4, right: Matrix4x4, out: Float32Array): void;
    setShadowMapTextureSize(size: number): void;
    disposeAllRenderTarget(): void;
}
