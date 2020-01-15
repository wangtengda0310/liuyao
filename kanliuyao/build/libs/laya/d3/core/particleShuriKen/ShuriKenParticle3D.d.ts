import { Node } from "../../../display/Node";
import { RenderableSprite3D } from "../RenderableSprite3D";
import { ShurikenParticleRenderer } from "./ShurikenParticleRenderer";
import { ShurikenParticleSystem } from "./ShurikenParticleSystem";
/**
 * <code>ShuriKenParticle3D</code> 3D粒子。
 */
export declare class ShuriKenParticle3D extends RenderableSprite3D {
    /**
     * @internal
     */
    static __init__(): void;
    /** @internal */
    private _particleSystem;
    /**
     * 粒子系统。
     */
    readonly particleSystem: ShurikenParticleSystem;
    /**
     * 粒子渲染器。
     */
    readonly particleRenderer: ShurikenParticleRenderer;
    /**
     * 创建一个 <code>Particle3D</code> 实例。
     */
    constructor();
    /**
     * @internal
     */
    _parseModule(module: any, moduleData: any): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _parse(data: any, spriteMap: any): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _activeHierarchy(activeChangeComponents: any[]): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _inActiveHierarchy(activeChangeComponents: any[]): void;
    /**
     * @internal
     * @override
     */
    _cloneTo(destObject: any, srcSprite: Node, dstSprite: Node): void;
    /**
     * <p>销毁此对象。</p>
     * @param	destroyChild 是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
     * @override
     */
    destroy(destroyChild?: boolean): void;
    /**
     * @internal
     */
    protected _create(): Node;
    /**
     * @deprecated
     * @internal
     */
    private _parseOld;
    /**
     * @deprecated
     * @internal
     */
    private _initParticleColor;
    /**
     * @deprecated
     * @internal
     */
    private _initParticleFrame;
    /**
     * @deprecated
     * @internal
     */
    private static _initStartLife;
    /**
     * @deprecated
     * @internal
     */
    private _initParticleVelocity;
    /**
     * @deprecated
     * @internal
     */
    private _initParticleSize;
    /**
     * @deprecated
     * @internal
     */
    private _initParticleRotation;
}
