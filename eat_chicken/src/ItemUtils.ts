class ItemUtils extends egret.HashObject {

    private itemBitMap
    private static items = {
        id_0:{zh_CN:'', en_US:'', png:'empty_png'},   //无物体
        id_1:{zh_CN:'炸弹', en_US:'Bomb', png:'explosive_png'},   //地雷（触发）玩家进入本格子掉4生命。
        id_2:{zh_CN:'', en_US:'', png:'gun4_png'},  //武器空投（触发），当有玩家进入本格，两分钟后有超级步枪或者三级防具投入本格。
        id_3:{zh_CN:'手枪', en_US:'Pistol', png:'gun1_png'},  //手枪+3攻击。（普通枪械）
        id_4:{zh_CN:'步枪', en_US:'Rifle', png:'gun2_png'},  //步枪+4攻击。（普通枪械）
        id_5:{zh_CN:'超级步枪', en_US:'Super Gun', png:'gun4_png'},  //超级步枪+6攻击。（高级枪械） 
        id_6:{zh_CN:'一级防具', en_US:'Shield Ⅰ', png:'shield1_png'},  //一级防具+2生命。（普通防具）
        id_7:{zh_CN:'二级防具', en_US:'Shield Ⅱ', png:'shield2_png'},  //二级防具+4生命。（普通防具）
        id_8:{zh_CN:'三级防具', en_US:'Shield Ⅲ', png:'shield3_png'},  //三级防具+6生命。（高级防具）
        id_9:{zh_CN:'决斗卡', en_US:'Combat Card', png:'combat_png'},  //决斗卡（特殊道具），发生战斗时自动使用，决斗直到一方死亡。
        id_10:{zh_CN:'复活卡', en_US:'Rebirth Card', png:'rebirth_png'},  //复活卡（特殊道具），如果死亡自动触发，所有物品消失4血复活。
        id_11:{zh_CN:'药箱', en_US:'Medicine', png:'medicine_png'},  //药箱（资源）+2生命。
        id_12:{zh_CN:'急救箱', en_US:'First Aid', png:'first_aid_png'},  //急救箱（资源）+4生命。
        id_13:{zh_CN:'', en_US:'', png:'money_png'},  //空投的eos
        id_14:{zh_CN:'黄金矿点', en_US:'Gold', png:'gold_png'},  //黄金矿点
        
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

    public static getItemNameById(id: number, locale:string) {
        let name = this.items['id_'+id][locale]
        return name
    }
}