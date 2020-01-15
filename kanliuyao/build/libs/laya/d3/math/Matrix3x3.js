import { Vector3 } from "./Vector3";
/**
 * <code>Matrix3x3</code> 类用于创建3x3矩阵。
 */
export class Matrix3x3 {
    /**
     * 创建一个 <code>Matrix3x3</code> 实例。
     */
    constructor() {
        var e = this.elements = new Float32Array(9);
        e[0] = 1;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 1;
        e[5] = 0;
        e[6] = 0;
        e[7] = 0;
        e[8] = 1;
    }
    /**
     * 通过四元数创建旋转矩阵。
     * @param rotation 旋转四元数。
     * @param out 旋转矩阵。
     */
    static createRotationQuaternion(rotation, out) {
        var rotX = rotation.x;
        var rotY = rotation.y;
        var rotZ = rotation.z;
        var rotW = rotation.w;
        var xx = rotX * rotX;
        var yy = rotY * rotY;
        var zz = rotZ * rotZ;
        var xy = rotX * rotY;
        var zw = rotZ * rotW;
        var zx = rotZ * rotX;
        var yw = rotY * rotW;
        var yz = rotY * rotZ;
        var xw = rotX * rotW;
        var resultE = out.elements;
        resultE[0] = 1.0 - (2.0 * (yy + zz));
        resultE[1] = 2.0 * (xy + zw);
        resultE[2] = 2.0 * (zx - yw);
        resultE[3] = 2.0 * (xy - zw);
        resultE[4] = 1.0 - (2.0 * (zz + xx));
        resultE[5] = 2.0 * (yz + xw);
        resultE[6] = 2.0 * (zx + yw);
        resultE[7] = 2.0 * (yz - xw);
        resultE[8] = 1.0 - (2.0 * (yy + xx));
    }
    /**
     * 根据指定平移生成3x3矩阵
     * @param	tra 平移
     * @param	out 输出矩阵
     */
    static createFromTranslation(trans, out) {
        var e = out.elements;
        e[0] = 1;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 1;
        e[5] = 0;
        e[6] = trans.x;
        e[7] = trans.y;
        e[8] = 1;
    }
    /**
     * 根据指定旋转生成3x3矩阵
     * @param	rad  旋转值
     * @param	out 输出矩阵
     */
    static createFromRotation(rad, out) {
        var e = out.elements;
        var s = Math.sin(rad), c = Math.cos(rad);
        e[0] = c;
        e[1] = s;
        e[2] = 0;
        e[3] = -s;
        e[4] = c;
        e[5] = 0;
        e[6] = 0;
        e[7] = 0;
        e[8] = 1;
    }
    /**
     * 根据制定缩放生成3x3矩阵
     * @param	scale 缩放值
     * @param	out 输出矩阵
     */
    static createFromScaling(scale, out) {
        var e = out.elements;
        e[0] = scale.x;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = scale.y;
        e[5] = 0;
        e[6] = 0;
        e[7] = 0;
        e[8] = scale.z;
    }
    /**
     * 从4x4矩阵转换为一个3x3的矩阵（原则为upper-left,忽略第四行四列）
     * @param	sou 4x4源矩阵
     * @param	out 3x3输出矩阵
     */
    static createFromMatrix4x4(sou, out) {
        var souE = sou.elements;
        var outE = out.elements;
        outE[0] = souE[0];
        outE[1] = souE[1];
        outE[2] = souE[2];
        outE[3] = souE[4];
        outE[4] = souE[5];
        outE[5] = souE[6];
        outE[6] = souE[8];
        outE[7] = souE[9];
        outE[8] = souE[10];
    }
    /**
     *  两个3x3矩阵的相乘
     * @param	left 左矩阵
     * @param	right  右矩阵
     * @param	out  输出矩阵
     */
    static multiply(left, right, out) {
        var l = left.elements;
        var r = right.elements;
        var e = out.elements;
        var l11 = l[0], l12 = l[1], l13 = l[2];
        var l21 = l[3], l22 = l[4], l23 = l[5];
        var l31 = l[6], l32 = l[7], l33 = l[8];
        var r11 = r[0], r12 = r[1], r13 = r[2];
        var r21 = r[3], r22 = r[4], r23 = r[5];
        var r31 = r[6], r32 = r[7], r33 = r[8];
        e[0] = r11 * l11 + r12 * l21 + r13 * l31;
        e[1] = r11 * l12 + r12 * l22 + r13 * r32;
        e[2] = r11 * l13 + r12 * l23 + r13 * l33;
        e[3] = r21 * l11 + r22 * l21 + r23 * l31;
        e[4] = r21 * l12 + r22 * l22 + r23 * l32;
        e[5] = r21 * l13 + r22 * l23 + r23 * l33;
        e[6] = r31 * l11 + r32 * l21 + r33 * l31;
        e[7] = r31 * l12 + r32 * l22 + r33 * l32;
        e[8] = r31 * l13 + r32 * l23 + r33 * l33;
    }
    /**
     * 计算3x3矩阵的行列式
     * @return    矩阵的行列式
     */
    determinant() {
        var f = this.elements;
        var a00 = f[0], a01 = f[1], a02 = f[2];
        var a10 = f[3], a11 = f[4], a12 = f[5];
        var a20 = f[6], a21 = f[7], a22 = f[8];
        return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
    }
    /**
     * 通过一个二维向量转换3x3矩阵
     * @param	tra 转换向量
     * @param	out 输出矩阵
     */
    translate(trans, out) {
        var e = out.elements;
        var f = this.elements;
        var a00 = f[0], a01 = f[1], a02 = f[2];
        var a10 = f[3], a11 = f[4], a12 = f[5];
        var a20 = f[6], a21 = f[7], a22 = f[8];
        var x = trans.x, y = trans.y;
        e[0] = a00;
        e[1] = a01;
        e[2] = a02;
        e[3] = a10;
        e[4] = a11;
        e[5] = a12;
        e[6] = x * a00 + y * a10 + a20;
        e[7] = x * a01 + y * a11 + a21;
        e[8] = x * a02 + y * a12 + a22;
    }
    /**
     * 根据指定角度旋转3x3矩阵
     * @param	rad 旋转角度
     * @param	out 输出矩阵
     */
    rotate(rad, out) {
        var e = out.elements;
        var f = this.elements;
        var a00 = f[0], a01 = f[1], a02 = f[2];
        var a10 = f[3], a11 = f[4], a12 = f[5];
        var a20 = f[6], a21 = f[7], a22 = f[8];
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        e[0] = c * a00 + s * a10;
        e[1] = c * a01 + s * a11;
        e[2] = c * a02 + s * a12;
        e[3] = c * a10 - s * a00;
        e[4] = c * a11 - s * a01;
        e[5] = c * a12 - s * a02;
        e[6] = a20;
        e[7] = a21;
        e[8] = a22;
    }
    /**
     *根据制定缩放3x3矩阵
     * @param	scale 缩放值
     * @param	out 输出矩阵
     */
    scale(scale, out) {
        var e = out.elements;
        var f = this.elements;
        var x = scale.x, y = scale.y;
        e[0] = x * f[0];
        e[1] = x * f[1];
        e[2] = x * f[2];
        e[3] = y * f[3];
        e[4] = y * f[4];
        e[5] = y * f[5];
        e[6] = f[6];
        e[7] = f[7];
        e[8] = f[8];
    }
    /**
     * 计算3x3矩阵的逆矩阵
     * @param	out 输出的逆矩阵
     */
    invert(out) {
        var e = out.elements;
        var f = this.elements;
        var a00 = f[0], a01 = f[1], a02 = f[2];
        var a10 = f[3], a11 = f[4], a12 = f[5];
        var a20 = f[6], a21 = f[7], a22 = f[8];
        var b01 = a22 * a11 - a12 * a21;
        var b11 = -a22 * a10 + a12 * a20;
        var b21 = a21 * a10 - a11 * a20;
        // Calculate the determinant
        var det = a00 * b01 + a01 * b11 + a02 * b21;
        if (!det) {
            out = null;
        }
        det = 1.0 / det;
        e[0] = b01 * det;
        e[1] = (-a22 * a01 + a02 * a21) * det;
        e[2] = (a12 * a01 - a02 * a11) * det;
        e[3] = b11 * det;
        e[4] = (a22 * a00 - a02 * a20) * det;
        e[5] = (-a12 * a00 + a02 * a10) * det;
        e[6] = b21 * det;
        e[7] = (-a21 * a00 + a01 * a20) * det;
        e[8] = (a11 * a00 - a01 * a10) * det;
    }
    /**
     * 计算3x3矩阵的转置矩阵
     * @param 	out 输出矩阵
     */
    transpose(out) {
        var e = out.elements;
        var f = this.elements;
        if (out === this) {
            var a01 = f[1], a02 = f[2], a12 = f[5];
            e[1] = f[3];
            e[2] = f[6];
            e[3] = a01;
            e[5] = f[7];
            e[6] = a02;
            e[7] = a12;
        }
        else {
            e[0] = f[0];
            e[1] = f[3];
            e[2] = f[6];
            e[3] = f[1];
            e[4] = f[4];
            e[5] = f[7];
            e[6] = f[2];
            e[7] = f[5];
            e[8] = f[8];
        }
    }
    /** 设置已有的矩阵为单位矩阵*/
    identity() {
        var e = this.elements;
        e[0] = 1;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 1;
        e[5] = 0;
        e[6] = 0;
        e[7] = 0;
        e[8] = 1;
    }
    /**
     * 克隆。
     * @param	destObject 克隆源。
     */
    cloneTo(destObject) {
        var i, s, d;
        s = this.elements;
        d = destObject.elements;
        if (s === d) {
            return;
        }
        for (i = 0; i < 9; ++i) {
            d[i] = s[i];
        }
    }
    /**
     * 克隆。
     * @return	 克隆副本。
     */
    clone() {
        var dest = new Matrix3x3();
        this.cloneTo(dest);
        return dest;
    }
    /**
     * 计算观察3x3矩阵
     * @param	eye    观察者位置
     * @param	target 目标位置
     * @param	up     上向量
     * @param	out    输出3x3矩阵
     */
    static lookAt(eye, target, up, out) {
        Vector3.subtract(eye, target, Matrix3x3._tempV30); //WebGL为右手坐标系统
        Vector3.normalize(Matrix3x3._tempV30, Matrix3x3._tempV30);
        Vector3.cross(up, Matrix3x3._tempV30, Matrix3x3._tempV31);
        Vector3.normalize(Matrix3x3._tempV31, Matrix3x3._tempV31);
        Vector3.cross(Matrix3x3._tempV30, Matrix3x3._tempV31, Matrix3x3._tempV32);
        var v0 = Matrix3x3._tempV30;
        var v1 = Matrix3x3._tempV31;
        var v2 = Matrix3x3._tempV32;
        var me = out.elements;
        me[0] = v1.x;
        me[3] = v1.y;
        me[6] = v1.z;
        me[1] = v2.x;
        me[4] = v2.y;
        me[7] = v2.z;
        me[2] = v0.x;
        me[5] = v0.y;
        me[8] = v0.z;
    }
}
/**默认矩阵,禁止修改*/
Matrix3x3.DEFAULT = new Matrix3x3();
/** @internal */
Matrix3x3._tempV30 = new Vector3();
/** @internal */
Matrix3x3._tempV31 = new Vector3();
/** @internal */
Matrix3x3._tempV32 = new Vector3();
