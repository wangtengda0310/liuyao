/**
 * @internal
 * ...
 * @author ww
 */
export declare class BezierLerp {
    constructor();
    /**@internal */
    private static _bezierResultCache;
    /**@internal */
    private static _bezierPointsCache;
    static getBezierRate(t: number, px0: number, py0: number, px1: number, py1: number): number;
    /**@internal */
    private static _getBezierParamKey;
    /**@internal */
    private static _getBezierPoints;
}
