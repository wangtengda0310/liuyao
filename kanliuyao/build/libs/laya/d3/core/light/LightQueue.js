/**
 * @internal
 */
export class LightQueue {
    constructor() {
        this._length = 0;
        this._elements = [];
    }
    add(light) {
        if (this._length === this._elements.length)
            this._elements.push(light);
        else
            this._elements[this._length] = light;
        this._length++;
    }
    remove(light) {
        var index = this._elements.indexOf(light);
        this._length--;
        if (index !== this._length) {
            var end = this._elements[this._length];
            this._elements[index] = end;
        }
    }
    shift() {
        this._length--;
        return this._elements.shift();
    }
}
/**
 * @internal
 */
export class DirectionLightQueue extends LightQueue {
    getSunLight() {
        var maxIntIndex;
        var maxIntensity = -1;
        var elements = this._elements;
        for (var i = 0; i < this._length; i++) {
            var intensity = elements[i]._intensity;
            if (maxIntensity < intensity) {
                maxIntensity = intensity;
                maxIntIndex = i;
            }
        }
        return maxIntIndex;
    }
}
/**
 * @internal
 */
export class AlternateLightQueue extends LightQueue {
    remove(light) {
        //sort must base added time
        var index = this._elements.indexOf(light);
        this._elements.splice(index, 1);
        this._length--;
    }
}
