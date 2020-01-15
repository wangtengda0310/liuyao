import { Material } from "../material/Material";
import { RenderState } from "../material/RenderState";
import { Vector4 } from "../../math/Vector4";
import { Shader3D } from "../../shader/Shader3D";
/**
 * <code>ShurikenParticleMaterial</code> 类用于实现粒子材质。
 */
export class ShurikenParticleMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("PARTICLESHURIKEN");
        this._color = new Vector4(1.0, 1.0, 1.0, 1.0);
        this.renderMode = ShurikenParticleMaterial.RENDERMODE_ALPHABLENDED; //默认加色法会自动加上雾化宏定义，导致非加色法从材质读取完后未移除宏定义。
    }
    /**
     * @internal
     */
    static __initDefine__() {
        ShurikenParticleMaterial.SHADERDEFINE_DIFFUSEMAP = Shader3D.getDefineByName("DIFFUSEMAP");
        ShurikenParticleMaterial.SHADERDEFINE_TINTCOLOR = Shader3D.getDefineByName("TINTCOLOR");
        ShurikenParticleMaterial.SHADERDEFINE_ADDTIVEFOG = Shader3D.getDefineByName("ADDTIVEFOG");
        ShurikenParticleMaterial.SHADERDEFINE_TILINGOFFSET = Shader3D.getDefineByName("TILINGOFFSET");
    }
    /**
     * @internal
     */
    get _TintColorR() {
        return this._color.x;
    }
    /**
     * @internal
     */
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
    /**
     * @internal
     */
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
    /**
     * @internal
     */
    set _TintColorB(value) {
        this._color.z = value;
        this.color = this._color;
    }
    /**@internal */
    get _TintColorA() {
        return this._color.w;
    }
    /**
     * @internal
     */
    set _TintColorA(value) {
        this._color.w = value;
        this.color = this._color;
    }
    /**
     * @internal
     */
    get _MainTex_STX() {
        return this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET).x;
    }
    /**
     * @internal
     */
    set _MainTex_STX(x) {
        var tilOff = this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
        tilOff.x = x;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STY() {
        return this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET).y;
    }
    /**
     * @internal
     */
    set _MainTex_STY(y) {
        var tilOff = this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
        tilOff.y = y;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STZ() {
        return this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET).z;
    }
    /**
     * @internal
     */
    set _MainTex_STZ(z) {
        var tilOff = this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
        tilOff.z = z;
        this.tilingOffset = tilOff;
    }
    /**
     * @internal
     */
    get _MainTex_STW() {
        return this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET).w;
    }
    /**
     * @internal
     */
    set _MainTex_STW(w) {
        var tilOff = this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
        tilOff.w = w;
        this.tilingOffset = tilOff;
    }
    /**
     * 渲染模式。
     */
    set renderMode(value) {
        switch (value) {
            case ShurikenParticleMaterial.RENDERMODE_ADDTIVE:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.depthWrite = false;
                this.cull = RenderState.CULL_NONE;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE;
                this.alphaTest = false;
                this._shaderValues.addDefine(ShurikenParticleMaterial.SHADERDEFINE_ADDTIVEFOG);
                break;
            case ShurikenParticleMaterial.RENDERMODE_ALPHABLENDED:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.depthWrite = false;
                this.cull = RenderState.CULL_NONE;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.alphaTest = false;
                this._shaderValues.removeDefine(ShurikenParticleMaterial.SHADERDEFINE_ADDTIVEFOG);
                break;
            default:
                throw new Error("ShurikenParticleMaterial : renderMode value error.");
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
     * 颜色Z分量。
     */
    get colorA() {
        return this._TintColorA;
    }
    set colorA(value) {
        this._TintColorA = value;
    }
    /**
     * 颜色。
     */
    get color() {
        return this._shaderValues.getVector(ShurikenParticleMaterial.TINTCOLOR);
    }
    set color(value) {
        if (value)
            this._shaderValues.addDefine(ShurikenParticleMaterial.SHADERDEFINE_TINTCOLOR);
        else
            this._shaderValues.removeDefine(ShurikenParticleMaterial.SHADERDEFINE_TINTCOLOR);
        this._shaderValues.setVector(ShurikenParticleMaterial.TINTCOLOR, value);
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
        return this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
    }
    set tilingOffset(value) {
        if (value) {
            if (value.x != 1 || value.y != 1 || value.z != 0 || value.w != 0)
                this._shaderValues.addDefine(ShurikenParticleMaterial.SHADERDEFINE_TILINGOFFSET);
            else
                this._shaderValues.removeDefine(ShurikenParticleMaterial.SHADERDEFINE_TILINGOFFSET);
        }
        else {
            this._shaderValues.removeDefine(ShurikenParticleMaterial.SHADERDEFINE_TILINGOFFSET);
        }
        this._shaderValues.setVector(ShurikenParticleMaterial.TILINGOFFSET, value);
    }
    /**
     * 漫反射贴图。
     */
    get texture() {
        return this._shaderValues.getTexture(ShurikenParticleMaterial.DIFFUSETEXTURE);
    }
    set texture(value) {
        if (value)
            this._shaderValues.addDefine(ShurikenParticleMaterial.SHADERDEFINE_DIFFUSEMAP);
        else
            this._shaderValues.removeDefine(ShurikenParticleMaterial.SHADERDEFINE_DIFFUSEMAP);
        this._shaderValues.setTexture(ShurikenParticleMaterial.DIFFUSETEXTURE, value);
    }
    /**
     * 是否写入深度。
     */
    get depthWrite() {
        return this._shaderValues.getBool(ShurikenParticleMaterial.DEPTH_WRITE);
    }
    set depthWrite(value) {
        this._shaderValues.setBool(ShurikenParticleMaterial.DEPTH_WRITE, value);
    }
    /**
     * 剔除方式。
     */
    get cull() {
        return this._shaderValues.getInt(ShurikenParticleMaterial.CULL);
    }
    set cull(value) {
        this._shaderValues.setInt(ShurikenParticleMaterial.CULL, value);
    }
    /**
     * 混合方式。
     */
    get blend() {
        return this._shaderValues.getInt(ShurikenParticleMaterial.BLEND);
    }
    set blend(value) {
        this._shaderValues.setInt(ShurikenParticleMaterial.BLEND, value);
    }
    /**
     * 混合源。
     */
    get blendSrc() {
        return this._shaderValues.getInt(ShurikenParticleMaterial.BLEND_SRC);
    }
    set blendSrc(value) {
        this._shaderValues.setInt(ShurikenParticleMaterial.BLEND_SRC, value);
    }
    /**
     * 混合目标。
     */
    get blendDst() {
        return this._shaderValues.getInt(ShurikenParticleMaterial.BLEND_DST);
    }
    set blendDst(value) {
        this._shaderValues.setInt(ShurikenParticleMaterial.BLEND_DST, value);
    }
    /**
     * 深度测试方式。
     */
    get depthTest() {
        return this._shaderValues.getInt(ShurikenParticleMaterial.DEPTH_TEST);
    }
    set depthTest(value) {
        this._shaderValues.setInt(ShurikenParticleMaterial.DEPTH_TEST, value);
    }
    /**
    * 克隆。
    * @return	 克隆副本。
    * @override
    */
    clone() {
        var dest = new ShurikenParticleMaterial();
        this.cloneTo(dest);
        return dest;
    }
}
/**渲染状态_透明混合。*/
ShurikenParticleMaterial.RENDERMODE_ALPHABLENDED = 0;
/**渲染状态_加色法混合。*/
ShurikenParticleMaterial.RENDERMODE_ADDTIVE = 1;
ShurikenParticleMaterial.DIFFUSETEXTURE = Shader3D.propertyNameToID("u_texture");
ShurikenParticleMaterial.TINTCOLOR = Shader3D.propertyNameToID("u_Tintcolor");
ShurikenParticleMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
ShurikenParticleMaterial.CULL = Shader3D.propertyNameToID("s_Cull");
ShurikenParticleMaterial.BLEND = Shader3D.propertyNameToID("s_Blend");
ShurikenParticleMaterial.BLEND_SRC = Shader3D.propertyNameToID("s_BlendSrc");
ShurikenParticleMaterial.BLEND_DST = Shader3D.propertyNameToID("s_BlendDst");
ShurikenParticleMaterial.DEPTH_TEST = Shader3D.propertyNameToID("s_DepthTest");
ShurikenParticleMaterial.DEPTH_WRITE = Shader3D.propertyNameToID("s_DepthWrite");
