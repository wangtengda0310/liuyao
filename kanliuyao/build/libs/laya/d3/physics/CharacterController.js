import { Vector3 } from "../math/Vector3";
import { Physics3DUtils } from "../utils/Physics3DUtils";
import { Utils3D } from "../utils/Utils3D";
import { PhysicsComponent } from "./PhysicsComponent";
import { Physics3D } from "./Physics3D";
/**
 * <code>CharacterController</code> 类用于创建角色控制器。
 */
export class CharacterController extends PhysicsComponent {
    /**
     * 创建一个 <code>CharacterController</code> 实例。
     * @param stepheight 角色脚步高度。
     * @param upAxis 角色Up轴
     * @param collisionGroup 所属碰撞组。
     * @param canCollideWith 可产生碰撞的碰撞组。
     */
    constructor(stepheight = 0.1, upAxis = null, collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
        super(collisionGroup, canCollideWith);
        /** @internal */
        this._upAxis = new Vector3(0, 1, 0);
        /**@internal */
        this._maxSlope = 45.0;
        /**@internal */
        this._jumpSpeed = 10.0;
        /**@internal */
        this._fallSpeed = 55.0;
        /** @internal */
        this._gravity = new Vector3(0, -9.8 * 3, 0);
        /**@internal */
        this._btKinematicCharacter = null;
        this._stepHeight = stepheight;
        (upAxis) && (this._upAxis = upAxis);
    }
    /**
     * @internal
     */
    static __init__() {
        CharacterController._btTempVector30 = Physics3D._bullet.btVector3_create(0, 0, 0);
    }
    /**
     * 角色降落速度。
     */
    get fallSpeed() {
        return this._fallSpeed;
    }
    set fallSpeed(value) {
        this._fallSpeed = value;
        Physics3D._bullet.btKinematicCharacterController_setFallSpeed(this._btKinematicCharacter, value);
    }
    /**
     * 角色跳跃速度。
     */
    get jumpSpeed() {
        return this._jumpSpeed;
    }
    set jumpSpeed(value) {
        this._jumpSpeed = value;
        Physics3D._bullet.btKinematicCharacterController_setJumpSpeed(this._btKinematicCharacter, value);
    }
    /**
     * 重力。
     */
    get gravity() {
        return this._gravity;
    }
    set gravity(value) {
        this._gravity = value;
        var bt = Physics3D._bullet;
        var btGravity = CharacterController._btTempVector30;
        bt.btVector3_setValue(btGravity, -value.x, value.y, value.z);
        bt.btKinematicCharacterController_setGravity(this._btKinematicCharacter, btGravity);
    }
    /**
     * 最大坡度。
     */
    get maxSlope() {
        return this._maxSlope;
    }
    set maxSlope(value) {
        this._maxSlope = value;
        Physics3D._bullet.btKinematicCharacterController_setMaxSlope(this._btKinematicCharacter, (value / 180) * Math.PI);
    }
    /**
     * 角色是否在地表。
     */
    get isGrounded() {
        return Physics3D._bullet.btKinematicCharacterController_onGround(this._btKinematicCharacter);
    }
    /**
     * 角色行走的脚步高度，表示可跨越的最大高度。
     */
    get stepHeight() {
        return this._stepHeight;
    }
    set stepHeight(value) {
        this._stepHeight = value;
        this._constructCharacter();
    }
    /**
     * 角色的Up轴。
     */
    get upAxis() {
        return this._upAxis;
    }
    set upAxis(value) {
        this._upAxis = value;
        this._constructCharacter();
    }
    /**
     * @internal
     */
    _constructCharacter() {
        var bt = Physics3D._bullet;
        if (this._btKinematicCharacter)
            bt.btKinematicCharacterController_destroy(this._btKinematicCharacter);
        var btUpAxis = CharacterController._btTempVector30;
        bt.btVector3_setValue(btUpAxis, this._upAxis.x, this._upAxis.y, this._upAxis.z);
        this._btKinematicCharacter = bt.btKinematicCharacterController_create(this._btColliderObject, this._colliderShape._btShape, this._stepHeight, btUpAxis);
        this.fallSpeed = this._fallSpeed;
        this.maxSlope = this._maxSlope;
        this.jumpSpeed = this._jumpSpeed;
        this.gravity = this._gravity;
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _onShapeChange(colShape) {
        super._onShapeChange(colShape);
        this._constructCharacter();
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _onAdded() {
        var bt = Physics3D._bullet;
        var ghostObject = bt.btPairCachingGhostObject_create();
        bt.btCollisionObject_setUserIndex(ghostObject, this.id);
        bt.btCollisionObject_setCollisionFlags(ghostObject, PhysicsComponent.COLLISIONFLAGS_CHARACTER_OBJECT);
        this._btColliderObject = ghostObject;
        if (this._colliderShape)
            this._constructCharacter();
        super._onAdded();
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _addToSimulation() {
        this._simulation._characters.push(this);
        this._simulation._addCharacter(this, this._collisionGroup, this._canCollideWith);
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _removeFromSimulation() {
        this._simulation._removeCharacter(this);
        var characters = this._simulation._characters;
        characters.splice(characters.indexOf(this), 1);
    }
    /**
     * @inheritDoc
     * @override
     * @internal
     */
    _cloneTo(dest) {
        super._cloneTo(dest);
        var destCharacterController = dest;
        destCharacterController.stepHeight = this._stepHeight;
        destCharacterController.upAxis = this._upAxis;
        destCharacterController.maxSlope = this._maxSlope;
        destCharacterController.jumpSpeed = this._jumpSpeed;
        destCharacterController.fallSpeed = this._fallSpeed;
        destCharacterController.gravity = this._gravity;
    }
    /**
     * @inheritDoc
     * @internal
     * @override
     */
    _onDestroy() {
        Physics3D._bullet.btKinematicCharacterController_destroy(this._btKinematicCharacter);
        super._onDestroy();
        this._btKinematicCharacter = null;
    }
    /**
     * 通过指定移动向量移动角色。
     * @param	movement 移动向量。
     */
    move(movement) {
        var btMovement = CharacterController._btVector30;
        var bt = Physics3D._bullet;
        bt.btVector3_setValue(btMovement, -movement.x, movement.y, movement.z);
        bt.btKinematicCharacterController_setWalkDirection(this._btKinematicCharacter, btMovement);
    }
    /**
     * 跳跃。
     * @param velocity 跳跃速度。
     */
    jump(velocity = null) {
        var bt = Physics3D._bullet;
        var btVelocity = CharacterController._btVector30;
        if (velocity) {
            Utils3D._convertToBulletVec3(velocity, btVelocity, true);
            bt.btKinematicCharacterController_jump(this._btKinematicCharacter, btVelocity);
        }
        else {
            bt.btVector3_setValue(btVelocity, 0, 0, 0);
            bt.btKinematicCharacterController_jump(this._btKinematicCharacter, btVelocity);
        }
    }
}
/* UP轴_X轴。*/
CharacterController.UPAXIS_X = 0;
/* UP轴_Y轴。*/
CharacterController.UPAXIS_Y = 1;
/* UP轴_Z轴。*/
CharacterController.UPAXIS_Z = 2;
