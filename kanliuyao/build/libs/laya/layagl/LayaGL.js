/**
 * @internal
 * 封装GL命令
 */
export class LayaGL {
}
LayaGL.ARRAY_BUFFER_TYPE_DATA = 0; //创建ArrayBuffer时的类型为Data
LayaGL.ARRAY_BUFFER_TYPE_CMD = 1; //创建ArrayBuffer时的类型为Command
LayaGL.ARRAY_BUFFER_REF_REFERENCE = 0; //创建ArrayBuffer时的类型为引用
LayaGL.ARRAY_BUFFER_REF_COPY = 1; //创建ArrayBuffer时的类型为拷贝
LayaGL.UPLOAD_SHADER_UNIFORM_TYPE_ID = 0; //data按照ID传入
LayaGL.UPLOAD_SHADER_UNIFORM_TYPE_DATA = 1; //data按照数据传入
