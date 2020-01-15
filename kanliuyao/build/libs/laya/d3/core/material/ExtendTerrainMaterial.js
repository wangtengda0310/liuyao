import { Shader3D } from "../../shader/Shader3D";
import { Scene3DShaderDeclaration } from "../scene/Scene3DShaderDeclaration";
import { Material } from "./Material";
import { RenderState } from "./RenderState";
/**
 * ...
 * @author ...
 */
export class ExtendTerrainMaterial extends Material {
    constructor() {
        super();
        /** @internal */
        this._enableLighting = true;
        this.setShaderName("ExtendTerrain");
        this.renderMode = ExtendTerrainMaterial.RENDERMODE_OPAQUE;
    }
    /**
     * @internal
     */
    static __initDefine__() {
        ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1 = Shader3D.getDefineByName("ExtendTerrain_DETAIL_NUM1");
        ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2 = Shader3D.getDefineByName("ExtendTerrain_DETAIL_NUM2");
        ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3 = Shader3D.getDefineByName("ExtendTerrain_DETAIL_NUM3");
        ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4 = Shader3D.getDefineByName("ExtendTerrain_DETAIL_NUM4");
        ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5 = Shader3D.getDefineByName("ExtendTerrain_DETAIL_NUM5");
    }
    /**
     * splatAlpha贴图。
     */
    get splatAlphaTexture() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.SPLATALPHATEXTURE);
    }
    set splatAlphaTexture(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.SPLATALPHATEXTURE, value);
    }
    /**
     * 第一层贴图。
     */
    get diffuseTexture1() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.DIFFUSETEXTURE1);
    }
    set diffuseTexture1(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.DIFFUSETEXTURE1, value);
        this._setDetailNum(1);
    }
    /**
     * 第二层贴图。
     */
    get diffuseTexture2() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.DIFFUSETEXTURE2);
    }
    set diffuseTexture2(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.DIFFUSETEXTURE2, value);
        this._setDetailNum(2);
    }
    /**
     * 第三层贴图。
     */
    get diffuseTexture3() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.DIFFUSETEXTURE3);
    }
    set diffuseTexture3(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.DIFFUSETEXTURE3, value);
        this._setDetailNum(3);
    }
    /**
     * 第四层贴图。
     */
    get diffuseTexture4() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.DIFFUSETEXTURE4);
    }
    set diffuseTexture4(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.DIFFUSETEXTURE4, value);
        this._setDetailNum(4);
    }
    /**
     * 第五层贴图。
     */
    get diffuseTexture5() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.DIFFUSETEXTURE5);
    }
    set diffuseTexture5(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.DIFFUSETEXTURE5, value);
        this._setDetailNum(5);
    }
    /**
     * 第一层贴图缩放偏移。
     */
    set diffuseScaleOffset1(scaleOffset1) {
        this._shaderValues.setVector(ExtendTerrainMaterial.DIFFUSESCALEOFFSET1, scaleOffset1);
    }
    /**
     * 第二层贴图缩放偏移。
     */
    set diffuseScaleOffset2(scaleOffset2) {
        this._shaderValues.setVector(ExtendTerrainMaterial.DIFFUSESCALEOFFSET2, scaleOffset2);
    }
    /**
     * 第三层贴图缩放偏移。
     */
    set diffuseScaleOffset3(scaleOffset3) {
        this._shaderValues.setVector(ExtendTerrainMaterial.DIFFUSESCALEOFFSET3, scaleOffset3);
    }
    /**
     * 第四层贴图缩放偏移。
     */
    set diffuseScaleOffset4(scaleOffset4) {
        this._shaderValues.setVector(ExtendTerrainMaterial.DIFFUSESCALEOFFSET4, scaleOffset4);
    }
    /**
     * 第五层贴图缩放偏移。
     */
    set diffuseScaleOffset5(scaleOffset5) {
        this._shaderValues.setVector(ExtendTerrainMaterial.DIFFUSESCALEOFFSET5, scaleOffset5);
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
     * 设置渲染模式。
     */
    set renderMode(value) {
        switch (value) {
            case ExtendTerrainMaterial.RENDERMODE_OPAQUE:
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            case ExtendTerrainMaterial.RENDERMODE_TRANSPARENT:
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LEQUAL;
                break;
            default:
                throw new Error("ExtendTerrainMaterial:renderMode value error.");
        }
    }
    /**
     * 是否写入深度。
     */
    get depthWrite() {
        return this._shaderValues.getBool(ExtendTerrainMaterial.DEPTH_WRITE);
    }
    set depthWrite(value) {
        this._shaderValues.setBool(ExtendTerrainMaterial.DEPTH_WRITE, value);
    }
    /**
     * 剔除方式。
     */
    get cull() {
        return this._shaderValues.getInt(ExtendTerrainMaterial.CULL);
    }
    set cull(value) {
        this._shaderValues.setInt(ExtendTerrainMaterial.CULL, value);
    }
    /**
     * 混合方式。
     */
    get blend() {
        return this._shaderValues.getInt(ExtendTerrainMaterial.BLEND);
    }
    set blend(value) {
        this._shaderValues.setInt(ExtendTerrainMaterial.BLEND, value);
    }
    /**
     * 混合源。
     */
    get blendSrc() {
        return this._shaderValues.getInt(ExtendTerrainMaterial.BLEND_SRC);
    }
    set blendSrc(value) {
        this._shaderValues.setInt(ExtendTerrainMaterial.BLEND_SRC, value);
    }
    /**
     * 混合目标。
     */
    get blendDst() {
        return this._shaderValues.getInt(ExtendTerrainMaterial.BLEND_DST);
    }
    set blendDst(value) {
        this._shaderValues.setInt(ExtendTerrainMaterial.BLEND_DST, value);
    }
    /**
     * 深度测试方式。
     */
    get depthTest() {
        return this._shaderValues.getInt(ExtendTerrainMaterial.DEPTH_TEST);
    }
    set depthTest(value) {
        this._shaderValues.setInt(ExtendTerrainMaterial.DEPTH_TEST, value);
    }
    /**
     * @internal
     */
    _setDetailNum(value) {
        switch (value) {
            case 1:
                this._shaderValues.addDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
                break;
            case 2:
                this._shaderValues.addDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
                break;
            case 3:
                this._shaderValues.addDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
                break;
            case 4:
                this._shaderValues.addDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
                break;
            case 5:
                this._shaderValues.addDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
                break;
        }
    }
    /**
    * 克隆。
    * @return	 克隆副本。
    * @override
    */
    clone() {
        var dest = new ExtendTerrainMaterial();
        this.cloneTo(dest);
        return dest;
    }
}
/**渲染状态_不透明。*/
ExtendTerrainMaterial.RENDERMODE_OPAQUE = 1;
/**渲染状态_透明混合。*/
ExtendTerrainMaterial.RENDERMODE_TRANSPARENT = 2;
/**渲染状态_透明混合。*/
ExtendTerrainMaterial.SPLATALPHATEXTURE = Shader3D.propertyNameToID("u_SplatAlphaTexture");
ExtendTerrainMaterial.DIFFUSETEXTURE1 = Shader3D.propertyNameToID("u_DiffuseTexture1");
ExtendTerrainMaterial.DIFFUSETEXTURE2 = Shader3D.propertyNameToID("u_DiffuseTexture2");
ExtendTerrainMaterial.DIFFUSETEXTURE3 = Shader3D.propertyNameToID("u_DiffuseTexture3");
ExtendTerrainMaterial.DIFFUSETEXTURE4 = Shader3D.propertyNameToID("u_DiffuseTexture4");
ExtendTerrainMaterial.DIFFUSETEXTURE5 = Shader3D.propertyNameToID("u_DiffuseTexture5");
ExtendTerrainMaterial.DIFFUSESCALEOFFSET1 = Shader3D.propertyNameToID("u_DiffuseScaleOffset1");
ExtendTerrainMaterial.DIFFUSESCALEOFFSET2 = Shader3D.propertyNameToID("u_DiffuseScaleOffset2");
ExtendTerrainMaterial.DIFFUSESCALEOFFSET3 = Shader3D.propertyNameToID("u_DiffuseScaleOffset3");
ExtendTerrainMaterial.DIFFUSESCALEOFFSET4 = Shader3D.propertyNameToID("u_DiffuseScaleOffset4");
ExtendTerrainMaterial.DIFFUSESCALEOFFSET5 = Shader3D.propertyNameToID("u_DiffuseScaleOffset5");
ExtendTerrainMaterial.CULL = Shader3D.propertyNameToID("s_Cull");
ExtendTerrainMaterial.BLEND = Shader3D.propertyNameToID("s_Blend");
ExtendTerrainMaterial.BLEND_SRC = Shader3D.propertyNameToID("s_BlendSrc");
ExtendTerrainMaterial.BLEND_DST = Shader3D.propertyNameToID("s_BlendDst");
ExtendTerrainMaterial.DEPTH_TEST = Shader3D.propertyNameToID("s_DepthTest");
ExtendTerrainMaterial.DEPTH_WRITE = Shader3D.propertyNameToID("s_DepthWrite");
