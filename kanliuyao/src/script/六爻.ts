
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
        爻 = this.数字对应的爻(num);
        this.爻位.push(爻);
        if(this.卦已经成了()) {
            this.卦象 = new 卦象(this.爻位);
        }
    }
    public 数字对应的爻(num:number):爻 {
        if (num==0) {
            return new 老阴(this.爻位.length);
        } else if (num==1) {
            return new 少阳(this.爻位.length);
        } else if (num==2) {
            return new 少阴(this.爻位.length);
        } else if (num==3) {
            return new 老阳(this.爻位.length);
        } else {
            throw new Error("参数错误 应该只传进来0,1,2,3");
        }
    }
    public 卦(ary:number[]):卦象{
        return new 卦象(ary.map(num=>this.数字对应的爻(num)))
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

let 卦五行 = {"乾":"金","兑":"金","离":"火","震":"木","巽":"木","坎":"水","艮":"土","坤":"土"};
class 三爻卦 {
    卦名:[string,string];
    天爻:爻;
    人爻:爻;
    地爻:爻;
    五行:五行;
    constructor(地爻:爻,人爻:爻,天爻:爻) {
        this.天爻 = 天爻;
        this.人爻 = 人爻;
        this.地爻 = 地爻;
        this.卦名 = this.根据数组判断卦名(this.地爻,this.人爻,this.天爻);
        this.五行 = 卦五行[this.卦名[0]];
    }

    private 根据数组判断卦名(地爻:爻,人爻:爻,天爻:爻):[string,string] {
        if(地爻.阴阳()=="阳"&&人爻.阴阳()=="阳"&&天爻.阴阳()=="阳") {
            return ["乾","天"];
        }
        if(地爻.阴阳()=="阴"&&人爻.阴阳()=="阳"&&天爻.阴阳()=="阳") {
            return ["巽","风"];
        }
        if(地爻.阴阳()=="阳"&&人爻.阴阳()=="阴"&&天爻.阴阳()=="阳") {
            return ["离","火"];
        }
        if(地爻.阴阳()=="阳"&&人爻.阴阳()=="阳"&&天爻.阴阳()=="阴") {
            return ["兑","泽"];
        }
        if(地爻.阴阳()=="阳"&&人爻.阴阳()=="阴"&&天爻.阴阳()=="阴") {
            return ["震","雷"];
        }
        if(地爻.阴阳()=="阴"&&人爻.阴阳()=="阳"&&天爻.阴阳()=="阴") {
            return ["坎","水"];
        }
        if(地爻.阴阳()=="阴"&&人爻.阴阳()=="阴"&&天爻.阴阳()=="阳") {
            return ["艮","山"];
        }
        if(地爻.阴阳()=="阴"&&人爻.阴阳()=="阴"&&天爻.阴阳()=="阴") {
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

enum 五行 {
    木,火,土,金,水
}
class 六爻卦 {
    卦名:string;
    外卦:三爻卦;
    内卦:三爻卦;
    初爻:爻;
    二爻:爻;
    三爻:爻;
    四爻:爻;
    五爻:爻;
    上爻:爻;
    世应:[爻,爻];
    五行:五行;
    constructor(初爻:爻,
                二爻:爻,
                三爻:爻,
                四爻:爻,
                五爻:爻,
                上爻:爻) {
        this.初爻 = 初爻;
        this.二爻 = 二爻;
        this.三爻 = 三爻;
        this.四爻 = 四爻;
        this.五爻 = 五爻;
        this.上爻 = 上爻;
        this.内卦 = new 三爻卦(this.初爻,this.二爻,this.三爻);
        this.外卦 = new 三爻卦(this.四爻,this.五爻,this.上爻);
        this.卦名 = names[this.外卦.卦名[1]][this.内卦.卦名[1]];
        if(!this.卦名) {
            throw new Error("卦名没读出来");
        }
        this.五行 = 卦五行[this.定宫位()];
        this.世应 = this.定世应();
        if(!this.世应) {
            throw new Error("定世应错误");
        }
    }
    // constructor(内卦:三爻卦,外卦:三爻卦) {
    //     this.内卦 = 内卦;
    //     this.外卦 = 外卦;
    //     this.爻位 = this.内卦.concat(this.外卦);
    //     this.卦名 = [this.外卦.卦名,this.外卦.卦名];
    // }
    private 提示世应步骤提示(当前爻:爻):void {
        console.log(当前爻);
    }
    public 定宫位():string {
        let step = [[],[0],[1],[2],[3],[4],[3],[0,1,2]];
        let 爻位 = [this.初爻
            ,this.二爻
            ,this.三爻
            ,this.四爻
            ,this.五爻
            ,this.上爻];
        for(let i in step) {
            let 下一次 = step[i];
            for(let a of 下一次) {
                let 当前爻 = 爻位[a];
                this.提示世应步骤提示(当前爻);
                if(当前爻.阴阳()=="阴") {
                    爻位[a] = new 少阳(当前爻.爻位);
                } else {
                    爻位[a] = new 少阴(当前爻.爻位);
                }
            }
            console.log(爻位);
            if(爻位[5].阴阳()==爻位[2].阴阳() && 爻位[4].阴阳()==爻位[1].阴阳() && 爻位[3].阴阳()==爻位[0].阴阳()) {
                return new 三爻卦(爻位[0],爻位[1],爻位[2]).卦名[0];
            }
        }
        throw new Error("定宫位还没做");
    }
    public 定世应():[爻,爻] {
        if(this.上爻.阴阳()==this.三爻.阴阳() && this.五爻.阴阳()==this.二爻.阴阳() && this.四爻.阴阳()==this.初爻.阴阳()) {
            return [this.上爻,this.三爻];
        }
        if(this.上爻.阴阳()==this.三爻.阴阳() && this.五爻.阴阳()==this.二爻.阴阳() && this.四爻.阴阳()!=this.初爻.阴阳()) {
            return [this.初爻,this.四爻];
        }
        if(this.上爻.阴阳()==this.三爻.阴阳() && this.五爻.阴阳()!=this.二爻.阴阳() && this.四爻.阴阳()!=this.初爻.阴阳()) {
            return [this.二爻,this.五爻];
        }
        if(this.上爻.阴阳()!=this.三爻.阴阳() && this.五爻.阴阳()!=this.二爻.阴阳() && this.四爻.阴阳()!=this.初爻.阴阳()) {
            return [this.三爻,this.上爻];
        }
        if(this.上爻.阴阳()!=this.三爻.阴阳() && this.五爻.阴阳()!=this.二爻.阴阳() && this.四爻.阴阳()==this.初爻.阴阳()) {
            return [this.四爻,this.初爻];
        }
        if(this.上爻.阴阳()!=this.三爻.阴阳() && this.五爻.阴阳()==this.二爻.阴阳() && this.四爻.阴阳()==this.初爻.阴阳()) {
            return [this.五爻,this.二爻];
        }
        if(this.上爻.阴阳()!=this.三爻.阴阳() && this.五爻.阴阳()==this.二爻.阴阳() && this.四爻.阴阳()!=this.初爻.阴阳()) {
            return [this.四爻,this.初爻];
        }
        if(this.上爻.阴阳()==this.三爻.阴阳() && this.五爻.阴阳()!=this.二爻.阴阳() && this.四爻.阴阳()==this.初爻.阴阳()) {
            return [this.三爻,this.上爻];
        }
        throw new Error("定世应错误");
    }
}

export class 卦象 extends 六爻卦 {
    卦名:string;

    constructor(爻位:爻[]) {
        if(爻位.length!=6) {
            throw new Error("爻数不对 不能成卦");
        }
        super(爻位[0],爻位[1],爻位[2],爻位[3],爻位[4],爻位[5]);
        console.log(this);
    }
}

abstract class 爻 {
    爻位:number;
    世应?:boolean;
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
    变爻:爻;
    constructor(爻位:number) {
        super(爻位);
        this.变爻 = new 变爻(this);
    }
}
class 变爻 extends 爻 {
    动爻:爻;
    constructor(动爻:爻) {
        super(动爻.爻位);
        this.动爻 = 动爻;
    }
    阴阳():string{
        return this.动爻.阴阳()=="阴"?"阳":"阴";
    };
}
class 老阴 extends 动爻{
    阴阳():string{return "阴";}
};
class 少阳 extends 静爻{阴阳():string{return "阳";}};
class 少阴 extends 静爻{阴阳():string{return "阴";}};
class 老阳 extends 动爻{
    阴阳():string{return "阳";}
};

export interface renderer {

}