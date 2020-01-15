import { Vector4 } from "../../math/Vector4";
import { Shader3D } from "../../shader/Shader3D";
import { Scene3DShaderDeclaration } from "../scene/Scene3DShaderDeclaration";
import { Material } from "./Material";
import { RenderState } from "./RenderState";
/**
 * <code>PBRStandardMaterial</code> 类用于实现PBR(Standard)材质。
 */
export class PBRStandardMaterial extends Material {
    /**
     * 创建一个 <code>PBRStandardMaterial</code> 实例。
     */
    constructor() {
        super();
        this.setShaderName("PBRStandard");
        this._albedoColor = new Vector4(1.0, 1.0, 1.0, 1.0);
        this._shaderValues.setVector(PBRStandardMaterial.ALBEDOCOLOR, new Vector4(1.0, 1.0, 1.0, 1.0));
        this._emissionColor = new Vector4(0.0, 0.0, 0.0, 0.0);
        this._shaderValues.setVector(PBRStandardMaterial.EMISSIONCOLOR, new Vector4(0.0, 0.0, 0.0, 0.0));
        this._shaderValues.setNumber(PBRStandardMaterial.METALLIC, 0.0);
        this._shaderValues.setNumber(PBRStandardMaterial.SMOOTHNESS, 0.5);
        this._shaderValues.setNumber(PBRStandardMaterial.SMOOTHNESSSCALE, 1.0);
        this._shaderValues.setNumber(PBRStandardMaterial.SMOOTHNESSSOURCE, 0);
        this._shaderValues.setNumber(PBRStandardMaterial.OCCLUSIONSTRENGTH, 1.0);
        this._shaderValues.setNumber(PBRStandardMaterial.NORMALSCALE, 1.0);
        this._shaderValues.setNumber(PBRStandardMaterial.PARALLAXSCALE, 0.001);
        this._shaderValues.setBool(PBRStandardMaterial.ENABLEEMISSION, false);
        this._shaderValues.setBool(PBRStandardMaterial.ENABLEREFLECT, true);
        this._shaderValues.setNumber(Material.ALPHATESTVALUE, 0.5);
        this._disablePublicDefineDatas.remove(Scene3DShaderDeclaration.SHADERDEFINE_REFLECTMAP);
        this.renderMode = PBRStandardMaterial.RENDERMODE_OPAQUE;
    }
    /**
     * @internal
     */
    static __initDefine__() {
        PBRStandardMaterial.SHADERDEFINE_ALBEDOTEXTURE = Shader3D.getDefineByName("ALBEDOTEXTURE");
        PBRStandardMaterial.SHADERDEFINE_METALLICGLOSSTEXTURE = Shader3D.getDefineByName("METALLICGLOSSTEXTURE");
        PBRStandardMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA = Shader3D.getDefineByName("SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA");
        PBRStandardMaterial.SHADERDEFINE_NORMALTEXTURE = Shader3D.getDefineByName("NORMALTEXTURE");
        PBRStandardMaterial.SHADERDEFINE_PARALLAXTEXTURE = Shader3D.getDefineByName("PARALLAXTEXTURE");
        PBRStandardMaterial.SHADERDEFINE_OCCLUSIONTEXTURE = Shader3D.getDefineByName("OCCLUSIONTEXTURE");
        PBRStandardMaterial.SHADERDEFINE_EMISSION = Shader3D.getDefineByName("EMISSION");
        PBRStandardMaterial.SHADERDEFINE_EMISSIONTEXTURE = Shader3D.getDefineByName("EMISSIONTEXTURE");
        PBRStandardMaterial.SHADERDEFINE_REFLECTMAP = Shader3D.getDefineByName("REFLECTMAP");
        PBRStandardMaterial.SHADERDEFINE_TILINGOFFSET = Shader3D.getDefineByName("TILINGOFFSET");
        PBRStandardMaterial.SHADERDEFINE_ALPHAPREMULTIPLY = Shader3D.getDefineByName("ALPHAPREMULTIPLY");
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
    get _Metallic() {
        return this._shaderValues.getNumber(PBRStandardMaterial.METALLIC);
    }
    set _Metallic(value) {
        this._shaderValues.setNumber(PBRStandardMaterial.METALLIC, value);
    }
    /**
     * @internal
     */
    get _Glossiness() {
        return this._shaderValues.getNumber(PBRStandardMaterial.SMOOTHNESS);
    }
    set _Glossiness(value) {
        this._shaderValues.setNumber(PBRStandardMaterial.SMOOTHNESS, value);
    }
    /**
     * @internal
     */
    get _GlossMapScale() {
        return this._shaderValues.getNumber(PBRStandardMaterial.SMOOTHNESSSCALE);
    }
    set _GlossMapScale(value) {
        this._shaderValues.setNumber(PBRStandardMaterial.SMOOTHNESSSCALE, value);
    }
    /**
     * @internal
     */
    get _BumpScale() {
        return this._shaderValues.getNumber(PBRStandardMaterial.NORMALSCALE);
    }
    set _BumpScale(value) {
        this._shaderValues.setNumber(PBRStandardMaterial.NORMALSCALE, value);
    }
    /**
     * @internal
     */
    get _Parallax() {
        return this._shaderValues.getNumber(PBRStandardMaterial.PARALLAXSCALE);
    }
    set _Parallax(value) {
        this._shaderValues.setNumber(PBRStandardMaterial.PARALLAXSCALE, value);
    }
    /**
     * @internal
     */
    get _OcclusionStrength() {
        return this._shaderValues.getNumber(PBRStandardMaterial.OCCLUSIONSTRENGTH);
    }
    set _OcclusionStrength(value) {
        this._shaderValues.setNumber(PBRStandardMaterial.OCCLUSIONSTRENGTH, value);
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
        return this._shaderValues.getVector(PBRStandardMaterial.TILINGOFFSET).x;
    }
    set _MainTex_STX(x) {
        var tilOff = this._shaderValues.getVector(PBRStandardMaterial.TILINGOFFSET);
        tilOff.x = x;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STY() {
        return this._shaderValues.getVector(PBRStandardMaterial.TILINGOFFSET).y;
    }
    set _MainTex_STY(y) {
        var tilOff = this._shaderValues.getVector(PBRStandardMaterial.TILINGOFFSET);
        tilOff.y = y;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STZ() {
        return this._shaderValues.getVector(PBRStandardMaterial.TILINGOFFSET).z;
    }
    set _MainTex_STZ(z) {
        var tilOff = this._shaderValues.getVector(PBRStandardMaterial.TILINGOFFSET);
        tilOff.z = z;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STW() {
        return this._shaderValues.getVector(PBRStandardMaterial.TILINGOFFSET).w;
    }
    set _MainTex_STW(w) {
        var tilOff = this._shaderValues.getVector(PBRStandardMaterial.TILINGOFFSET);
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
     * 反射率颜色Z分量。
     */
    get albedoColorA() {
        return this._ColorA;
    }
    set albedoColorA(value) {
        this._ColorA = value;
    }
    /**
     * 漫反射颜色。
     */
    get albedoColor() {
        return this._albedoColor;
    }
    set albedoColor(value) {
        this._albedoColor = value;
        this._shaderValues.setVector(PBRStandardMaterial.ALBEDOCOLOR, value);
    }
    /**
     * 漫反射贴图。
     */
    get albedoTexture() {
        return this._shaderValues.getTexture(PBRStandardMaterial.ALBEDOTEXTURE);
    }
    set albedoTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        }
        this._shaderValues.setTexture(PBRStandardMaterial.ALBEDOTEXTURE, value);
    }
    /**
     * 法线贴图。
     */
    get normalTexture() {
        return this._shaderValues.getTexture(PBRStandardMaterial.NORMALTEXTURE);
    }
    set normalTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_NORMALTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_NORMALTEXTURE);
        }
        this._shaderValues.setTexture(PBRStandardMaterial.NORMALTEXTURE, value);
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
        return this._shaderValues.getTexture(PBRStandardMaterial.PARALLAXTEXTURE);
    }
    set parallaxTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_PARALLAXTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_PARALLAXTEXTURE);
        }
        this._shaderValues.setTexture(PBRStandardMaterial.PARALLAXTEXTURE, value);
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
        return this._shaderValues.getTexture(PBRStandardMaterial.OCCLUSIONTEXTURE);
    }
    set occlusionTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_OCCLUSIONTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_OCCLUSIONTEXTURE);
        }
        this._shaderValues.setTexture(PBRStandardMaterial.OCCLUSIONTEXTURE, value);
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
     * 金属光滑度贴图。
     */
    get metallicGlossTexture() {
        return this._shaderValues.getTexture(PBRStandardMaterial.METALLICGLOSSTEXTURE);
    }
    set metallicGlossTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_METALLICGLOSSTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_METALLICGLOSSTEXTURE);
        }
        this._shaderValues.setTexture(PBRStandardMaterial.METALLICGLOSSTEXTURE, value);
    }
    /**
     * 获取金属度,范围为0到1。
     */
    get metallic() {
        return this._Metallic;
    }
    set metallic(value) {
        this._Metallic = Math.max(0.0, Math.min(1.0, value));
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
     * 光滑度数据源,0或1。
     */
    get smoothnessSource() {
        return this._shaderValues.getInt(PBRStandardMaterial.SMOOTHNESSSOURCE);
    }
    set smoothnessSource(value) {
        if (value) {
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA);
            this._shaderValues.setInt(PBRStandardMaterial.SMOOTHNESSSOURCE, 1);
        }
        else {
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA);
            this._shaderValues.setInt(PBRStandardMaterial.SMOOTHNESSSOURCE, 0);
        }
    }
    /**
     * 是否激活放射属性。
     */
    get enableEmission() {
        return this._shaderValues.getBool(PBRStandardMaterial.ENABLEEMISSION);
    }
    set enableEmission(value) {
        if (value) {
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_EMISSION);
        }
        else {
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_EMISSION);
        }
        this._shaderValues.setBool(PBRStandardMaterial.ENABLEEMISSION, value);
    }
    /**
     * 放射颜色R分量。
     */
    get emissionColorR() {
        return this._EmissionColorR;
    }
    set emissionColorR(value) {
        this._EmissionColorR = value;
    }
    /**
     * 放射颜色G分量。
     */
    get emissionColorG() {
        return this._EmissionColorG;
    }
    set emissionColorG(value) {
        this._EmissionColorG = value;
    }
    /**
     * 放射颜色B分量。
     */
    get emissionColorB() {
        return this._EmissionColorB;
    }
    set emissionColorB(value) {
        this._EmissionColorB = value;
    }
    /**
     * 放射颜色A分量。
     */
    get emissionColorA() {
        return this._EmissionColorA;
    }
    set emissionColorA(value) {
        this._EmissionColorA = value;
    }
    /**
     * 放射颜色。
     */
    get emissionColor() {
        return this._shaderValues.getVector(PBRStandardMaterial.EMISSIONCOLOR);
    }
    set emissionColor(value) {
        this._shaderValues.setVector(PBRStandardMaterial.EMISSIONCOLOR, value);
    }
    /**
     * 放射贴图。
     */
    get emissionTexture() {
        return this._shaderValues.getTexture(PBRStandardMaterial.EMISSIONTEXTURE);
    }
    set emissionTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_EMISSIONTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_EMISSIONTEXTURE);
        }
        this._shaderValues.setTexture(PBRStandardMaterial.EMISSIONTEXTURE, value);
    }
    /**
     * 是否开启反射。
     */
    get enableReflection() {
        return this._shaderValues.getBool(PBRStandardMaterial.ENABLEREFLECT);
    }
    set enableReflection(value) {
        this._shaderValues.setBool(PBRStandardMaterial.ENABLEREFLECT, true);
        if (value) {
            this._disablePublicDefineDatas.remove(Scene3DShaderDeclaration.SHADERDEFINE_REFLECTMAP);
        }
        else {
            this._disablePublicDefineDatas.add(Scene3DShaderDeclaration.SHADERDEFINE_REFLECTMAP);
        }
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
        return this._shaderValues.getVector(PBRStandardMaterial.TILINGOFFSET);
    }
    set tilingOffset(value) {
        if (value) {
            if (value.x != 1 || value.y != 1 || value.z != 0 || value.w != 0) {
                this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_TILINGOFFSET);
            }
            else {
                this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_TILINGOFFSET);
            }
        }
        else {
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_TILINGOFFSET);
        }
        this._shaderValues.setVector(PBRStandardMaterial.TILINGOFFSET, value);
    }
    /**
     * 渲染模式。
     */
    set renderMode(value) {
        switch (value) {
            case PBRStandardMaterial.RENDERMODE_OPAQUE:
                this.alphaTest = false;
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_ALPHAPREMULTIPLY);
                break;
            case PBRStandardMaterial.RENDERMODE_CUTOUT:
                this.renderQueue = Material.RENDERQUEUE_ALPHATEST;
                this.alphaTest = true;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_ALPHAPREMULTIPLY);
                break;
            case PBRStandardMaterial.RENDERMODE_FADE:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_ALPHAPREMULTIPLY);
                break;
                break;
            case PBRStandardMaterial.RENDERMODE_TRANSPARENT:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_ONE;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_ALPHAPREMULTIPLY);
                break;
            default:
                throw new Error("PBRSpecularMaterial : renderMode value error.");
        }
    }
    /**
     * 是否写入深度。
     */
    get depthWrite() {
        return this._shaderValues.getBool(PBRStandardMaterial.DEPTH_WRITE);
    }
    set depthWrite(value) {
        this._shaderValues.setBool(PBRStandardMaterial.DEPTH_WRITE, value);
    }
    /**
     * 剔除方式。
     */
    get cull() {
        return this._shaderValues.getInt(PBRStandardMaterial.CULL);
    }
    set cull(value) {
        this._shaderValues.setInt(PBRStandardMaterial.CULL, value);
    }
    /**
     * 混合方式。
     */
    get blend() {
        return this._shaderValues.getInt(PBRStandardMaterial.BLEND);
    }
    set blend(value) {
        this._shaderValues.setInt(PBRStandardMaterial.BLEND, value);
    }
    /**
     * 混合源。
     */
    get blendSrc() {
        return this._shaderValues.getInt(PBRStandardMaterial.BLEND_SRC);
    }
    set blendSrc(value) {
        this._shaderValues.setInt(PBRStandardMaterial.BLEND_SRC, value);
    }
    /**
     * 混合目标。
     */
    get blendDst() {
        return this._shaderValues.getInt(PBRStandardMaterial.BLEND_DST);
    }
    set blendDst(value) {
        this._shaderValues.setInt(PBRStandardMaterial.BLEND_DST, value);
    }
    /**
     * 深度测试方式。
     */
    get depthTest() {
        return this._shaderValues.getInt(PBRStandardMaterial.DEPTH_TEST);
    }
    set depthTest(value) {
        this._shaderValues.setInt(PBRStandardMaterial.DEPTH_TEST, value);
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone() {
        var dest = new PBRStandardMaterial();
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
        this._emissionColor.cloneTo(destMaterial._emissionColor);
    }
}
/**光滑度数据源_金属度贴图的Alpha通道。*/
PBRStandardMaterial.SmoothnessSource_MetallicGlossTexture_Alpha = 0;
/**光滑度数据源_反射率贴图的Alpha通道。*/
PBRStandardMaterial.SmoothnessSource_AlbedoTexture_Alpha = 1;
/**渲染状态_不透明。*/
PBRStandardMaterial.RENDERMODE_OPAQUE = 0;
/**渲染状态_透明测试。*/
PBRStandardMaterial.RENDERMODE_CUTOUT = 1;
/**渲染状态_透明混合_游戏中经常使用的透明。*/
PBRStandardMaterial.RENDERMODE_FADE = 2;
/**渲染状态_透明混合_物理上看似合理的透明。*/
PBRStandardMaterial.RENDERMODE_TRANSPARENT = 3;
PBRStandardMaterial.ALBEDOTEXTURE = Shader3D.propertyNameToID("u_AlbedoTexture");
PBRStandardMaterial.METALLICGLOSSTEXTURE = Shader3D.propertyNameToID("u_MetallicGlossTexture");
PBRStandardMaterial.NORMALTEXTURE = Shader3D.propertyNameToID("u_NormalTexture");
PBRStandardMaterial.PARALLAXTEXTURE = Shader3D.propertyNameToID("u_ParallaxTexture");
PBRStandardMaterial.OCCLUSIONTEXTURE = Shader3D.propertyNameToID("u_OcclusionTexture");
PBRStandardMaterial.EMISSIONTEXTURE = Shader3D.propertyNameToID("u_EmissionTexture");
PBRStandardMaterial.ALBEDOCOLOR = Shader3D.propertyNameToID("u_AlbedoColor");
PBRStandardMaterial.EMISSIONCOLOR = Shader3D.propertyNameToID("u_EmissionColor");
PBRStandardMaterial.METALLIC = Shader3D.propertyNameToID("u_metallic");
PBRStandardMaterial.SMOOTHNESS = Shader3D.propertyNameToID("u_smoothness");
PBRStandardMaterial.SMOOTHNESSSCALE = Shader3D.propertyNameToID("u_smoothnessScale");
PBRStandardMaterial.SMOOTHNESSSOURCE = -1; //TODO:
PBRStandardMaterial.OCCLUSIONSTRENGTH = Shader3D.propertyNameToID("u_occlusionStrength");
PBRStandardMaterial.NORMALSCALE = Shader3D.propertyNameToID("u_normalScale");
PBRStandardMaterial.PARALLAXSCALE = Shader3D.propertyNameToID("u_parallaxScale");
PBRStandardMaterial.ENABLEEMISSION = -1; //TODO:
PBRStandardMaterial.ENABLEREFLECT = -1; //TODO:
PBRStandardMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
PBRStandardMaterial.CULL = Shader3D.propertyNameToID("s_Cull");
PBRStandardMaterial.BLEND = Shader3D.propertyNameToID("s_Blend");
PBRStandardMaterial.BLEND_SRC = Shader3D.propertyNameToID("s_BlendSrc");
PBRStandardMaterial.BLEND_DST = Shader3D.propertyNameToID("s_BlendDst");
PBRStandardMaterial.DEPTH_TEST = Shader3D.propertyNameToID("s_DepthTest");
PBRStandardMaterial.DEPTH_WRITE = Shader3D.propertyNameToID("s_DepthWrite");
