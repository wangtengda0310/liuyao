import { AnimationClip } from "./AnimationClip";
import { Byte } from "../../utils/Byte";
/**
 * @internal
 */
export declare class AnimationClipParser04 {
    private static _animationClip;
    private static _reader;
    private static _strings;
    private static _BLOCK;
    private static _DATA;
    private static _version;
    private static READ_DATA;
    private static READ_BLOCK;
    private static READ_STRINGS;
    /**
     * @internal
     */
    static parse(clip: AnimationClip, reader: Byte, version: string): void;
    /**
     * @internal
     */
    static READ_ANIMATIONS(): void;
}
