import { Vector3 } from "../math/Vector3";
import { PhysicsComponent } from "./PhysicsComponent";
import { ColliderShape } from "./shape/ColliderShape";
import { Component } from "../../components/Component";
/**
 * <code>CharacterController</code> 类用于创建角色控制器。
 */
export declare class CharacterController extends PhysicsComponent {
    /** @internal */
    private static _btTempVector30;
    /**
     * @internal
     */
    static __init__(): void;
    static UPAXIS_X: number;
    static UPAXIS_Y: number;
    static UPAXIS_Z: number;
    /** @internal */
    private _stepHeight;
    /** @internal */
    private _upAxis;
    /**@internal */
    private _maxSlope;
    /**@internal */
    private _jumpSpeed;
    /**@internal */
    private _fallSpeed;
    /** @internal */
    private _gravity;
    /**@internal */
    _btKinematicCharacter: number;
    /**
     * 角色降落速度。
     */
    fallSpeed: number;
    /**
     * 角色跳跃速度。
     */
    jumpSpeed: number;
    /**
     * 重力。
     */
    gravity: Vector3;
    /**
     * 最大坡度。
     */
    maxSlope: number;
    /**
     * 角色是否在地表。
     */
    readonly isGrounded: boolean;
    /**
     * 角色行走的脚步高度，表示可跨越的最大高度。
     */
    stepHeight: number;
    /**
     * 角色的Up轴。
     */
    upAxis: Vector3;
    /**
     * 创建一个 <code>CharacterController</code> 实例。
     * @param stepheight 角色脚步高度。
     * @param upAxis 角色Up轴
     * @param collisionGroup 所属碰撞组。
     * @param canCollideWith 可产生碰撞的碰撞组。
     */
    constructor(stepheight?: number, upAxis?: Vector3, collisionGroup?: number, canCollideWith?: number);
    /**
     * @internal
     */
    private _constructCharacter;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _onShapeChange(colShape: ColliderShape): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _onAdded(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _addToSimulation(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _removeFromSimulation(): void;
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _cloneTo(dest: Component): void;
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    protected _onDestroy(): void;
    /**
     * 通过指定移动向量移动角色。
     * @param	movement 移动向量。
     */
    move(movement: Vector3): void;
    /**
     * 跳跃。
     * @param velocity 跳跃速度。
     */
    jump(velocity?: Vector3): void;
}
