import { Node } from "../../display/Node";
import { Matrix4x4 } from "../math/Matrix4x4";
import { Vector4 } from "../math/Vector4";
import { SkyRenderer } from "../resource/models/SkyRenderer";
import { Shader3D } from "../shader/Shader3D";
import { ShaderData } from "../shader/ShaderData";
import { Sprite3D } from "./Sprite3D";
/**
 * <code>BaseCamera</code> 类用于创建摄像机的父类。
 */
export declare class BaseCamera extends Sprite3D {
    static _tempMatrix4x40: Matrix4x4;
    static CAMERAPOS: number;
    static VIEWMATRIX: number;
    static PROJECTMATRIX: number;
    static VIEWPROJECTMATRIX: number;
    static CAMERADIRECTION: number;
    static CAMERAUP: number;
    static VIEWPORT: number;
    static PROJECTION_PARAMS: number;
    /**渲染模式,延迟光照渲染，暂未开放。*/
    static RENDERINGTYPE_DEFERREDLIGHTING: string;
    /**渲染模式,前向渲染。*/
    static RENDERINGTYPE_FORWARDRENDERING: string;
    protected static _invertYScaleMatrix: Matrix4x4;
    protected static _invertYProjectionMatrix: Matrix4x4;
    protected static _invertYProjectionViewMatrix: Matrix4x4;
    /** @internal 渲染顺序。*/
    _renderingOrder: number;
    /** 近裁剪面。*/
    protected _nearPlane: number;
    /** 远裁剪面。*/
    protected _farPlane: number;
    /** 视野。*/
    private _fieldOfView;
    /** 正交投影的垂直尺寸。*/
    private _orthographicVerticalSize;
    private _skyRenderer;
    private _forward;
    private _up;
    /**@internal */
    protected _orthographic: boolean;
    /**@internal 是否使用用户自定义投影矩阵，如果使用了用户投影矩阵，摄像机投影矩阵相关的参数改变则不改变投影矩阵的值，需调用ResetProjectionMatrix方法。*/
    protected _useUserProjectionMatrix: boolean;
    /** @internal */
    _shaderValues: ShaderData;
    /**摄像机的清除颜色,默认颜色为CornflowerBlue。*/
    clearColor: Vector4;
    /** 可视层位标记遮罩值,支持混合 例:cullingMask=Math.pow(2,0)|Math.pow(2,1)为第0层和第1层可见。*/
    cullingMask: number;
    /** 渲染时是否用遮挡剔除。 */
    useOcclusionCulling: boolean;
    /**
     * 天空渲染器。
     */
    readonly skyRenderer: SkyRenderer;
    /**
     * 视野。
     */
    fieldOfView: number;
    /**
     * 近裁面。
     */
    nearPlane: number;
    /**
     * 远裁面。
     */
    farPlane: number;
    /**
     * 是否正交投影矩阵。
     */
    orthographic: boolean;
    /**
     * 正交投影垂直矩阵尺寸。
     */
    orthographicVerticalSize: number;
    renderingOrder: number;
    /**
     * 创建一个 <code>BaseCamera</code> 实例。
     * @param	fieldOfView 视野。
     * @param	nearPlane 近裁面。
     * @param	farPlane 远裁面。
     */
    constructor(nearPlane?: number, farPlane?: number);
    /**
     * 通过RenderingOrder属性对摄像机机型排序。
     */
    _sortCamerasByRenderingOrder(): void;
    /**
     * @internal
     */
    protected _calculateProjectionMatrix(): void;
    /**
     * @internal
     */
    protected _onScreenSizeChanged(): void;
    /**
     * @internal
     */
    _prepareCameraToRender(): void;
    /**
     * 相机渲染。
     * @param	shader 着色器。
     * @param   replacementTag 着色器替换标记。
     */
    render(shader?: Shader3D, replacementTag?: string): void;
    /**
     * 增加可视图层,layer值为0到31层。
     * @param layer 图层。
     */
    addLayer(layer: number): void;
    /**
     * 移除可视图层,layer值为0到31层。
     * @param layer 图层。
     */
    removeLayer(layer: number): void;
    /**
     * 增加所有图层。
     */
    addAllLayers(): void;
    /**
     * 移除所有图层。
     */
    removeAllLayers(): void;
    resetProjectionMatrix(): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _onActive(): void;
    /**
     * @inheritDoc
     * @override
     */
    protected _onInActive(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data: any, spriteMap: any): void;
    /**
     * @inheritDoc
     * @override
     */
    destroy(destroyChild?: boolean): void;
    /**
     * @internal
     */
    protected _create(): Node;
    /** @deprecated plaease use CameraClearFlags.SolidColor instead.*/
    static CLEARFLAG_SOLIDCOLOR: number;
    /** @deprecated plaease use CameraClearFlags.Sky instead.*/
    static CLEARFLAG_SKY: number;
    /** @deprecated plaease use CameraClearFlags.DepthOnly instead.*/
    static CLEARFLAG_DEPTHONLY: number;
    /** @deprecated plaease use CameraClearFlags.Nothing instead.*/
    static CLEARFLAG_NONE: number;
}
