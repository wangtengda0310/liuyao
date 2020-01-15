import { ShaderCompile } from "../../webgl/utils/ShaderCompile";
import { ShaderNode } from "../../webgl/utils/ShaderNode";
import { RenderState } from "../core/material/RenderState";
import { DefineDatas } from "./DefineDatas";
import { ShaderInstance } from "./ShaderInstance";
import { SubShader } from "./SubShader";
/**
 * <code>ShaderPass</code> 类用于实现ShaderPass。
 */
export declare class ShaderPass extends ShaderCompile {
    /**@internal */
    private static _defineString;
    /**@internal */
    private static _debugDefineString;
    /**@internal */
    private _owner;
    /**@internal */
    _stateMap: object;
    /**@internal */
    private _cacheSharders;
    /**@internal */
    private _cacheShaderHierarchy;
    /**@internal */
    private _renderState;
    /**@internal */
    _validDefine: DefineDatas;
    /**
     * 获取渲染状态。
     * @return 渲染状态。
     */
    readonly renderState: RenderState;
    constructor(owner: SubShader, vs: string, ps: string, stateMap: object);
    /**
     * @inheritDoc
     * @override
     */
    protected _compileToTree(parent: ShaderNode, lines: any[], start: number, includefiles: any[], defs: any): void;
    /**
     * @internal
     */
    _resizeCacheShaderMap(cacheMap: object, hierarchy: number, resizeLength: number): void;
    /**
     * @internal
     */
    _addDebugShaderVariantCollection(compileDefine: DefineDatas): void;
    /**
     * @internal
     */
    withCompile(compileDefine: DefineDatas): ShaderInstance;
}
