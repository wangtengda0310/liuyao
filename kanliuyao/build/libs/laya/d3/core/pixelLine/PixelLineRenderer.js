import { Render } from "../../../renders/Render";
import { FrustumCulling } from "../../graphics/FrustumCulling";
import { Matrix4x4 } from "../../math/Matrix4x4";
import { BaseRender } from "../render/BaseRender";
import { Sprite3D } from "../Sprite3D";
/**
 * <code>PixelLineRenderer</code> 类用于线渲染器。
 */
export class PixelLineRenderer extends BaseRender {
    constructor(owner) {
        super(owner);
        this._projectionViewWorldMatrix = new Matrix4x4();
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _calculateBoundingBox() {
        var worldMat = this._owner.transform.worldMatrix;
        var lineFilter = this._owner._geometryFilter;
        lineFilter._reCalculateBound();
        lineFilter._bounds._tranform(worldMat, this._bounds);
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
     * @override
     * @internal
     */
    _renderUpdateWithCamera(context, transform) {
        var projectionView = context.projectionViewMatrix;
        var sv = this._shaderValues;
        if (transform) {
            var worldMat = transform.worldMatrix;
            sv.setMatrix4x4(Sprite3D.WORLDMATRIX, worldMat);
            Matrix4x4.multiply(projectionView, worldMat, this._projectionViewWorldMatrix);
            sv.setMatrix4x4(Sprite3D.MVPMATRIX, this._projectionViewWorldMatrix);
        }
        else {
            sv.setMatrix4x4(Sprite3D.WORLDMATRIX, Matrix4x4.DEFAULT);
            sv.setMatrix4x4(Sprite3D.MVPMATRIX, projectionView);
        }
    }
}
