import { Vector4 } from "../../math/Vector4";
import { Shader3D } from "../../shader/Shader3D";
import { Material } from "./Material";
import { RenderState } from "./RenderState";
/**
 * <code>EffectMaterial</code> 类用于实现Mesh特效材质。
 */
export class EffectMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("Effect");
        this._color = new Vector4(1.0, 1.0, 1.0, 1.0);
        this._shaderValues.setVector(EffectMaterial.TINTCOLOR, new Vector4(1.0, 1.0, 1.0, 1.0));
        this.renderMode = EffectMaterial.RENDERMODE_ADDTIVE;
    }
    /**
     * @internal
     */
    static __initDefine__() {
        EffectMaterial.SHADERDEFINE_MAINTEXTURE = Shader3D.getDefineByName("MAINTEXTURE");
        EffectMaterial.SHADERDEFINE_TILINGOFFSET = Shader3D.getDefineByName("TILINGOFFSET");
        EffectMaterial.SHADERDEFINE_ADDTIVEFOG = Shader3D.getDefineByName("ADDTIVEFOG");
    }
    /**
     * @internal
     */
    get _TintColorR() {
        return this._color.x;
    }
    set _TintColorR(value) {
        this._color.x = value;
        this.color = this._color;
    }
    /**
     * @internal
     */
    get _TintColorG() {
        return this._color.y;
    }
    set _TintColorG(value) {
        this._color.y = value;
        this.color = this._color;
    }
    /**
     * @internal
     */
    get _TintColorB() {
        return this._color.z;
    }
    set _TintColorB(value) {
        this._color.z = value;
        this.color = this._color;
    }
    /**@internal */
    get _TintColorA() {
        return this._color.w;
    }
    set _TintColorA(value) {
        this._color.w = value;
        this.color = this._color;
    }
    /**
     * @internal
     */
    get _MainTex_STX() {
        return this._shaderValues.getVector(EffectMaterial.TILINGOFFSET).x;
    }
    set _MainTex_STX(x) {
        var tilOff = this._shaderValues.getVector(EffectMaterial.TILINGOFFSET);
        tilOff.x = x;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STY() {
        return this._shaderValues.getVector(EffectMaterial.TILINGOFFSET).y;
    }
    set _MainTex_STY(y) {
        var tilOff = this._shaderValues.getVector(EffectMaterial.TILINGOFFSET);
        tilOff.y = y;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STZ() {
        return this._shaderValues.getVector(EffectMaterial.TILINGOFFSET).z;
    }
    set _MainTex_STZ(z) {
        var tilOff = this._shaderValues.getVector(EffectMaterial.TILINGOFFSET);
        tilOff.z = z;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STW() {
        return this._shaderValues.getVector(EffectMaterial.TILINGOFFSET).w;
    }
    set _MainTex_STW(w) {
        var tilOff = this._shaderValues.getVector(EffectMaterial.TILINGOFFSET);
        tilOff.w = w;
        this.tilingOffset = tilOff;
    }
    /**
     * 设置渲染模式。
     */
    set renderMode(value) {
        switch (value) {
            case EffectMaterial.RENDERMODE_ADDTIVE:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_NONE;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.addDefine(EffectMaterial.SHADERDEFINE_ADDTIVEFOG);
                break;
            case EffectMaterial.RENDERMODE_ALPHABLENDED:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_NONE;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(EffectMaterial.SHADERDEFINE_ADDTIVEFOG);
                break;
            default:
                throw new Error("MeshEffectMaterial : renderMode value error.");
        }
    }
    /**
     * 颜色R分量。
     */
    get colorR() {
        return this._TintColorR;
    }
    set colorR(value) {
        this._TintColorR = value;
    }
    /**
     * 颜色G分量。
     */
    get colorG() {
        return this._TintColorG;
    }
    set colorG(value) {
        this._TintColorG = value;
    }
    /**
     * 颜色B分量。
     */
    get colorB() {
        return this._TintColorB;
    }
    set colorB(value) {
        this._TintColorB = value;
    }
    /**
     * 颜色A分量。
     */
    get colorA() {
        return this._TintColorA;
    }
    set colorA(value) {
        this._TintColorA = value;
    }
    /**
     * 获取颜色。
     */
    get color() {
        return this._shaderValues.getVector(EffectMaterial.TINTCOLOR);
    }
    set color(value) {
        this._shaderValues.setVector(EffectMaterial.TINTCOLOR, value);
    }
    /**
     * 贴图。
     */
    get texture() {
        return this._shaderValues.getTexture(EffectMaterial.MAINTEXTURE);
    }
    set texture(value) {
        if (value)
            this._shaderValues.addDefine(EffectMaterial.SHADERDEFINE_MAINTEXTURE);
        else
            this._shaderValues.removeDefine(EffectMaterial.SHADERDEFINE_MAINTEXTURE);
        this._shaderValues.setTexture(EffectMaterial.MAINTEXTURE, value);
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
        return this._shaderValues.getVector(EffectMaterial.TILINGOFFSET);
    }
    set tilingOffset(value) {
        if (value) {
            if (value.x != 1 || value.y != 1 || value.z != 0 || value.w != 0)
                this._shaderValues.addDefine(EffectMaterial.SHADERDEFINE_TILINGOFFSET);
            else
                this._shaderValues.removeDefine(EffectMaterial.SHADERDEFINE_TILINGOFFSET);
        }
        else {
            this._shaderValues.removeDefine(EffectMaterial.SHADERDEFINE_TILINGOFFSET);
        }
        this._shaderValues.setVector(EffectMaterial.TILINGOFFSET, value);
    }
    /**
     * 是否写入深度。
     */
    get depthWrite() {
        return this._shaderValues.getBool(EffectMaterial.DEPTH_WRITE);
    }
    set depthWrite(value) {
        this._shaderValues.setBool(EffectMaterial.DEPTH_WRITE, value);
    }
    /**
     * 剔除方式。
     */
    get cull() {
        return this._shaderValues.getInt(EffectMaterial.CULL);
    }
    set cull(value) {
        this._shaderValues.setInt(EffectMaterial.CULL, value);
    }
    /**
     * 混合方式。
     */
    get blend() {
        return this._shaderValues.getInt(EffectMaterial.BLEND);
    }
    set blend(value) {
        this._shaderValues.setInt(EffectMaterial.BLEND, value);
    }
    /**
     * 混合源。
     */
    get blendSrc() {
        return this._shaderValues.getInt(EffectMaterial.BLEND_SRC);
    }
    set blendSrc(value) {
        this._shaderValues.setInt(EffectMaterial.BLEND_SRC, value);
    }
    /**
     * 混合目标。
     */
    get blendDst() {
        return this._shaderValues.getInt(EffectMaterial.BLEND_DST);
    }
    set blendDst(value) {
        this._shaderValues.setInt(EffectMaterial.BLEND_DST, value);
    }
    /**
     * 深度测试方式。
     */
    get depthTest() {
        return this._shaderValues.getInt(EffectMaterial.DEPTH_TEST);
    }
    set depthTest(value) {
        this._shaderValues.setInt(EffectMaterial.DEPTH_TEST, value);
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     * @override
     */
    clone() {
        var dest = new EffectMaterial();
        this.cloneTo(dest);
        return dest;
    }
}
/**渲染状态_加色法混合。*/
EffectMaterial.RENDERMODE_ADDTIVE = 0;
/**渲染状态_透明混合。*/
EffectMaterial.RENDERMODE_ALPHABLENDED = 1;
EffectMaterial.MAINTEXTURE = Shader3D.propertyNameToID("u_AlbedoTexture");
EffectMaterial.TINTCOLOR = Shader3D.propertyNameToID("u_AlbedoColor");
EffectMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
EffectMaterial.CULL = Shader3D.propertyNameToID("s_Cull");
EffectMaterial.BLEND = Shader3D.propertyNameToID("s_Blend");
EffectMaterial.BLEND_SRC = Shader3D.propertyNameToID("s_BlendSrc");
EffectMaterial.BLEND_DST = Shader3D.propertyNameToID("s_BlendDst");
EffectMaterial.DEPTH_TEST = Shader3D.propertyNameToID("s_DepthTest");
EffectMaterial.DEPTH_WRITE = Shader3D.propertyNameToID("s_DepthWrite");
