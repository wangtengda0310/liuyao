import { Utils } from "../../utils/Utils";
/**
 * 用于UV转换的工具类
 * @internal
 */
export class UVTools {
    constructor() {
    }
    //[0, 0, 1.0, 0, 1.0, 1.0, 0, 1.0]
    /**
     * 将相对于大图图集的小UV转换成相对某个大图的UV
     * @param	bigUV 某个大图的UV
     * @param	smallUV 大图图集中的UV
     * @return 相对于某个大图的UV
     */
    //TODO:coverage
    static getRelativeUV(bigUV, smallUV, rst = null) {
        var startX = bigUV[0];
        var width = bigUV[2] - bigUV[0];
        var startY = bigUV[1];
        var height = bigUV[5] - bigUV[1];
        if (!rst)
            rst = [];
        rst.length = smallUV.length;
        var i, len;
        len = rst.length;
        var dWidth = 1 / width;
        var dHeight = 1 / height;
        for (i = 0; i < len; i += 2) {
            rst[i] = (smallUV[i] - startX) * dWidth;
            rst[i + 1] = (smallUV[i + 1] - startY) * dHeight;
        }
        return rst;
    }
    /**
     * 将相对于某个大图的UV转换成相对于大图图集的UV
     * @param	bigUV 某个大图的UV
     * @param	smallUV 相对于某个大图的UV
     * @return 相对于大图图集的UV
     */
    //TODO:coverage
    static getAbsoluteUV(bigUV, smallUV, rst = null) {
        if (bigUV[0] == 0 && bigUV[1] == 0 && bigUV[4] == 1 && bigUV[5] == 1) {
            if (rst) {
                Utils.copyArray(rst, smallUV);
                return rst;
            }
            else {
                return smallUV;
            }
        }
        var startX = bigUV[0];
        var width = bigUV[2] - bigUV[0];
        var startY = bigUV[1];
        var height = bigUV[5] - bigUV[1];
        if (!rst)
            rst = [];
        rst.length = smallUV.length;
        var i, len;
        len = rst.length;
        for (i = 0; i < len; i += 2) {
            rst[i] = smallUV[i] * width + startX;
            rst[i + 1] = smallUV[i + 1] * height + startY;
        }
        return rst;
    }
}
