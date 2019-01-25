class ItemUtils extends egret.HashObject {

    private itemBitMap
    private static items = {
        id_0:{name:'', png:'empty_png'},   //无物体
        id_1:{name:'炸弹', png:'explosive_png'},   //地雷（触发）玩家进入本格子掉4生命。
        id_2:{name:'', png:'gun4_png'},  //武器空投（触发），当有玩家进入本格，两分钟后有超级步枪或者三级防具投入本格。
        id_3:{name:'手枪', png:'gun1_png'},  //手枪+3攻击。（普通枪械）
        id_4:{name:'步枪', png:'gun2_png'},  //步枪+4攻击。（普通枪械）
        id_5:{name:'超级步枪', png:'gun4_png'},  //超级步枪+6攻击。（高级枪械） 
        id_6:{name:'一级防具', png:'shield1_png'},  //一级防具+2生命。（普通防具）
        id_7:{name:'二级防具', png:'shield2_png'},  //二级防具+4生命。（普通防具）
        id_8:{name:'三级防具', png:'shield3_png'},  //三级防具+6生命。（高级防具）
        id_9:{name:'决斗卡', png:'battle_png'},  //决斗卡（特殊道具），发生战斗时自动使用，决斗直到一方死亡。
        id_10:{name:'复活卡', png:'life_png'},  //复活卡（特殊道具），如果死亡自动触发，所有物品消失4血复活。
        id_11:{name:'药箱', png:'aid_png'},  //药箱（资源）+2生命。
        id_12:{name:'急救箱', png:'first_aid_png'},  //急救箱（资源）+4生命。
        id_13:{name:'', png:'money_png'},  //空投的eos
        id_14:{name:'黄金矿点', png:'gold_png'},  //黄金矿点
        
    }

    public constructor(rowX:number, colY:number,id:number) {
        super();
        //this.itemBitMap = this.createBitmapByName(name)
    }

    public static createBitmapById(id: number) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(this.items['id_'+id].png);
        result.texture = texture;
        result.width = 70
        result.height = 70
        return result;
    }

    public static createItemById(id: number) {
        let item = new Item(this.items['id_'+id].png);
        item.setId(id)
        return item;
    }

    public static getItemNameById(id: number) {
        let name = this.items['id_'+id].name
        return name
    }
}