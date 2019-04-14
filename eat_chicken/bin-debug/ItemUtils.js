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
    function ItemUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    ItemUtils.getItemNameById = function (id, locale) {
        var name = this.items['id_' + id][locale];
        return name;
    };
    ItemUtils.items = {
        id_0: { zh_CN: '', en_US: '', png: 'empty_png' },
        id_1: { zh_CN: '炸弹', en_US: 'Bomb', png: 'explosive_png' },
        id_2: { zh_CN: '', en_US: '', png: 'gun4_png' },
        id_3: { zh_CN: '手枪', en_US: 'Pistol', png: 'gun1_png' },
        id_4: { zh_CN: '步枪', en_US: 'Rifle', png: 'gun2_png' },
        id_5: { zh_CN: '超级步枪', en_US: 'Super Gun', png: 'gun4_png' },
        id_6: { zh_CN: '一级防具', en_US: 'Shield Ⅰ', png: 'shield1_png' },
        id_7: { zh_CN: '二级防具', en_US: 'Shield Ⅱ', png: 'shield2_png' },
        id_8: { zh_CN: '三级防具', en_US: 'Shield Ⅲ', png: 'shield3_png' },
        id_9: { zh_CN: '决斗卡', en_US: 'Combat Card', png: 'combat_png' },
        id_10: { zh_CN: '复活卡', en_US: 'Rebirth Card', png: 'rebirth_png' },
        id_11: { zh_CN: '药箱', en_US: 'Medicine', png: 'medicine_png' },
        id_12: { zh_CN: '急救箱', en_US: 'First Aid', png: 'first_aid_png' },
        id_13: { zh_CN: '', en_US: '', png: 'money_png' },
        id_14: { zh_CN: '黄金矿点', en_US: 'Gold', png: 'gold_png' },
    };
    return ItemUtils;
}(egret.HashObject));
__reflect(ItemUtils.prototype, "ItemUtils");
//# sourceMappingURL=ItemUtils.js.map