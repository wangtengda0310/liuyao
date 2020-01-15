import { Vector4 } from "../../math/Vector4";
import { Shader3D } from "../../shader/Shader3D";
import { Scene3DShaderDeclaration } from "../scene/Scene3DShaderDeclaration";
import { Material } from "./Material";
import { RenderState } from "./RenderState";
/**
 * <code>BlinnPhongMaterial</code> 类用于实现Blinn-Phong材质。
 */
export class BlinnPhongMaterial extends Material {
    /**
     * 创建一个 <code>BlinnPhongMaterial</code> 实例。
     */
    constructor() {
        super();
        this._enableVertexColor = false;
        this.setShaderName("BLINNPHONG");
        this._albedoIntensity = 1.0;
        this._albedoColor = new Vector4(1.0, 1.0, 1.0, 1.0);
        var sv = this._shaderValues;
        sv.setVector(BlinnPhongMaterial.ALBEDOCOLOR, new Vector4(1.0, 1.0, 1.0, 1.0));
        sv.setVector(BlinnPhongMaterial.MATERIALSPECULAR, new Vector4(1.0, 1.0, 1.0, 1.0));
        sv.setNumber(BlinnPhongMaterial.SHININESS, 0.078125);
        sv.setNumber(Material.ALPHATESTVALUE, 0.5);
        sv.setVector(BlinnPhongMaterial.TILINGOFFSET, new Vector4(1.0, 1.0, 0.0, 0.0));
        this._enableLighting = true;
        this.renderMode = BlinnPhongMaterial.RENDERMODE_OPAQUE;
    }
    /**
     * @internal
     */
    static __initDefine__() {
        BlinnPhongMaterial.SHADERDEFINE_DIFFUSEMAP = Shader3D.getDefineByName("DIFFUSEMAP");
        BlinnPhongMaterial.SHADERDEFINE_NORMALMAP = Shader3D.getDefineByName("NORMALMAP");
        BlinnPhongMaterial.SHADERDEFINE_SPECULARMAP = Shader3D.getDefineByName("SPECULARMAP");
        BlinnPhongMaterial.SHADERDEFINE_TILINGOFFSET = Shader3D.getDefineByName("TILINGOFFSET");
        BlinnPhongMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR = Shader3D.getDefineByName("ENABLEVERTEXCOLOR");
    }
    /**
     * @internal
     */
    get _ColorR() {
        return this._albedoColor.x;
    }
    set _ColorR(value) {
        this._albedoColor.x = value;
        this.albedoColor = this._albedoColor;
    }
    /**
     * @internal
     */
    get _ColorG() {
        return this._albedoColor.y;
    }
    set _ColorG(value) {
        this._albedoColor.y = value;
        this.albedoColor = this._albedoColor;
    }
    /**
     * @internal
     */
    get _ColorB() {
        return this._albedoColor.z;
    }
    set _ColorB(value) {
        this._albedoColor.z = value;
        this.albedoColor = this._albedoColor;
    }
    /**
     * @internal
     */
    get _ColorA() {
        return this._albedoColor.w;
    }
    set _ColorA(value) {
        this._albedoColor.w = value;
        this.albedoColor = this._albedoColor;
    }
    /**
     * @internal
     */
    get _SpecColorR() {
        return this._shaderValues.getVector(BlinnPhongMaterial.MATERIALSPECULAR).x;
    }
    set _SpecColorR(value) {
        this._shaderValues.getVector(BlinnPhongMaterial.MATERIALSPECULAR).x = value;
    }
    /**
     * @internal
     */
    get _SpecColorG() {
        return this._shaderValues.getVector(BlinnPhongMaterial.MATERIALSPECULAR).y;
    }
    set _SpecColorG(value) {
        this._shaderValues.getVector(BlinnPhongMaterial.MATERIALSPECULAR).y = value;
    }
    /**
     * @internal
     */
    get _SpecColorB() {
        return this._shaderValues.getVector(BlinnPhongMaterial.MATERIALSPECULAR).z;
    }
    set _SpecColorB(value) {
        this._shaderValues.getVector(BlinnPhongMaterial.MATERIALSPECULAR).z = value;
    }
    /**
     * @internal
     */
    get _SpecColorA() {
        return this._shaderValues.getVector(BlinnPhongMaterial.MATERIALSPECULAR).w;
    }
    set _SpecColorA(value) {
        this._shaderValues.getVector(BlinnPhongMaterial.MATERIALSPECULAR).w = value;
    }
    /**
     * @internal
     */
    get _AlbedoIntensity() {
        return this._albedoIntensity;
    }
    set _AlbedoIntensity(value) {
        if (this._albedoIntensity !== value) {
            var finalAlbedo = this._shaderValues.getVector(BlinnPhongMaterial.ALBEDOCOLOR);
            Vector4.scale(this._albedoColor, value, finalAlbedo);
            this._albedoIntensity = value;
            this._shaderValues.setVector(BlinnPhongMaterial.ALBEDOCOLOR, finalAlbedo); //修改值后必须调用此接口,否则NATIVE不生效
        }
    }
    /**
     * @internal
     */
    get _Shininess() {
        return this._shaderValues.getNumber(BlinnPhongMaterial.SHININESS);
    }
    set _Shininess(value) {
        value = Math.max(0.0, Math.min(1.0, value));
        this._shaderValues.setNumber(BlinnPhongMaterial.SHININESS, value);
    }
    /**
     * @internal
     */
    get _MainTex_STX() {
        return this._shaderValues.getVector(BlinnPhongMaterial.TILINGOFFSET).x;
    }
    set _MainTex_STX(x) {
        var tilOff = this._shaderValues.getVector(BlinnPhongMaterial.TILINGOFFSET);
        tilOff.x = x;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STY() {
        return this._shaderValues.getVector(BlinnPhongMaterial.TILINGOFFSET).y;
    }
    set _MainTex_STY(y) {
        var tilOff = this._shaderValues.getVector(BlinnPhongMaterial.TILINGOFFSET);
        tilOff.y = y;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STZ() {
        return this._shaderValues.getVector(BlinnPhongMaterial.TILINGOFFSET).z;
    }
    set _MainTex_STZ(z) {
        var tilOff = this._shaderValues.getVector(BlinnPhongMaterial.TILINGOFFSET);
        tilOff.z = z;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STW() {
        return this._shaderValues.getVector(BlinnPhongMaterial.TILINGOFFSET).w;
    }
    set _MainTex_STW(w) {
        var tilOff = this._shaderValues.getVector(BlinnPhongMaterial.TILINGOFFSET);
        tilOff.w = w;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _Cutoff() {
        return this.alphaTestValue;
    }
    set _Cutoff(value) {
        this.alphaTestValue = value;
    }
    /**
     * 设置渲染模式。
     */
    set renderMode(value) {
        switch (value) {
            case BlinnPhongMaterial.RENDERMODE_OPAQUE:
                this.alphaTest = false;
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            case BlinnPhongMaterial.RENDERMODE_CUTOUT:
                this.renderQueue = Material.RENDERQUEUE_ALPHATEST;
                this.alphaTest = true;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            case BlinnPhongMaterial.RENDERMODE_TRANSPARENT:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            default:
                throw new Error("Material:renderMode value error.");
        }
    }
    /**
     * 是否支持顶点色。
     */
    get enableVertexColor() {
        return this._enableVertexColor;
    }
    set enableVertexColor(value) {
        this._enableVertexColor = value;
        if (value)
            this._shaderValues.addDefine(BlinnPhongMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR);
        else
            this._shaderValues.removeDefine(BlinnPhongMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR);
    }
    /**
     * 纹理平铺和偏移X分量。
     */
    get tilingOffsetX() {
        return this._MainTex_STX;
    }
    set tilingOffsetX(x) {
        this._MainTex_STX = x;
    }
    /**
     * 纹理平铺和偏移Y分量。
     */
    get tilingOffsetY() {
        return this._MainTex_STY;
    }
    set tilingOffsetY(y) {
        this._MainTex_STY = y;
    }
    /**
     * 纹理平铺和偏移Z分量。
     */
    get tilingOffsetZ() {
        return this._MainTex_STZ;
    }
    set tilingOffsetZ(z) {
        this._MainTex_STZ = z;
    }
    /**
     * 纹理平铺和偏移W分量。
     */
    get tilingOffsetW() {
        return this._MainTex_STW;
    }
    set tilingOffsetW(w) {
        this._MainTex_STW = w;
    }
    /**
     * 纹理平铺和偏移。
     */
    get tilingOffset() {
        return this._shaderValues.getVector(BlinnPhongMaterial.TILINGOFFSET);
    }
    set tilingOffset(value) {
        if (value) {
            if (value.x != 1 || value.y != 1 || value.z != 0 || value.w != 0)
                this._shaderValues.addDefine(BlinnPhongMaterial.SHADERDEFINE_TILINGOFFSET);
            else
                this._shaderValues.removeDefine(BlinnPhongMaterial.SHADERDEFINE_TILINGOFFSET);
        }
        else {
            this._shaderValues.removeDefine(BlinnPhongMaterial.SHADERDEFINE_TILINGOFFSET);
        }
        this._shaderValues.setVector(BlinnPhongMaterial.TILINGOFFSET, value);
    }
    /**
     * 反照率颜色R分量。
     */
    get albedoColorR() {
        return this._ColorR;
    }
    set albedoColorR(value) {
        this._ColorR = value;
    }
    /**
     * 反照率颜色G分量。
     */
    get albedoColorG() {
        return this._ColorG;
    }
    set albedoColorG(value) {
        this._ColorG = value;
    }
    /**
     * 反照率颜色B分量。
     */
    get albedoColorB() {
        return this._ColorB;
    }
    set albedoColorB(value) {
        this._ColorB = value;
    }
    /**
     * 反照率颜色Z分量。
     */
    get albedoColorA() {
        return this._ColorA;
    }
    set albedoColorA(value) {
        this._ColorA = value;
    }
    /**
     * 反照率颜色。
     */
    get albedoColor() {
        return this._albedoColor;
    }
    set albedoColor(value) {
        var finalAlbedo = this._shaderValues.getVector(BlinnPhongMaterial.ALBEDOCOLOR);
        Vector4.scale(value, this._albedoIntensity, finalAlbedo);
        this._albedoColor = value;
        this._shaderValues.setVector(BlinnPhongMaterial.ALBEDOCOLOR, finalAlbedo); //修改值后必须调用此接口,否则NATIVE不生效
    }
    /**
     * 反照率强度。
     */
    get albedoIntensity() {
        return this._albedoIntensity;
    }
    set albedoIntensity(value) {
        this._AlbedoIntensity = value;
    }
    /**
     * 高光颜色R轴分量。
     */
    get specularColorR() {
        return this._SpecColorR;
    }
    set specularColorR(value) {
        this._SpecColorR = value;
    }
    /**
     * 高光颜色G分量。
     */
    get specularColorG() {
        return this._SpecColorG;
    }
    set specularColorG(value) {
        this._SpecColorG = value;
    }
    /**
     * 高光颜色B分量。
     */
    get specularColorB() {
        return this._SpecColorB;
    }
    set specularColorB(value) {
        this._SpecColorB = value;
    }
    /**
     * 高光颜色A分量。
     */
    get specularColorA() {
        return this._SpecColorA;
    }
    set specularColorA(value) {
        this._SpecColorA = value;
    }
    /**
     * 高光颜色。
     */
    get specularColor() {
        return this._shaderValues.getVector(BlinnPhongMaterial.MATERIALSPECULAR);
    }
    set specularColor(value) {
        this._shaderValues.setVector(BlinnPhongMaterial.MATERIALSPECULAR, value);
    }
    /**
     * 高光强度,范围为0到1。
     */
    get shininess() {
        return this._Shininess;
    }
    set shininess(value) {
        this._Shininess = value;
    }
    /**
     * 反照率贴图。
     */
    get albedoTexture() {
        return this._shaderValues.getTexture(BlinnPhongMaterial.ALBEDOTEXTURE);
    }
    set albedoTexture(value) {
        if (value)
            this._shaderValues.addDefine(BlinnPhongMaterial.SHADERDEFINE_DIFFUSEMAP);
        else
            this._shaderValues.removeDefine(BlinnPhongMaterial.SHADERDEFINE_DIFFUSEMAP);
        this._shaderValues.setTexture(BlinnPhongMaterial.ALBEDOTEXTURE, value);
    }
    /**
     * 法线贴图。
     */
    get normalTexture() {
        return this._shaderValues.getTexture(BlinnPhongMaterial.NORMALTEXTURE);
    }
    set normalTexture(value) {
        if (value)
            this._shaderValues.addDefine(BlinnPhongMaterial.SHADERDEFINE_NORMALMAP);
        else
            this._shaderValues.removeDefine(BlinnPhongMaterial.SHADERDEFINE_NORMALMAP);
        this._shaderValues.setTexture(BlinnPhongMaterial.NORMALTEXTURE, value);
    }
    /**
     * 高光贴图。
     */
    get specularTexture() {
        return this._shaderValues.getTexture(BlinnPhongMaterial.SPECULARTEXTURE);
    }
    set specularTexture(value) {
        if (value)
            this._shaderValues.addDefine(BlinnPhongMaterial.SHADERDEFINE_SPECULARMAP);
        else
            this._shaderValues.removeDefine(BlinnPhongMaterial.SHADERDEFINE_SPECULARMAP);
        this._shaderValues.setTexture(BlinnPhongMaterial.SPECULARTEXTURE, value);
    }
    /**
     * 是否启用光照。
     */
    get enableLighting() {
        return this._enableLighting;
    }
    set enableLighting(value) {
        if (this._enableLighting !== value) {
            if (value) {
                this._disablePublicDefineDatas.remove(Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT);
                this._disablePublicDefineDatas.remove(Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT);
                this._disablePublicDefineDatas.remove(Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT);
            }
            else {
                this._disablePublicDefineDatas.add(Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT);
                this._disablePublicDefineDatas.add(Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT);
                this._disablePublicDefineDatas.add(Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT);
            }
            this._enableLighting = value;
        }
    }
    /**
     * 是否写入深度。
     */
    get depthWrite() {
        return this._shaderValues.getBool(BlinnPhongMaterial.DEPTH_WRITE);
    }
    set depthWrite(value) {
        this._shaderValues.setBool(BlinnPhongMaterial.DEPTH_WRITE, value);
    }
    /**
     * 剔除方式。
     */
    get cull() {
        return this._shaderValues.getInt(BlinnPhongMaterial.CULL);
    }
    set cull(value) {
        this._shaderValues.setInt(BlinnPhongMaterial.CULL, value);
    }
    /**
     * 混合方式。
     */
    get blend() {
        return this._shaderValues.getInt(BlinnPhongMaterial.BLEND);
    }
    set blend(value) {
        this._shaderValues.setInt(BlinnPhongMaterial.BLEND, value);
    }
    /**
     * 混合源。
     */
    get blendSrc() {
        return this._shaderValues.getInt(BlinnPhongMaterial.BLEND_SRC);
    }
    set blendSrc(value) {
        this._shaderValues.setInt(BlinnPhongMaterial.BLEND_SRC, value);
    }
    /**
     * 混合目标。
     */
    get blendDst() {
        return this._shaderValues.getInt(BlinnPhongMaterial.BLEND_DST);
    }
    set blendDst(value) {
        this._shaderValues.setInt(BlinnPhongMaterial.BLEND_DST, value);
    }
    /**
     * 深度测试方式。
     */
    get depthTest() {
        return this._shaderValues.getInt(BlinnPhongMaterial.DEPTH_TEST);
    }
    set depthTest(value) {
        this._shaderValues.setInt(BlinnPhongMaterial.DEPTH_TEST, value);
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone() {
        var dest = new BlinnPhongMaterial();
        this.cloneTo(dest);
        return dest;
    }
    /**
     * @inheritDoc
     * @override
     */
    cloneTo(destObject) {
        super.cloneTo(destObject);
        var destMaterial = destObject;
        destMaterial._enableLighting = this._enableLighting;
        destMaterial._albedoIntensity = this._albedoIntensity;
        destMaterial._enableVertexColor = this._enableVertexColor;
        this._albedoColor.cloneTo(destMaterial._albedoColor);
    }
}
/**渲染状态_不透明。*/
BlinnPhongMaterial.RENDERMODE_OPAQUE = 0;
/**渲染状态_阿尔法测试。*/
BlinnPhongMaterial.RENDERMODE_CUTOUT = 1;
/**渲染状态_透明混合。*/
BlinnPhongMaterial.RENDERMODE_TRANSPARENT = 2;
BlinnPhongMaterial.ALBEDOTEXTURE = Shader3D.propertyNameToID("u_DiffuseTexture");
BlinnPhongMaterial.NORMALTEXTURE = Shader3D.propertyNameToID("u_NormalTexture");
BlinnPhongMaterial.SPECULARTEXTURE = Shader3D.propertyNameToID("u_SpecularTexture");
BlinnPhongMaterial.ALBEDOCOLOR = Shader3D.propertyNameToID("u_DiffuseColor");
BlinnPhongMaterial.MATERIALSPECULAR = Shader3D.propertyNameToID("u_MaterialSpecular");
BlinnPhongMaterial.SHININESS = Shader3D.propertyNameToID("u_Shininess");
BlinnPhongMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
BlinnPhongMaterial.CULL = Shader3D.propertyNameToID("s_Cull");
BlinnPhongMaterial.BLEND = Shader3D.propertyNameToID("s_Blend");
BlinnPhongMaterial.BLEND_SRC = Shader3D.propertyNameToID("s_BlendSrc");
BlinnPhongMaterial.BLEND_DST = Shader3D.propertyNameToID("s_BlendDst");
BlinnPhongMaterial.DEPTH_TEST = Shader3D.propertyNameToID("s_DepthTest");
BlinnPhongMaterial.DEPTH_WRITE = Shader3D.propertyNameToID("s_DepthWrite");
