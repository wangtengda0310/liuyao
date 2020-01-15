import { ILaya3D } from "../../../ILaya3D";
/**
 * 着色器变种。
 */
export class ShaderVariant {
    /**
     * 创建着色器变种。
     * @param shader 着色器
     * @param subShaderIndex 子着色器索引
     * @param passIndex 通道索引
     * @param defines 宏定义集合
     */
    constructor(shader, subShaderIndex, passIndex, defines) {
        /** @internal */
        this._subShaderIndex = 0;
        /** @internal */
        this._passIndex = 0;
        this.setValue(shader, subShaderIndex, passIndex, defines);
    }
    /**
     * 着色器。
     */
    get shader() {
        return this._shader;
    }
    /**
     * 子着色器索引。
     */
    get subShaderIndex() {
        return this._subShaderIndex;
    }
    /**
     * 通道索引。
     */
    get passIndex() {
        return this._passIndex;
    }
    /**
     * 宏定义集合。
     */
    get defineNames() {
        return this._defineNames;
    }
    /**
     * 给着色器变种赋值。
     * @param shader 着色器
     * @param subShaderIndex 子着色器索引
     * @param passIndex 通道索引
     * @param defineNames 宏定义集合
     */
    setValue(shader, subShaderIndex, passIndex, defineNames) {
        if (shader) {
            var subShader = shader.getSubShaderAt(subShaderIndex);
            if (subShader) {
                var pass = subShader._passes[passIndex];
                if (pass) {
                    var validDefine = pass._validDefine;
                    for (var i = 0, n = defineNames.length; i < n; i++) {
                        var defname = defineNames[i];
                        if (!validDefine.has(ILaya3D.Shader3D.getDefineByName(defname)))
                            throw `ShaderVariantInfo:Invalid defineName ${defname} in ${shader._name} subShaderIndex of ${subShaderIndex} passIndex of ${passIndex}.`;
                    }
                }
                else {
                    throw `ShaderVariantInfo:Shader don't have passIndex of ${passIndex}.`;
                }
            }
            else {
                throw `ShaderVariantInfo:Shader don't have subShaderIndex of ${subShaderIndex}.`;
            }
        }
        else {
            throw `ShaderVariantInfo:Shader can't be null.`;
        }
        this._shader = shader;
        this._subShaderIndex = subShaderIndex;
        this._passIndex = passIndex;
        this._defineNames = defineNames;
    }
    /**
     * 是否相等。
     * @param other 其它着色器变种
     * @return 是否相等。
     */
    equal(other) {
        if (this._shader !== other._shader || this._subShaderIndex !== other._subShaderIndex || this._passIndex !== other._passIndex)
            return false;
        var defines = this._defineNames;
        var otherDefines = other._defineNames;
        if (defines.length !== otherDefines.length)
            return false;
        for (var i = 0, n = this._defineNames.length; i < n; i++) {
            if (defines[i] !== otherDefines[i])
                return false;
        }
        return true;
    }
    /**
     * 克隆。
     * @return 着色器变种。
     */
    clone() {
        var dest = new ShaderVariant(this._shader, this._subShaderIndex, this._passIndex, this._defineNames.slice());
        return dest;
    }
}
/**
 * 着色器变种集合。
 */
export class ShaderVariantCollection {
    constructor() {
        /** @internal */
        this._allCompiled = false;
        /** @internal */
        this._variants = [];
    }
    /**
     * 是否已经全部编译。
     */
    get allCompiled() {
        return this._allCompiled;
    }
    /**
     * 包含的变种数量。
     */
    get variantCount() {
        return this._variants.length;
    }
    /**
     * 添加着色器变种。
     * @param variant 着色器变种。
     * @param 是否添加成功。
     */
    add(variant) {
        for (var i = 0, n = this._variants.length; i < n; i++) {
            if (this._variants[i].equal(variant))
                return false;
        }
        this._variants.push(variant.clone());
        this._allCompiled = false;
        return true;
    }
    /**
     * 移除着色器变种。
     * @param variant 着色器变种。
     * @return 是否移除成功。
     */
    remove(variant) {
        for (var i = 0, n = this._variants.length; i < n; i++) {
            if (this._variants[i].equal(variant)) {
                this._variants.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    /**
     * 是否包含着色器变种。
     * @param variant 着色器变种。
     */
    contatins(variant) {
        for (var i = 0, n = this._variants.length; i < n; i++) {
            if (this._variants[i].equal(variant))
                return true;
        }
        return false;
    }
    /**
     * 通过索引获取着色器变种。
     * @param index 索引。
     * @returns 着色器变种。
     */
    getByIndex(index) {
        return this._variants[index];
    }
    /**
     * 清空。
     */
    clear() {
        this._variants.length = 0;
    }
    /**
     * 执行编译。
     */
    compile() {
        if (!this._allCompiled) {
            var variants = this._variants;
            for (var i = 0, n = variants.length; i < n; i++) {
                var variant = variants[i];
                ILaya3D.Shader3D.compileShaderByDefineNames(variant._shader._name, variant._subShaderIndex, variant._passIndex, variant._defineNames);
            }
            this._allCompiled = true;
        }
    }
}
