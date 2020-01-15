import { Mesh } from "../resource/models/Mesh";
import { SubMesh } from "../resource/models/SubMesh";
import { Byte } from "../../utils/Byte";
/**
 * @internal
 * <code>LoadModel</code> 类用于模型加载。
 */
export declare class LoadModelV04 {
    /**@internal */
    private static _BLOCK;
    /**@internal */
    private static _DATA;
    /**@internal */
    private static _strings;
    /**@internal */
    private static _readData;
    /**@internal */
    private static _version;
    /**@internal */
    private static _mesh;
    /**@internal */
    private static _subMeshes;
    /**@internal */
    private static _bindPoseIndices;
    /**
     * @internal
     */
    static parse(readData: Byte, version: string, mesh: Mesh, subMeshes: SubMesh[]): void;
    /**
     * @internal
     */
    private static _readString;
    /**
     * @internal
     */
    private static READ_DATA;
    /**
     * @internal
     */
    private static READ_BLOCK;
    /**
     * @internal
     */
    private static READ_STRINGS;
    /**
     * @internal
     */
    private static READ_MESH;
    /**
     * @internal
     */
    private static READ_SUBMESH;
}
