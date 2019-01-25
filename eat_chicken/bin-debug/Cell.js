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
var Cell = (function (_super) {
    __extends(Cell, _super);
    function Cell(rowX, colY, id) {
        var _this = _super.call(this) || this;
        _this.cellRect = new egret.Shape();
        _this.task = { action: "idle", target: null, status: null };
        _this.position = new egret.Point(0, 0);
        _this.item = null;
        _this.hasPoison = false;
        _this.battleTime = 0; //seonds
        _this.createCell(rowX, colY, id);
        return _this;
    }
    Cell.prototype.createCell = function (rowX, colY, _id) {
        this.id = _id;
        /*
        this.cellBitmap = this.createBitmapByName("frame_png");
        this.cellBitmap.width = 80;   //cell的长/宽
        this.cellBitmap.height = 80;
        this.addChild(this.cellBitmap);
        */
        this.cellRect.graphics.clear();
        this.cellRect.graphics.lineStyle(1, 0x000000, 0.2);
        this.cellRect.graphics.beginFill(0xF7CDA4, 0.5);
        this.cellRect.graphics.drawRect(0, 0, 80, 80);
        this.cellRect.graphics.endFill();
        this.addChild(this.cellRect);
        this.position = new egret.Point(80 * rowX, 80 * colY);
        this.x = this.position.x; //初始化位置
        this.y = this.position.y;
        //this.cellBitmap.touchEnabled = true;
        this.cell_X_Y = { x: rowX, y: colY };
        //this.addChild(this.cellBitmap)
        this.touchEnabled = true;
        // this.town = _town
        // this.id = new Date().getTime()
    };
    Cell.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Cell.prototype.getBitmap = function () {
        return this.cellBitmap;
    };
    Cell.prototype.setTask = function (_task) {
        this.task = _task;
    };
    Cell.prototype.getTask = function () {
        return this.task;
    };
    Cell.prototype.getPosition = function () {
        var position = { x: this.x, y: this.y };
        return position;
    };
    Cell.prototype.setPosition = function (_position) {
        this.x = _position.x;
        this.y = _position.y;
    };
    Cell.prototype.destroy = function () {
        this.cellBitmap = null;
    };
    Cell.prototype.getID = function () {
        return this.id;
    };
    Cell.prototype.getXY = function () {
        return this.cell_X_Y;
    };
    Cell.prototype.getItem = function () {
        return this.item;
    };
    Cell.prototype.setItem = function (_item) {
        this.item = _item;
    };
    Cell.prototype.addItem = function (_item) {
        if (this.contains(this.item)) {
            this.item.destroy();
            this.removeChild(this.item);
        }
        this.item = _item;
        this.addChild(this.item);
    };
    Cell.prototype.addPoison = function (_poison) {
        this.hasPoison = true;
        this.addChild(_poison);
    };
    Cell.prototype.getPoison = function () {
        return this.hasPoison;
    };
    Cell.prototype.setBattleTime = function (time) {
        this.battleTime = time;
    };
    Cell.prototype.getBattleTime = function () {
        return this.battleTime;
    };
    Cell.prototype.setIndex = function (object, zIndex) {
        this.setChildIndex(object, zIndex);
    };
    return Cell;
}(egret.DisplayObjectContainer));
__reflect(Cell.prototype, "Cell");
//# sourceMappingURL=Cell.js.map