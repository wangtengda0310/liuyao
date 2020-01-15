import { Render } from "../../../renders/Render";
import { FrustumCulling } from "../../graphics/FrustumCulling";
import { BoundBox } from "../../math/BoundBox";
import { Matrix4x4 } from "../../math/Matrix4x4";
import { Vector3 } from "../../math/Vector3";
import { Physics3DUtils } from "../../utils/Physics3DUtils";
import { BaseRender } from "../render/BaseRender";
import { ShuriKenParticle3DShaderDeclaration } from "./ShuriKenParticle3DShaderDeclaration";
/**
 * <code>ShurikenParticleRender</code> 类用于创建3D粒子渲染器。
 */
export class ShurikenParticleRenderer extends BaseRender {
    /**
     * 创建一个 <code>ShurikenParticleRender</code> 实例。
     */
    constructor(owner) {
        super(owner);
        /** @internal */
        this._finalGravity = new Vector3();
        /** @internal */
        this._tempRotationMatrix = new Matrix4x4();
        /**@internal */
        this._mesh = null;
        /**拉伸广告牌模式摄像机速度缩放,暂不支持。*/
        this.stretchedBillboardCameraSpeedScale = 0;
        /**拉伸广告牌模式速度缩放。*/
        this.stretchedBillboardSpeedScale = 0;
        /**拉伸广告牌模式长度缩放。*/
        this.stretchedBillboardLengthScale = 2;
        this._defaultBoundBox = new BoundBox(new Vector3(), new Vector3());
        this.renderMode = 0;
        //sortingMode = SORTINGMODE_NONE;
        this._supportOctree = false;
    }
    ///**排序模式。*/
    //public var sortingMode:int;
    /**
     * 获取渲染模式,0为BILLBOARD、1为STRETCHEDBILLBOARD、2为HORIZONTALBILLBOARD、3为VERTICALBILLBOARD、4为MESH。
     */
    get renderMode() {
        return this._renderMode;
    }
    set renderMode(value) {
        if (this._renderMode !== value) {
            var defineDatas = this._shaderValues;
            switch (this._renderMode) {
                case 0:
                    defineDatas.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_BILLBOARD);
                    break;
                case 1:
                    defineDatas.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_STRETCHEDBILLBOARD);
                    break;
                case 2:
                    defineDatas.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_HORIZONTALBILLBOARD);
                    break;
                case 3:
                    defineDatas.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_VERTICALBILLBOARD);
                    break;
                case 4:
                    defineDatas.removeDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_MESH);
                    break;
            }
            this._renderMode = value;
            switch (value) {
                case 0:
                    defineDatas.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_BILLBOARD);
                    break;
                case 1:
                    defineDatas.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_STRETCHEDBILLBOARD);
                    break;
                case 2:
                    defineDatas.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_HORIZONTALBILLBOARD);
                    break;
                case 3:
                    defineDatas.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_VERTICALBILLBOARD);
                    break;
                case 4:
                    defineDatas.addDefine(ShuriKenParticle3DShaderDeclaration.SHADERDEFINE_RENDERMODE_MESH);
                    break;
                default:
                    throw new Error("ShurikenParticleRender: unknown renderMode Value.");
            }
            var parSys = this._owner.particleSystem;
            (parSys) && (parSys._initBufferDatas());
        }
    }
    /**
     * 获取网格渲染模式所使用的Mesh,rendderMode为4时生效。
     */
    get mesh() {
        return this._mesh;
    }
    set mesh(value) {
        if (this._mesh !== value) {
            (this._mesh) && (this._mesh._removeReference());
            this._mesh = value;
            (value) && (value._addReference());
            this._owner.particleSystem._initBufferDatas();
        }
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _calculateBoundingBox() {
        //var particleSystem:ShurikenParticleSystem = (_owner as ShuriKenParticle3D).particleSystem;
        //particleSystem._generateBoundingBox();
        //var rotation:Quaternion = _owner.transform.rotation;
        //var corners:Vector.<Vector3> = particleSystem._boundingBoxCorners;
        //for (var i:int = 0; i < 8; i++)
        //	Vector3.transformQuat(corners[i], rotation, _tempBoudingBoxCorners[i]);
        //BoundBox.createfromPoints(_tempBoudingBoxCorners, _boundingBox);
        var min = this._bounds.getMin();
        min.x = -Number.MAX_VALUE;
        min.y = -Number.MAX_VALUE;
        min.z = -Number.MAX_VALUE;
        this._bounds.setMin(min);
        var max = this._bounds.getMax();
        max.x = Number.MAX_VALUE;
        max.y = Number.MAX_VALUE;
        max.z = Number.MAX_VALUE;
        this._bounds.setMax(max);
        if (Render.supportWebGLPlusCulling) { //[NATIVE]
            var min = this._bounds.getMin();
            var max = this._bounds.getMax();
            var buffer = FrustumCulling._cullingBuffer;
            buffer[this._cullingBufferIndex + 1] = min.x;
            buffer[this._cullingBufferIndex + 2] = min.y;
            buffer[this._cullingBufferIndex + 3] = min.z;
            buffer[this._cullingBufferIndex + 4] = max.x;
            buffer[this._cullingBufferIndex + 5] = max.y;
            buffer[this._cullingBufferIndex + 6] = max.z;
        }
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _needRender(boundFrustum, context) {
        if (boundFrustum) {
            if (boundFrustum.intersects(this.bounds._getBoundBox())) {
                if (this._owner.particleSystem.isAlive)
                    return true;
                else
                    return false;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _renderUpdate(context, transfrom) {
        var particleSystem = this._owner.particleSystem;
        var sv = this._shaderValues;
        var transform = this._owner.transform;
        switch (particleSystem.simulationSpace) {
            case 0: //World
                break;
            case 1: //Local
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.WORLDPOSITION, transform.position);
                sv.setQuaternion(ShuriKenParticle3DShaderDeclaration.WORLDROTATION, transform.rotation);
                break;
            default:
                throw new Error("ShurikenParticleMaterial: SimulationSpace value is invalid.");
        }
        switch (particleSystem.scaleMode) {
            case 0:
                var scale = transform.getWorldLossyScale();
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.POSITIONSCALE, scale);
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.SIZESCALE, scale);
                break;
            case 1:
                var localScale = transform.localScale;
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.POSITIONSCALE, localScale);
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.SIZESCALE, localScale);
                break;
            case 2:
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.POSITIONSCALE, transform.getWorldLossyScale());
                sv.setVector3(ShuriKenParticle3DShaderDeclaration.SIZESCALE, Vector3._ONE);
                break;
        }
        Vector3.scale(Physics3DUtils.gravity, particleSystem.gravityModifier, this._finalGravity);
        sv.setVector3(ShuriKenParticle3DShaderDeclaration.GRAVITY, this._finalGravity);
        sv.setInt(ShuriKenParticle3DShaderDeclaration.SIMULATIONSPACE, particleSystem.simulationSpace);
        sv.setBool(ShuriKenParticle3DShaderDeclaration.THREEDSTARTROTATION, particleSystem.threeDStartRotation);
        sv.setInt(ShuriKenParticle3DShaderDeclaration.SCALINGMODE, particleSystem.scaleMode);
        sv.setNumber(ShuriKenParticle3DShaderDeclaration.STRETCHEDBILLBOARDLENGTHSCALE, this.stretchedBillboardLengthScale);
        sv.setNumber(ShuriKenParticle3DShaderDeclaration.STRETCHEDBILLBOARDSPEEDSCALE, this.stretchedBillboardSpeedScale);
        sv.setNumber(ShuriKenParticle3DShaderDeclaration.CURRENTTIME, particleSystem._currentTime);
    }
    /**
     * @inheritDoc
     * @override
     */
    get bounds() {
        //if (!(_owner as ShuriKenParticle3DShaderDeclaration).particleSystem.isAlive) {
        //return _defaultBoundBox;
        //} else {
        if (this._boundsChange) {
            this._calculateBoundingBox();
            this._boundsChange = false;
        }
        return this._bounds;
        //}
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _destroy() {
        super._destroy();
        (this._mesh) && (this._mesh._removeReference(), this._mesh = null);
    }
}
