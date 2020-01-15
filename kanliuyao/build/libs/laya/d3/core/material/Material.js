import { Loader } from "../../../net/Loader";
import { BaseTexture } from "../../../resource/BaseTexture";
import { Resource } from "../../../resource/Resource";
import { Vector2 } from "../../math/Vector2";
import { Vector3 } from "../../math/Vector3";
import { Vector4 } from "../../math/Vector4";
import { DefineDatas } from "../../shader/DefineDatas";
import { Shader3D } from "../../shader/Shader3D";
import { ShaderData } from "../../shader/ShaderData";
import { ClassUtils } from "../../../utils/ClassUtils";
import { Laya } from "../../../../Laya";
/**
 * <code>Material</code> 类用于创建材质。
 */
export class Material extends Resource {
    /**
     * 创建一个 <code>BaseMaterial</code> 实例。
     */
    constructor() {
        super();
        /** @private */
        this._shaderValues = null; //TODO:剥离贴图ShaderValue
        this._disablePublicDefineDatas = new DefineDatas();
        this._shaderValues = new ShaderData(this);
        this.renderQueue = Material.RENDERQUEUE_OPAQUE;
        this._alphaTest = false;
    }
    /**
     * 加载材质。
     * @param url 材质地址。
     * @param complete 完成回掉。
     */
    static load(url, complete) {
        Laya.loader.create(url, complete, null, Material.MATERIAL);
    }
    /**
     * @internal
     */
    static __initDefine__() {
        Material.SHADERDEFINE_ALPHATEST = Shader3D.getDefineByName("ALPHATEST");
    }
    /**
     * @inheritDoc
     */
    static _parse(data, propertyParams = null, constructParams = null) {
        var jsonData = data;
        var props = jsonData.props;
        var material;
        var classType = props.type;
        //var clasPaths: any[] = classType.split('.');
        //var clas: new () => any = Browser.window;
        //clasPaths.forEach(function (cls: any): void {
        //	clas = clas[cls];
        //});
        var clas = ClassUtils.getRegClass(classType);
        if (clas)
            material = new clas();
        else
            throw ('_getSprite3DHierarchyInnerUrls 错误: ' + data.type + ' 不是类');
        switch (jsonData.version) {
            case "LAYAMATERIAL:01":
            case "LAYAMATERIAL:02":
                var i, n;
                for (var key in props) {
                    switch (key) {
                        case "vectors":
                            var vectors = props[key];
                            for (i = 0, n = vectors.length; i < n; i++) {
                                var vector = vectors[i];
                                var vectorValue = vector.value;
                                switch (vectorValue.length) {
                                    case 2:
                                        material[vector.name] = new Vector2(vectorValue[0], vectorValue[1]);
                                        break;
                                    case 3:
                                        material[vector.name] = new Vector3(vectorValue[0], vectorValue[1], vectorValue[2]);
                                        break;
                                    case 4:
                                        material[vector.name] = new Vector4(vectorValue[0], vectorValue[1], vectorValue[2], vectorValue[3]);
                                        break;
                                    default:
                                        throw new Error("BaseMaterial:unkonwn color length.");
                                }
                            }
                            break;
                        case "textures":
                            var textures = props[key];
                            for (i = 0, n = textures.length; i < n; i++) {
                                var texture = textures[i];
                                var path = texture.path;
                                (path) && (material[texture.name] = Loader.getRes(path));
                            }
                            break;
                        case "defines":
                            var defineNames = props[key];
                            for (i = 0, n = defineNames.length; i < n; i++) {
                                var define = Shader3D.getDefineByName(defineNames[i]); //TODO:是否取消defines
                                material._shaderValues.addDefine(define);
                            }
                            break;
                        case "renderStates": //"LAYAMATERIAL:02" 
                            var renderStatesData = props[key];
                            var renderStateData = renderStatesData[0];
                            var mat = material; //TODO:临时兼容
                            mat.blend = renderStateData.blend;
                            mat.cull = renderStateData.cull;
                            mat.depthTest = renderStateData.depthTest;
                            mat.depthWrite = renderStateData.depthWrite;
                            mat.blendSrc = renderStateData.srcBlend;
                            mat.blendDst = renderStateData.dstBlend;
                            break;
                        case "cull": //"LAYAMATERIAL:01"
                            material.cull = props[key];
                            break;
                        case "blend": //"LAYAMATERIAL:01"
                            material.blend = props[key];
                            break;
                        case "depthWrite": //"LAYAMATERIAL:01" 
                            material.depthWrite = props[key];
                            break;
                        case "srcBlend": //"LAYAMATERIAL:01" 
                            material.blendSrc = props[key];
                            break;
                        case "dstBlend": //"LAYAMATERIAL:01" 
                            material.blendDst = props[key];
                            break;
                        default:
                            material[key] = props[key];
                    }
                }
                break;
            default:
                throw new Error("BaseMaterial:unkonwn version.");
        }
        return material;
    }
    /**
     * 着色器数据。
     */
    get shaderData() {
        return this._shaderValues;
    }
    /**
     * 透明测试模式裁剪值。
     */
    get alphaTestValue() {
        return this._shaderValues.getNumber(Material.ALPHATESTVALUE);
    }
    set alphaTestValue(value) {
        this._shaderValues.setNumber(Material.ALPHATESTVALUE, value);
    }
    /**
     * 是否透明裁剪。
     */
    get alphaTest() {
        return this._alphaTest;
    }
    set alphaTest(value) {
        this._alphaTest = value;
        if (value)
            this._shaderValues.addDefine(Material.SHADERDEFINE_ALPHATEST);
        else
            this._shaderValues.removeDefine(Material.SHADERDEFINE_ALPHATEST);
    }
    /**
     * @internal
     */
    _removeTetxureReference() {
        var data = this._shaderValues.getData();
        for (var k in data) {
            var value = data[k];
            if (value && value instanceof BaseTexture) //TODO:需要优化,杜绝is判断，慢
                value._removeReference();
        }
    }
    /**
     * @inheritDoc
     * @override
     */
    _disposeResource() {
        if (this._referenceCount > 0)
            this._removeTetxureReference();
        this._shaderValues = null;
    }
    /**
     * @implements IReferenceCounter
     * @internal
     * @override
     */
    _addReference(count = 1) {
        super._addReference(count);
        var data = this._shaderValues.getData();
        for (var k in data) {
            var value = data[k];
            if (value && value instanceof BaseTexture) //TODO:需要优化,杜绝is判断，慢
                value._addReference();
        }
    }
    /**
     * @implements IReferenceCounter
     * @internal
     * @override
     */
    _removeReference(count = 1) {
        super._removeReference(count);
        this._removeTetxureReference();
    }
    /**
     * 设置使用Shader名字。
     * @param name 名称。
     */
    setShaderName(name) {
        this._shader = Shader3D.find(name);
        if (!this._shader)
            throw new Error("BaseMaterial: unknown shader name.");
    }
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject) {
        var destBaseMaterial = destObject;
        destBaseMaterial.name = this.name;
        destBaseMaterial.renderQueue = this.renderQueue;
        this._disablePublicDefineDatas.cloneTo(destBaseMaterial._disablePublicDefineDatas);
        this._shaderValues.cloneTo(destBaseMaterial._shaderValues);
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone() {
        var dest = new Material();
        this.cloneTo(dest);
        return dest;
    }
    //--------------------------------------------兼容-------------------------------------------------
    get _defineDatas() {
        return this._shaderValues._defineDatas;
    }
}
/**Material资源。*/
Material.MATERIAL = "MATERIAL";
/** 渲染队列_不透明。*/
Material.RENDERQUEUE_OPAQUE = 2000;
/** 渲染队列_阿尔法裁剪。*/
Material.RENDERQUEUE_ALPHATEST = 2450;
/** 渲染队列_透明。*/
Material.RENDERQUEUE_TRANSPARENT = 3000;
/**着色器变量,透明测试值。*/
Material.ALPHATESTVALUE = Shader3D.propertyNameToID("u_AlphaTestValue");
/**材质级着色器宏定义,透明测试。*/
Material.SHADERDEFINE_ALPHATEST = null;
