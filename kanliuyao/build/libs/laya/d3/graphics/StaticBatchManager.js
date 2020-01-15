import { RenderableSprite3D } from "../core/RenderableSprite3D";
/**
 * <code>StaticBatchManager</code> 类用于静态批处理管理的父类。
 */
export class StaticBatchManager {
    /**
     * 创建一个 <code>StaticBatchManager</code> 实例。
     */
    constructor() {
        /** @internal */
        this._initBatchSprites = [];
        /** @internal */
        this._staticBatches = {};
        this._batchRenderElementPoolIndex = 0;
        this._batchRenderElementPool = [];
    }
    /**
     * @internal
     */
    static _addToStaticBatchQueue(sprite3D, renderableSprite3D) {
        if (sprite3D instanceof RenderableSprite3D)
            renderableSprite3D.push(sprite3D);
        for (var i = 0, n = sprite3D.numChildren; i < n; i++)
            StaticBatchManager._addToStaticBatchQueue(sprite3D._children[i], renderableSprite3D);
    }
    /**
     * @internal
     */
    static _registerManager(manager) {
        StaticBatchManager._managers.push(manager);
    }
    /**
     * 静态批处理合并，合并后子节点修改Transform属性无效，根节点staticBatchRoot可为null,如果根节点不为null，根节点可移动。
     * 如果renderableSprite3Ds为null，合并staticBatchRoot以及其所有子节点为静态批处理，staticBatchRoot作为静态根节点。
     * 如果renderableSprite3Ds不为null,合并renderableSprite3Ds为静态批处理，staticBatchRoot作为静态根节点。
     * @param staticBatchRoot 静态批处理根节点。
     * @param renderableSprite3Ds 静态批处理子节点队列。
     */
    static combine(staticBatchRoot, renderableSprite3Ds = null) {
        if (!renderableSprite3Ds) {
            renderableSprite3Ds = [];
            if (staticBatchRoot)
                StaticBatchManager._addToStaticBatchQueue(staticBatchRoot, renderableSprite3Ds);
        }
        var batchSpritesCount = renderableSprite3Ds.length;
        if (batchSpritesCount > 0) {
            for (var i = 0; i < batchSpritesCount; i++) {
                var sprite = renderableSprite3Ds[i];
                if (!sprite.destroyed) {
                    if (sprite._render._isPartOfStaticBatch)
                        console.warn("StaticBatchManager: Sprite " + sprite.name + " has a part of Static Batch,it will be ignore.");
                    else
                        sprite._addToInitStaticBatchManager();
                }
            }
            for (var k = 0, m = StaticBatchManager._managers.length; k < m; k++) {
                var manager = StaticBatchManager._managers[k];
                manager._initStaticBatchs(staticBatchRoot);
            }
        }
    }
    /**
     * @internal
     */
    _partition(items, left, right) {
        var pivot = items[Math.floor((right + left) / 2)];
        while (left <= right) {
            while (this._compare(items[left], pivot) < 0)
                left++;
            while (this._compare(items[right], pivot) > 0)
                right--;
            if (left < right) {
                var temp = items[left];
                items[left] = items[right];
                items[right] = temp;
                left++;
                right--;
            }
            else if (left === right) {
                left++;
                break;
            }
        }
        return left;
    }
    /**
     * @internal
     */
    _quickSort(items, left, right) {
        if (items.length > 1) {
            var index = this._partition(items, left, right);
            var leftIndex = index - 1;
            if (left < leftIndex)
                this._quickSort(items, left, leftIndex);
            if (index < right)
                this._quickSort(items, index, right);
        }
    }
    /**
     * @internal
     */
    _compare(left, right) {
        throw "StaticBatch:must override this function.";
    }
    /**
     * @internal
     */
    _initStaticBatchs(rootSprite) {
        throw "StaticBatch:must override this function.";
    }
    /**
     * @internal
     */
    _getBatchRenderElementFromPool() {
        throw "StaticBatch:must override this function.";
    }
    /**
     * @internal
     */
    _addBatchSprite(renderableSprite3D) {
        this._initBatchSprites.push(renderableSprite3D);
    }
    /**
     * @internal
     */
    _clear() {
        this._batchRenderElementPoolIndex = 0;
    }
    /**
     * @internal
     */
    _garbageCollection() {
        throw "StaticBatchManager: must override it.";
    }
    /**
     * @internal
     */
    dispose() {
        this._staticBatches = null;
    }
}
/** @internal [只读]*/
StaticBatchManager._managers = [];
