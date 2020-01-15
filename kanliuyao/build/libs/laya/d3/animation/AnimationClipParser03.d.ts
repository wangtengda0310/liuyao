import { Byte } from "../../utils/Byte";
import { AnimationClip } from "./AnimationClip";
/**
 * @internal
 */
export declare class AnimationClipParser03 {
    private static _animationClip;
    private static _reader;
    private static _strings;
    private static _BLOCK;
    private static _DATA;
    private static READ_DATA;
    private static READ_BLOCK;
    private static READ_STRINGS;
    /**
     * @internal
     */
    static parse(clip: AnimationClip, reader: Byte): void;
    /**
     * @internal
     */
    static READ_ANIMATIONS(): void;
}
