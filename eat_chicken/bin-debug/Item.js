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
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(name) {
        var _this = _super.call(this) || this;
        _this.createItem(name);
        return _this;
    }
    Item.prototype.createItem = function (name) {
        //this.id = _id
        this.itemBitMap = this.createBitmapByName(name);
        this.itemBitMap.width = 50; //cell的长/宽
        this.itemBitMap.height = 50;
        //this.position = new egret.Point(this.cellBitmap.width*rowX, this.cellBitmap.height*colY);
        //this.x = this.position.x //初始化位置
        //this.y = this.position.y
        //this.itemBitMap.touchEnabled = true;
        //this.cell_X_Y = {x:rowX, y:colY}
        this.addChild(this.itemBitMap);
        //this.touchEnabled = true;
        // this.town = _town
        // this.id = new Date().getTime()
    };
    Item.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Item.prototype.getBitmap = function () {
        return this.itemBitMap;
    };
    Item.prototype.getPosition = function () {
        var position = { x: this.x, y: this.y };
        return position;
    };
    Item.prototype.setPosition = function (_position) {
        this.x = _position.x;
        this.y = _position.y;
    };
    Item.prototype.getId = function () {
        return this.id;
    };
    Item.prototype.setId = function (_id) {
        this.id = _id;
    };
    Item.prototype.destroy = function () {
        this.itemBitMap = null;
    };
    return Item;
}(egret.DisplayObjectContainer));
__reflect(Item.prototype, "Item");
//# sourceMappingURL=Item.js.map