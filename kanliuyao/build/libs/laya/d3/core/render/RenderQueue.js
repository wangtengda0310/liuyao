import { SingletonList } from "../../component/SingletonList";
/**
 * @internal
 * <code>RenderQuene</code> 类用于实现渲染队列。
 */
export class RenderQueue {
    /**
     * 创建一个 <code>RenderQuene</code> 实例。
     */
    constructor(isTransparent = false) {
        /** @internal [只读]*/
        this.isTransparent = false;
        /** @internal */
        this.elements = new SingletonList();
        /** @internal */
        this.lastTransparentRenderElement = null;
        /** @internal */
        this.lastTransparentBatched = false;
        this.isTransparent = isTransparent;
    }
    /**
     * @internal
     */
    _compare(left, right) {
        var renderQueue = left.material.renderQueue - right.material.renderQueue;
        if (renderQueue === 0) {
            var sort = this.isTransparent ? right.render._distanceForSort - left.render._distanceForSort : left.render._distanceForSort - right.render._distanceForSort;
            return sort + right.render.sortingFudge - left.render.sortingFudge;
        }
        else {
            return renderQueue;
        }
    }
    /**
     * @internal
     */
    _partitionRenderObject(left, right) {
        var elements = this.elements.elements;
        var pivot = elements[Math.floor((right + left) / 2)];
        while (left <= right) {
            while (this._compare(elements[left], pivot) < 0)
                left++;
            while (this._compare(elements[right], pivot) > 0)
                right--;
            if (left < right) {
                var temp = elements[left];
                elements[left] = elements[right];
                elements[right] = temp;
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
    _quickSort(left, right) {
        if (this.elements.length > 1) {
            var index = this._partitionRenderObject(left, right);
            var leftIndex = index - 1;
            if (left < leftIndex)
                this._quickSort(left, leftIndex);
            if (index < right)
                this._quickSort(index, right);
        }
    }
    /**
     * @internal
     */
    _render(context) {
        var elements = this.elements.elements;
        for (var i = 0, n = this.elements.length; i < n; i++)
            elements[i]._render(context);
    }
    /**
     * @internal
     */
    clear() {
        this.elements.length = 0;
        this.lastTransparentRenderElement = null;
        this.lastTransparentBatched = false;
    }
}
