import { LayaGL } from "../../../layagl/LayaGL";
import { Stat } from "../../../utils/Stat";
import { GeometryElement } from "../../core/GeometryElement";
import { SkinnedMeshSprite3D } from "../../core/SkinnedMeshSprite3D";
import { IndexFormat } from "../../graphics/IndexFormat";
/**
 * <code>SubMesh</code> 类用于创建子网格数据模板。
 */
export class SubMesh extends GeometryElement {
    /**
     * 创建一个 <code>SubMesh</code> 实例。
     * @param	mesh  网格数据模板。
     */
    constructor(mesh) {
        super();
        this._id = ++SubMesh._uniqueIDCounter;
        this._mesh = mesh;
        this._boneIndicesList = [];
        this._subIndexBufferStart = [];
        this._subIndexBufferCount = [];
    }
    /**
     * 获取索引数量。
     */
    get indexCount() {
        return this._indexCount;
    }
    /**
     * @internal
     */
    _setIndexRange(indexStart, indexCount) {
        this._indexStart = indexStart;
        this._indexCount = indexCount;
        this._indices = new Uint16Array(this._indexBuffer.getData().buffer, indexStart * 2, indexCount);
    }
    /**
     * @internal
     * @override
     */
    _getType() {
        return SubMesh._type;
    }
    /**
     * @internal
     * @override
     */
    _prepareRender(state) {
        this._mesh._uploadVerticesData();
        return true;
    }
    /**
     * @internal
     * @override
     */
    _render(state) {
        var mesh = this._mesh;
        if (mesh.indexFormat === IndexFormat.UInt32 && !LayaGL.layaGPUInstance.supportElementIndexUint32()) {
            console.warn("SubMesh:this device do not support IndexFormat.UInt32.");
            return;
        }
        var gl = LayaGL.instance;
        var skinnedDatas = state.renderElement.render._skinnedData;
        var glIndexFormat;
        switch (mesh.indexFormat) {
            case IndexFormat.UInt32:
                glIndexFormat = gl.UNSIGNED_INT;
                break;
            case IndexFormat.UInt16:
                glIndexFormat = gl.UNSIGNED_SHORT;
                break;
            case IndexFormat.UInt8:
                glIndexFormat = gl.UNSIGNED_BYTE;
                break;
        }
        mesh._bufferState.bind();
        if (skinnedDatas) {
            var subSkinnedDatas = skinnedDatas[this._indexInMesh];
            for (var i = 0, n = this._boneIndicesList.length; i < n; i++) {
                state.shader.uploadCustomUniform(SkinnedMeshSprite3D.BONES, subSkinnedDatas[i]);
                gl.drawElements(gl.TRIANGLES, this._subIndexBufferCount[i], glIndexFormat, this._subIndexBufferStart[i] * 2);
            }
        }
        else {
            gl.drawElements(gl.TRIANGLES, this._indexCount, glIndexFormat, this._indexStart * 2);
        }
        Stat.trianglesFaces += this._indexCount / 3;
        Stat.renderBatches++;
    }
    /**
     * 拷贝并获取子网格索引数据的副本。
     */
    getIndices() {
        if (this._mesh._isReadable)
            return this._indices.slice();
        else
            throw "SubMesh:can't get indices on subMesh,mesh's isReadable must be true.";
    }
    /**
     * 设置子网格索引。
     * @param indices
     */
    setIndices(indices) {
        this._indexBuffer.setData(indices, this._indexStart, 0, this._indexCount);
    }
    /**
     * {@inheritDoc GeometryElement.destroy}
     * @override
     */
    destroy() {
        if (this._destroyed)
            return;
        super.destroy();
        this._indexBuffer.destroy();
        this._indexBuffer = null;
        this._mesh = null;
        this._boneIndicesList = null;
        this._subIndexBufferStart = null;
        this._subIndexBufferCount = null;
        this._skinAnimationDatas = null;
    }
}
/** @internal */
SubMesh._uniqueIDCounter = 0;
/**@internal */
SubMesh._type = GeometryElement._typeCounter++;
