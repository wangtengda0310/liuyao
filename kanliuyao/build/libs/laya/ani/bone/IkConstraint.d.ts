import { IkConstraintData } from "./IkConstraintData";
import { Bone } from "./Bone";
/**
 * @internal
 */
export declare class IkConstraint {
    /**@internal */
    private _targetBone;
    /**@internal */
    private _bones;
    /**@internal */
    name: string;
    mix: number;
    bendDirection: number;
    isSpine: boolean;
    static radDeg: number;
    static degRad: number;
    /**@internal */
    private static _tempMatrix;
    constructor(data: IkConstraintData, bones: Bone[]);
    apply(): void;
    /**@internal */
    private _applyIk1;
    /**@internal */
    private _sp;
    private isDebug;
    updatePos(x: number, y: number): void;
    /**@internal */
    private _applyIk2;
    /**@internal */
    private _applyIk3;
}
