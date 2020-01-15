import { Sprite3D } from "../Sprite3D";
import { BaseRender } from "../render/BaseRender";
import { Matrix4x4 } from "../../math/Matrix4x4";
/**
 * <code>TrailRenderer</code> 类用于创建拖尾渲染器。
 */
export class TrailRenderer extends BaseRender {
    constructor(owner) {
        super(owner);
        this._projectionViewWorldMatrix = new Matrix4x4();
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _calculateBoundingBox() {
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _needRender(boundFrustum, context) {
        this._owner.trailFilter._update(context);
        if (boundFrustum)
            return boundFrustum.intersects(this.bounds._getBoundBox());
        else
            return true;
    }
    /**
     *@internal [NATIVE]
     */
    _updateForNative(context) {
        this._owner.trailFilter._update(context);
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _renderUpdate(state, transform) {
        super._renderUpdate(state, transform);
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _renderUpdateWithCamera(context, transform) {
        var projectionView = context.projectionViewMatrix;
        if (transform) {
            Matrix4x4.multiply(projectionView, transform.worldMatrix, this._projectionViewWorldMatrix);
            this._shaderValues.setMatrix4x4(Sprite3D.MVPMATRIX, this._projectionViewWorldMatrix);
        }
        else {
            this._shaderValues.setMatrix4x4(Sprite3D.MVPMATRIX, projectionView);
        }
    }
}
