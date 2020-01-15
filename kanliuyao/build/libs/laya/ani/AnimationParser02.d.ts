import { AnimationTemplet } from "./AnimationTemplet";
import { Byte } from "../utils/Byte";
/**
 * @internal
 */
export declare class AnimationParser02 {
    /**@internal */
    private static _templet;
    /**@internal */
    private static _reader;
    /**@internal */
    private static _strings;
    /**@internal */
    private static _BLOCK;
    /**@internal */
    private static _DATA;
    /**
     * @private
     */
    private static READ_DATA;
    /**
     * @private
     */
    private static READ_BLOCK;
    /**
     * @private
     */
    private static READ_STRINGS;
    /**
     * @private
     */
    static parse(templet: AnimationTemplet, reader: Byte): void;
    static READ_ANIMATIONS(): void;
}
