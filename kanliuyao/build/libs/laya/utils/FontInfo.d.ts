export declare class FontInfo {
    static EMPTY: FontInfo;
    private static _cache;
    private static _gfontID;
    private static _lastFont;
    private static _lastFontInfo;
    static Parse(font: string): FontInfo;
    /**@internal */
    _id: number;
    /**@internal */
    _font: string;
    /**@internal */
    _family: string;
    /**@internal */
    _size: number;
    /**@internal */
    _italic: boolean;
    /**@internal */
    _bold: boolean;
    constructor(font: string);
    setFont(value: string): void;
}
