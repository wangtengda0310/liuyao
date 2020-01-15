import { Buffer2D } from "./Buffer2D";
export declare class IndexBuffer2D extends Buffer2D {
    static create: Function;
    protected _uint16Array: Uint16Array;
    constructor(bufferUsage?: number);
    /**
     * @override
     */
    protected _checkArrayUse(): void;
    getUint16Array(): Uint16Array;
    /**
     * @inheritDoc
     * @override
     */
    _bindForVAO(): void;
    /**
     * @inheritDoc
     * @override
     */
    bind(): boolean;
    destory(): void;
    disposeResource(): void;
}
