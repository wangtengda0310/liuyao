import { IClone } from "../core/IClone";
import { ShaderDefine } from "./ShaderDefine";
/**
 * <code>DefineDatas</code> 类用于创建宏定义数据集合。
 */
export declare class DefineDatas implements IClone {
    /** @internal */
    _mask: Array<number>;
    /** @internal */
    _length: number;
    /**
     * 创建一个 <code>DefineDatas</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    _intersectionDefineDatas(define: DefineDatas): void;
    /**
     * 添加宏定义值。
     * @param define 宏定义值。
     */
    add(define: ShaderDefine): void;
    /**
     * 移除宏定义。
     * @param define 宏定义。
     */
    remove(define: ShaderDefine): void;
    /**
     * 添加宏定义集合。
     * @param define 宏定义集合。
     */
    addDefineDatas(define: DefineDatas): void;
    /**
     * 移除宏定义集合。
     * @param define 宏定义集合。
     */
    removeDefineDatas(define: DefineDatas): void;
    /**
     * 是否有宏定义。
     * @param define 宏定义。
     */
    has(define: ShaderDefine): boolean;
    /**
     * 清空宏定义。
     */
    clear(): void;
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject: any): void;
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone(): any;
}
