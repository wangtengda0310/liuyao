import { TfConstraintData } from "./TfConstraintData";
import { Bone } from "./Bone";
/**
 * @internal
 */
export declare class TfConstraint {
    /**@internal */
    private _data;
    /**@internal */
    private _bones;
    target: Bone;
    rotateMix: number;
    translateMix: number;
    scaleMix: number;
    shearMix: number;
    /**@internal */
    private _temp;
    constructor(data: TfConstraintData, bones: Bone[]);
    apply(): void;
}
