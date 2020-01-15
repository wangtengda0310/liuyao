import { Config3D } from "../../../Config3D";
import { ShaderCompile } from "../../webgl/utils/ShaderCompile";
import { DefineDatas } from "./DefineDatas";
import { ShaderDefine } from "./ShaderDefine";
import { ShaderVariantCollection } from "./ShaderVariantCollection";
/**
 * <code>Shader3D</code> 类用于创建Shader3D。
 */
export class Shader3D {
    /**
     * 创建一个 <code>Shader3D</code> 实例。
     */
    constructor(name, attributeMap, uniformMap, enableInstancing) {
        /**@internal */
        this._attributeMap = null;
        /**@internal */
        this._uniformMap = null;
        /**@internal */
        this._enableInstancing = false;
        /**@internal */
        this._subShaders = [];
        this._name = name;
        this._attributeMap = attributeMap;
        this._uniformMap = uniformMap;
        this._enableInstancing = enableInstancing;
    }
    /**
     * @internal
     */
    static _getNamesByDefineData(defineData, out) {
        var maskMap = Shader3D._maskMap;
        var mask = defineData._mask;
        out.length = 0;
        for (var i = 0, n = defineData._length; i < n; i++) {
            var subMaskMap = maskMap[i];
            var subMask = mask[i];
            for (var j = 0; j < 32; j++) {
                var d = 1 << j;
                if (subMask > 0 && d > subMask) //如果31位存在subMask为负数,避免break
                    break;
                if (subMask & d)
                    out.push(subMaskMap[d]);
            }
        }
    }
    /**
     * 注册宏定义。
     * @param name
     */
    static getDefineByName(name) {
        var define = Shader3D._defineMap[name];
        if (!define) {
            var maskMap = Shader3D._maskMap;
            var counter = Shader3D._defineCounter;
            var index = Math.floor(counter / 32);
            var value = 1 << counter % 32;
            define = new ShaderDefine(index, value);
            Shader3D._defineMap[name] = define;
            if (index == maskMap.length) {
                maskMap.length++;
                maskMap[index] = {};
            }
            maskMap[index][value] = name;
            Shader3D._defineCounter++;
        }
        return define;
    }
    /**
     * 通过Shader属性名称获得唯一ID。
     * @param name Shader属性名称。
     * @return 唯一ID。
     */
    static propertyNameToID(name) {
        if (Shader3D._propertyNameMap[name] != null) {
            return Shader3D._propertyNameMap[name];
        }
        else {
            var id = Shader3D._propertyNameCounter++;
            Shader3D._propertyNameMap[name] = id;
            return id;
        }
    }
    /**
     * 添加函数库引用。
     * @param fileName 文件名字。
     * @param txt 文件内容
     */
    static addInclude(fileName, txt) {
        txt = txt.replace(ShaderCompile._clearCR, ""); //CRLF风格需要先去掉“\r",否则切分字符会出错导致宏定义编译错误等
        ShaderCompile.addInclude(fileName, txt);
    }
    /**
     * 通过宏定义名字编译shader。
     * @param	shaderName Shader名称。
     * @param   subShaderIndex 子着色器索引。
     * @param   passIndex  通道索引。
     * @param	defineNames 宏定义名字集合。
     */
    static compileShaderByDefineNames(shaderName, subShaderIndex, passIndex, defineNames) {
        var shader = Shader3D.find(shaderName);
        if (shader) {
            var subShader = shader.getSubShaderAt(subShaderIndex);
            if (subShader) {
                var pass = subShader._passes[passIndex];
                if (pass) {
                    var compileDefineDatas = Shader3D._compileDefineDatas;
                    compileDefineDatas.clear();
                    for (var i = 0, n = defineNames.length; i < n; i++)
                        compileDefineDatas.add(Shader3D.getDefineByName(defineNames[i]));
                    (Config3D._config._multiLighting) || (compileDefineDatas.add(Shader3D.SHADERDEFINE_LEGACYSINGALLIGHTING));
                    pass.withCompile(compileDefineDatas);
                }
                else {
                    console.warn("Shader3D: unknown passIndex.");
                }
            }
            else {
                console.warn("Shader3D: unknown subShaderIndex.");
            }
        }
        else {
            console.warn("Shader3D: unknown shader name.");
        }
    }
    /**
     * 添加预编译shader文件，主要是处理宏定义
     */
    static add(name, attributeMap = null, uniformMap = null, enableInstancing = false) {
        return Shader3D._preCompileShader[name] = new Shader3D(name, attributeMap, uniformMap, enableInstancing);
    }
    /**
     * 获取ShaderCompile3D。
     * @param	name
     * @return ShaderCompile3D。
     */
    static find(name) {
        return Shader3D._preCompileShader[name];
    }
    /**
     * 名字。
     */
    get name() {
        return this._name;
    }
    /**
     * 添加子着色器。
     * @param 子着色器。
     */
    addSubShader(subShader) {
        this._subShaders.push(subShader);
        subShader._owner = this;
    }
    /**
     * 在特定索引获取子着色器。
     * @param	index 索引。
     * @return 子着色器。
     */
    getSubShaderAt(index) {
        return this._subShaders[index];
    }
    /**
     * @deprecated
     * 通过宏定义遮罩编译shader,建议使用compileShaderByDefineNames。
     * @param	shaderName Shader名称。
     * @param   subShaderIndex 子着色器索引。
     * @param   passIndex  通道索引。
     * @param	defineMask 宏定义遮罩集合。
     */
    static compileShader(shaderName, subShaderIndex, passIndex, ...defineMask) {
        var shader = Shader3D.find(shaderName);
        if (shader) {
            var subShader = shader.getSubShaderAt(subShaderIndex);
            if (subShader) {
                var pass = subShader._passes[passIndex];
                if (pass) {
                    var compileDefineDatas = Shader3D._compileDefineDatas;
                    var mask = compileDefineDatas._mask;
                    mask.length = 0;
                    for (var i = 0, n = defineMask.length; i < n; i++)
                        mask.push(defineMask[i]);
                    compileDefineDatas._length = defineMask.length;
                    (Config3D._config._multiLighting) || (compileDefineDatas.add(Shader3D.SHADERDEFINE_LEGACYSINGALLIGHTING));
                    pass.withCompile(compileDefineDatas);
                }
                else {
                    console.warn("Shader3D: unknown passIndex.");
                }
            }
            else {
                console.warn("Shader3D: unknown subShaderIndex.");
            }
        }
        else {
            console.warn("Shader3D: unknown shader name.");
        }
    }
}
/**@internal */
Shader3D._compileDefineDatas = new DefineDatas();
/**渲染状态_剔除。*/
Shader3D.RENDER_STATE_CULL = 0;
/**渲染状态_混合。*/
Shader3D.RENDER_STATE_BLEND = 1;
/**渲染状态_混合源。*/
Shader3D.RENDER_STATE_BLEND_SRC = 2;
/**渲染状态_混合目标。*/
Shader3D.RENDER_STATE_BLEND_DST = 3;
/**渲染状态_混合源RGB。*/
Shader3D.RENDER_STATE_BLEND_SRC_RGB = 4;
/**渲染状态_混合目标RGB。*/
Shader3D.RENDER_STATE_BLEND_DST_RGB = 5;
/**渲染状态_混合源ALPHA。*/
Shader3D.RENDER_STATE_BLEND_SRC_ALPHA = 6;
/**渲染状态_混合目标ALPHA。*/
Shader3D.RENDER_STATE_BLEND_DST_ALPHA = 7;
/**渲染状态_混合常量颜色。*/
Shader3D.RENDER_STATE_BLEND_CONST_COLOR = 8;
/**渲染状态_混合方程。*/
Shader3D.RENDER_STATE_BLEND_EQUATION = 9;
/**渲染状态_RGB混合方程。*/
Shader3D.RENDER_STATE_BLEND_EQUATION_RGB = 10;
/**渲染状态_ALPHA混合方程。*/
Shader3D.RENDER_STATE_BLEND_EQUATION_ALPHA = 11;
/**渲染状态_深度测试。*/
Shader3D.RENDER_STATE_DEPTH_TEST = 12;
/**渲染状态_深度写入。*/
Shader3D.RENDER_STATE_DEPTH_WRITE = 13;
/**shader变量提交周期，自定义。*/
Shader3D.PERIOD_CUSTOM = 0;
/**shader变量提交周期，逐材质。*/
Shader3D.PERIOD_MATERIAL = 1;
/**shader变量提交周期，逐精灵和相机，注：因为精灵包含MVP矩阵，为复合属性，所以摄像机发生变化时也应提交。*/
Shader3D.PERIOD_SPRITE = 2;
/**shader变量提交周期，逐相机。*/
Shader3D.PERIOD_CAMERA = 3;
/**shader变量提交周期，逐场景。*/
Shader3D.PERIOD_SCENE = 4;
/**@internal */
Shader3D._propertyNameCounter = 0;
/**@internal */
Shader3D._propertyNameMap = {};
/**@internal */
Shader3D._defineCounter = 0;
/**@internal */
Shader3D._defineMap = {};
/**@internal */
Shader3D._preCompileShader = {};
/**@internal */
Shader3D._maskMap = [];
/**是否开启调试模式。 */
Shader3D.debugMode = true;
/**调试着色器变种集合。 */
Shader3D.debugShaderVariantCollection = new ShaderVariantCollection();
