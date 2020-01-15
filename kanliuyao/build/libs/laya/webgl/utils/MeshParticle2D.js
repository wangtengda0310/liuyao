import { Mesh2D } from "./Mesh2D";
import { LayaGL } from "../../layagl/LayaGL";
/**
 * drawImage，fillRect等会用到的简单的mesh。每次添加必然是一个四边形。
 */
export class MeshParticle2D extends Mesh2D {
    //TODO:coverage
    constructor(maxNum) {
        super(MeshParticle2D.const_stride, maxNum * 4 * MeshParticle2D.const_stride, 4); //ib 先4
        this.canReuse = true;
        this.setAttributes(MeshParticle2D._fixattriInfo);
        this.createQuadIB(maxNum);
        this._quadNum = maxNum;
    }
    static __init__() {
        var gl = LayaGL.instance;
        MeshParticle2D._fixattriInfo = [gl.FLOAT, 4, 0,
            gl.FLOAT, 3, 16,
            gl.FLOAT, 3, 28,
            gl.FLOAT, 4, 40,
            gl.FLOAT, 4, 56,
            gl.FLOAT, 3, 72,
            gl.FLOAT, 2, 84,
            gl.FLOAT, 4, 92,
            gl.FLOAT, 1, 108,
            gl.FLOAT, 1, 112];
    }
    setMaxParticleNum(maxNum) {
        this._vb._resizeBuffer(maxNum * 4 * MeshParticle2D.const_stride, false);
        this.createQuadIB(maxNum);
    }
    /**
     *
     */
    //TODO:coverage
    static getAMesh(maxNum) {
        //console.log('getmesh');
        if (MeshParticle2D._POOL.length) {
            var ret = MeshParticle2D._POOL.pop();
            ret.setMaxParticleNum(maxNum);
            return ret;
        }
        return new MeshParticle2D(maxNum);
    }
    /**
     * 把本对象放到回收池中，以便getMesh能用。
     * @override
     */
    //TODO:coverage
    /*override*/ releaseMesh() {
        ;
        this._vb.setByteLength(0);
        this.vertNum = 0;
        this.indexNum = 0;
        //_applied = false;
        MeshParticle2D._POOL.push(this);
    }
    //TODO:coverage
    /**
     * @override
     */
    /*override*/ destroy() {
        this._ib.destroy();
        this._vb.destroy();
        this._vb.deleteBuffer();
        //ib用deletebuffer么
    }
}
MeshParticle2D.const_stride = 116;
MeshParticle2D._POOL = [];
