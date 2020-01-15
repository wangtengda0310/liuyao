export var TextureFormat;
(function (TextureFormat) {
    /**纹理格式_R8G8B8。*/
    TextureFormat[TextureFormat["R8G8B8"] = 0] = "R8G8B8";
    /**纹理格式_R8G8B8A8。*/
    TextureFormat[TextureFormat["R8G8B8A8"] = 1] = "R8G8B8A8";
    /**纹理格式_ALPHA8。*/
    TextureFormat[TextureFormat["Alpha8"] = 2] = "Alpha8";
    /**纹理格式_DXT1。*/
    TextureFormat[TextureFormat["DXT1"] = 3] = "DXT1";
    /**纹理格式_DXT5。*/
    TextureFormat[TextureFormat["DXT5"] = 4] = "DXT5";
    /**纹理格式_ETC2RGB。*/
    TextureFormat[TextureFormat["ETC1RGB"] = 5] = "ETC1RGB";
    ///**纹理格式_ETC2RGB。*/
    //ETC2RGB:int = 6;
    ///**纹理格式_ETC2RGBA。*/
    //ETC2RGBA:int = 7;
    /**纹理格式_ETC2RGB_PUNCHTHROUGHALPHA。*/
    //ETC2RGB_PUNCHTHROUGHALPHA:int = 8;
    /**纹理格式_PVRTCRGB_2BPPV。*/
    TextureFormat[TextureFormat["PVRTCRGB_2BPPV"] = 9] = "PVRTCRGB_2BPPV";
    /**纹理格式_PVRTCRGBA_2BPPV。*/
    TextureFormat[TextureFormat["PVRTCRGBA_2BPPV"] = 10] = "PVRTCRGBA_2BPPV";
    /**纹理格式_PVRTCRGB_4BPPV。*/
    TextureFormat[TextureFormat["PVRTCRGB_4BPPV"] = 11] = "PVRTCRGB_4BPPV";
    /**纹理格式_PVRTCRGBA_4BPPV。*/
    TextureFormat[TextureFormat["PVRTCRGBA_4BPPV"] = 12] = "PVRTCRGBA_4BPPV";
    /**RGBA格式纹理,每个通道32位浮点数。*/
    TextureFormat[TextureFormat["R32G32B32A32"] = 15] = "R32G32B32A32";
})(TextureFormat || (TextureFormat = {}));
