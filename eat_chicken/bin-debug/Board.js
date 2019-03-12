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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Board = (function (_super) {
    __extends(Board, _super);
    function Board(x, y) {
        var _this = _super.call(this) || this;
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
        for (var _y = 0; _y < y; _y++) {
            for (var _x = 0; _x < x; _x++) {
                //for (var _y=0;_y<y; _y++){
                var cell = this.createCell(_x, _y, this.cellList.length);
                this.addChild(cell);
            }
        }
        //将玩家容器加入棋盘，用于不同游戏房间的玩家重置
        this.addChild(this.playerContainer);
        // this.addChild(this.playerContainer.stage)
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
    Board.prototype.getCellById = function (cellId) {
        return __awaiter(this, void 0, void 0, function () {
            var cell;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cellList.filter(function (cell) {
                            return (cell.getID() == cellId);
                        })];
                    case 1:
                        cell = _a.sent();
                        return [2 /*return*/, cell[0]];
                }
            });
        });
    };
    Board.prototype.getCellByXY = function (rowX, rowY) {
        return __awaiter(this, void 0, void 0, function () {
            var cell;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cellList.filter(function (_cell) {
                            var cell_X_Y = _cell.getXY();
                            return (cell_X_Y.x == rowX && cell_X_Y.y == rowY);
                        })];
                    case 1:
                        cell = _a.sent();
                        return [2 /*return*/, cell[0]];
                }
            });
        });
    };
    Board.prototype.putPlayer = function (player) {
        this.playerContainer.addChild(player);
    };
    Board.prototype.clearPlayers = function () {
        this.playerContainer.removeChildren();
    };
    Board.prototype.removePlayer = function (player) {
        this.playerContainer.removeChild(player);
    };
    Board.prototype.setIndex = function (object, zIndex) {
        this.playerContainer.setChildIndex(object, zIndex);
    };
    return Board;
}(egret.DisplayObjectContainer));
__reflect(Board.prototype, "Board");
//# sourceMappingURL=Board.js.map