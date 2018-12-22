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
        _this.task = { action: "idle", target: null, status: null };
        _this.position = new egret.Point(0, 0);
        _this.createCell(rowX, colY, id);
        return _this;
    }
    Cell.prototype.createCell = function (rowX, colY, _id) {
        this.id = _id;
        this.cellBitmap = this.createBitmapByName("bg1_jpg");
        this.cellBitmap.width = 80; //cell的长/宽
        this.cellBitmap.height = 80;
        this.position = new egret.Point(this.cellBitmap.width * rowX, this.cellBitmap.height * colY);
        this.cellBitmap.x = this.position.x; //初始化位置
        this.cellBitmap.y = this.position.y;
        this.cellBitmap.touchEnabled = true;
        this.cell_X_Y = { x: rowX, y: colY };
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
        var position = { x: this.cellBitmap.x, y: this.cellBitmap.y };
        return position;
    };
    Cell.prototype.setPosition = function (_position) {
        this.cellBitmap.x = _position.x;
        this.cellBitmap.y = _position.y;
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
    return Cell;
}(egret.DisplayObjectContainer));
__reflect(Cell.prototype, "Cell");
//# sourceMappingURL=Cell.js.map