/**
 * @internal
 * <code>KeyframeNodeOwner</code> 类用于保存帧节点的拥有者信息。
 */
export declare class KeyframeNodeOwner {
    /**@internal */
    indexInList: number;
    /**@internal */
    referenceCount: number;
    /**@internal */
    updateMark: number;
    /**@internal */
    type: number;
    /**@internal */
    fullPath: string;
    /**@internal */
    propertyOwner: any;
    /**@internal */
    property: string[];
    /**@internal */
    defaultValue: any;
    /**@internal */
    crossFixedValue: any;
    /**
     * 创建一个 <code>KeyframeNodeOwner</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    saveCrossFixedValue(): void;
}
