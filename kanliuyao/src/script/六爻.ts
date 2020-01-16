
export default class 六爻 {
    private 爻位:爻[];
    public 卦象:any;
    constructor() {
        this.爻位 = [];
    }
    public 起卦(): void {
        let num = Math.floor(Math.random()*4);
        let 爻:爻;
        console.log(num);
        if (num==0) {
            爻 = new 老阴(this.爻位.length);
        } else if (num==1) {
            爻 = new 老阴(this.爻位.length);
        } else if (num==2) {
            爻 = new 老阴(this.爻位.length);
        } else if (num==3) {
            爻 = new 老阴(this.爻位.length);
        } else {
            throw new Error("摇够次数了");
        }
        this.爻位.push(爻);
        if(this.卦已经成了()) {
            this.卦象 = new 卦象(this.爻位);
        }
    }
    卦已经成了():boolean {
        return this.爻位.length==6;
    }
}

class 卦象 {
    卦名:string;
    爻位:爻[];
    constructor(爻位:爻[]) {
        this.爻位 = 爻位;
        this.卦名 = "需要补充";
    }
    private 根据数组判断卦名([第一爻,第二爻,第三爻]:爻[]):string {
        if(第一爻.阴阳()=="阳"&&第二爻.阴阳()=="阳"&&第三爻.阴阳()=="阳") {
            return "乾";
        }
        if(第一爻.阴阳()=="阴"&&第二爻.阴阳()=="阳"&&第三爻.阴阳()=="阳") {
            return "巽";
        }
        if(第一爻.阴阳()=="阳"&&第二爻.阴阳()=="阴"&&第三爻.阴阳()=="阳") {
            return "离";
        }
        if(第一爻.阴阳()=="阳"&&第二爻.阴阳()=="阳"&&第三爻.阴阳()=="阴") {
            return "兑";
        }
        if(第一爻.阴阳()=="阳"&&第二爻.阴阳()=="阴"&&第三爻.阴阳()=="阴") {
            return "震";
        }
        if(第一爻.阴阳()=="阴"&&第二爻.阴阳()=="阳"&&第三爻.阴阳()=="阴") {
            return "坎";
        }
        if(第一爻.阴阳()=="阴"&&第二爻.阴阳()=="阴"&&第三爻.阴阳()=="阳") {
            return "艮";
        }
        if(第一爻.阴阳()=="阴"&&第二爻.阴阳()=="阴"&&第三爻.阴阳()=="阴") {
            return "坤";
        }
        throw new Error("卦错了 可能是程序的问题");
    }
    public 内卦名():string {
        return this.根据数组判断卦名(this.爻位.slice(0,3));
    }
    public 外卦名():string {
        return this.根据数组判断卦名(this.爻位.slice(3,6));
    }
}

class 爻 {
    爻位:number;
    constructor(爻位:number) {
        if(爻位<0||爻位>5) {
            throw new Error("爻位错误,不应该有"+(爻位+1));
        }
        this.爻位 = 爻位;
    }
    阴阳():string{
        return "";
    }
}
class 老阴 extends 爻{};
class 少阳 extends 爻{};
class 少阴 extends 爻{};
class 老阳 extends 爻{};