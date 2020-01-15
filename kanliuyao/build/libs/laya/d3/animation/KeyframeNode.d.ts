import { Keyframe } from "../core/Keyframe";
/**
 * @internal
 */
export declare class KeyframeNode {
    private _ownerPath;
    private _propertys;
    /**@internal */
    _keyFrames: Keyframe[];
    /**@internal */
    _indexInList: number;
    /**@internal */
    type: number;
    /**@internal */
    fullPath: string;
    /**@internal */
    propertyOwner: string;
    /**@internal */
    data: any;
    /**
     * 获取精灵路径个数。
     * @return 精灵路径个数。
     */
    readonly ownerPathCount: number;
    /**
     * 获取属性路径个数。
     * @return 数量路径个数。
     */
    readonly propertyCount: number;
    /**
     * 获取帧个数。
     * 帧个数。
     */
    readonly keyFramesCount: number;
    /**
     * @internal
     */
    _setOwnerPathCount(value: number): void;
    /**
     * @internal
     */
    _setOwnerPathByIndex(index: number, value: string): void;
    /**
     * @internal
     */
    _joinOwnerPath(sep: string): string;
    /**
     * @internal
     */
    _setPropertyCount(value: number): void;
    /**
     * @internal
     */
    _setPropertyByIndex(index: number, value: string): void;
    /**
     * @internal
     */
    _joinProperty(sep: string): string;
    /**
     * @internal
     */
    _setKeyframeCount(value: number): void;
    /**
     * @internal
     */
    _setKeyframeByIndex(index: number, value: Keyframe): void;
    /**
     * 通过索引获取精灵路径。
     * @param index 索引。
     */
    getOwnerPathByIndex(index: number): string;
    /**
     * 通过索引获取属性路径。
     * @param index 索引。
     */
    getPropertyByIndex(index: number): string;
    /**
     * 通过索引获取帧。
     * @param index 索引。
     */
    getKeyframeByIndex(index: number): Keyframe;
}
