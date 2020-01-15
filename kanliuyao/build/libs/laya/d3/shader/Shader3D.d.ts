import { DefineDatas } from "./DefineDatas";
import { ShaderDefine } from "./ShaderDefine";
import { ShaderVariant, ShaderVariantCollection } from "./ShaderVariantCollection";
import { SubShader } from "./SubShader";
/**
 * <code>Shader3D</code> 类用于创建Shader3D。
 */
export declare class Shader3D {
    /**@internal */
    private static _compileDefineDatas;
    /**渲染状态_剔除。*/
    static RENDER_STATE_CULL: number;
    /**渲染状态_混合。*/
    static RENDER_STATE_BLEND: number;
    /**渲染状态_混合源。*/
    static RENDER_STATE_BLEND_SRC: number;
    /**渲染状态_混合目标。*/
    static RENDER_STATE_BLEND_DST: number;
    /**渲染状态_混合源RGB。*/
    static RENDER_STATE_BLEND_SRC_RGB: number;
    /**渲染状态_混合目标RGB。*/
    static RENDER_STATE_BLEND_DST_RGB: number;
    /**渲染状态_混合源ALPHA。*/
    static RENDER_STATE_BLEND_SRC_ALPHA: number;
    /**渲染状态_混合目标ALPHA。*/
    static RENDER_STATE_BLEND_DST_ALPHA: number;
    /**渲染状态_混合常量颜色。*/
    static RENDER_STATE_BLEND_CONST_COLOR: number;
    /**渲染状态_混合方程。*/
    static RENDER_STATE_BLEND_EQUATION: number;
    /**渲染状态_RGB混合方程。*/
    static RENDER_STATE_BLEND_EQUATION_RGB: number;
    /**渲染状态_ALPHA混合方程。*/
    static RENDER_STATE_BLEND_EQUATION_ALPHA: number;
    /**渲染状态_深度测试。*/
    static RENDER_STATE_DEPTH_TEST: number;
    /**渲染状态_深度写入。*/
    static RENDER_STATE_DEPTH_WRITE: number;
    /**shader变量提交周期，自定义。*/
    static PERIOD_CUSTOM: number;
    /**shader变量提交周期，逐材质。*/
    static PERIOD_MATERIAL: number;
    /**shader变量提交周期，逐精灵和相机，注：因为精灵包含MVP矩阵，为复合属性，所以摄像机发生变化时也应提交。*/
    static PERIOD_SPRITE: number;
    /**shader变量提交周期，逐相机。*/
    static PERIOD_CAMERA: number;
    /**shader变量提交周期，逐场景。*/
    static PERIOD_SCENE: number;
    /**@internal */
    static SHADERDEFINE_LEGACYSINGALLIGHTING: ShaderDefine;
    /**@internal */
    private static _propertyNameCounter;
    /**@internal */
    private static _propertyNameMap;
    /**@internal */
    private static _defineCounter;
    /**@internal */
    private static _defineMap;
    /**@internal */
    static _preCompileShader: any;
    /**@internal */
    static _maskMap: Array<object>;
    /**@internal */
    static _debugShaderVariantInfo: ShaderVariant;
    /**是否开启调试模式。 */
    static debugMode: boolean;
    /**调试着色器变种集合。 */
    static readonly debugShaderVariantCollection: ShaderVariantCollection;
    /**@internal */
    _attributeMap: any;
    /**@internal */
    _uniformMap: any;
    /**
     * @internal
     */
    static _getNamesByDefineData(defineData: DefineDatas, out: Array<string>): void;
    /**
     * 注册宏定义。
     * @param name
     */
    static getDefineByName(name: string): ShaderDefine;
    /**
     * 通过Shader属性名称获得唯一ID。
     * @param name Shader属性名称。
     * @return 唯一ID。
     */
    static propertyNameToID(name: string): number;
    /**
     * 添加函数库引用。
     * @param fileName 文件名字。
     * @param txt 文件内容
     */
    static addInclude(fileName: string, txt: string): void;
    /**
     * 通过宏定义名字编译shader。
     * @param	shaderName Shader名称。
     * @param   subShaderIndex 子着色器索引。
     * @param   passIndex  通道索引。
     * @param	defineNames 宏定义名字集合。
     */
    static compileShaderByDefineNames(shaderName: string, subShaderIndex: number, passIndex: number, defineNames: string[]): void;
    /**
     * 添加预编译shader文件，主要是处理宏定义
     */
    static add(name: string, attributeMap?: any, uniformMap?: any, enableInstancing?: boolean): Shader3D;
    /**
     * 获取ShaderCompile3D。
     * @param	name
     * @return ShaderCompile3D。
     */
    static find(name: string): Shader3D;
    /**@internal */
    _name: string;
    /**@internal */
    _enableInstancing: boolean;
    /**@internal */
    _subShaders: SubShader[];
    /**
     * 名字。
     */
    readonly name: string;
    /**
     * 创建一个 <code>Shader3D</code> 实例。
     */
    constructor(name: string, attributeMap: any, uniformMap: any, enableInstancing: boolean);
    /**
     * 添加子着色器。
     * @param 子着色器。
     */
    addSubShader(subShader: SubShader): void;
    /**
     * 在特定索引获取子着色器。
     * @param	index 索引。
     * @return 子着色器。
     */
    getSubShaderAt(index: number): SubShader;
    /**
     * @deprecated
     * 通过宏定义遮罩编译shader,建议使用compileShaderByDefineNames。
     * @param	shaderName Shader名称。
     * @param   subShaderIndex 子着色器索引。
     * @param   passIndex  通道索引。
     * @param	defineMask 宏定义遮罩集合。
     */
    static compileShader(shaderName: string, subShaderIndex: number, passIndex: number, ...defineMask: any[]): void;
}
