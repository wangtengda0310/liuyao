/**
     * <code>HalfFloatUtils</code> 类用于创建HalfFloat工具。
     */
export declare class HalfFloatUtils {
    /**@internal */
    private static _buffer;
    /**@internal */
    private static _floatView;
    /**@internal */
    private static _uint32View;
    /**@internal */
    private static _baseTable;
    /**@internal */
    private static _shiftTable;
    /**@internal */
    private static _mantissaTable;
    /**@internal */
    private static _exponentTable;
    /**@internal */
    private static _offsetTable;
    /**
     * @internal
     */
    static __init__(): void;
    /**
     * round a number to a half float number bits.
     * @param {number} num
     */
    static roundToFloat16Bits(num: number): number;
    /**
     * convert a half float number bits to a number.
     * @param {number} float16bits - half float number bits
     */
    static convertToNumber(float16bits: number): number;
}
