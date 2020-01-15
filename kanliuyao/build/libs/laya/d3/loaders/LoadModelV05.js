import { IndexBuffer3D } from "../graphics/IndexBuffer3D";
import { VertexMesh } from "../graphics/Vertex/VertexMesh";
import { VertexBuffer3D } from "../graphics/VertexBuffer3D";
import { HalfFloatUtils } from "../math/HalfFloatUtils";
import { Matrix4x4 } from "../math/Matrix4x4";
import { SubMesh } from "../resource/models/SubMesh";
import { LayaGL } from "../../layagl/LayaGL";
import { IndexFormat } from "../graphics/IndexFormat";
/**
 * @internal
 * <code>LoadModelV05</code> 类用于模型加载。
 */
export class LoadModelV05 {
    /**
     * @internal
     */
    static parse(readData, version, mesh, subMeshes) {
        LoadModelV05._mesh = mesh;
        LoadModelV05._subMeshes = subMeshes;
        LoadModelV05._version = version;
        LoadModelV05._readData = readData;
        LoadModelV05.READ_DATA();
        LoadModelV05.READ_BLOCK();
        LoadModelV05.READ_STRINGS();
        for (var i = 0, n = LoadModelV05._BLOCK.count; i < n; i++) {
            LoadModelV05._readData.pos = LoadModelV05._BLOCK.blockStarts[i];
            var index = LoadModelV05._readData.getUint16();
            var blockName = LoadModelV05._strings[index];
            var fn = LoadModelV05["READ_" + blockName];
            if (fn == null)
                throw new Error("model file err,no this function:" + index + " " + blockName);
            else
                fn.call(null);
        }
        LoadModelV05._mesh._bindPoseIndices = new Uint16Array(LoadModelV05._bindPoseIndices);
        LoadModelV05._bindPoseIndices.length = 0;
        LoadModelV05._strings.length = 0;
        LoadModelV05._readData = null;
        LoadModelV05._version = null;
        LoadModelV05._mesh = null;
        LoadModelV05._subMeshes = null;
    }
    /**
     * @internal
     */
    static _readString() {
        return LoadModelV05._strings[LoadModelV05._readData.getUint16()];
    }
    /**
     * @internal
     */
    static READ_DATA() {
        LoadModelV05._DATA.offset = LoadModelV05._readData.getUint32();
        LoadModelV05._DATA.size = LoadModelV05._readData.getUint32();
    }
    /**
     * @internal
     */
    static READ_BLOCK() {
        var count = LoadModelV05._BLOCK.count = LoadModelV05._readData.getUint16();
        var blockStarts = LoadModelV05._BLOCK.blockStarts = [];
        var blockLengths = LoadModelV05._BLOCK.blockLengths = [];
        for (var i = 0; i < count; i++) {
            blockStarts.push(LoadModelV05._readData.getUint32());
            blockLengths.push(LoadModelV05._readData.getUint32());
        }
    }
    /**
     * @internal
     */
    static READ_STRINGS() {
        var offset = LoadModelV05._readData.getUint32();
        var count = LoadModelV05._readData.getUint16();
        var prePos = LoadModelV05._readData.pos;
        LoadModelV05._readData.pos = offset + LoadModelV05._DATA.offset;
        for (var i = 0; i < count; i++)
            LoadModelV05._strings[i] = LoadModelV05._readData.readUTFString();
        LoadModelV05._readData.pos = prePos;
    }
    /**
     * @internal
     */
    static READ_MESH() {
        var gl = LayaGL.instance;
        var i, n;
        var memorySize = 0;
        var name = LoadModelV05._readString();
        var reader = LoadModelV05._readData;
        var arrayBuffer = reader.__getBuffer();
        var vertexBufferCount = reader.getInt16();
        var offset = LoadModelV05._DATA.offset;
        for (i = 0; i < vertexBufferCount; i++) { //TODO:始终为1
            var vbStart = offset + reader.getUint32();
            var vertexCount = reader.getUint32();
            var vertexFlag = LoadModelV05._readString();
            var vertexDeclaration = VertexMesh.getVertexDeclaration(vertexFlag, false);
            var vertexStride = vertexDeclaration.vertexStride;
            var vertexData;
            var floatData;
            var uint8Data;
            var subVertexFlags = vertexFlag.split(",");
            var subVertexCount = subVertexFlags.length;
            var mesh = LoadModelV05._mesh;
            switch (LoadModelV05._version) {
                case "LAYAMODEL:05":
                    vertexData = arrayBuffer.slice(vbStart, vbStart + vertexCount * vertexStride);
                    floatData = new Float32Array(vertexData);
                    uint8Data = new Uint8Array(vertexData);
                    break;
                case "LAYAMODEL:COMPRESSION_05":
                    vertexData = new ArrayBuffer(vertexStride * vertexCount);
                    floatData = new Float32Array(vertexData);
                    uint8Data = new Uint8Array(vertexData);
                    var lastPosition = reader.pos;
                    reader.pos = vbStart;
                    for (var j = 0; j < vertexCount; j++) {
                        var subOffset;
                        var verOffset = j * vertexStride;
                        for (var k = 0; k < subVertexCount; k++) {
                            switch (subVertexFlags[k]) {
                                case "POSITION":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    floatData[subOffset + 1] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    floatData[subOffset + 2] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    verOffset += 12;
                                    break;
                                case "NORMAL":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = reader.getUint8() / 127.5 - 1;
                                    floatData[subOffset + 1] = reader.getUint8() / 127.5 - 1;
                                    floatData[subOffset + 2] = reader.getUint8() / 127.5 - 1;
                                    verOffset += 12;
                                    break;
                                case "COLOR":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = reader.getUint8() / 255;
                                    floatData[subOffset + 1] = reader.getUint8() / 255;
                                    floatData[subOffset + 2] = reader.getUint8() / 255;
                                    floatData[subOffset + 3] = reader.getUint8() / 255;
                                    verOffset += 16;
                                    break;
                                case "UV":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    floatData[subOffset + 1] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    verOffset += 8;
                                    break;
                                case "UV1":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    floatData[subOffset + 1] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    verOffset += 8;
                                    break;
                                case "BLENDWEIGHT":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = reader.getUint8() / 255;
                                    floatData[subOffset + 1] = reader.getUint8() / 255;
                                    floatData[subOffset + 2] = reader.getUint8() / 255;
                                    floatData[subOffset + 3] = reader.getUint8() / 255;
                                    verOffset += 16;
                                    break;
                                case "BLENDINDICES":
                                    uint8Data[verOffset] = reader.getUint8();
                                    uint8Data[verOffset + 1] = reader.getUint8();
                                    uint8Data[verOffset + 2] = reader.getUint8();
                                    uint8Data[verOffset + 3] = reader.getUint8();
                                    verOffset += 4;
                                    break;
                                case "TANGENT":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = reader.getUint8() / 127.5 - 1;
                                    floatData[subOffset + 1] = reader.getUint8() / 127.5 - 1;
                                    floatData[subOffset + 2] = reader.getUint8() / 127.5 - 1;
                                    floatData[subOffset + 3] = reader.getUint8() / 127.5 - 1;
                                    verOffset += 16;
                                    break;
                            }
                        }
                    }
                    reader.pos = lastPosition;
                    break;
            }
            var vertexBuffer = new VertexBuffer3D(vertexData.byteLength, gl.STATIC_DRAW, true);
            vertexBuffer.vertexDeclaration = vertexDeclaration;
            vertexBuffer.setData(vertexData);
            var vertexCount = vertexBuffer._byteLength / vertexDeclaration.vertexStride;
            //TDDO:是否加标记
            if (vertexCount > 65535)
                mesh._indexFormat = IndexFormat.UInt32;
            else
                mesh._indexFormat = IndexFormat.UInt16;
            mesh._vertexBuffer = vertexBuffer;
            mesh._vertexCount += vertexCount;
            memorySize += floatData.length * 4;
        }
        var ibStart = offset + reader.getUint32();
        var ibLength = reader.getUint32();
        var ibDatas;
        if (mesh.indexFormat == IndexFormat.UInt32)
            ibDatas = new Uint32Array(arrayBuffer.slice(ibStart, ibStart + ibLength));
        else
            ibDatas = new Uint16Array(arrayBuffer.slice(ibStart, ibStart + ibLength));
        var indexBuffer = new IndexBuffer3D(mesh.indexFormat, ibDatas.length, gl.STATIC_DRAW, true);
        indexBuffer.setData(ibDatas);
        mesh._indexBuffer = indexBuffer;
        mesh._setBuffer(mesh._vertexBuffer, indexBuffer);
        memorySize += indexBuffer.indexCount * 2;
        mesh._setCPUMemory(memorySize);
        mesh._setGPUMemory(memorySize);
        var boneNames = mesh._boneNames = [];
        var boneCount = reader.getUint16();
        boneNames.length = boneCount;
        for (i = 0; i < boneCount; i++)
            boneNames[i] = LoadModelV05._strings[reader.getUint16()]; //[兼容性]
        var bindPoseDataStart = reader.getUint32();
        var bindPoseDataLength = reader.getUint32();
        var bindPoseDatas = new Float32Array(arrayBuffer.slice(offset + bindPoseDataStart, offset + bindPoseDataStart + bindPoseDataLength));
        var bindPoseFloatCount = bindPoseDatas.length;
        var bindPoseCount = bindPoseFloatCount / 16;
        var bindPoseBuffer = mesh._inverseBindPosesBuffer = new ArrayBuffer(bindPoseFloatCount * 4); //TODO:[NATIVE]临时
        mesh._inverseBindPoses = [];
        for (i = 0; i < bindPoseFloatCount; i += 16) {
            var inverseGlobalBindPose = new Matrix4x4(bindPoseDatas[i + 0], bindPoseDatas[i + 1], bindPoseDatas[i + 2], bindPoseDatas[i + 3], bindPoseDatas[i + 4], bindPoseDatas[i + 5], bindPoseDatas[i + 6], bindPoseDatas[i + 7], bindPoseDatas[i + 8], bindPoseDatas[i + 9], bindPoseDatas[i + 10], bindPoseDatas[i + 11], bindPoseDatas[i + 12], bindPoseDatas[i + 13], bindPoseDatas[i + 14], bindPoseDatas[i + 15], new Float32Array(bindPoseBuffer, i * 4, 16));
            mesh._inverseBindPoses[i / 16] = inverseGlobalBindPose;
        }
        return true;
    }
    /**
     * @internal
     */
    static READ_SUBMESH() {
        var reader = LoadModelV05._readData;
        var arrayBuffer = reader.__getBuffer();
        var subMesh = new SubMesh(LoadModelV05._mesh);
        reader.getInt16(); //TODO:vbIndex
        var ibStart = reader.getUint32();
        var ibCount = reader.getUint32();
        var indexBuffer = LoadModelV05._mesh._indexBuffer;
        subMesh._indexBuffer = indexBuffer;
        subMesh._setIndexRange(ibStart, ibCount);
        var vertexBuffer = LoadModelV05._mesh._vertexBuffer;
        subMesh._vertexBuffer = vertexBuffer;
        var offset = LoadModelV05._DATA.offset;
        var subIndexBufferStart = subMesh._subIndexBufferStart;
        var subIndexBufferCount = subMesh._subIndexBufferCount;
        var boneIndicesList = subMesh._boneIndicesList;
        var drawCount = reader.getUint16();
        subIndexBufferStart.length = drawCount;
        subIndexBufferCount.length = drawCount;
        boneIndicesList.length = drawCount;
        var pathMarks = LoadModelV05._mesh._skinDataPathMarks;
        var bindPoseIndices = LoadModelV05._bindPoseIndices;
        var subMeshIndex = LoadModelV05._subMeshes.length;
        for (var i = 0; i < drawCount; i++) {
            subIndexBufferStart[i] = reader.getUint32();
            subIndexBufferCount[i] = reader.getUint32();
            var boneDicofs = reader.getUint32();
            var boneDicCount = reader.getUint32();
            var boneIndices = boneIndicesList[i] = new Uint16Array(arrayBuffer.slice(offset + boneDicofs, offset + boneDicofs + boneDicCount));
            for (var j = 0, m = boneIndices.length; j < m; j++) {
                var index = boneIndices[j];
                var combineIndex = bindPoseIndices.indexOf(index);
                if (combineIndex === -1) {
                    boneIndices[j] = bindPoseIndices.length;
                    bindPoseIndices.push(index);
                    pathMarks.push([subMeshIndex, i, j]);
                }
                else {
                    boneIndices[j] = combineIndex;
                }
            }
        }
        LoadModelV05._subMeshes.push(subMesh);
        return true;
    }
}
/**@internal */
LoadModelV05._BLOCK = { count: 0 };
/**@internal */
LoadModelV05._DATA = { offset: 0, size: 0 };
/**@internal */
LoadModelV05._strings = [];
/**@internal */
LoadModelV05._bindPoseIndices = [];
