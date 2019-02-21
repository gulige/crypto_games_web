var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ItemUtils = (function (_super) {
    __extends(ItemUtils, _super);
    function ItemUtils(rowX, colY, id) {
        return _super.call(this) || this;
        //this.itemBitMap = this.createBitmapByName(name)
    }
    ItemUtils.createBitmapById = function (id) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(this.items['id_' + id].png);
        result.texture = texture;
        result.width = 70;
        result.height = 70;
        return result;
    };
    ItemUtils.createItemById = function (id) {
        var item = new Item(this.items['id_' + id].png);
        item.setId(id);
        return item;
    };
    ItemUtils.getItemNameById = function (id) {
        var name = this.items['id_' + id].name;
        return name;
    };
    ItemUtils.items = {
        id_0: { name: '', png: 'empty_png' },
        id_1: { name: '炸弹', png: 'explosive_png' },
        id_2: { name: '', png: 'gun4_png' },
        id_3: { name: '手枪', png: 'gun1_png' },
        id_4: { name: '步枪', png: 'gun2_png' },
        id_5: { name: '超级步枪', png: 'gun4_png' },
        id_6: { name: '一级防具', png: 'shield1_png' },
        id_7: { name: '二级防具', png: 'shield2_png' },
        id_8: { name: '三级防具', png: 'shield3_png' },
        id_9: { name: '决斗卡', png: 'combat_png' },
        id_10: { name: '复活卡', png: 'rebirth_png' },
        id_11: { name: '药箱', png: 'medicine_png' },
        id_12: { name: '急救箱', png: 'first_aid_png' },
        id_13: { name: '', png: 'money_png' },
        id_14: { name: '黄金矿点', png: 'gold_png' },
    };
    return ItemUtils;
}(egret.HashObject));
__reflect(ItemUtils.prototype, "ItemUtils");
//# sourceMappingURL=ItemUtils.js.map