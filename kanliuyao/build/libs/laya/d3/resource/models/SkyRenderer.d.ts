import { Material } from "../../core/material/Material";
import { RenderContext3D } from "../../core/render/RenderContext3D";
import { SkyMesh } from "./SkyMesh";
/**
 * <code>SkyRenderer</code> 类用于实现天空渲染器。
 */
export declare class SkyRenderer {
    /** @internal */
    private static _tempMatrix0;
    /** @internal */
    private static _tempMatrix1;
    /** @internal */
    private static _compileDefine;
    /** @internal */
    private _material;
    /** @internal */
    private _mesh;
    /**
     * 材质。
     */
    material: Material;
    /**
     * 网格。
     */
    mesh: SkyMesh;
    /**
     * 创建一个新的 <code>SkyRenderer</code> 实例。
     */
    constructor();
    /**
     * @internal
     * 是否可用。
     */
    _isAvailable(): boolean;
    /**
     * @internal
     */
    _render(context: RenderContext3D): void;
    /**
     * @internal
     */
    destroy(): void;
}
