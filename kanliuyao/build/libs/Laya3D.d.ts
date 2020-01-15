import { Config3D } from "./Config3D";
import { PhysicsSettings } from "./laya/d3/physics/PhysicsSettings";
import { Handler } from "./laya/utils/Handler";
/**
 * <code>Laya3D</code> 类用于初始化3D设置。
 */
export declare class Laya3D {
    /**Hierarchy资源。*/
    static HIERARCHY: string;
    /**Mesh资源。*/
    static MESH: string;
    /**Material资源。*/
    static MATERIAL: string;
    /**Texture2D资源。*/
    static TEXTURE2D: string;
    /**TextureCube资源。*/
    static TEXTURECUBE: string;
    /**AnimationClip资源。*/
    static ANIMATIONCLIP: string;
    /**Avatar资源。*/
    static AVATAR: string;
    /**Terrain资源。*/
    static TERRAINHEIGHTDATA: string;
    /**Terrain资源。*/
    static TERRAINRES: string;
    /**@internal */
    private static _innerFirstLevelLoaderManager;
    /**@internal */
    private static _innerSecondLevelLoaderManager;
    /**@internal */
    private static _innerThirdLevelLoaderManager;
    /**@internal */
    private static _innerFourthLevelLoaderManager;
    /**@internal */
    private static _isInit;
    /**@internal */
    static _editerEnvironment: boolean;
    /**@private */
    static physicsSettings: PhysicsSettings;
    /**
     * 获取是否可以启用物理。
     * @param 是否启用物理。
     */
    static readonly enablePhysics: any;
    /**
     *@internal
     */
    static _cancelLoadByUrl(url: string): void;
    /**
     *@internal
     */
    private static _changeWebGLSize;
    /**
     *@internal
     */
    private static __init__;
    private static enableNative3D;
    /**
     *@private
     */
    private static formatRelativePath;
    /**
     * @internal
     */
    private static _endLoad;
    /**
     *@internal
     */
    private static _eventLoadManagerError;
    /**
     *@internal
     */
    private static _addHierarchyInnerUrls;
    /**
     *@internal
     */
    private static _getSprite3DHierarchyInnerUrls;
    /**
     *@internal
     */
    private static _loadHierarchy;
    /**
     *@internal
     */
    private static _onHierarchylhLoaded;
    /**
     *@internal
     */
    private static _onHierarchyInnerForthLevResouLoaded;
    /**
     *@internal
     */
    private static _onHierarchyInnerThirdLevResouLoaded;
    /**
     *@internal
     */
    private static _onHierarchyInnerSecondLevResouLoaded;
    /**
     *@internal
     */
    private static _onHierarchyInnerFirstLevResouLoaded;
    /**
     *@internal
     */
    private static _loadMesh;
    /**
     *@internal
     */
    private static _onMeshLmLoaded;
    /**
     *@internal
     */
    private static _loadMaterial;
    /**
     *@internal
     */
    private static _onMaterilLmatLoaded;
    /**
     *@internal
     */
    private static _onMateialTexturesLoaded;
    /**
     *@internal
     */
    private static _loadAvatar;
    /**
     *@internal
     */
    private static _loadAnimationClip;
    /**
     *@internal
     */
    private static _loadTexture2D;
    /**
     *@internal
     */
    private static _loadTextureCube;
    /**
     *@internal
     */
    private static _onTextureCubeLtcLoaded;
    /**
     *@internal
     */
    private static _onTextureCubeImagesLoaded;
    /**
     *@internal
     */
    private static _onProcessChange;
    /**
     * 初始化Laya3D相关设置。
     * @param	width  3D画布宽度。
     * @param	height 3D画布高度。
     */
    static init(width: number, height: number, config?: Config3D, compolete?: Handler): void;
    /**
     * 创建一个 <code>Laya3D</code> 实例。
     */
    constructor();
}
