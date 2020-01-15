import { IClone } from "./laya/d3/core/IClone";
import { Vector3 } from "./laya/d3/math/Vector3";
/**
 * <code>Config3D</code> 类用于创建3D初始化配置。
 */
export declare class Config3D implements IClone {
    /**@internal*/
    static _config: Config3D;
    /**@internal*/
    private _defaultPhysicsMemory;
    /**@internal*/
    private _maxLightCount;
    /**@internal*/
    private _lightClusterCount;
    /**@internal*/
    _editerEnvironment: boolean;
    /**@internal*/
    _multiLighting: boolean;
    /**@internal*/
    _maxAreaLightCountPerClusterAverage: number;
    /** 是否开启抗锯齿。*/
    isAntialias: boolean;
    /** 画布是否包含透明通道。*/
    isAlpha: boolean;
    /** 画布是否预乘。*/
    premultipliedAlpha: boolean;
    /** 画布是否开启模板缓冲。*/
    isStencil: boolean;
    /** 是否开启多光源,如果场景不需要多光源，关闭后可提升性能。*/
    enableMultiLight: boolean;
    /** 是否开启八叉树裁剪。*/
    octreeCulling: boolean;
    /** 八叉树初始化尺寸。*/
    octreeInitialSize: number;
    /** 八叉树初始化中心。*/
    octreeInitialCenter: Vector3;
    /** 八叉树最小尺寸。*/
    octreeMinNodeSize: number;
    /** 八叉树松散值。*/
    octreeLooseness: number;
    /**
     * 是否开启视锥裁剪调试。
     * 如果开启八叉树裁剪,使用红色绘制高层次八叉树节点包围盒,使用蓝色绘制低层次八叉节点包围盒,精灵包围盒和八叉树节点包围盒颜色一致,但Alpha为非透明。如果视锥完全包含八叉树节点,八叉树节点包围盒和精灵包围盒变为蓝色,同样精灵包围盒的Alpha为非透明。
     * 如果不开启八叉树裁剪,使用绿色像素线绘制精灵包围盒。
     */
    debugFrustumCulling: boolean;
    /**
     * 默认物理功能初始化内存，单位为M。
     */
    defaultPhysicsMemory: number;
    /**
     * 最大光源数量。
     */
    maxLightCount: number;
    /**
     * X、Y、Z轴的光照集群数量,Z值会影响Cluster接受区域光(点光、聚光)影响的数量,Math.floor(2048 / lightClusterCount.z - 1) * 4 为每个Cluster的最大平均接受区域光数量,如果每个Cluster所接受光源影响的平均数量大于该值，则较远的Cluster会忽略其中多余的光照影响。
     */
    lightClusterCount: Vector3;
    /**
     * 创建一个 <code>Config3D</code> 实例。
     */
    constructor();
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(dest: any): void;
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone(): any;
}
