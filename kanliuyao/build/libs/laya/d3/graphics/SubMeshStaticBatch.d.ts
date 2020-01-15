import { IDispose } from "../../resource/IDispose";
import { GeometryElement } from "../core/GeometryElement";
import { RenderContext3D } from "../core/render/RenderContext3D";
import { RenderableSprite3D } from "../core/RenderableSprite3D";
import { Sprite3D } from "../core/Sprite3D";
import { VertexDeclaration } from "./VertexDeclaration";
/**
 * @internal
 * <code>SubMeshStaticBatch</code> 类用于网格静态合并。
 */
export declare class SubMeshStaticBatch extends GeometryElement implements IDispose {
    /** @internal */
    private static _tempVector30;
    /** @internal */
    private static _tempVector31;
    /** @internal */
    private static _tempQuaternion0;
    /** @internal */
    private static _tempMatrix4x40;
    /** @internal */
    private static _tempMatrix4x41;
    /** @internal */
    private static _tempMatrix4x42;
    /** @internal */
    static maxBatchVertexCount: number;
    /** @internal */
    private static _batchIDCounter;
    /** @internal */
    private _currentBatchVertexCount;
    /** @internal */
    private _currentBatchIndexCount;
    /** @internal */
    private _vertexDeclaration;
    /**@internal */
    private _vertexBuffer;
    /**@internal */
    private _indexBuffer;
    /** @internal */
    private _bufferState;
    /** @internal */
    _batchElements: RenderableSprite3D[];
    /** @internal */
    _batchID: number;
    /** @internal [只读]*/
    batchOwner: Sprite3D;
    /**
     * 创建一个 <code>SubMeshStaticBatch</code> 实例。
     */
    constructor(batchOwner: Sprite3D, vertexDeclaration: VertexDeclaration);
    /**
     * @internal
     */
    private _getStaticBatchBakedVertexs;
    /**
     * @internal
     */
    addTest(sprite: RenderableSprite3D): boolean;
    /**
     * @internal
     */
    add(sprite: RenderableSprite3D): void;
    /**
     * @internal
     */
    remove(sprite: RenderableSprite3D): void;
    /**
     * @internal
     */
    finishInit(): void;
    /**
     * @inheritDoc
     * @override
     */
    _render(state: RenderContext3D): void;
    /**
     * @internal
     */
    dispose(): void;
}
