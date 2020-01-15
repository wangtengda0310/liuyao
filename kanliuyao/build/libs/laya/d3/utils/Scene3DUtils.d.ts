import { Node } from "../../display/Node";
import { RenderableSprite3D } from "../core/RenderableSprite3D";
import { Scene3D } from "../core/scene/Scene3D";
import { Sprite3D } from "../core/Sprite3D";
/**
 * <code>Utils3D</code> 类用于创建3D工具。
 */
export declare class Scene3DUtils {
    private static _createSprite3DInstance;
    private static _createComponentInstance;
    /**
     * @internal
     */
    static _createNodeByJson02(nodeData: any, outBatchSprites: RenderableSprite3D[]): Node;
    /**
     *@internal
     */
    static _parse(data: any, propertyParams?: any, constructParams?: any[]): Sprite3D;
    /**
     *@internal
     */
    static _parseScene(data: any, propertyParams?: any, constructParams?: any[]): Scene3D;
    /**
     * @internal
     */
    static _createNodeByJson(nodeData: any, outBatchSprites: RenderableSprite3D[]): Node;
}
