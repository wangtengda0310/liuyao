import { VertexMesh } from "../graphics/Vertex/VertexMesh";
import { MeshSprite3DShaderDeclaration } from "./MeshSprite3DShaderDeclaration";
/**
 * <code>MeshFilter</code> 类用于创建网格过滤器。
 */
export class MeshFilter {
    /**
     * 创建一个新的 <code>MeshFilter</code> 实例。
     * @param owner 所属网格精灵。
     */
    constructor(owner) {
        this._owner = owner;
    }
    /**
     * 共享网格。
     */
    get sharedMesh() {
        return this._sharedMesh;
    }
    set sharedMesh(value) {
        if (this._sharedMesh !== value) {
            var defineDatas = this._owner._render._shaderValues;
            var lastValue = this._sharedMesh;
            if (lastValue) {
                lastValue._removeReference();
                this._getMeshDefine(lastValue, MeshFilter._meshVerticeDefine);
                for (var i = 0, n = MeshFilter._meshVerticeDefine.length; i < n; i++)
                    defineDatas.removeDefine(MeshFilter._meshVerticeDefine[i]);
            }
            if (value) {
                value._addReference();
                this._getMeshDefine(value, MeshFilter._meshVerticeDefine);
                for (var i = 0, n = MeshFilter._meshVerticeDefine.length; i < n; i++)
                    defineDatas.addDefine(MeshFilter._meshVerticeDefine[i]);
            }
            this._owner._render._onMeshChange(value);
            this._sharedMesh = value;
        }
    }
    /**
     * @internal
     * @param mesh
     * @param out
     */
    _getMeshDefine(mesh, out) {
        out.length = 0;
        var define;
        for (var i = 0, n = mesh._subMeshes.length; i < n; i++) {
            var subMesh = mesh.getSubMesh(i);
            var vertexElements = subMesh._vertexBuffer._vertexDeclaration._vertexElements;
            for (var j = 0, m = vertexElements.length; j < m; j++) {
                var vertexElement = vertexElements[j];
                var name = vertexElement._elementUsage;
                switch (name) {
                    case VertexMesh.MESH_COLOR0:
                        out.push(MeshSprite3DShaderDeclaration.SHADERDEFINE_COLOR);
                        break;
                    case VertexMesh.MESH_TEXTURECOORDINATE0:
                        out.push(MeshSprite3DShaderDeclaration.SHADERDEFINE_UV0);
                        break;
                    case VertexMesh.MESH_TEXTURECOORDINATE1:
                        out.push(MeshSprite3DShaderDeclaration.SHADERDEFINE_UV1);
                        break;
                }
            }
        }
        return define;
    }
    /**
     * @inheritDoc
     */
    destroy() {
        this._owner = null;
        (this._sharedMesh) && (this._sharedMesh._removeReference(), this._sharedMesh = null);
    }
}
/** @internal */
MeshFilter._meshVerticeDefine = [];
