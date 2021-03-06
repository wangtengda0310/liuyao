import { Bitmap } from "./Bitmap";
import { Texture2D } from "./Texture2D";
import { BaseTexture } from "./BaseTexture";
/**
 * @private
 * <p> <code>HTMLImage</code> 用于创建 HTML Image 元素。</p>
 * <p>请使用 <code>HTMLImage.create()<code>获取新实例，不要直接使用 <code>new HTMLImage<code> 。</p>
 */
export class HTMLImage extends Bitmap {
}
/**
 * <p><b>不支持canvas了，所以备Texture2D替换了</p>
 * <p>创建一个 <code>HTMLImage</code> 实例。</p>
 * <p>请使用 <code>HTMLImage.create()<code>创建实例，不要直接使用 <code>new HTMLImage<code> 。</p>
 *
 */
HTMLImage.create = function (width, height, format) {
    var tex = new Texture2D(width, height, format, false, false);
    tex.wrapModeU = BaseTexture.WARPMODE_CLAMP;
    tex.wrapModeV = BaseTexture.WARPMODE_CLAMP;
    return tex;
};
