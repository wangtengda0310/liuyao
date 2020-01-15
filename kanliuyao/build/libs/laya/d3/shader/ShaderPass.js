import { Config3D } from "../../../Config3D";
import { ShaderCompile } from "../../webgl/utils/ShaderCompile";
import { ShaderNode } from "../../webgl/utils/ShaderNode";
import { RenderState } from "../core/material/RenderState";
import { DefineDatas } from "./DefineDatas";
import { Shader3D } from "./Shader3D";
import { ShaderInstance } from "./ShaderInstance";
import { ShaderVariant } from "./ShaderVariantCollection";
/**
 * <code>ShaderPass</code> 类用于实现ShaderPass。
 */
export class ShaderPass extends ShaderCompile {
    constructor(owner, vs, ps, stateMap) {
        super(vs, ps, null);
        /**@internal */
        this._cacheSharders = {};
        /**@internal */
        this._cacheShaderHierarchy = 1;
        /**@internal */
        this._renderState = new RenderState();
        /**@internal */
        this._validDefine = new DefineDatas();
        this._owner = owner;
        this._stateMap = stateMap;
        for (var k in this.defs)
            this._validDefine.add(Shader3D.getDefineByName(k));
    }
    /**
     * 获取渲染状态。
     * @return 渲染状态。
     */
    get renderState() {
        return this._renderState;
    }
    /**
     * @inheritDoc
     * @override
     */
    _compileToTree(parent, lines, start, includefiles, defs) {
        var node, preNode;
        var text, name, fname;
        var ofs, words, noUseNode;
        var i, n, j;
        for (i = start; i < lines.length; i++) {
            text = lines[i];
            if (text.length < 1)
                continue;
            ofs = text.indexOf("//");
            if (ofs === 0)
                continue;
            if (ofs >= 0)
                text = text.substr(0, ofs);
            node = noUseNode || new ShaderNode(includefiles);
            noUseNode = null;
            node.text = text;
            if ((ofs = text.indexOf("#")) >= 0) {
                name = "#";
                for (j = ofs + 1, n = text.length; j < n; j++) {
                    var c = text.charAt(j);
                    if (c === ' ' || c === '\t' || c === '?')
                        break;
                    name += c;
                }
                node.name = name;
                switch (name) {
                    case "#ifdef":
                    case "#ifndef":
                        node.setParent(parent);
                        parent = node;
                        if (defs) {
                            words = text.substr(j).split(ShaderCompile._splitToWordExps3);
                            for (j = 0; j < words.length; j++) {
                                text = words[j];
                                text.length && (defs[text] = true);
                            }
                        }
                        continue;
                    case "#if":
                    case "#elif":
                        node.setParent(parent);
                        parent = node;
                        if (defs) {
                            words = text.substr(j).split(ShaderCompile._splitToWordExps3);
                            for (j = 0; j < words.length; j++) {
                                text = words[j];
                                text.length && text != "defined" && (defs[text] = true);
                            }
                        }
                        continue;
                    case "#else":
                        parent = parent.parent;
                        preNode = parent.childs[parent.childs.length - 1];
                        node.setParent(parent);
                        parent = node;
                        continue;
                    case "#endif":
                        parent = parent.parent;
                        preNode = parent.childs[parent.childs.length - 1];
                        node.setParent(parent);
                        continue;
                    case "#include": //这里有问题,主要是空格
                        words = ShaderCompile.splitToWords(text, null);
                        var inlcudeFile = ShaderCompile.includes[words[1]];
                        if (!inlcudeFile) {
                            throw "ShaderCompile error no this include file:" + words[1];
                        }
                        if ((ofs = words[0].indexOf("?")) < 0) {
                            node.setParent(parent);
                            text = inlcudeFile.getWith(words[2] == 'with' ? words[3] : null);
                            this._compileToTree(node, text.split('\n'), 0, includefiles, defs);
                            node.text = "";
                            continue;
                        }
                        node.setCondition(words[0].substr(ofs + 1), ShaderCompile.IFDEF_YES);
                        node.text = inlcudeFile.getWith(words[2] == 'with' ? words[3] : null);
                        break;
                    case "#import":
                        words = ShaderCompile.splitToWords(text, null);
                        fname = words[1];
                        includefiles.push({ node: node, file: ShaderCompile.includes[fname], ofs: node.text.length });
                        continue;
                }
            }
            else {
                preNode = parent.childs[parent.childs.length - 1];
                if (preNode && !preNode.name) {
                    includefiles.length > 0 && ShaderCompile.splitToWords(text, preNode);
                    noUseNode = node;
                    preNode.text += "\n" + text;
                    continue;
                }
                includefiles.length > 0 && ShaderCompile.splitToWords(text, node);
            }
            node.setParent(parent);
        }
    }
    /**
     * @internal
     */
    _resizeCacheShaderMap(cacheMap, hierarchy, resizeLength) {
        var end = this._cacheShaderHierarchy - 1;
        if (hierarchy == end) {
            for (var k in cacheMap) {
                var shader = cacheMap[k];
                for (var i = 0, n = resizeLength - end; i < n; i++) {
                    if (i == n - 1)
                        cacheMap[0] = shader; //0替代(i == 0 ? k : 0),只扩不缩
                    else
                        cacheMap = cacheMap[i == 0 ? k : 0] = {};
                }
            }
            this._cacheShaderHierarchy = resizeLength;
        }
        else {
            for (var k in cacheMap)
                this._resizeCacheShaderMap(cacheMap[k], ++hierarchy, resizeLength);
        }
    }
    /**
     * @internal
     */
    _addDebugShaderVariantCollection(compileDefine) {
        var dbugShaderVariantInfo = Shader3D._debugShaderVariantInfo;
        var debugSubShader = this._owner;
        var debugShader = debugSubShader._owner;
        var deugDefines = ShaderPass._debugDefineString;
        Shader3D._getNamesByDefineData(compileDefine, deugDefines);
        if (!Config3D._config._multiLighting) {
            var index = deugDefines.indexOf("LEGACYSINGLELIGHTING");
            (index !== -1) && (deugDefines.splice(index, 1));
        }
        if (dbugShaderVariantInfo)
            dbugShaderVariantInfo.setValue(debugShader, debugShader._subShaders.indexOf(debugSubShader), debugSubShader._passes.indexOf(this), deugDefines);
        else
            Shader3D._debugShaderVariantInfo = dbugShaderVariantInfo = new ShaderVariant(debugShader, debugShader._subShaders.indexOf(debugSubShader), debugSubShader._passes.indexOf(this), deugDefines);
        Shader3D.debugShaderVariantCollection.add(dbugShaderVariantInfo);
    }
    /**
     * @internal
     */
    withCompile(compileDefine) {
        compileDefine._intersectionDefineDatas(this._validDefine);
        if (Shader3D.debugMode) //add shader variant info to debug ShaderVariantCollection
            this._addDebugShaderVariantCollection(compileDefine);
        var cacheShaders = this._cacheSharders;
        var maskLength = compileDefine._length;
        if (maskLength > this._cacheShaderHierarchy) { //扩充已缓存ShaderMap
            this._resizeCacheShaderMap(cacheShaders, 0, maskLength);
            this._cacheShaderHierarchy = maskLength;
        }
        var mask = compileDefine._mask;
        var endIndex = compileDefine._length - 1;
        var maxEndIndex = this._cacheShaderHierarchy - 1;
        for (var i = 0; i < maxEndIndex; i++) {
            var subMask = endIndex < i ? 0 : mask[i];
            var subCacheShaders = cacheShaders[subMask];
            (subCacheShaders) || (cacheShaders[subMask] = subCacheShaders = {});
            cacheShaders = subCacheShaders;
        }
        var cacheKey = endIndex < maxEndIndex ? 0 : mask[maxEndIndex];
        var shader = cacheShaders[cacheKey];
        if (shader)
            return shader;
        var defineString = ShaderPass._defineString;
        Shader3D._getNamesByDefineData(compileDefine, defineString);
        var config = Config3D._config;
        var clusterSlices = config.lightClusterCount;
        var defMap = {};
        var defineStr = "#define MAX_LIGHT_COUNT " + config.maxLightCount + "\n";
        defineStr += "#define MAX_LIGHT_COUNT_PER_CLUSTER " + config._maxAreaLightCountPerClusterAverage + "\n";
        defineStr += "#define CLUSTER_X_COUNT " + clusterSlices.x + "\n";
        defineStr += "#define CLUSTER_Y_COUNT " + clusterSlices.y + "\n";
        defineStr += "#define CLUSTER_Z_COUNT " + clusterSlices.z + "\n";
        for (var i = 0, n = defineString.length; i < n; i++) {
            var def = defineString[i];
            defineStr += "#define " + def + "\n";
            defMap[def] = true;
        }
        var vs = this._VS.toscript(defMap, []);
        var vsVersion = '';
        if (vs[0].indexOf('#version') == 0) {
            vsVersion = vs[0] + '\n';
            vs.shift();
        }
        var ps = this._PS.toscript(defMap, []);
        var psVersion = '';
        if (ps[0].indexOf('#version') == 0) {
            psVersion = ps[0] + '\n';
            ps.shift();
        }
        shader = new ShaderInstance(vsVersion + defineStr + vs.join('\n'), psVersion + defineStr + ps.join('\n'), this._owner._attributeMap || this._owner._owner._attributeMap, this._owner._uniformMap || this._owner._owner._uniformMap, this);
        cacheShaders[cacheKey] = shader;
        if (Shader3D.debugMode) {
            var defStr = "";
            var defMask = "";
            if (!config._multiLighting) {
                compileDefine.remove(Shader3D.SHADERDEFINE_LEGACYSINGALLIGHTING);
                var index = defineString.indexOf("LEGACYSINGLELIGHTING");
                (index !== -1) && (defineString.splice(index, 1));
            }
            for (var i = 0, n = compileDefine._length; i < n; i++)
                (i == n - 1) ? defMask += mask[i] : defMask += mask[i] + ",";
            for (var i = 0, n = defineString.length; i < n; i++)
                (i == n - 1) ? defStr += defineString[i] : defStr += defineString[i] + ",";
            console.log("%cLayaAir: Shader Compile Information---ShaderName:" + this._owner._owner._name + " SubShaderIndex:" + this._owner._owner._subShaders.indexOf(this._owner) + " PassIndex:" + this._owner._passes.indexOf(this) + " DefineMask:[" + defMask + "]" + " DefineNames:[" + defStr + "]", "color:green");
        }
        return shader;
    }
}
/**@internal */
ShaderPass._defineString = [];
/**@internal */
ShaderPass._debugDefineString = [];
