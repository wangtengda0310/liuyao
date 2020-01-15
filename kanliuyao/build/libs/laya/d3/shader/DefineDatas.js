/**
 * <code>DefineDatas</code> 类用于创建宏定义数据集合。
 */
export class DefineDatas {
    /**
     * 创建一个 <code>DefineDatas</code> 实例。
     */
    constructor() {
        /** @internal */
        this._mask = [];
        /** @internal */
        this._length = 0;
    }
    /**
     * @internal
     */
    _intersectionDefineDatas(define) {
        var unionMask = define._mask;
        var mask = this._mask;
        for (var i = this._length - 1; i >= 0; i--) {
            var value = mask[i] & unionMask[i];
            if (value == 0 && i == this._length - 1)
                this._length--;
            else
                mask[i] = value;
        }
    }
    /**
     * 添加宏定义值。
     * @param define 宏定义值。
     */
    add(define) {
        var index = define._index;
        var size = index + 1;
        var mask = this._mask;
        var maskStart = mask.length;
        if (maskStart < size) {
            mask.length = size;
            for (; maskStart < index; maskStart++)
                mask[maskStart] = 0;
            mask[index] = define._value;
            this._length = size;
        }
        else {
            if (size > this._length) { //the real length is this._length, if size is large than real length should use "= instead "|=" to ignore dirty data.
                mask[index] = define._value;
                this._length = size;
            }
            else {
                mask[index] |= define._value;
            }
        }
    }
    /**
     * 移除宏定义。
     * @param define 宏定义。
     */
    remove(define) {
        var index = define._index;
        var mask = this._mask;
        var endIndex = this._length - 1;
        if (index > endIndex) //不重置Length,避免经常扩充
            return;
        var newValue = mask[index] & ~define._value;
        if (index == endIndex && newValue === 0)
            this._length--;
        else
            mask[index] = newValue;
    }
    /**
     * 添加宏定义集合。
     * @param define 宏定义集合。
     */
    addDefineDatas(define) {
        var addMask = define._mask;
        var size = define._length;
        var mask = this._mask;
        var maskStart = mask.length;
        if (maskStart < size) {
            mask.length = size;
            for (var i = 0; i < maskStart; i++)
                mask[i] |= addMask[i];
            for (; maskStart < size; maskStart++)
                mask[maskStart] = addMask[maskStart];
            this._length = size;
        }
        else {
            for (var i = 0; i < size; i++)
                mask[i] |= addMask[i];
            this._length = Math.max(this._length, size);
        }
    }
    /**
     * 移除宏定义集合。
     * @param define 宏定义集合。
     */
    removeDefineDatas(define) {
        var removeMask = define._mask;
        var mask = this._mask;
        var endIndex = this._length - 1;
        for (var i = define._length - 1; i >= 0; i--) {
            if (i > endIndex)
                continue;
            var newValue = mask[i] & ~removeMask[i];
            if (i == endIndex && newValue === 0) {
                endIndex--;
                this._length--;
            }
            else {
                mask[i] = newValue;
            }
        }
    }
    /**
     * 是否有宏定义。
     * @param define 宏定义。
     */
    has(define) {
        var index = define._index;
        if (index >= this._length)
            return false;
        return (this._mask[index] & define._value) !== 0;
    }
    /**
     * 清空宏定义。
     */
    clear() {
        this._length = 0;
    }
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject) {
        var destDefineData = destObject;
        var destMask = destDefineData._mask;
        var mask = this._mask;
        var count = this._length;
        destMask.length = count;
        for (var i = 0; i < count; i++)
            destMask[i] = mask[i];
        destDefineData._length = count;
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone() {
        var dest = new DefineDatas();
        this.cloneTo(dest);
        return dest;
    }
}
