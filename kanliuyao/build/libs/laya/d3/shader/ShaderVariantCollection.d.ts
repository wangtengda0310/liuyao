import { Shader3D } from "./Shader3D";
/**
 * 着色器变种。
 */
export declare class ShaderVariant {
    /** @internal */
    _shader: Shader3D;
    /** @internal */
    _subShaderIndex: number;
    /** @internal */
    _passIndex: number;
    /** @internal */
    _defineNames: string[];
    /**
     * 着色器。
     */
    readonly shader: Shader3D;
    /**
     * 子着色器索引。
     */
    readonly subShaderIndex: number;
    /**
     * 通道索引。
     */
    readonly passIndex: number;
    /**
     * 宏定义集合。
     */
    readonly defineNames: Readonly<string[]>;
    /**
     * 创建着色器变种。
     * @param shader 着色器
     * @param subShaderIndex 子着色器索引
     * @param passIndex 通道索引
     * @param defines 宏定义集合
     */
    constructor(shader: Shader3D, subShaderIndex: number, passIndex: number, defines: string[]);
    /**
     * 给着色器变种赋值。
     * @param shader 着色器
     * @param subShaderIndex 子着色器索引
     * @param passIndex 通道索引
     * @param defineNames 宏定义集合
     */
    setValue(shader: Shader3D, subShaderIndex: number, passIndex: number, defineNames: string[]): void;
    /**
     * 是否相等。
     * @param other 其它着色器变种
     * @return 是否相等。
     */
    equal(other: ShaderVariant): boolean;
    /**
     * 克隆。
     * @return 着色器变种。
     */
    clone(): ShaderVariant;
}
/**
 * 着色器变种集合。
 */
export declare class ShaderVariantCollection {
    /** @internal */
    private _allCompiled;
    /** @internal */
    private _variants;
    /**
     * 是否已经全部编译。
     */
    readonly allCompiled: boolean;
    /**
     * 包含的变种数量。
     */
    readonly variantCount: number;
    /**
     * 添加着色器变种。
     * @param variant 着色器变种。
     * @param 是否添加成功。
     */
    add(variant: ShaderVariant): boolean;
    /**
     * 移除着色器变种。
     * @param variant 着色器变种。
     * @return 是否移除成功。
     */
    remove(variant: ShaderVariant): boolean;
    /**
     * 是否包含着色器变种。
     * @param variant 着色器变种。
     */
    contatins(variant: ShaderVariant): boolean;
    /**
     * 通过索引获取着色器变种。
     * @param index 索引。
     * @returns 着色器变种。
     */
    getByIndex(index: number): ShaderVariant;
    /**
     * 清空。
     */
    clear(): void;
    /**
     * 执行编译。
     */
    compile(): void;
}
