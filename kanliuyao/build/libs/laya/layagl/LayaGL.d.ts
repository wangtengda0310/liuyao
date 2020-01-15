import { LayaGPU } from "../webgl/LayaGPU";
/**
 * @internal
 * 封装GL命令
 */
export declare class LayaGL {
    static ARRAY_BUFFER_TYPE_DATA: number;
    static ARRAY_BUFFER_TYPE_CMD: number;
    static ARRAY_BUFFER_REF_REFERENCE: number;
    static ARRAY_BUFFER_REF_COPY: number;
    static UPLOAD_SHADER_UNIFORM_TYPE_ID: number;
    static UPLOAD_SHADER_UNIFORM_TYPE_DATA: number;
    static instance: WebGLRenderingContext;
    static layaGPUInstance: LayaGPU;
}
