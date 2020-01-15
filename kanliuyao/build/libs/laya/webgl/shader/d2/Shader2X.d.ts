import { Shader } from "../Shader";
import { ShaderValue } from "../ShaderValue";
export declare class Shader2X extends Shader {
    _params2dQuick2: any[] | null;
    _shaderValueWidth: number;
    _shaderValueHeight: number;
    constructor(vs: string, ps: string, saveName?: any, nameMap?: any, bindAttrib?: any[] | null);
    /**
     * @override
     */
    protected _disposeResource(): void;
    upload2dQuick2(shaderValue: ShaderValue): void;
    _make2dQuick2(): any[];
    static create(vs: string, ps: string, saveName?: any, nameMap?: any, bindAttrib?: any[] | null): Shader;
}
