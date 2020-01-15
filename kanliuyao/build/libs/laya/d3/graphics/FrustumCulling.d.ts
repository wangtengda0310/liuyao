import { SimpleSingletonList } from "../component/SimpleSingletonList";
import { Camera } from "../core/Camera";
import { RenderContext3D } from "../core/render/RenderContext3D";
import { Scene3D } from "../core/scene/Scene3D";
import { Shader3D } from "../shader/Shader3D";
/**
 * @internal
 * <code>FrustumCulling</code> 类用于裁剪。
 */
export declare class FrustumCulling {
    /**@internal */
    private static _tempVector3;
    /**@internal */
    private static _tempColor0;
    /**@internal */
    static debugFrustumCulling: boolean;
    /**@internal	[NATIVE]*/
    static _cullingBufferLength: number;
    /**@internal	[NATIVE]*/
    static _cullingBuffer: Float32Array;
    /**
     * @internal
     */
    static __init__(): void;
    /**
     * @internal
     */
    private static _drawTraversalCullingBound;
    /**
     * @internal
     */
    private static _traversalCulling;
    /**
     * @internal
     */
    static renderObjectCulling(camera: Camera, scene: Scene3D, context: RenderContext3D, customShader: Shader3D, replacementTag: string, isShadowCasterCull: boolean): void;
    /**
     * @internal [NATIVE]
     */
    static renderObjectCullingNative(camera: Camera, scene: Scene3D, context: RenderContext3D, renderList: SimpleSingletonList, customShader: Shader3D, replacementTag: string): void;
    /**
     * @internal [NATIVE]
     */
    static cullingNative(boundFrustumBuffer: Float32Array, cullingBuffer: Float32Array, cullingBufferIndices: Int32Array, cullingCount: number, cullingBufferResult: Int32Array): number;
    /**
     * 创建一个 <code>FrustumCulling</code> 实例。
     */
    constructor();
}
