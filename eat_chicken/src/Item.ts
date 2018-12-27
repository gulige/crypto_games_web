class Item extends egret.DisplayObjectContainer {

    private itemBitMap
    private static items = {
        id_0:'empty_png',   //无物体
        id_1:'empty_png',   //地雷（触发）玩家进入本格子掉4生命。
        id_2: 'empty_png',  //武器空投（触发），当有玩家进入本格，两分钟后有超级步枪或者三级防具投入本格。
        id_3:'handgun_png',  //手枪+3攻击。（普通枪械）
        id_4:'rifle_png',  //步枪+4攻击。（普通枪械）
        id_5:'supergun_png',  //超级步枪+6攻击。（高级枪械）
        id_6:'shield_L1_png',  //一级防具+2生命。（普通防具）
        id_7:'shield_L2_png',  //二级防具+4生命。（普通防具）
        id_8:'shield_L3_png',  //三级防具+6生命。（高级防具）
        id_9:'battle_png',  //决斗卡（特殊道具），发生战斗时自动使用，决斗直到一方死亡。
        id_10:'life_png',  //复活卡（特殊道具），如果死亡自动触发，所有物品消失4血复活。
        id_11:'aid_png',  //药箱（资源）+2生命。
        id_12:'first_aid_png',  //急救箱（资源）+4生命。
        id_13:'empty_png',  //空投的eos
        id_14:'gold_mine_png',  //黄金矿点
        
    }

    public constructor(rowX:number, colY:number,id:number) {
        super();
        //this.itemBitMap = this.createBitmapByName(name)
    }

    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static createBitmapById(id: number) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(this.items['id_'+id]);
        result.texture = texture;
        result.width = 70
        result.height = 70
        return result;
    }
}