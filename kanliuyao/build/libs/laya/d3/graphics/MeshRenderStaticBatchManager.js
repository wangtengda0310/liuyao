import { BatchMark } from "../core/render/BatchMark";
import { SubMeshRenderElement } from "../core/render/SubMeshRenderElement";
import { StaticBatchManager } from "./StaticBatchManager";
import { SubMeshStaticBatch } from "./SubMeshStaticBatch";
import { VertexMesh } from "./Vertex/VertexMesh";
import { SingletonList } from "../component/SingletonList";
/**
 * @internal
 * <code>MeshSprite3DStaticBatchManager</code> 类用于网格精灵静态批处理管理。
 */
export class MeshRenderStaticBatchManager extends StaticBatchManager {
    /**
     * 创建一个 <code>MeshSprite3DStaticBatchManager</code> 实例。
     */
    constructor() {
        super();
        /**@internal */
        this._opaqueBatchMarks = [];
        this._updateCountMark = 0;
    }
    /**
     * @internal
     */
    static __init__() {
        MeshRenderStaticBatchManager._verDec = VertexMesh.getVertexDeclaration("POSITION,NORMAL,COLOR,UV,UV1,TANGENT");
    }
    /**
     * @inheritDoc
     * @override
     */
    _compare(left, right) {
        //按照合并条件排序，增加初始状态合并几率
        var lRender = left._render, rRender = right._render;
        var leftGeo = left.meshFilter.sharedMesh, rightGeo = right.meshFilter.sharedMesh;
        var lightOffset = lRender.lightmapIndex - rRender.lightmapIndex;
        if (lightOffset === 0) {
            var receiveShadowOffset = (lRender.receiveShadow ? 1 : 0) - (rRender.receiveShadow ? 1 : 0);
            if (receiveShadowOffset === 0) {
                var materialOffset = (lRender.sharedMaterial && rRender.sharedMaterial) ? lRender.sharedMaterial.id - rRender.sharedMaterial.id : 0; //多维子材质以第一个材质排序
                if (materialOffset === 0) {
                    var verDec = leftGeo._vertexBuffer.vertexDeclaration.id - rightGeo._vertexBuffer.vertexDeclaration.id;
                    if (verDec === 0) {
                        return rightGeo._indexBuffer.indexCount - leftGeo._indexBuffer.indexCount; //根据三角面排序
                    }
                    else {
                        return verDec;
                    }
                }
                else {
                    return materialOffset;
                }
            }
            else {
                return receiveShadowOffset;
            }
        }
        else {
            return lightOffset;
        }
    }
    /**
     * @inheritDoc
     * @override
     */
    _getBatchRenderElementFromPool() {
        var renderElement = this._batchRenderElementPool[this._batchRenderElementPoolIndex++];
        if (!renderElement) {
            renderElement = new SubMeshRenderElement();
            this._batchRenderElementPool[this._batchRenderElementPoolIndex - 1] = renderElement;
            renderElement.staticBatchElementList = new SingletonList();
        }
        return renderElement;
    }
    /**
     * @internal
     */
    _getStaticBatch(staticBatches, rootOwner, number) {
        var subMeshStaticBatch = staticBatches[number];
        if (!subMeshStaticBatch) {
            subMeshStaticBatch = staticBatches[number] = new SubMeshStaticBatch(rootOwner, MeshRenderStaticBatchManager._verDec);
            this._staticBatches[subMeshStaticBatch._batchID] = subMeshStaticBatch;
        }
        return subMeshStaticBatch;
    }
    /**
     * @inheritDoc
     * @override
     */
    _initStaticBatchs(rootOwner) {
        var initBatchSprites = this._initBatchSprites;
        this._quickSort(initBatchSprites, 0, initBatchSprites.length - 1);
        var staticBatches = [];
        var lastCanMerage = false;
        var curStaticBatch;
        var batchNumber = 0;
        for (var i = 0, n = initBatchSprites.length; i < n; i++) {
            var sprite = initBatchSprites[i];
            if (lastCanMerage) {
                if (curStaticBatch.addTest(sprite)) {
                    curStaticBatch.add(sprite);
                }
                else {
                    lastCanMerage = false;
                    batchNumber++; //修改编号，区分批处理
                }
            }
            else {
                var lastIndex = n - 1;
                if (i !== lastIndex) { //the last do not need
                    curStaticBatch = this._getStaticBatch(staticBatches, rootOwner, batchNumber);
                    curStaticBatch.add(sprite);
                    lastCanMerage = true;
                }
            }
        }
        for (i = 0, n = staticBatches.length; i < n; i++) {
            var staticBatch = staticBatches[i];
            staticBatch && staticBatch.finishInit();
        }
        this._initBatchSprites.length = 0;
    }
    /**
     * @internal
     */
    _removeRenderSprite(sprite) {
        var render = sprite._render;
        var staticBatch = render._staticBatch;
        var batchElements = staticBatch._batchElements;
        var index = batchElements.indexOf(sprite);
        if (index !== -1) {
            batchElements.splice(index, 1);
            render._staticBatch = null;
            var renderElements = render._renderElements;
            for (var i = 0, n = renderElements.length; i < n; i++)
                renderElements[i].staticBatch = null;
        }
        if (batchElements.length === 0) {
            delete this._staticBatches[staticBatch._batchID];
            staticBatch.dispose();
        }
    }
    /**
     * @inheritDoc
     * @override
     */
    _clear() {
        super._clear();
        this._updateCountMark++;
    }
    /**
     * @inheritDoc
     * @override
     */
    _garbageCollection() {
        for (var key in this._staticBatches) {
            var staticBatch = this._staticBatches[key];
            if (staticBatch._batchElements.length === 0) {
                staticBatch.dispose();
                delete this._staticBatches[key];
            }
        }
    }
    /**
     * @internal
     */
    getBatchOpaquaMark(lightMapIndex, receiveShadow, materialID, staticBatchID) {
        var receiveShadowIndex = receiveShadow ? 1 : 0;
        var staLightMapMarks = (this._opaqueBatchMarks[lightMapIndex]) || (this._opaqueBatchMarks[lightMapIndex] = []);
        var staReceiveShadowMarks = (staLightMapMarks[receiveShadowIndex]) || (staLightMapMarks[receiveShadowIndex] = []);
        var staMaterialMarks = (staReceiveShadowMarks[materialID]) || (staReceiveShadowMarks[materialID] = []);
        return (staMaterialMarks[staticBatchID]) || (staMaterialMarks[staticBatchID] = new BatchMark);
    }
}
/** @internal */
MeshRenderStaticBatchManager.instance = new MeshRenderStaticBatchManager();
