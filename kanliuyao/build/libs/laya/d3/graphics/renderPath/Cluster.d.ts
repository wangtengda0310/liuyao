import { Texture2D } from "../../../resource/Texture2D";
import { Camera } from "../../core/Camera";
import { Scene3D } from "../../core/scene/Scene3D";
/**
 * @internal
 */
export declare class Cluster {
    private static _tempVector30;
    private static _tempVector31;
    private static _tempVector32;
    private static _tempVector33;
    private static _tempVector34;
    private static _tempVector35;
    private static _tempVector36;
    private static _tempVector37;
    private static _tempLightBound;
    static instance: Cluster;
    private _xSlices;
    private _ySlices;
    private _zSlices;
    private _clusterDatas;
    private _clusterPixels;
    private _updateMark;
    private _depthSliceParam;
    _clusterTexture: Texture2D;
    constructor(xSlices: number, ySlices: number, zSlices: number, maxLightsPerClusterAverage: number);
    private _insertSpotLightSphere;
    private _placePointLightToClusters;
    private _placeSpotLightToClusters;
    private _insertConePlane;
    private _shrinkSphereLightZPerspective;
    private _shrinkSpotLightZPerspective;
    private _shrinkSphereLightByBoundOrth;
    private _shrinkSpotLightByBoundOrth;
    private _shrinkXYByRadiusPerspective;
    private _shrinkSpotXYByConePerspective;
    private _updatePointLightPerspective;
    private _updateSpotLightPerspective;
    private _updatePointLightOrth;
    private _updateSpotLightOrth;
    update(camera: Camera, scene: Scene3D): void;
}
