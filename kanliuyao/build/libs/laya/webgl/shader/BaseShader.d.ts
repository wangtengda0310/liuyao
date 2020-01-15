import { Resource } from "../../resource/Resource";
/**
 * ...
 * @author ...
 */
export declare class BaseShader extends Resource {
    static activeShader: BaseShader | null;
    static bindShader: BaseShader;
    constructor();
}
