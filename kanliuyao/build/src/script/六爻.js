export default class 六爻 {
    constructor() {
        this.爻位 = [];
    }
    起卦() {
        let num = Math.floor(Math.random() * 4);
        let 爻;
        console.log(num);
        if (num == 0) {
            爻 = new 老阴(this.爻位.length);
        }
        else if (num == 1) {
            爻 = new 老阴(this.爻位.length);
        }
        else if (num == 2) {
            爻 = new 老阴(this.爻位.length);
        }
        else if (num == 3) {
            爻 = new 老阴(this.爻位.length);
        }
        else {
            throw new Error("摇够次数了");
        }
        this.爻位.push(爻);
    }
    卦已经成了() {
        return this.爻位.length == 6;
    }
}
class 爻 {
    constructor(爻位) {
        if (爻位 < 0 || 爻位 > 5) {
            throw new Error("爻位错误,不应该有" + (爻位 + 1));
        }
        this.爻位 = 爻位;
    }
}
class 老阴 extends 爻 {
}
;
class 少阳 extends 爻 {
}
;
class 少阴 extends 爻 {
}
;
class 老阳 extends 爻 {
}
;
