import { Context } from "../../../resource/Context";
import { ISaveData } from "./ISaveData";
export declare class SaveMark implements ISaveData {
    private static POOL;
    /**@internal */
    _saveuse: number;
    /**@internal */
    _preSaveMark: SaveMark;
    constructor();
    isSaveMark(): boolean;
    restore(context: Context): void;
    static Create(context: Context): SaveMark;
}
