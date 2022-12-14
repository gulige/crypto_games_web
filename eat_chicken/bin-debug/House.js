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
var House = (function (_super) {
    __extends(House, _super);
    //private game_progress:number
    function House(param, _game) {
        var _this = _super.call(this) || this;
        _this.colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        _this.game = _game;
        _this.createHouse(param);
        return _this;
    }
    House.prototype.createHouse = function (param) {
        this.name = param.name;
        this.houseBitmap = this.createBitmapByName(param.bitmap);
        this.houseBitmap.width = 150;
        this.houseBitmap.height = 212;
        this.houseBitmap.touchEnabled = true;
        this.addChild(this.houseBitmap);
        this.touchEnabled = true;
        this.id = this.game.game_id;
        this.joinEos = this.game.join_eos;
        this.owner = this.game.creator;
        this.playerList = []; //?????????????????????
        this.createPlayers(this.game.players);
        this.clock = new Clock(); //?????????????????????0???0???0?????????
    };
    House.prototype.updateHouse = function (_game) {
        this.isNewStep = (this.game.game_progress !== _game.game_progress || this.game.step !== _game.step);
        this.game = _game;
        this.updatePlayers(this.game.players);
    };
    House.prototype.updatePlayers = function (playersJson) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, playersJson.map(function (playerJson) { return __awaiter(_this, void 0, void 0, function () {
                            var player;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getPlayerByName(playerJson.acc_name)];
                                    case 1:
                                        player = _a.sent();
                                        if (player == null) {
                                            this.createPlayer(playerJson);
                                        }
                                        else {
                                            player.updatePlayer(playerJson);
                                            if (this.game.game_progress == 2 && this.isNewStep) {
                                                player.setMoveable(true);
                                            }
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    House.prototype.createPlayers = function (playersJson) {
        var _this = this;
        playersJson.map(function (playerJson) {
            _this.createPlayer(playerJson);
            //return player 
        });
    };
    House.prototype.createPlayer = function (playerJson) {
        var name = this.playerList.length % 2 == 0 ? "avtar_male_png" : "avtar_female_png";
        var player = new Player(name, playerJson);
        //var colorFlilter = new egret.ColorMatrixFilter(this.colorMatrix);
        //warrior.getBitmap().filters = [colorFlilter];
        this.playerList.push(player);
    };
    House.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    House.prototype.getPlayerByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var players;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.playerList.filter(function (_player) {
                            return _player.getName() == name;
                        })];
                    case 1:
                        players = _a.sent();
                        if (players.length > 0) {
                            return [2 /*return*/, players[0]]; //??????????????????????????????????????????
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    House.prototype.getPlayerListByCellId = function (cell_id) {
        return __awaiter(this, void 0, void 0, function () {
            var players;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.playerList.filter(function (player) {
                            return player.getCellId() == cell_id;
                        })];
                    case 1:
                        players = _a.sent();
                        return [2 /*return*/, players];
                }
            });
        });
    };
    House.prototype.getBitmap = function () {
        return this.houseBitmap;
    };
    House.prototype.getPlayerList = function () {
        return this.playerList;
    };
    House.prototype.getPosition = function () {
        var position = { x: this.x, y: this.y };
        return position;
    };
    House.prototype.setPosition = function (_position) {
        this.x = _position.x;
        this.y = _position.y;
    };
    House.prototype.destroy = function () {
        this.houseBitmap = null;
        this.playerList = [];
        this.game = null;
        //   this.clock = null
    };
    House.prototype.getID = function () {
        return this.id;
    };
    House.prototype.setID = function (_id) {
        return this.id = _id;
    };
    House.prototype.getJoinEos = function () {
        return this.joinEos;
    };
    House.prototype.getHouseName = function () {
        return this.name;
    };
    House.prototype.clearPlayerList = function () {
        this.playerList = [];
    };
    House.prototype.getClock = function () {
        return this.clock;
    };
    House.prototype.getBoard = function () {
        return this.game.board;
    };
    House.prototype.getProgress = function () {
        return this.game.game_progress;
    };
    House.prototype.getStep = function () {
        return this.game.step;
    };
    House.prototype.getSafeAreaRadius = function () {
        return this.game.safe_area_radius;
    };
    House.prototype.getFullPlayersJsonByCellId = function (cell_id) {
        return __awaiter(this, void 0, void 0, function () {
            var playersJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.game.players.filter(function (playerJson) {
                            return playerJson.cell_id == cell_id;
                        })];
                    case 1:
                        playersJson = _a.sent();
                        return [2 /*return*/, playersJson];
                }
            });
        });
    };
    House.prototype.getPlayerJsonList = function () {
        return this.game.players;
    };
    House.prototype.getTotalJoinPlayers = function () {
        return this.game.total_join_players;
    };
    House.prototype.getDeadPlayers = function () {
        return this.game.dead_players;
    };
    House.prototype.getAlivePlayers = function () {
        return (this.game.total_join_players - this.game.dead_players);
    };
    House.prototype.getEOSInHouse = function () {
        return this.getTotalJoinPlayers() * parseFloat(this.getJoinEos().substr(0, 6));
    };
    House.prototype.getWinner = function () {
        return this.game.winner;
    };
    House.prototype.getBestKiller = function () {
        this.playerList.sort(function (a, b) {
            return b.getKills() - a.getKills();
        });
        return this.playerList[0].getName();
    };
    House.prototype.getBestEOSWin = function () {
        this.playerList.sort(function (a, b) {
            return b.getGold() - a.getGold();
        });
        return this.playerList[0].getName();
    };
    House.prototype.getOwner = function () {
        return this.owner;
    };
    House.prototype.setPlayersMoveable = function () {
    };
    return House;
}(egret.DisplayObjectContainer));
__reflect(House.prototype, "House");
//# sourceMappingURL=House.js.map