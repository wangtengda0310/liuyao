
export class 六爻工具 {
    private 爻位:爻[];
    public 卦象:卦象;
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
            爻 = new 少阳(this.爻位.length);
        } else if (num==2) {
            爻 = new 少阴(this.爻位.length);
        } else if (num==3) {
            爻 = new 老阳(this.爻位.length);
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
    干支():[string, string] {
        throw new Error("还没做");
    }
    此日干支(date:Date):[string, string] {
        throw new Error("还没做");
    }
}

class 三爻卦 {
    爻位:爻[];
    卦名:[string,string];
    constructor(爻位:爻[]) {
        this.爻位 = 爻位;
        this.卦名 = this.根据数组判断卦名(this.爻位);
    }

    private 根据数组判断卦名([第一爻,第二爻,第三爻]:爻[]):[string,string] {
        if(第一爻.阴阳()=="阳"&&第二爻.阴阳()=="阳"&&第三爻.阴阳()=="阳") {
            return ["乾","天"];
        }
        if(第一爻.阴阳()=="阴"&&第二爻.阴阳()=="阳"&&第三爻.阴阳()=="阳") {
            return ["巽","风"];
        }
        if(第一爻.阴阳()=="阳"&&第二爻.阴阳()=="阴"&&第三爻.阴阳()=="阳") {
            return ["离","火"];
        }
        if(第一爻.阴阳()=="阳"&&第二爻.阴阳()=="阳"&&第三爻.阴阳()=="阴") {
            return ["兑","泽"];
        }
        if(第一爻.阴阳()=="阳"&&第二爻.阴阳()=="阴"&&第三爻.阴阳()=="阴") {
            return ["震","雷"];
        }
        if(第一爻.阴阳()=="阴"&&第二爻.阴阳()=="阳"&&第三爻.阴阳()=="阴") {
            return ["坎","水"];
        }
        if(第一爻.阴阳()=="阴"&&第二爻.阴阳()=="阴"&&第三爻.阴阳()=="阳") {
            return ["艮","山"];
        }
        if(第一爻.阴阳()=="阴"&&第二爻.阴阳()=="阴"&&第三爻.阴阳()=="阴") {
            return ["坤","地"];
        }
        throw new Error("卦错了 可能是程序的问题");
    }
}

let names= {
    "天":{"天":"乾",    "风":"垢",      "山":"遁",      "地":"否",      "水":"讼",      "火":"同人",    "雷":"无妄",    "泽":"履"},
    "风":{"风":"巽",    "天":"小畜",    "火":"家人",    "地":"观",      "雷":"益",      "水":"涣",      "泽":"中孚",    "山":"渐"},
    "山":{"山":"艮",    "火":"贲",      "天":"大畜",    "泽":"损",      "风":"蛊",      "地":"剥",      "水":"蒙",      "雷":"颐"},
    "地":{"地":"坤",    "雷":"复",      "泽":"临",      "天":"泰",      "山":"谦",      "风":"升",      "火":"明夷",    "水":"师"},
    "雷":{"雷":"震",    "地":"豫",      "水":"解",      "风":"恒",      "山":"小过",    "泽":"归妹",    "火":"丰",      "天":"大壮"},
    "泽":{"泽":"兑",    "水":"困",      "地":"萃",      "山":"咸",      "风":"大过",    "雷":"随",      "火":"革",      "天":"夬"},
    "水":{"水":"坎",    "泽":"节",      "雷":"屯",      "火":"既济",    "山":"蹇",      "风":"井",      "天":"需",      "地":"比"},
    "火":{"火":"离",    "山":"旅",      "风":"鼎",      "水":"未济",    "天":"大有",    "雷":"噬嗑",    "泽":"睽",      "地":"晋"}} ;

class 六爻卦 {
    内卦:三爻卦;
    外卦:三爻卦;
    卦名:string;
    爻位:爻[];
    constructor(爻位:爻[]) {
        this.爻位 = 爻位;
        this.内卦 = new 三爻卦(this.爻位.slice(0,3));
        this.外卦 = new 三爻卦(this.爻位.slice(3,6));
        this.卦名 = names[this.外卦.卦名[1]][this.内卦.卦名[1]];
        if(!this.卦名) {
            throw new Error("卦名没读出来");
        }
    }
    // constructor(内卦:三爻卦,外卦:三爻卦) {
    //     this.内卦 = 内卦;
    //     this.外卦 = 外卦;
    //     this.爻位 = this.内卦.concat(this.外卦);
    //     this.卦名 = [this.外卦.卦名,this.外卦.卦名];
    // }
}

export class 卦象 extends 六爻卦 {
    卦名:string;

    constructor(爻位:爻[]) {
        super(爻位);
        console.log(this.爻位);
        this.内卦 = new 三爻卦(this.爻位.slice(0,3));
        this.外卦 = new 三爻卦(this.爻位.slice(3,6));
    }
    public 世():爻 {
        return null;
    }
    public 应():爻 {
        return null;
    }
}

abstract class 爻 {
    爻位:number;
    constructor(爻位:number) {
        if(爻位<0||爻位>5) {
            throw new Error("爻位错误,不应该有"+(爻位+1));
        }
        this.爻位 = 爻位;
    }
    abstract 阴阳():string;
}
abstract class 静爻 extends 爻 {
}
abstract class 动爻 extends 爻 {
    变爻():爻{
        return null;
    }
}
abstract class 变爻 extends 爻 {
    动爻():爻{
        return null;
    }
}
class 老阴 extends 爻{阴阳():string{return "阴";}};
class 少阳 extends 爻{阴阳():string{return "阳";}};
class 少阴 extends 爻{阴阳():string{return "阴";}};
class 老阳 extends 爻{阴阳():string{return "阳";}};

export interface renderer {

}