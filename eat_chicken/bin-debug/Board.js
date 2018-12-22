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
var Board = (function (_super) {
    __extends(Board, _super);
    function Board(x, y) {
        var _this = _super.call(this) || this;
        _this.life = { full: 100, remain: 100 };
        _this.gold = 100; //city 100 gold unit
        _this.playerContainer = new egret.DisplayObjectContainer();
        _this.colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        _this.createBoard(x, y);
        return _this;
    }
    Board.prototype.createBoard = function (x, y) {
        //  this.name = param.name
        // this.townBitmap = this.createBitmapByName(param.bitmap);
        // this.townBitmap.width = 80;
        //  this.townBitmap.height = 80;
        // this.townBitmap.touchEnabled = true;
        //  this.uuid = new Date().getTime()  // will use [username + date] or uuid generator later
        this.cellList = []; //初始化cell列表并加入棋盘
        for (var _x = 0; _x < x; _x++) {
            for (var _y = 0; _y < y; _y++) {
                var cell = this.createCell(_x, _y, this.cellList.length);
                this.addChild(cell.getBitmap());
            }
        }
        //将玩家容器加入棋盘，用于不同游戏房间的玩家重置
        this.addChild(this.playerContainer);
    };
    Board.prototype.createCell = function (x, y, id) {
        var cell = new Cell(x, y, id);
        //var colorFlilter = new egret.ColorMatrixFilter(this.colorMatrix);
        //warrior.getBitmap().filters = [colorFlilter];
        this.cellList.push(cell);
        return cell;
    };
    Board.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Board.prototype.getCellList = function () {
        return this.cellList;
    };
    Board.prototype.putPlayer = function (player) {
        this.playerContainer.addChild(player);
    };
    Board.prototype.clearPlayers = function () {
        this.playerContainer.removeChildren();
    };
    Board.prototype.removePlayer = function (player) {
        this.playerContainer.removeChild(player.getBitmap());
    };
    return Board;
}(egret.DisplayObjectContainer));
__reflect(Board.prototype, "Board");
//# sourceMappingURL=Board.js.map