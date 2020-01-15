import { LayaGL } from "../../layagl/LayaGL";
import { BufferStateBase } from "../../webgl/BufferStateBase";
/**
 * @internal
 * <code>BufferState</code> 类用于实现渲染所需的Buffer状态集合。
 */
export class BufferState extends BufferStateBase {
    /**
     * 创建一个 <code>BufferState</code> 实例。
     */
    constructor() {
        super();
    }
    /**
     * vertexBuffer的vertexDeclaration不能为空,该函数比较消耗性能，建议初始化时使用。
     */
    applyVertexBuffer(vertexBuffer) {
        if (BufferStateBase._curBindedBufferState === this) {
            var gl = LayaGL.instance;
            var verDec = vertexBuffer.vertexDeclaration;
            var valueData = verDec._shaderValues.getData();
            this.vertexDeclaration = verDec;
            vertexBuffer.bind();
            for (var k in valueData) {
                var loc = parseInt(k);
                var attribute = valueData[k];
                gl.enableVertexAttribArray(loc);
                gl.vertexAttribPointer(loc, attribute[0], attribute[1], !!attribute[2], attribute[3], attribute[4]);
            }
        }
        else {
            throw "BufferState: must call bind() function first.";
        }
    }
    /**
     * vertexBuffers中的vertexDeclaration不能为空,该函数比较消耗性能，建议初始化时使用。
     */
    applyVertexBuffers(vertexBuffers) {
        if (BufferStateBase._curBindedBufferState === this) {
            var gl = LayaGL.instance;
            for (var i = 0, n = vertexBuffers.length; i < n; i++) {
                var verBuf = vertexBuffers[i];
                var verDec = verBuf.vertexDeclaration;
                var valueData = verDec._shaderValues.getData();
                verBuf.bind();
                for (var k in valueData) {
                    var loc = parseInt(k);
                    var attribute = valueData[k];
                    gl.enableVertexAttribArray(loc);
                    gl.vertexAttribPointer(loc, attribute[0], attribute[1], !!attribute[2], attribute[3], attribute[4]);
                }
            }
        }
        else {
            throw "BufferState: must call bind() function first.";
        }
    }
    applyInstanceVertexBuffer(vertexBuffer) {
        if (LayaGL.layaGPUInstance.supportInstance()) { //判断是否支持Instance
            if (BufferStateBase._curBindedBufferState === this) {
                var gl = LayaGL.instance;
                var verDec = vertexBuffer.vertexDeclaration;
                var valueData = verDec._shaderValues.getData();
                vertexBuffer.bind();
                for (var k in valueData) {
                    var loc = parseInt(k);
                    var attribute = valueData[k];
                    gl.enableVertexAttribArray(loc);
                    gl.vertexAttribPointer(loc, attribute[0], attribute[1], !!attribute[2], attribute[3], attribute[4]);
                    LayaGL.layaGPUInstance.vertexAttribDivisor(loc, 1);
                }
            }
            else {
                throw "BufferState: must call bind() function first.";
            }
        }
    }
    applyIndexBuffer(indexBuffer) {
        if (BufferStateBase._curBindedBufferState === this) {
            if (this._bindedIndexBuffer !== indexBuffer) {
                indexBuffer._bindForVAO(); //TODO:可和vao合并bind
                this._bindedIndexBuffer = indexBuffer;
            }
        }
        else {
            throw "BufferState: must call bind() function first.";
        }
    }
}
