import { Vector4 } from "../../math/Vector4";
import { Shader3D } from "../../shader/Shader3D";
import { Scene3DShaderDeclaration } from "../scene/Scene3DShaderDeclaration";
import { Material } from "./Material";
import { RenderState } from "./RenderState";
/**
 * <code>PBRSpecularMaterial</code> 类用于实现PBR(Specular)材质。
 */
export class PBRSpecularMaterial extends Material {
    /**
     * 创建一个 <code>PBRSpecularMaterial</code> 实例。
     */
    constructor() {
        super();
        this.setShaderName("PBRSpecular");
        this._albedoColor = new Vector4(1.0, 1.0, 1.0, 1.0);
        this._shaderValues.setVector(PBRSpecularMaterial.ALBEDOCOLOR, new Vector4(1.0, 1.0, 1.0, 1.0));
        this._emissionColor = new Vector4(0.0, 0.0, 0.0, 0.0);
        this._shaderValues.setVector(PBRSpecularMaterial.EMISSIONCOLOR, new Vector4(0.0, 0.0, 0.0, 0.0));
        this._specularColor = new Vector4(0.2, 0.2, 0.2, 0.2);
        this._shaderValues.setVector(PBRSpecularMaterial.SPECULARCOLOR, new Vector4(0.2, 0.2, 0.2, 0.2));
        this._shaderValues.setNumber(PBRSpecularMaterial.SMOOTHNESS, 0.5);
        this._shaderValues.setNumber(PBRSpecularMaterial.SMOOTHNESSSCALE, 1.0);
        this._shaderValues.setNumber(PBRSpecularMaterial.SMOOTHNESSSOURCE, 0);
        this._shaderValues.setNumber(PBRSpecularMaterial.OCCLUSIONSTRENGTH, 1.0);
        this._shaderValues.setNumber(PBRSpecularMaterial.NORMALSCALE, 1.0);
        this._shaderValues.setNumber(PBRSpecularMaterial.PARALLAXSCALE, 0.001);
        this._shaderValues.setBool(PBRSpecularMaterial.ENABLEEMISSION, false);
        this._shaderValues.setNumber(Material.ALPHATESTVALUE, 0.5);
        this.renderMode = PBRSpecularMaterial.RENDERMODE_OPAQUE;
    }
    /**
     * @internal
     */
    static __initDefine__() {
        PBRSpecularMaterial.SHADERDEFINE_ALBEDOTEXTURE = Shader3D.getDefineByName("ALBEDOTEXTURE");
        PBRSpecularMaterial.SHADERDEFINE_SPECULARTEXTURE = Shader3D.getDefineByName("SPECULARTEXTURE");
        PBRSpecularMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA = Shader3D.getDefineByName("SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA");
        PBRSpecularMaterial.SHADERDEFINE_NORMALTEXTURE = Shader3D.getDefineByName("NORMALTEXTURE");
        PBRSpecularMaterial.SHADERDEFINE_PARALLAXTEXTURE = Shader3D.getDefineByName("PARALLAXTEXTURE");
        PBRSpecularMaterial.SHADERDEFINE_OCCLUSIONTEXTURE = Shader3D.getDefineByName("OCCLUSIONTEXTURE");
        PBRSpecularMaterial.SHADERDEFINE_EMISSION = Shader3D.getDefineByName("EMISSION");
        PBRSpecularMaterial.SHADERDEFINE_EMISSIONTEXTURE = Shader3D.getDefineByName("EMISSIONTEXTURE");
        PBRSpecularMaterial.SHADERDEFINE_TILINGOFFSET = Shader3D.getDefineByName("TILINGOFFSET");
        PBRSpecularMaterial.SHADERDEFINE_ALPHAPREMULTIPLY = Shader3D.getDefineByName("ALPHAPREMULTIPLY");
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
        return this._specularColor.x;
    }
    set _SpecColorR(value) {
        this._specularColor.x = value;
        this.specularColor = this._specularColor;
    }
    /**
     * @internal
     */
    get _SpecColorG() {
        return this._specularColor.y;
    }
    set _SpecColorG(value) {
        this._specularColor.y = value;
        this.specularColor = this._specularColor;
    }
    /**
     * @internal
     */
    get _SpecColorB() {
        return this._specularColor.z;
    }
    set _SpecColorB(value) {
        this._specularColor.z = value;
        this.specularColor = this._specularColor;
    }
    /**
     * @internal
     */
    get _SpecColorA() {
        return this._specularColor.w;
    }
    set _SpecColorA(value) {
        this._specularColor.w = value;
        this.specularColor = this._specularColor;
    }
    /**
     * @internal
     */
    get _Glossiness() {
        return this._shaderValues.getNumber(PBRSpecularMaterial.SMOOTHNESS);
    }
    set _Glossiness(value) {
        this._shaderValues.setNumber(PBRSpecularMaterial.SMOOTHNESS, value);
    }
    /**
     * @internal
     */
    get _GlossMapScale() {
        return this._shaderValues.getNumber(PBRSpecularMaterial.SMOOTHNESSSCALE);
    }
    set _GlossMapScale(value) {
        this._shaderValues.setNumber(PBRSpecularMaterial.SMOOTHNESSSCALE, value);
    }
    /**
     * @internal
     */
    get _BumpScale() {
        return this._shaderValues.getNumber(PBRSpecularMaterial.NORMALSCALE);
    }
    set _BumpScale(value) {
        this._shaderValues.setNumber(PBRSpecularMaterial.NORMALSCALE, value);
    }
    /**
     * @internal
     */
    get _Parallax() {
        return this._shaderValues.getNumber(PBRSpecularMaterial.PARALLAXSCALE);
    }
    set _Parallax(value) {
        this._shaderValues.setNumber(PBRSpecularMaterial.PARALLAXSCALE, value);
    }
    /**@internal */
    get _OcclusionStrength() {
        return this._shaderValues.getNumber(PBRSpecularMaterial.OCCLUSIONSTRENGTH);
    }
    set _OcclusionStrength(value) {
        this._shaderValues.setNumber(PBRSpecularMaterial.OCCLUSIONSTRENGTH, value);
    }
    /**
     * @internal
     */
    get _EmissionColorR() {
        return this._emissionColor.x;
    }
    set _EmissionColorR(value) {
        this._emissionColor.x = value;
        this.emissionColor = this._emissionColor;
    }
    /**
     * @internal
     */
    get _EmissionColorG() {
        return this._emissionColor.y;
    }
    set _EmissionColorG(value) {
        this._emissionColor.y = value;
        this.emissionColor = this._emissionColor;
    }
    /**
     * @internal
     */
    get _EmissionColorB() {
        return this._emissionColor.z;
    }
    set _EmissionColorB(value) {
        this._emissionColor.z = value;
        this.emissionColor = this._emissionColor;
    }
    /**
     * @internal
     */
    get _EmissionColorA() {
        return this._emissionColor.w;
    }
    set _EmissionColorA(value) {
        this._emissionColor.w = value;
        this.emissionColor = this._emissionColor;
    }
    /**
     * @internal
     */
    get _MainTex_STX() {
        return this._shaderValues.getVector(PBRSpecularMaterial.TILINGOFFSET).x;
    }
    set _MainTex_STX(x) {
        var tilOff = this._shaderValues.getVector(PBRSpecularMaterial.TILINGOFFSET);
        tilOff.x = x;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STY() {
        return this._shaderValues.getVector(PBRSpecularMaterial.TILINGOFFSET).y;
    }
    set _MainTex_STY(y) {
        var tilOff = this._shaderValues.getVector(PBRSpecularMaterial.TILINGOFFSET);
        tilOff.y = y;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STZ() {
        return this._shaderValues.getVector(PBRSpecularMaterial.TILINGOFFSET).z;
    }
    set _MainTex_STZ(z) {
        var tilOff = this._shaderValues.getVector(PBRSpecularMaterial.TILINGOFFSET);
        tilOff.z = z;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STW() {
        return this._shaderValues.getVector(PBRSpecularMaterial.TILINGOFFSET).w;
    }
    set _MainTex_STW(w) {
        var tilOff = this._shaderValues.getVector(PBRSpecularMaterial.TILINGOFFSET);
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
     * 反射率颜色R分量。
     */
    get albedoColorR() {
        return this._ColorR;
    }
    set albedoColorR(value) {
        this._ColorR = value;
    }
    /**
     * 反射率颜色G分量。
     */
    get albedoColorG() {
        return this._ColorG;
    }
    set albedoColorG(value) {
        this._ColorG = value;
    }
    /**
     * 反射率颜色B分量。
     */
    get albedoColorB() {
        return this._ColorB;
    }
    set albedoColorB(value) {
        this._ColorB = value;
    }
    /**
     * 反射率颜色A分量。
     */
    get albedoColorA() {
        return this._ColorA;
    }
    set albedoColorA(value) {
        this._ColorA = value;
    }
    /**
     * 反射率颜色。
     */
    get albedoColor() {
        return this._albedoColor;
    }
    set albedoColor(value) {
        this._albedoColor = value;
        this._shaderValues.setVector(PBRSpecularMaterial.ALBEDOCOLOR, value);
    }
    /**
     * 漫反射贴图。
     */
    get albedoTexture() {
        return this._shaderValues.getTexture(PBRSpecularMaterial.ALBEDOTEXTURE);
    }
    set albedoTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRSpecularMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        }
        this._shaderValues.setTexture(PBRSpecularMaterial.ALBEDOTEXTURE, value);
    }
    /**
     * 法线贴图。
     */
    get normalTexture() {
        return this._shaderValues.getTexture(PBRSpecularMaterial.NORMALTEXTURE);
    }
    set normalTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRSpecularMaterial.SHADERDEFINE_NORMALTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_NORMALTEXTURE);
        }
        this._shaderValues.setTexture(PBRSpecularMaterial.NORMALTEXTURE, value);
    }
    /**
     * 法线贴图缩放系数。
     */
    get normalTextureScale() {
        return this._BumpScale;
    }
    set normalTextureScale(value) {
        this._BumpScale = value;
    }
    /**
     * 视差贴图。
     */
    get parallaxTexture() {
        return this._shaderValues.getTexture(PBRSpecularMaterial.PARALLAXTEXTURE);
    }
    set parallaxTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRSpecularMaterial.SHADERDEFINE_PARALLAXTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_PARALLAXTEXTURE);
        }
        this._shaderValues.setTexture(PBRSpecularMaterial.PARALLAXTEXTURE, value);
    }
    /**
     * 视差贴图缩放系数。
     */
    get parallaxTextureScale() {
        return this._Parallax;
    }
    set parallaxTextureScale(value) {
        this._Parallax = Math.max(0.005, Math.min(0.08, value));
    }
    /**
     * 遮挡贴图。
     */
    get occlusionTexture() {
        return this._shaderValues.getTexture(PBRSpecularMaterial.OCCLUSIONTEXTURE);
    }
    set occlusionTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRSpecularMaterial.SHADERDEFINE_OCCLUSIONTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_OCCLUSIONTEXTURE);
        }
        this._shaderValues.setTexture(PBRSpecularMaterial.OCCLUSIONTEXTURE, value);
    }
    /**
     * 遮挡贴图强度,范围为0到1。
     */
    get occlusionTextureStrength() {
        return this._OcclusionStrength;
    }
    set occlusionTextureStrength(value) {
        this._OcclusionStrength = Math.max(0.0, Math.min(1.0, value));
    }
    /**
     * 高光贴图。
     */
    get specularTexture() {
        return this._shaderValues.getTexture(PBRSpecularMaterial.SPECULARTEXTURE);
    }
    set specularTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRSpecularMaterial.SHADERDEFINE_SPECULARTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_SPECULARTEXTURE);
        }
        this._shaderValues.setTexture(PBRSpecularMaterial.SPECULARTEXTURE, value);
    }
    /**
     * 高光颜色R分量。
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
    /**
     * 高光颜色B分量。
     */
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
        return this._shaderValues.getVector(PBRSpecularMaterial.SPECULARCOLOR);
    }
    set specularColor(value) {
        this._shaderValues.setVector(PBRSpecularMaterial.SPECULARCOLOR, value);
    }
    /**
     * 光滑度,范围为0到1。
     */
    get smoothness() {
        return this._Glossiness;
    }
    set smoothness(value) {
        this._Glossiness = Math.max(0.0, Math.min(1.0, value));
    }
    /**
     * 光滑度缩放系数,范围为0到1。
     */
    get smoothnessTextureScale() {
        return this._GlossMapScale;
    }
    set smoothnessTextureScale(value) {
        this._GlossMapScale = Math.max(0.0, Math.min(1.0, value));
    }
    /**
     * 光滑度数据源,0或1
     */
    get smoothnessSource() {
        return this._shaderValues.getInt(PBRSpecularMaterial.SMOOTHNESSSOURCE);
    }
    set smoothnessSource(value) {
        if (value) {
            this._shaderValues.addDefine(PBRSpecularMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA);
            this._shaderValues.setInt(PBRSpecularMaterial.SMOOTHNESSSOURCE, 1);
        }
        else {
            this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA);
            this._shaderValues.setInt(PBRSpecularMaterial.SMOOTHNESSSOURCE, 0);
        }
    }
    /**
     * 是否激活放射属性。
     */
    get enableEmission() {
        return this._shaderValues.getBool(PBRSpecularMaterial.ENABLEEMISSION);
    }
    set enableEmission(value) {
        if (value)
            this._shaderValues.addDefine(PBRSpecularMaterial.SHADERDEFINE_EMISSION);
        else {
            this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_EMISSION);
        }
        this._shaderValues.setBool(PBRSpecularMaterial.ENABLEEMISSION, value);
    }
    /**
     * 放射颜色。
     */
    get emissionColor() {
        return this._shaderValues.getVector(PBRSpecularMaterial.EMISSIONCOLOR);
    }
    set emissionColor(value) {
        this._shaderValues.setVector(PBRSpecularMaterial.EMISSIONCOLOR, value);
    }
    /**
     * 获取放射贴图。
     */
    get emissionTexture() {
        return this._shaderValues.getTexture(PBRSpecularMaterial.EMISSIONTEXTURE);
    }
    set emissionTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRSpecularMaterial.SHADERDEFINE_EMISSIONTEXTURE);
        else
            this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_EMISSIONTEXTURE);
        this._shaderValues.setTexture(PBRSpecularMaterial.EMISSIONTEXTURE, value);
    }
    /**
     * 是否开启反射。
     */
    get enableReflection() {
        return this._shaderValues.getBool(PBRSpecularMaterial.ENABLEREFLECT);
    }
    set enableReflection(value) {
        this._shaderValues.setBool(PBRSpecularMaterial.ENABLEREFLECT, true);
        if (value)
            this._disablePublicDefineDatas.remove(Scene3DShaderDeclaration.SHADERDEFINE_REFLECTMAP);
        else
            this._disablePublicDefineDatas.add(Scene3DShaderDeclaration.SHADERDEFINE_REFLECTMAP);
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
        return this._shaderValues.getVector(PBRSpecularMaterial.TILINGOFFSET);
    }
    set tilingOffset(value) {
        if (value) {
            if (value.x != 1 || value.y != 1 || value.z != 0 || value.w != 0)
                this._shaderValues.addDefine(PBRSpecularMaterial.SHADERDEFINE_TILINGOFFSET);
            else
                this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_TILINGOFFSET);
        }
        else {
            this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_TILINGOFFSET);
        }
        this._shaderValues.setVector(PBRSpecularMaterial.TILINGOFFSET, value);
    }
    /**
     * 设置渲染模式。
     */
    set renderMode(value) {
        switch (value) {
            case PBRSpecularMaterial.RENDERMODE_OPAQUE:
                this.alphaTest = false;
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_ALPHAPREMULTIPLY);
                break;
            case PBRSpecularMaterial.RENDERMODE_CUTOUT:
                this.renderQueue = Material.RENDERQUEUE_ALPHATEST;
                this.alphaTest = true;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_ALPHAPREMULTIPLY);
                break;
            case PBRSpecularMaterial.RENDERMODE_FADE:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRSpecularMaterial.SHADERDEFINE_ALPHAPREMULTIPLY);
                break;
            case PBRSpecularMaterial.RENDERMODE_TRANSPARENT:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_ONE;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.addDefine(PBRSpecularMaterial.SHADERDEFINE_ALPHAPREMULTIPLY);
                break;
            default:
                throw new Error("PBRSpecularMaterial : renderMode value error.");
        }
    }
    /**
     * 是否写入深度。
     */
    get depthWrite() {
        return this._shaderValues.getBool(PBRSpecularMaterial.DEPTH_WRITE);
    }
    set depthWrite(value) {
        this._shaderValues.setBool(PBRSpecularMaterial.DEPTH_WRITE, value);
    }
    /**
     * 剔除方式。
     */
    get cull() {
        return this._shaderValues.getInt(PBRSpecularMaterial.CULL);
    }
    set cull(value) {
        this._shaderValues.setInt(PBRSpecularMaterial.CULL, value);
    }
    /**
     * 混合方式。
     */
    get blend() {
        return this._shaderValues.getInt(PBRSpecularMaterial.BLEND);
    }
    set blend(value) {
        this._shaderValues.setInt(PBRSpecularMaterial.BLEND, value);
    }
    /**
     * 混合源。
     */
    get blendSrc() {
        return this._shaderValues.getInt(PBRSpecularMaterial.BLEND_SRC);
    }
    set blendSrc(value) {
        this._shaderValues.setInt(PBRSpecularMaterial.BLEND_SRC, value);
    }
    /**
     * 混合目标。
     */
    get blendDst() {
        return this._shaderValues.getInt(PBRSpecularMaterial.BLEND_DST);
    }
    set blendDst(value) {
        this._shaderValues.setInt(PBRSpecularMaterial.BLEND_DST, value);
    }
    /**
     * 深度测试方式。
     */
    get depthTest() {
        return this._shaderValues.getInt(PBRSpecularMaterial.DEPTH_TEST);
    }
    set depthTest(value) {
        this._shaderValues.setInt(PBRSpecularMaterial.DEPTH_TEST, value);
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone() {
        var dest = new PBRSpecularMaterial();
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
        this._albedoColor.cloneTo(destMaterial._albedoColor);
        this._specularColor.cloneTo(destMaterial._specularColor);
        this._emissionColor.cloneTo(destMaterial._emissionColor);
    }
}
/**光滑度数据源_高光贴图的Alpha通道。*/
PBRSpecularMaterial.SmoothnessSource_SpecularTexture_Alpha = 0;
/**光滑度数据源_反射率贴图的Alpha通道。*/
PBRSpecularMaterial.SmoothnessSource_AlbedoTexture_Alpha = 1;
/**渲染状态_不透明。*/
PBRSpecularMaterial.RENDERMODE_OPAQUE = 0;
/**渲染状态_透明测试。*/
PBRSpecularMaterial.RENDERMODE_CUTOUT = 1;
/**渲染状态_透明混合_游戏中经常使用的透明。*/
PBRSpecularMaterial.RENDERMODE_FADE = 2;
/**渲染状态_透明混合_物理上看似合理的透明。*/
PBRSpecularMaterial.RENDERMODE_TRANSPARENT = 3;
PBRSpecularMaterial.ALBEDOTEXTURE = Shader3D.propertyNameToID("u_AlbedoTexture");
PBRSpecularMaterial.SPECULARTEXTURE = Shader3D.propertyNameToID("u_SpecularTexture");
PBRSpecularMaterial.NORMALTEXTURE = Shader3D.propertyNameToID("u_NormalTexture");
PBRSpecularMaterial.PARALLAXTEXTURE = Shader3D.propertyNameToID("u_ParallaxTexture");
PBRSpecularMaterial.OCCLUSIONTEXTURE = Shader3D.propertyNameToID("u_OcclusionTexture");
PBRSpecularMaterial.EMISSIONTEXTURE = Shader3D.propertyNameToID("u_EmissionTexture");
PBRSpecularMaterial.ALBEDOCOLOR = Shader3D.propertyNameToID("u_AlbedoColor");
PBRSpecularMaterial.SPECULARCOLOR = Shader3D.propertyNameToID("u_SpecularColor");
PBRSpecularMaterial.EMISSIONCOLOR = Shader3D.propertyNameToID("u_EmissionColor");
PBRSpecularMaterial.SMOOTHNESS = Shader3D.propertyNameToID("u_smoothness");
PBRSpecularMaterial.SMOOTHNESSSCALE = Shader3D.propertyNameToID("u_smoothnessScale");
PBRSpecularMaterial.SMOOTHNESSSOURCE = -1; //TODO:
PBRSpecularMaterial.OCCLUSIONSTRENGTH = Shader3D.propertyNameToID("u_occlusionStrength");
PBRSpecularMaterial.NORMALSCALE = Shader3D.propertyNameToID("u_normalScale");
PBRSpecularMaterial.PARALLAXSCALE = Shader3D.propertyNameToID("u_parallaxScale");
PBRSpecularMaterial.ENABLEEMISSION = -1; //TODO:
PBRSpecularMaterial.ENABLEREFLECT = -1; //TODO:
PBRSpecularMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
PBRSpecularMaterial.CULL = Shader3D.propertyNameToID("s_Cull");
PBRSpecularMaterial.BLEND = Shader3D.propertyNameToID("s_Blend");
PBRSpecularMaterial.BLEND_SRC = Shader3D.propertyNameToID("s_BlendSrc");
PBRSpecularMaterial.BLEND_DST = Shader3D.propertyNameToID("s_BlendDst");
PBRSpecularMaterial.DEPTH_TEST = Shader3D.propertyNameToID("s_DepthTest");
PBRSpecularMaterial.DEPTH_WRITE = Shader3D.propertyNameToID("s_DepthWrite");
