import { ShaderPass } from "./ShaderPass";
/**
 * <code>SubShader</code> 类用于创建SubShader。
 */
export class SubShader {
    /**
     * 创建一个 <code>SubShader</code> 实例。
     * @param	attributeMap  顶点属性表。
     * @param	uniformMap  uniform属性表。
     */
    constructor(attributeMap, uniformMap) {
        /**@internal */
        this._flags = {};
        /**@internal */
        this._passes = [];
        this._attributeMap = attributeMap;
        this._uniformMap = uniformMap;
    }
    /**
     *添加标记。
     * @param key 标记键。
     * @param value 标记值。
     */
    setFlag(key, value) {
        if (value)
            this._flags[key] = value;
        else
            delete this._flags[key];
    }
    /**
     * 获取标记值。
     * @return key 标记键。
     */
    getFlag(key) {
        return this._flags[key];
    }
    /**
     * 添加着色器Pass
     * @param vs
     * @param ps
     * @param stateMap
     */
    addShaderPass(vs, ps, stateMap = null) {
        var shaderPass = new ShaderPass(this, vs, ps, stateMap);
        this._passes.push(shaderPass);
        return shaderPass;
    }
}
