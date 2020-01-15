import { Matrix } from "../../maths/Matrix";
import { Context } from "../../resource/Context";
import { SubmitBase } from "./SubmitBase";
/**
 * cache as normal 模式下的生成的canvas的渲染。
 */
export declare class SubmitCanvas extends SubmitBase {
    /**@internal */
    _matrix: Matrix;
    canv: Context;
    /**@internal */
    _matrix4: any[];
    static create(canvas: any, alpha: number, filters: any[]): SubmitCanvas;
    constructor();
    /**
     * @override
     */
    renderSubmit(): number;
    /**
     * @override
     */
    releaseRender(): void;
    /**
     * @override
     */
    getRenderType(): number;
    static POOL: any;
}
