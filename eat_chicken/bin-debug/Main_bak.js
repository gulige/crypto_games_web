//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var Main_bak = (function (_super) {
    __extends(Main_bak, _super);
    function Main_bak() {
        var _this = _super.call(this) || this;
        _this._touchStatus = false; //当前触摸状态，按下时，值为true
        _this._distance = new egret.Point();
        _this.textfield = new egret.TextField();
        _this.tmxTileMap = tiled.TMXTilemap;
        _this._route = new egret.Shape();
        _this._life = new egret.Shape();
        _this.soilderIconList = [];
        _this.houseList = [];
        _this.board = null;
        _this.backgroundMusic = new egret.Sound();
        _this.playerInfo = new egret.Shape();
        _this.player_name = new egret.TextField();
        _this.player_hp = new egret.TextField();
        _this.player_attack = new egret.TextField();
        _this.player_defense = new egret.TextField();
        _this.player_eos = new egret.TextField();
        _this.player_item = new egret.TextField();
        _this.player_weapon = new egret.TextField();
        _this.safeAreaTop = new egret.Shape();
        _this.safeAreaLeft = new egret.Shape();
        _this.safeAreaRight = new egret.Shape();
        _this.safeAreaBottom = new egret.Shape();
        _this.messageContainer = new egret.DisplayObjectContainer();
        _this.messageBox = new egret.Shape();
        _this.message = new egret.TextField();
        //临时随机演示
        _this.townRandomName = ["johny", "kitty", "peter"];
        _this.num = 0;
        _this.canvas = document.getElementsByTagName("CANVAS")[0];
        //this.canvas.addEventListener('mousemove',this.onMove.bind(this));
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main_bak.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    /**
     * 开始运行游戏：加载地图，资源配置
     */
    Main_bak.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, url, urlLoader;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // await ScatterUtils.login()
                    //await ScatterUtils.getAccountInfo()
                    //await  ScatterUtils.getAllGamesInfo()
                    //await ScatterUtils.getGameInfo(3)
                    //await ScatterUtils.createGame("1.0000 EOS")
                    //await ScatterUtils.joinGame(9, "1.0000 EOS", 0, 0)
                    //await ScatterUtils.kickoff(10)
                    // let info = await ScatterUtils.move(10, 1 ,2)
                    // console.log("info",info)
                    return [4 /*yield*/, this.loadResource()];
                    case 1:
                        // await ScatterUtils.login()
                        //await ScatterUtils.getAccountInfo()
                        //await  ScatterUtils.getAllGamesInfo()
                        //await ScatterUtils.getGameInfo(3)
                        //await ScatterUtils.createGame("1.0000 EOS")
                        //await ScatterUtils.joinGame(9, "1.0000 EOS", 0, 0)
                        //await ScatterUtils.kickoff(10)
                        // let info = await ScatterUtils.move(10, 1 ,2)
                        // console.log("info",info)
                        _a.sent();
                        self = this;
                        url = "resource/desert.tmx";
                        urlLoader = new egret.URLLoader();
                        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                        //load complete
                        urlLoader.addEventListener(egret.Event.COMPLETE, function (event) {
                            var data = egret.XML.parse(event.target.data);
                            this.tmxTileMap = new tiled.TMXTilemap(2000, 2000, data, url);
                            this.tmxTileMap.render();
                            self.addChild(this.tmxTileMap);
                            // tmxTileMap.touchEnabled = true;
                            // tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_TAP,self.move,self);
                            //this.tmxTileMap.touchEnabled = true;
                            //  this.tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.mouseDown, self);
                            //  this.tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_END, self.mouseUp, self);           
                            self.createGameScene();
                        }, url);
                        urlLoader.load(new egret.URLRequest(url));
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加载资源/配置
     */
    Main_bak.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main_bak.prototype.createGameScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var createGameFlat, setMapFlat, joinGameFlat, kickOffFlat, play_glory, play_honor, play_easy, play_stop;
            return __generator(this, function (_a) {
                createGameFlat = this.createBitmapByName("city_png");
                this.stage.addChild(createGameFlat);
                createGameFlat.width = 80;
                createGameFlat.height = 100;
                createGameFlat.x = 10;
                createGameFlat.y = 5;
                createGameFlat.touchEnabled = true;
                createGameFlat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createGame.bind(this, { name: "johny", bitmap: "house_png" }), this);
                setMapFlat = this.createBitmapByName("bg1_jpg");
                this.stage.addChild(setMapFlat);
                setMapFlat.x = 10;
                setMapFlat.y = 115;
                setMapFlat.touchEnabled = true;
                setMapFlat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setMap, this);
                joinGameFlat = this.createBitmapByName("cow_boy_png");
                this.stage.addChild(joinGameFlat);
                joinGameFlat.x = 10;
                joinGameFlat.y = 200;
                joinGameFlat.width = 50;
                joinGameFlat.height = 80;
                joinGameFlat.touchEnabled = true;
                joinGameFlat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.joinGame, this);
                kickOffFlat = this.createBitmapByName("recall_png");
                this.stage.addChild(kickOffFlat);
                kickOffFlat.x = 10;
                kickOffFlat.y = 300;
                kickOffFlat.touchEnabled = true;
                kickOffFlat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.kickOff, this);
                //开炮动画实现
                this.animation({ json: "pao_json", png: "pao_png", data: "pao", x: 0, y: 800 }).then(function (animate) {
                    _this.stage.addChild(animate);
                    animate.play(-1);
                });
                //青蛙动画实现
                this.animation({ json: "frog_json", png: "frog_png", data: "frog", x: 1130, y: 830 }).then(function (animate) {
                    _this.stage.addChild(animate);
                    animate.play(-1);
                });
                //******登陆/登出功能******
                this.login = this.createBitmapByName("login_png");
                this.login.x = 1150;
                this.login.y = 10;
                this.login.touchEnabled = true;
                this.login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginGame, this);
                this.logout = this.createBitmapByName("logout_png");
                this.logout.x = 1150;
                this.logout.y = 10;
                this.logout.touchEnabled = true;
                this.logout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.logoutGame, this);
                //根据Scatter当前身份状况判断是否已经登陆/登出，并显示相应按钮
                ScatterUtils.getIdentity().then(function (identiy) {
                    if (identiy == null) {
                        _this.stage.addChild(_this.login);
                    }
                    else {
                        ScatterUtils.login();
                        _this.stage.addChild(_this.logout);
                    }
                });
                play_glory = this.createBitmapByName("play_png");
                this.stage.addChild(play_glory);
                play_glory.x = 1150;
                play_glory.y = 300;
                play_glory.touchEnabled = true;
                play_glory.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backgroundSound.bind(this, RES.getRes("glory_1_mp3").url), this);
                play_honor = this.createBitmapByName("play_png");
                this.stage.addChild(play_honor);
                play_honor.x = 1150;
                play_honor.y = 350;
                play_honor.touchEnabled = true;
                play_honor.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backgroundSound.bind(this, RES.getRes("honor_1_mp3").url), this);
                play_easy = this.createBitmapByName("play_png");
                this.stage.addChild(play_easy);
                play_easy.x = 1150;
                play_easy.y = 400;
                play_easy.touchEnabled = true;
                play_easy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backgroundSound.bind(this, RES.getRes("easy_1_mp3").url), this);
                play_stop = this.createBitmapByName("stop_png");
                this.stage.addChild(play_stop);
                play_stop.x = 1150;
                play_stop.y = 450;
                play_stop.touchEnabled = true;
                play_stop.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    if (_this.backgroundMusicChannel) {
                        _this.backgroundMusicChannel.stop();
                    }
                }, this);
                /******************** */
                this.stage.addChild(this.textfield);
                //this.popMessageBox()
                //更新游戏房间列表，位置为上栏
                this.refreshHouseList();
                // 建立与合约的定时器，每5秒更新一次数据到每个游戏房间，然后更新正在打开的棋盘玩家，然后渲染战斗（如果有的话）
                egret.setInterval(function () {
                    _this.refreshHouseList().then(function () {
                        // console.log("selectedHouse",this.selectedHouse.getID())
                        // console.log("houseList1",this.houseList)
                        if (_this.selectedHouse) {
                            _this.houseList.map(function (house) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(house.getID() == this.selectedHouse.getID())) return [3 /*break*/, 2];
                                            this.selectedHouse = house;
                                            //更新棋盘玩家
                                            return [4 /*yield*/, this.updateObjectsInBoard(house)];
                                        case 1:
                                            //更新棋盘玩家
                                            _a.sent();
                                            this.createSafeArea(house.getSafeAreaRadius());
                                            //检查是否生成战斗
                                            this.checkBattersInHouse(house);
                                            //创建随机生成的礼炮/烟花动画
                                            this.animation({ json: "firework_json", png: "firework_png", data: "firework", x: 500 * Math.random(), y: 500 * Math.random() }).then(function (animate) {
                                                _this.board.addChild(animate);
                                                animate.play(1);
                                                setTimeout(function () {
                                                    _this.board.removeChild(animate);
                                                    animate == null;
                                                }, 4000); //4秒钟后消除烟花效果
                                            });
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                    });
                }, this, 5000); //每5秒从合约从取得所有游戏信息并更新
                return [2 /*return*/];
            });
        });
    };
    /**
     * 初始化棋盘，生成里面cell元素并定位，生成点击cell触发移动事件
     *
     */
    Main_bak.prototype.initBoard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var cells;
            return __generator(this, function (_a) {
                if (this.board == null) {
                    this.board = new Board(11, 11); // 构建棋盘 11 x 11
                    this.board.x = 200; //定位棋盘在stage中的位置
                    this.board.y = 110;
                    this.stage.addChild(this.board);
                    cells = this.board.getCellList();
                    cells.map(function (cell) {
                        var cellXY = cell.getXY(); // cell在棋盘中的 X/Y 轴坐标
                        cell.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            _this.move(cellXY.x, cellXY.y, cell.getPosition()); //cellXY 为 棋盘的x/y轴坐标；  cell.x, cell.y 为棋盘的像素坐标                       
                        }, _this);
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    Main_bak.prototype.popMessageBox = function (msgText) {
        var _this = this;
        if (!this.stage.contains(this.messageContainer)) {
            this.stage.addChild(this.messageContainer);
        }
        this.messageContainer.x = this.stage.width / 2 - 100;
        this.messageContainer.y = 50;
        this.messageContainer.width = 300;
        this.messageContainer.height = 200;
        this.messageBox.graphics.clear();
        this.messageBox.graphics.beginFill(0xEEEEEE);
        this.messageBox.graphics.drawRoundRect(0, 0, 300, 200, 15, 15);
        this.messageBox.graphics.endFill();
        //this.messageBox.x = this.stage.width/2 - 100
        //this.messageBox.y = 50
        this.messageContainer.addChild(this.messageBox);
        //this.message.x = this.messageBox.x+10
        //this.message.y = this.messageBox.y+10
        this.message.width = 300;
        this.message.height = 200;
        this.message.size = 18;
        this.message.textColor = 0x000000;
        this.message.text = msgText;
        this.message.$setWordWrap(true);
        this.message.type = egret.TextFieldType.INPUT;
        this.message.$setMultiline(true);
        this.messageContainer.addChild(this.message);
        setTimeout(function () {
            // this.stage.removeChild(this.messageBox)
            // this.stage.removeChild(this.message)
            _this.stage.removeChild(_this.messageContainer);
        }, 4000);
    };
    Main_bak.prototype.createSafeArea = function (radius) {
        //console.log(this.board.width)
        //console.log(radius)
        if (!this.board.contains(this.safeAreaTop)) {
            this.board.addChild(this.safeAreaTop);
            this.board.addChild(this.safeAreaLeft);
            this.board.addChild(this.safeAreaRight);
            this.board.addChild(this.safeAreaBottom);
        }
        this.safeAreaTop.graphics.clear();
        this.safeAreaTop.graphics.beginFill(0x00FF00, 0.2);
        this.safeAreaTop.graphics.drawRect(0, 0, this.board.width, (5 - radius) * 80);
        this.safeAreaTop.graphics.endFill();
        this.safeAreaLeft.graphics.clear();
        this.safeAreaLeft.graphics.beginFill(0x00FF00, 0.2);
        this.safeAreaLeft.graphics.drawRect(0, (5 - radius) * 80, (5 - radius) * 80, this.board.height - ((5 - radius) * 80 * 2));
        this.safeAreaLeft.graphics.endFill();
        this.safeAreaRight.graphics.clear();
        this.safeAreaRight.graphics.beginFill(0x00FF00, 0.2);
        this.safeAreaRight.graphics.drawRect(this.board.width - (5 - radius) * 80, (5 - radius) * 80, (5 - radius) * 80, this.board.height - ((5 - radius) * 80 * 2));
        this.safeAreaRight.graphics.endFill();
        this.safeAreaBottom.graphics.clear();
        this.safeAreaBottom.graphics.beginFill(0x00FF00, 0.2);
        this.safeAreaBottom.graphics.drawRect(0, this.board.height - (5 - radius) * 80, this.board.width, (5 - radius) * 80);
        this.safeAreaBottom.graphics.endFill();
        // this.safeArea.graphics.endFill();
        //this.safeArea.graphics.beginFill(0x000000, 0.2);
        //this.safeArea.graphics.drawRect(50, 50, this.board.width-100, this.board.height-100);
        //this.safeArea.x = target.x + 50
        //this.playerInfo.y = target.y
    };
    /**
     * 棋盘中玩家状态更新。从合约获取玩家信息，清空棋盘上玩家/物品对象，重新生成最新玩家对象和物品并加入棋盘
     *
     */
    Main_bak.prototype.updateObjectsInBoard = function (house) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var board, cellList;
            return __generator(this, function (_a) {
                //
                this.board.clearPlayers();
                board = house.getBoard() //board 为合约返回并存储在house的棋盘/格子数组
                ;
                cellList = this.board.getCellList();
                cellList.map(function (cell, idx) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var element, playerArray, itemId, item;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                element = board[idx] //取得合约棋盘每个格子数据集
                                ;
                                playerArray = element.players;
                                itemId = element.item;
                                return [4 /*yield*/, ItemUtils.createItemById(itemId)
                                    //item.x = cell.x
                                    // item.y = cell.y
                                ];
                            case 1:
                                item = _a.sent();
                                //item.x = cell.x
                                // item.y = cell.y
                                cell.addItem(item);
                                //this.board.putPlayer(item); //将道具物品放入棋盘
                                playerArray.map(function (playerName) {
                                    house.getPlayerByName(playerName).then(function (player) {
                                        if (player) {
                                            player.setPosition(new egret.Point(cell.x, cell.y));
                                            player.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.selectPlayer.bind(_this, player), _this);
                                            _this.board.putPlayer(player); //将创建的玩家放入棋盘
                                        }
                                    });
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 更新顶部栏的游戏房间列表
     *
     */
    Main_bak.prototype.refreshHouseList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // 
                    /*  ScatterUtils.nowseconds(0).then( result=>{
                          console.log("nowseconds", result)
      
                      }) */
                    return [4 /*yield*/, ScatterUtils.getAllGamesInfo().then(function (games) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    //清除已有游戏房间
                                    return [4 /*yield*/, this.houseList.map(function (house) {
                                            if (_this.stage.contains(house)) {
                                                _this.stage.removeChild(house);
                                                house.destroy();
                                                house = null;
                                            }
                                        })];
                                    case 1:
                                        //清除已有游戏房间
                                        _a.sent();
                                        this.houseList = [];
                                        // 重新添加游戏房间
                                        console.log(games);
                                        if (!games.rows) return [3 /*break*/, 3];
                                        return [4 /*yield*/, games.rows.map(function (gameJson, idx) {
                                                //console.log(gameJson)
                                                _this.createHouse({ name: "johny", bitmap: "house_png" }, gameJson).then(function (house) {
                                                    // console.log(house)
                                                    house.setPosition(new egret.Point(100 * (1 + idx), 5));
                                                    _this.stage.addChild(house);
                                                    _this.houseList.push(house);
                                                });
                                            })];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        //alert("无游戏信息")
                                        this.popMessageBox("无游戏信息");
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }).catch(function (e) {
                            console.error(e);
                            //alert("获取游戏信息失败")
                            _this.popMessageBox("获取游戏信息失败");
                        })];
                    case 1:
                        // 
                        /*  ScatterUtils.nowseconds(0).then( result=>{
                              console.log("nowseconds", result)
          
                          }) */
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏(房间)
     *
     */
    Main_bak.prototype.createGame = function () {
        var _this = this;
        ScatterUtils.getIdentity().then(function (identity) {
            if (identity == null) {
                //alert(ScatterUtils.message.authority)
                _this.popMessageBox(ScatterUtils.message.authority);
                return;
            }
            ScatterUtils.createGame("1.0000 EOS").then(function (transaction) {
                console.log("create", transaction);
                // 判断是否创建成功 
                if (transaction.processed) {
                    _this.refreshHouseList();
                    //     } else if(transaction.login == "failed"){
                }
                else {
                    transaction = JSON.parse(transaction);
                    //alert("创建游戏失败:"+transaction.error.details[0].message)
                    _this.popMessageBox("创建游戏失败:" + transaction.error.details[0].message);
                }
            }).catch(function (e) {
                console.log(e);
                //alert("取消创建游戏")
                _this.popMessageBox("取消创建游戏");
            });
        });
    };
    /**
     * 加入游戏(房间)
     *
     */
    Main_bak.prototype.joinGame = function () {
        var _this = this;
        ScatterUtils.getIdentity().then(function (identity) {
            if (identity == null) {
                //alert(ScatterUtils.message.authority)
                _this.popMessageBox(ScatterUtils.message.authority);
                return;
            }
            if (!_this.selectedHouse) {
                console.log("no house selected");
                //alert("请选择加入的游戏房间")
                _this.popMessageBox("请选择加入的游戏房间");
                return;
            }
            ScatterUtils.joinGame(_this.selectedHouse.getID(), _this.selectedHouse.getJoinEos(), 4, 4).then(function (transaction) {
                console.log("transaction", transaction);
                if (!transaction.processed) {
                    transaction = JSON.parse(transaction);
                    //alert("加入游戏失败:"+transaction.error.details[0].message)
                    _this.popMessageBox("加入游戏失败:" + transaction.error.details[0].message);
                }
                else {
                    //alert("加入游戏！")
                    _this.popMessageBox("加入游戏！");
                }
            }).catch(function (e) {
                console.error(e);
                //alert("加入游戏失败:"+ e)
                _this.popMessageBox("加入游戏失败:" + e);
            });
        });
    };
    /**
     * 设置调用api设置合约地图
     *
     */
    Main_bak.prototype.setMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                ScatterUtils.getIdentity().then(function (identity) {
                    if (identity == null) {
                        //alert(ScatterUtils.message.authority)
                        _this.popMessageBox(ScatterUtils.message.authority);
                        return;
                    }
                    if (!_this.selectedHouse) {
                        console.log("no house selected");
                        //alert("请选择设定棋盘的游戏房间")
                        _this.popMessageBox("请选择设定棋盘的游戏房间");
                        return;
                    }
                    ScatterUtils.setMap(_this.selectedHouse.getID()).then(function (result) {
                        console.log("result", result);
                        if (result.succ == 1) {
                            //alert("棋盘地图设定成功！")       
                            _this.popMessageBox("棋盘地图设定成功！");
                        }
                        else {
                            //alert("棋盘地图设定失败："+ result.errmsg)
                            //alert("棋盘地图已经设定")
                            _this.popMessageBox("棋盘地图已经设定");
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 点击棋盘位置，触发移动请求，验证放在后台合约，前端只根据结果显示
     *
     */
    Main_bak.prototype.move = function (moveX, moveY, position) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                ScatterUtils.getIdentity().then(function (identity) {
                    if (identity == null) {
                        //alert(ScatterUtils.message.authority)
                        _this.popMessageBox(ScatterUtils.message.authority);
                        return;
                    }
                    var gameId = _this.selectedHouse.getID();
                    ScatterUtils.move(gameId, moveX, moveY).then(function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                        var name_1, currentPlayer;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("move transaction", transaction);
                                    if (!!transaction.processed) return [3 /*break*/, 1];
                                    transaction = JSON.parse(transaction);
                                    //alert("移动失败："+transaction.error.details[0].message)
                                    this.popMessageBox("移动失败：" + transaction.error.details[0].message);
                                    return [3 /*break*/, 4];
                                case 1: return [4 /*yield*/, ScatterUtils.getCurrentAccountName()
                                    // console.log("name", name)
                                    // console.log("getPlayerList", this.selectedHouse.getPlayerList())
                                ]; //通过钱包获取当前玩家账户名
                                case 2:
                                    name_1 = _a.sent() //通过钱包获取当前玩家账户名
                                    ;
                                    return [4 /*yield*/, this.selectedHouse.getPlayerList().filter(function (player) {
                                            return player.getName() == name_1; //通过当前玩家账户名 取得当前棋盘玩家对象
                                        })];
                                case 3:
                                    currentPlayer = _a.sent();
                                    console.log("currentPlayer", currentPlayer);
                                    if (currentPlayer.length > 0) {
                                        //let currentPlayerBitmap = currentPlayer[0].getBitmap()
                                        // let position = currentPlayer[0].getPosition()
                                        egret.Tween.get(currentPlayer[0]).to(position, 500, egret.Ease.sineIn)
                                            .wait(0).call(this.checkCellItem.bind(this, moveX, moveY));
                                    }
                                    else {
                                        //   this.updatePlayersInBoard(gameId).then( ()=>{
                                        //       this.checkCell(moveX,moveY)
                                        //  })
                                    }
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); }).catch(function (e) {
                        console.error(e);
                        //alert("移动失败")
                        _this.popMessageBox("移动失败");
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 根据当前游戏战斗结算，对棋盘进行战斗渲染
     *
     */
    Main_bak.prototype.checkBattersInHouse = function (house) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var board, progress, step;
            return __generator(this, function (_a) {
                board = house.getBoard() //取得合约返回的棋盘数据
                ;
                progress = house.getProgress() //取得当前游戏progress
                ;
                step = house.getStep() //取得当前游戏step
                ;
                board.map(function (cell, idx) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var attact_evt;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(cell.players.length > 0)) return [3 /*break*/, 2];
                                return [4 /*yield*/, cell.event_list.filter(function (event) {
                                        return (event.progress == progress && event.step == step && event.evt == "attack");
                                    })
                                    //console.log("attact_evt", attact_evt)
                                ];
                            case 1:
                                attact_evt = _a.sent();
                                //console.log("attact_evt", attact_evt)
                                if (attact_evt.length > 0) {
                                    this.board.getCellById(cell.cell_id).then(function (cell) { return __awaiter(_this, void 0, void 0, function () {
                                        var time, nowSeconds;
                                        return __generator(this, function (_a) {
                                            time = cell.getBattleTime();
                                            nowSeconds = new Date().getTime();
                                            //console.log("time", nowSeconds - time)
                                            if (nowSeconds - time > 30000) {
                                                cell.setBattleTime(nowSeconds);
                                                this.attackTarget(cell.getPosition());
                                                // console.log("playersInCell",playersInCell)
                                                // if (playersInCell.length > 1){
                                                // }
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); });
                                }
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    /**
     * Description: 此方法暂时废弃
     * @rowX
     * @rowY
     */
    Main_bak.prototype.checkCellItem = function (rowX, rowY) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                /*
                ScatterUtils.getGameInfo(gameId).then( async result=>{
                   // this.board.removeChild(loadingView);
                    //清除棋盘上原有玩家以及游戏房间中的玩家对象
                   // this.board.clearPlayers()
                   // this.selectedHouse.clearPlayerList()

                    console.log("game info", result)
                    if (result.rows.length > 0){
                        let board = result.rows[0].board
                        console.log("board", board)
                        board.map( (cell, idx)=>{
                            //this.createPlayer(playerJson)  //根据合约最新返回的玩家信息，创建游戏中的玩家对象
                            //return cell.players.length > 1
                            if (cell.players.length > 1){
                                console.log("cell.players.length", cell.players.length)
                                this.board.getCellById(cell.cell_id).then( async cell=>{
                                    //let cell_id = cell.getID()
                                    let playersInCell = await this.selectedHouse.getPlayerList().filter( player=>{
                                        return player.getCellId() == cell.getID()
                                    })
                                    console.log("playersInCell",playersInCell)
                                   // if (playersInCell.length > 1){
                                        this.attackTarget(cell.getPosition(), playersInCell)
                                   // }

                                })
                            }
                        })

                    } else {
                        alert("获取游戏信息失败")
                    }
                    
                }).catch((e) => {
                    console.error(e);
                    alert("获取游戏信息失败："+ e)
                })
                */
                this.board.getCellByXY(rowX, rowY).then(function (cell) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var item, position;
                    return __generator(this, function (_a) {
                        item = cell.getItem();
                        //item.setPosition(new egret.Point(0, 0))
                        if (item.getId() == 1) {
                            this.animation({ json: "blow_json", png: "blow_png", data: "blow", x: cell.x - 100, y: cell.y - 100 }).then(function (animate) {
                                _this.board.addChild(animate);
                                animate.play(1);
                                cell.removeChild(item);
                                _this.actionSound(RES.getRes("blow_mp3").url);
                                setTimeout(function () {
                                    _this.board.removeChild(animate);
                                    animate == null;
                                }, 1500);
                            });
                        }
                        else {
                            position = { x: 0, y: -30 };
                            egret.Tween.get(item).to(position, 300, egret.Ease.sineIn);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    /**
     * kick off 游戏
     *
     */
    Main_bak.prototype.kickOff = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                ScatterUtils.getIdentity().then(function (identity) {
                    if (identity == null) {
                        //alert(ScatterUtils.message.authority)
                        _this.popMessageBox(ScatterUtils.message.authority);
                        return;
                    }
                    if (!_this.selectedHouse) {
                        console.log("no house selected");
                        //alert("请选择Kick Off的游戏房间")
                        _this.popMessageBox("请选择Kick Off的游戏房间");
                        return;
                    }
                    var game_id = _this.selectedHouse.getID();
                    ScatterUtils.kickOff(game_id).then(function (transaction) {
                        console.log(transaction);
                        if (!transaction.processed) {
                            transaction = JSON.parse(transaction);
                            //alert("KickOff游戏失败："+transaction.error.details[0].message)
                            _this.popMessageBox("KickOff游戏失败：" + transaction.error.details[0].message);
                        }
                        else {
                            //alert("游戏 Kick Off！")
                            var clock = _this.selectedHouse.getClock();
                            //clock.x = 1150
                            //clock.y = 150
                            // this.stage.addChild(clock)
                            clock.start(); // 选中游戏的时间开始计时
                            //this.refreshHouseList()   // 更新房间的状态
                            /*
                            this.initBoard().then( ()=>{  //如果棋盘没有初始化，则先初始化再更新棋盘玩家
                                
                                this.updatePlayersInBoard(this.selectedHouse.getID())
                            })
                            */
                            //egret.setInterval(this.checkCell.bind(this,game_id), this, 30000)
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     *  描述：点击创建城堡图标产生的生成游戏房间
     *  参数：@param: 创建城市所需要的参数。 格式：{name:城市名, bitmap:位图名}
     *       @game: 合约返回的游戏信息， 包含game_id，join_eos等，初始化游戏房间时使用
     */
    Main_bak.prototype.createHouse = function (param, gameJson) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var house;
            return __generator(this, function (_a) {
                house = new House(param, gameJson);
                //let houseBitMap = house.getBitmap()
                //this.stage.addChild(houseBitMap); 
                //this.selectedHouse = house
                // 以下为点击房间所产生的相应事件行为
                house.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    if (_this.selectedHouse == house) {
                        // 重复点击同一个house, 看是否需要处理
                        //return
                    }
                    _this.selectedHouse = house;
                    console.log("this.selectedHouse", _this.selectedHouse);
                    _this.showLife(_this.stage, house);
                    _this.showText(gameJson.game_id + "号房:" + (gameJson.game_progress == 2 ? "已开局" : "未开局"), { x: house.x, y: house.y + 80 });
                    _this.initBoard().then(function () {
                        _this.updateObjectsInBoard(house).then(function () {
                            _this.updateClockInStage(house.getClock());
                        });
                    });
                }, this);
                // 可拖拉创建的城市
                // houseBitMap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                // houseBitMap.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                return [2 /*return*/, house
                    // let result = await ScatterUtils.createGame("1.0000 EOS")
                    // console.log("create", result)
                ];
            });
        });
    };
    Main_bak.prototype.updateClockInStage = function (_clock) {
        if (this.stage.contains(this.clock)) {
            this.stage.removeChild(this.clock);
        }
        this.clock = _clock;
        this.clock.x = 1150;
        this.clock.y = 150;
        this.clock.start();
        this.stage.addChild(this.clock);
    };
    /**
     *  *******遗弃******
     *  描述：更新棋盘玩家时，生成最新玩家信息
     *  参数：@playerJson 合约返回的player信息，包含账户名acc_name, 所在位置cell_id
     */
    Main_bak.prototype.createPlayer = function (playerJson) {
        return __awaiter(this, void 0, void 0, function () {
            var cell_id, player, cell, cell_position, _x, _y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //this.unmountMovement()
                        if (!this.selectedHouse) {
                            console.log("no town selected");
                            return [2 /*return*/];
                        }
                        cell_id = playerJson.cell_id // playerJson 包含合约返回的player所在cell_id
                        ;
                        player = this.selectedHouse.createPlayers(playerJson);
                        return [4 /*yield*/, this.board.getCellList().filter(function (cell) {
                                return cell.getID() == cell_id;
                            })];
                    case 1:
                        cell = _a.sent();
                        cell_position = cell[0].getPosition();
                        _x = cell_position.x;
                        _y = cell_position.y;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 登陆游戏
     *
     */
    Main_bak.prototype.loginGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                ScatterUtils.login().then(function (message) {
                    if (message.login) {
                        alert("欢迎: " + message.details);
                        //this.popMessageBox("欢迎: "+ message.details)
                        if (_this.stage.contains(_this.login)) {
                            _this.stage.removeChild(_this.login);
                        }
                        if (!_this.stage.contains(_this.logout)) {
                            _this.stage.addChild(_this.logout);
                        }
                    }
                    else {
                        alert(message.details);
                        //this.popMessageBox(message.details)
                    }
                }).catch(function (e) {
                    console.log("e", e);
                    //alert(e)
                    _this.popMessageBox(e);
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 登出游戏
     *
     */
    Main_bak.prototype.logoutGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                ScatterUtils.logout().then(function (message) {
                    //     ScatterUtils.getCurrentAccountName().then( name=>{
                    alert(message.details);
                    //this.popMessageBox(message.details)
                    if (message.logout) {
                        if (_this.stage.contains(_this.logout)) {
                            _this.stage.removeChild(_this.logout);
                        }
                        if (!_this.stage.contains(_this.login)) {
                            _this.stage.addChild(_this.login);
                        }
                    }
                    //       })                                           
                }).catch(function (e) {
                    console.log("e", e);
                    alert(e);
                });
                return [2 /*return*/];
            });
        });
    };
    Main_bak.prototype.animation = function (animateJson) {
        return __awaiter(this, void 0, void 0, function () {
            var animateFactory, animate;
            return __generator(this, function (_a) {
                animateFactory = new egret.MovieClipDataFactory(RES.getRes(animateJson.json), RES.getRes(animateJson.png));
                animate = new egret.MovieClip(animateFactory.generateMovieClipData(animateJson.data));
                // role.gotoAndPlay(1, 3);
                animate.x = animateJson.x;
                animate.y = animateJson.y;
                // animate.width = 800;
                // animate.height = 800;               
                return [2 /*return*/, animate];
            });
        });
    };
    Main_bak.prototype.showInfo = function (target) {
        var _this = this;
        /*
        let life = target.getLife()
        let color

        if (life.remain >= life.full*0.6 ) {
            color = 0x00EE00   // 绿色生命值 健康
        } else if (life.remain >= life.full*0.4 && life.remain < life.full*0.6 ){
            color = 0xFFFF00   // 黄色生命值 危险
        } else {
            color = 0xFF0000   // 红色生命值 危殆
        }
        this._life.graphics.clear()
        this._life.graphics.lineStyle(4, color);
        this._life.graphics.moveTo(target.getPosition().x, target.getPosition().y);
        this._life.graphics.lineTo(target.getPosition().x + life.remain, target.getPosition().y);
        this.board.addChild(this._life)
        */
        //
        if (this.board.contains(this.playerInfo)) {
            this.board.removeChild(this.playerInfo);
        }
        this.playerInfo.graphics.clear();
        this.playerInfo.graphics.beginFill(0xEEEEEE);
        this.playerInfo.graphics.drawRoundRect(0, 0, 120, 160, 15, 15);
        this.playerInfo.graphics.endFill();
        this.playerInfo.x = target.x + 50;
        this.playerInfo.y = target.y;
        this.board.addChild(this.playerInfo);
        this.player_name.x = this.playerInfo.x;
        this.player_name.y = this.playerInfo.y;
        this.player_name.size = 18;
        this.player_name.textColor = 0x000000;
        this.player_name.text = "玩家:" + target.getName();
        this.board.addChild(this.player_name);
        this.player_hp.x = this.playerInfo.x;
        this.player_hp.y = this.playerInfo.y + 20;
        this.player_hp.size = 18;
        this.player_hp.textColor = 0x000000;
        this.player_hp.text = "HP: " + target.getLife();
        this.board.addChild(this.player_hp);
        this.player_weapon.x = this.playerInfo.x;
        this.player_weapon.y = this.playerInfo.y + 40;
        this.player_weapon.size = 18;
        this.player_weapon.textColor = 0x000000;
        this.player_weapon.text = "武器: " + ItemUtils.getItemNameById(target.getWeapon());
        this.board.addChild(this.player_weapon);
        this.player_attack.x = this.playerInfo.x;
        this.player_attack.y = this.playerInfo.y + 60;
        this.player_attack.size = 18;
        this.player_attack.textColor = 0x000000;
        this.player_attack.text = "攻击力: " + target.getAttack();
        this.board.addChild(this.player_attack);
        this.player_defense.x = this.playerInfo.x;
        this.player_defense.y = this.playerInfo.y + 80;
        this.player_defense.size = 18;
        this.player_defense.textColor = 0x000000;
        this.player_defense.text = "防御力: " + target.getDefense();
        this.board.addChild(this.player_defense);
        this.player_eos.x = this.playerInfo.x;
        this.player_eos.y = this.playerInfo.y + 100;
        this.player_eos.size = 18;
        this.player_eos.textColor = 0x000000;
        this.player_eos.text = "EOS: " + target.getGold();
        this.board.addChild(this.player_eos);
        var items = function () {
            var nameStr = '';
            target.getItems().map(function (id) {
                nameStr = nameStr + ItemUtils.getItemNameById(id) + '\n         ';
            });
            return nameStr;
        };
        this.player_item.x = this.playerInfo.x;
        this.player_item.y = this.playerInfo.y + 120;
        this.player_item.size = 18;
        this.player_item.textColor = 0x000000;
        this.player_item.text = "物品: " + items();
        this.board.addChild(this.player_item);
        setTimeout(function () {
            _this.board.removeChild(_this.playerInfo);
            _this.board.removeChild(_this.player_name);
            _this.board.removeChild(_this.player_hp);
            _this.board.removeChild(_this.player_weapon);
            _this.board.removeChild(_this.player_attack);
            _this.board.removeChild(_this.player_defense);
            _this.board.removeChild(_this.player_eos);
            _this.board.removeChild(_this.player_item);
        }, 8000);
    };
    //******************************************************************************************************************* */    
    //************************************************以下为无用或辅助方法************************************************* */
    //******************************************************************************************************************* */
    /**
     *  描述：撤回/召回所选士兵
     *
     */
    Main_bak.prototype.recall = function (player) {
        if (!player) {
            player = this.selectedPlayer;
        }
        if (player) {
            this.unmountMovement();
            this.clearRoute(player.getTask().action);
            // if (!this.selectedWarrior) {return}
            var status_1 = player.getTask().status;
            var house = player.getHouse();
            var recallPoint = house.getPosition(); // {x:number , y:number}
            var playerBitmap = player.getBitmap();
            egret.Tween.removeTweens(playerBitmap);
            if (status_1 && status_1 == "completed") {
                egret.Tween.get(playerBitmap).to(recallPoint, 1000, egret.Ease.sineIn);
            }
            else {
                egret.Tween.get(playerBitmap).to(recallPoint, 0, egret.Ease.sineIn);
            }
            player.setTask({ action: "idle", target: null, status: null });
        }
    };
    /**
     *  描述：点击创建所选士兵的任务
     *  参数：@_action: 任务名称
     */
    Main_bak.prototype.initTask = function (_action) {
        var _this = this;
        //this.canvas.addEventListener('mousemove',this.onMove.bind(this));
        if (this.selectedPlayer) {
            this.unmountMovement();
            //任务json对象 {action:string, target:Object, status:string} - action: idle/enforce/attack, target:Town/Warrior, status: completed
            this.selectedPlayer.setTask({ action: _action, target: null, status: null });
            setTimeout(function () {
                _this.mountMovement();
            }, 300);
        }
        else {
            console.log("no warrior selected");
        }
    };
    /**
     *  描述：显示所选目标生命值
     *  参数：@target: 生命值所属目标
     */
    Main_bak.prototype.showLife = function (container, target) {
        var life = target.getLife();
        var color;
        if (life.remain >= life.full * 0.6) {
            color = 0x00EE00; // 绿色生命值 健康
        }
        else if (life.remain >= life.full * 0.4 && life.remain < life.full * 0.6) {
            color = 0xFFFF00; // 黄色生命值 危险
        }
        else {
            color = 0xFF0000; // 红色生命值 危殆
        }
        this._life.graphics.clear();
        this._life.graphics.lineStyle(4, color);
        this._life.graphics.moveTo(target.getPosition().x, target.getPosition().y);
        this._life.graphics.lineTo(target.getPosition().x + life.remain, target.getPosition().y);
        container.addChild(this._life);
    };
    Main_bak.prototype.showText = function (_text, position) {
        this.textfield.x = position.x;
        this.textfield.y = position.y;
        this.textfield.size = 22;
        this.textfield.textColor = 0x000000;
        this.textfield.text = _text;
    };
    /**
     *  描述：点击士兵条栏产生的选中士兵对象行为
     *  参数：@warrior: 点选的士兵对象
     */
    Main_bak.prototype.selectPlayer = function (player) {
        this.showInfo(player);
        this.actionSound(RES.getRes("yes_mp3").url);
        /*
        this.unmountMovement()
        //判断当前点选士兵是否为当前城市所有
        let belonging = player.getHouse() == this.selectedHouse? true : false
        if (!belonging){
            //判断当前点选士兵任务是否为增援当前所选城市
            let task = player.getTask()
            if (task.action =="enforce" && task.target == this.selectedHouse ){
                belonging = true
            }
        }
        if (belonging){  //如果所选士兵属于或增援选定城市，则该士兵可以被调用
            this.selectedPlayer = player
            // 提升对象到显示层顶端
            this.stage.setChildIndex(this.selectedPlayer.getBitmap(), 10)
            //标签所选士兵
            this.showLife(this.board, player)

            //选中士兵应答声效
            this.actionSound(RES.getRes("ack_mp3").url)
        }
        setTimeout( ()=> { //恢复移动监听
                this.mountMovement()
            },300)
            */
    };
    /**
     *  描述：行为声效
     *  参数：@_url: 音效地址
     */
    Main_bak.prototype.actionSound = function (_url) {
        var sound = new egret.Sound();
        sound.addEventListener(egret.Event.COMPLETE, function (e) {
            sound.play(0, 1);
        }, this);
        sound.load(_url);
    };
    /**
     *  描述：游戏背景行为声效
     *  参数：@_url: 音效地址
     */
    Main_bak.prototype.backgroundSound = function (_url) {
        if (this.backgroundMusicChannel) {
            this.backgroundMusicChannel.stop();
        }
        this.backgroundMusic.addEventListener(egret.Event.COMPLETE, this.play, this);
        this.backgroundMusic.load(_url);
    };
    Main_bak.prototype.play = function () {
        this.backgroundMusicChannel = this.backgroundMusic.play(0, 0);
    };
    /**
     *  描述：移动士兵到舞台点击的位置
     *  参数：@evt: 鼠标点击地图后产生的移动终止点
     */
    Main_bak.prototype.movePlayer = function (evt) {
        console.log("moving");
        // let warrior = this.selectedWarrior
        if (this.selectedPlayer == null || typeof (this.selectedPlayer) == "undefined") {
            return;
        }
        if (this.stage.contains(this._life)) {
            this.stage.removeChild(this._life);
        }
        //移除已存在缓动
        var playerBitmap = this.selectedPlayer.getBitmap();
        egret.Tween.removeTweens(playerBitmap);
        //定义移动起始/终结
        var startPoint = { x: playerBitmap.x, y: playerBitmap.y };
        var endPoint = { x: evt.stageX, y: evt.stageY };
        var action = this.selectedPlayer.getTask().action;
        this.drawRoute(startPoint, endPoint, action);
        // 士兵终点位置微调：offset = 图片尺寸/2
        var playerOffsetPoint = { x: evt.stageX - 17, y: evt.stageY - 25 };
        //行军时间为3秒
        egret.Tween.get(playerBitmap).to(playerOffsetPoint, 3000, egret.Ease.sineIn).wait(500).call(this.doAction.bind(this, this.selectedPlayer, action, playerOffsetPoint, endPoint));
    };
    Main_bak.prototype.mountMovement = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.movePlayer, this);
    };
    Main_bak.prototype.unmountMovement = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.movePlayer, this);
    };
    /**
     *  描述：到达任务地址后执行任务
     *  参数 @warrior: 士兵对象
     *       @action: 任务名称
     *       @warriorOffsetPoint: 攻击执行士兵中心点
     *       @attackPoint:攻击点
     */
    Main_bak.prototype.doAction = function (player, action, playerOffsetPoint, attackPoint) {
        var _this = this;
        //清除已有线路痕迹,清除目标图标,例如this.flat, this.attack
        this.clearRoute(action);
        //判断如果士兵触碰目标，则触发行动可执行
        var actionObject = player.getTask().target;
        var executable = (actionObject == null || actionObject.getBitmap() == null) ? false : actionObject.getBitmap().hitTestPoint(attackPoint.x, attackPoint.y, true);
        console.log("execute=" + executable);
        if (executable) {
            var _actionShow_1 = this.createBitmapByName("sword_png");
            _actionShow_1.x = playerOffsetPoint.x;
            _actionShow_1.y = playerOffsetPoint.y;
            this.stage.addChild(_actionShow_1);
            //如果是攻击，则触发攻击效果图
            if (action == "attack") {
                this.attackTarget(playerOffsetPoint).then(function () {
                    //攻击完毕后，士兵回撤，状重置为idle，等待下一次任务                                  
                    player.setTask({ action: "attack", target: null, status: "completed" });
                    _this.recall(player);
                });
            }
            else {
                player.setTask({ action: "enforce", target: actionObject, status: "completed" });
            }
            setTimeout(function () {
                _this.stage.removeChild(_actionShow_1);
                _actionShow_1 = null;
            }, 1000);
        }
        else {
            player.setTask({ action: "idle", target: null });
        }
    };
    /**
     *  描述：执行攻击任务效果展示
     *  参数：@warriorOffsetPoint: 攻击执行士兵中心点
     *       @actionObject: 攻击对象
     */
    Main_bak.prototype.attackTarget = function (playerOffsetPoint) {
        var _this = this;
        /*
         let _actionShow = this.createBitmapByName("sword_png")
             _actionShow.x = playerOffsetPoint.x
             _actionShow.y = playerOffsetPoint.y
             this.board.addChild(_actionShow)
             */
        //创建攻击动画效果
        var fightFactory = new egret.MovieClipDataFactory(RES.getRes("fight_json"), RES.getRes("fight_png"));
        var fighting = new egret.MovieClip(fightFactory.generateMovieClipData("fight"));
        // role.gotoAndPlay(1, 3);
        fighting.x = playerOffsetPoint.x;
        fighting.y = playerOffsetPoint.y;
        fighting.width = 50;
        fighting.height = 50;
        this.board.addChild(fighting);
        fighting.play(20);
        this.actionSound(RES.getRes("shooting_mp3").url);
        //显示玩家生命值
        /* playersInCell.map(player=>{
             let _life = player.getLife()
             _life.remain = _life.remain - _life.full*0.2
             player.setLife(_life)
             this.showLife(this.board, player)

         }) */
        // 生命值减损，默认一次攻击扣减20%
        //         if ( _life.remain <=0){ // 生命值为0，则相关对象被消灭           
        //             this.board.removePlayer(actionObject) 
        /*
        if (actionObject instanceof House){
            //消灭移除城市所属士兵
            let list = actionObject.getPlayerList()
            list.map( async (player)=>{
                this.stage.removeChild(player.getBitmap())
                await this.removePlayerIcon(player)
                this.refrashPlayerIcon()
            })
            
        } else if (actionObject instanceof Player){
            //从所属城市士兵队列中移除
            let list = actionObject.getHouse().getPlayerList()
            list.map( async (player, idx)=>{
                if (actionObject == player){
                    list.splice(idx,1)
                    await this.removePlayerIcon(player)
                    this.refrashPlayerIcon()
                }
            })
        }
        */
        //获取金币
        //let gold = actionObject.getGold()
        //创建攻击动画效果
        var moneyFactory = new egret.MovieClipDataFactory(RES.getRes("money_json"), RES.getRes("money_png"));
        var money = new egret.MovieClip(moneyFactory.generateMovieClipData("money"));
        // role.gotoAndPlay(1, 3);
        money.x = playerOffsetPoint.x;
        money.y = playerOffsetPoint.y - 30;
        this.board.addChild(money);
        money.play(2);
        // 摧毁音效
        this.actionSound(RES.getRes("destroyhuman_wav").url);
        //    actionObject.destroy()
        //     if (this.selectedHouse == actionObject){
        //         this.selectedHouse = actionObject = null
        //     }
        setTimeout(function () {
            _this.board.removeChild(money);
            money == null;
        }, 2000);
        //          } 
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                _this.board.removeChild(fighting);
                if (_this.board.contains(_this._life)) {
                    _this.board.removeChild(_this._life);
                }
                fighting == null;
                resolve();
            }, 1000);
        });
    };
    /**
     *  描述：移动时绘出的线路图：攻击为红色；增援为绿色；普通移动为黄色
     *  参数：@start: 线路起始点
     *       @end: 线路终止点
     *       @action: 任务
     */
    Main_bak.prototype.drawRoute = function (start, end, action) {
        this.clearRoute(action);
        var routeColor;
        var endOffsetX;
        var endOffsetY;
        switch (action) {
            case "attack":
                routeColor = 0xFF0000;
                endOffsetX = 25;
                endOffsetY = 25;
                break;
            case "enforce":
                routeColor = 0x00EE00;
                endOffsetX = 10;
                endOffsetY = 50;
                break;
            default:
                routeColor = 0xFFFF00;
                endOffsetX = 10;
                endOffsetY = 50;
        }
        this._route.graphics.lineStyle(2, routeColor);
        this._route.graphics.moveTo(start.x, start.y);
        this._route.graphics.lineTo(end.x, end.y);
        // this.attack, this.enforce 图标显示，精细位置根据图标尺寸调整
        this[action].x = end.x - endOffsetX;
        this[action].y = end.y - endOffsetY;
        this.stage.addChild(this[action]);
    };
    /**
     *  描述：清除已有线路和任务图标
     *  参数：@action: 任务
     */
    Main_bak.prototype.clearRoute = function (action) {
        this._route.graphics.clear();
        if (this.stage.contains(this[action])) {
            this.stage.removeChild(this[action]);
        }
        if (this.stage.contains(this._life)) {
            this.stage.removeChild(this._life);
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main_bak.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     *  鼠标左键按下
     */
    Main_bak.prototype.mouseDown = function (evt) {
        this._touchStatus = true;
        this._distance.x = evt.stageX - evt.target.x;
        this._distance.y = evt.stageY - evt.target.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    /**
     *  鼠标移动
     */
    Main_bak.prototype.mouseMove = function (evt) {
        if (this._touchStatus) {
            try {
                evt.target.x = evt.stageX - this._distance.x;
                evt.target.y = evt.stageY - this._distance.y;
            }
            catch (e) {
                console.log(e);
            }
        }
    };
    /**
     *  鼠标左键抬起
     */
    Main_bak.prototype.mouseUp = function (evt) {
        this._touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    /**
     *  从顶部士兵标签栏移除指定士兵
     */
    Main_bak.prototype.removePlayerIcon = function (player) {
        var _this = this;
        var id = player.getUUID();
        this.soilderIconList.map(function (obj, idx) {
            if (obj.key == id) {
                if (_this.stage.contains(obj.icon)) {
                    _this.stage.removeChild(obj.icon);
                }
                _this.soilderIconList.splice(idx, 1);
            }
        });
    };
    /**
     *  顶部士兵标签栏重行排列
     */
    Main_bak.prototype.refrashPlayerIcon = function () {
        this.soilderIconList.map(function (obj, idx) {
            obj.icon.x = 110 + idx * 68;
        });
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main_bak.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main_bak;
}(egret.DisplayObjectContainer));
__reflect(Main_bak.prototype, "Main_bak");
//# sourceMappingURL=Main_bak.js.map