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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.gameContainer = new egret.DisplayObjectContainer();
        _this._touchStatus = false; //???????????????????????????????????????true
        _this._distance = new egret.Point();
        _this.textfield = new egret.TextField();
        _this.tmxTileMap = tiled.TMXTilemap;
        _this._route = new egret.Shape();
        _this._life = new egret.Shape();
        _this.soilderIconList = [];
        //private houseList:Array<House> = []
        _this.eos_one = [];
        _this.eos_three = [];
        _this.eos_five = [];
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
        _this.messageContainer = new egret.DisplayObjectContainer();
        _this.messageBox = new egret.Shape();
        _this.message = new egret.TextField();
        _this.messageTitle = new egret.TextField();
        _this.descriptionContainer = new egret.DisplayObjectContainer();
        _this.descriptionBox = new egret.Shape();
        _this.description = new egret.TextField();
        _this.descriptionTitle = new egret.TextField();
        //??????????????????
        _this.townRandomName = ["johny", "kitty", "peter"];
        _this.num = 0;
        _this.oneEosContainer = new egret.DisplayObjectContainer();
        _this.threeEosContainer = new egret.DisplayObjectContainer();
        _this.fiveEosContainer = new egret.DisplayObjectContainer();
        _this.messageTimeout = null;
        //PC ?????? ????????????
        _this.mobile = false; //if mobile device
        /**
         *  ??????????????????
         */
        _this.touchPoints = { names: [] }; //{touchid:touch local,names:[ID1,ID2]};
        _this.distance = 0;
        _this.touchCon = 0;
        _this.lastPositionX = 0;
        _this.lastPositionY = 0;
        _this.canvas = document.getElementsByTagName("CANVAS")[0];
        //this.canvas.addEventListener('mousemove',this.onMove.bind(this));
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
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
     * ????????????????????????????????????????????????
     */
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LocaleUtils.locale = localStorage.getItem("eatchicken_locale") == null ? 'zh_CN' : localStorage.getItem("eatchicken_locale").toString();
                // await ScatterUtils.login()
                //await ScatterUtils.getAccountInfo()
                //await  ScatterUtils.getAllGamesInfo()
                //await ScatterUtils.getGameInfo(3)
                //await ScatterUtils.createGame("1.0000 EOS")
                //await ScatterUtils.joinGame(9, "1.0000 EOS", 0, 0)
                //await ScatterUtils.kickoff(10)
                // let info = await ScatterUtils.move(10, 1 ,2)
                // console.log("info",info)
                //  var image = new eui.Image();
                //  image.source = "resource/assets/west.jpg";
                // this.addChild(image);
                // image.x = 100;
                // image.y = 100;
                this.createGameScene();
                return [2 /*return*/];
            });
        });
    };
    /**
     * ????????????/??????
     */
    Main.prototype.loadResource = function () {
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
     * ??????????????????
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var createGameFlat_1eos, progress_all_1eos, progress_all_1eos_text, progress_1_1eos, progress_1_1eos_text, progress_2_1eos, progress_2_1eos_text, createGameFlat_3eos, progress_all_3eos, progress_all_3eos_text, progress_1_3eos, progress_1_3eos_text, progress_2_3eos, progress_2_3eos_text, createGameFlat_5eos, progress_all_5eos, progress_all_5eos_text, progress_1_5eos, progress_1_5eos_text, progress_2_5eos, progress_2_5eos_text, messageTitleBox, description, descriptionTitle, localeContainer, localeBox, localeTitle, descriptioTitleBox, descriptionClose, staticLabelI18N;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                        this.stage.addChild(this.gameContainer);
                        createGameFlat_1eos = this.createBitmapByName("EOS_1_png");
                        this.gameContainer.addChild(createGameFlat_1eos);
                        createGameFlat_1eos.width = 100;
                        createGameFlat_1eos.height = 100;
                        createGameFlat_1eos.x = 15;
                        createGameFlat_1eos.y = 70;
                        createGameFlat_1eos.touchEnabled = true;
                        createGameFlat_1eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createGame.bind(this, "1.0000"), this);
                        progress_all_1eos = new egret.Shape();
                        progress_all_1eos.graphics.beginFill(0x00EE00);
                        progress_all_1eos.graphics.lineStyle(2, 0x000000);
                        progress_all_1eos.graphics.drawRoundRect(15, 180, 100, 30, 15, 15);
                        progress_all_1eos.graphics.endFill();
                        progress_all_1eos.touchEnabled = true;
                        progress_all_1eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.filterAndUpdateGameList.bind(this, 1, -1, "game_png", this.oneEosContainer), this);
                        this.gameContainer.addChild(progress_all_1eos);
                        progress_all_1eos_text = new egret.TextField();
                        progress_all_1eos_text.x = 35;
                        progress_all_1eos_text.y = 185;
                        progress_all_1eos_text.size = 18;
                        progress_all_1eos_text.textColor = 0x000000;
                        progress_all_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all");
                        this.gameContainer.addChild(progress_all_1eos_text);
                        progress_1_1eos = new egret.Shape();
                        progress_1_1eos.graphics.beginFill(0x00EE00);
                        progress_1_1eos.graphics.lineStyle(2, 0x000000);
                        progress_1_1eos.graphics.drawRoundRect(15, 220, 100, 30, 15, 15);
                        progress_1_1eos.graphics.endFill();
                        progress_1_1eos.touchEnabled = true;
                        progress_1_1eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.filterAndUpdateGameList.bind(this, 1, 1, "game_png", this.oneEosContainer), this);
                        this.gameContainer.addChild(progress_1_1eos);
                        progress_1_1eos_text = new egret.TextField();
                        progress_1_1eos_text.x = 18;
                        progress_1_1eos_text.y = 225;
                        progress_1_1eos_text.size = 18;
                        progress_1_1eos_text.textColor = 0x000000;
                        progress_1_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable");
                        this.gameContainer.addChild(progress_1_1eos_text);
                        progress_2_1eos = new egret.Shape();
                        progress_2_1eos.graphics.beginFill(0xFFFF00);
                        progress_2_1eos.graphics.lineStyle(2, 0x000000);
                        progress_2_1eos.graphics.drawRoundRect(15, 260, 100, 30, 15, 15);
                        progress_2_1eos.graphics.endFill();
                        progress_2_1eos.touchEnabled = true;
                        progress_2_1eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.filterAndUpdateGameList.bind(this, 1, 2, "game_png", this.oneEosContainer), this);
                        this.gameContainer.addChild(progress_2_1eos);
                        progress_2_1eos_text = new egret.TextField();
                        progress_2_1eos_text.x = 18;
                        progress_2_1eos_text.y = 265;
                        progress_2_1eos_text.size = 18;
                        progress_2_1eos_text.textColor = 0x000000;
                        progress_2_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing");
                        this.gameContainer.addChild(progress_2_1eos_text);
                        createGameFlat_3eos = this.createBitmapByName("EOS_3_png");
                        this.gameContainer.addChild(createGameFlat_3eos);
                        createGameFlat_3eos.width = 100;
                        createGameFlat_3eos.height = 100;
                        createGameFlat_3eos.x = 15;
                        createGameFlat_3eos.y = 390;
                        createGameFlat_3eos.touchEnabled = true;
                        createGameFlat_3eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createGame.bind(this, "3.0000"), this);
                        progress_all_3eos = new egret.Shape();
                        progress_all_3eos.graphics.beginFill(0x00EE00);
                        progress_all_3eos.graphics.lineStyle(2, 0x000000);
                        progress_all_3eos.graphics.drawRoundRect(15, 500, 100, 30, 15, 15);
                        progress_all_3eos.graphics.endFill();
                        progress_all_3eos.touchEnabled = true;
                        progress_all_3eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.filterAndUpdateGameList.bind(this, 3, -1, "game_1_png", this.threeEosContainer), this);
                        this.gameContainer.addChild(progress_all_3eos);
                        progress_all_3eos_text = new egret.TextField();
                        progress_all_3eos_text.x = 35;
                        progress_all_3eos_text.y = 505;
                        progress_all_3eos_text.size = 18;
                        progress_all_3eos_text.textColor = 0x000000;
                        progress_all_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all");
                        this.gameContainer.addChild(progress_all_3eos_text);
                        progress_1_3eos = new egret.Shape();
                        progress_1_3eos.graphics.beginFill(0x00EE00);
                        progress_1_3eos.graphics.lineStyle(2, 0x000000);
                        progress_1_3eos.graphics.drawRoundRect(15, 540, 100, 30, 15, 15);
                        progress_1_3eos.graphics.endFill();
                        progress_1_3eos.touchEnabled = true;
                        progress_1_3eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.filterAndUpdateGameList.bind(this, 3, 1, "game_1_png", this.threeEosContainer), this);
                        this.gameContainer.addChild(progress_1_3eos);
                        progress_1_3eos_text = new egret.TextField();
                        progress_1_3eos_text.x = 18;
                        progress_1_3eos_text.y = 545;
                        progress_1_3eos_text.size = 18;
                        progress_1_3eos_text.textColor = 0x000000;
                        progress_1_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable");
                        this.gameContainer.addChild(progress_1_3eos_text);
                        progress_2_3eos = new egret.Shape();
                        progress_2_3eos.graphics.beginFill(0xFFFF00);
                        progress_2_3eos.graphics.lineStyle(2, 0x000000);
                        progress_2_3eos.graphics.drawRoundRect(15, 580, 100, 30, 15, 15);
                        progress_2_3eos.graphics.endFill();
                        progress_2_3eos.touchEnabled = true;
                        progress_2_3eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.filterAndUpdateGameList.bind(this, 3, 2, "game_1_png", this.threeEosContainer), this);
                        this.gameContainer.addChild(progress_2_3eos);
                        progress_2_3eos_text = new egret.TextField();
                        progress_2_3eos_text.x = 18;
                        progress_2_3eos_text.y = 585;
                        progress_2_3eos_text.size = 18;
                        progress_2_3eos_text.textColor = 0x000000;
                        progress_2_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing");
                        this.gameContainer.addChild(progress_2_3eos_text);
                        createGameFlat_5eos = this.createBitmapByName("EOS_5_png");
                        this.gameContainer.addChild(createGameFlat_5eos);
                        createGameFlat_5eos.width = 100;
                        createGameFlat_5eos.height = 100;
                        createGameFlat_5eos.x = 15;
                        createGameFlat_5eos.y = 700;
                        createGameFlat_5eos.touchEnabled = true;
                        createGameFlat_5eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createGame.bind(this, "5.0000"), this);
                        progress_all_5eos = new egret.Shape();
                        progress_all_5eos.graphics.beginFill(0x00EE00);
                        progress_all_5eos.graphics.lineStyle(2, 0x000000);
                        progress_all_5eos.graphics.drawRoundRect(15, 810, 100, 30, 15, 15);
                        progress_all_5eos.graphics.endFill();
                        progress_all_5eos.touchEnabled = true;
                        progress_all_5eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.filterAndUpdateGameList.bind(this, 5, -1, "game_2_png", this.fiveEosContainer), this);
                        this.gameContainer.addChild(progress_all_5eos);
                        progress_all_5eos_text = new egret.TextField();
                        progress_all_5eos_text.x = 35;
                        progress_all_5eos_text.y = 815;
                        progress_all_5eos_text.size = 18;
                        progress_all_5eos_text.textColor = 0x000000;
                        progress_all_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all");
                        this.gameContainer.addChild(progress_all_5eos_text);
                        progress_1_5eos = new egret.Shape();
                        progress_1_5eos.graphics.beginFill(0x00EE00);
                        progress_1_5eos.graphics.lineStyle(2, 0x000000);
                        progress_1_5eos.graphics.drawRoundRect(15, 850, 100, 30, 15, 15);
                        progress_1_5eos.graphics.endFill();
                        progress_1_5eos.touchEnabled = true;
                        progress_1_5eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.filterAndUpdateGameList.bind(this, 5, 1, "game_2_png", this.fiveEosContainer), this);
                        this.gameContainer.addChild(progress_1_5eos);
                        progress_1_5eos_text = new egret.TextField();
                        progress_1_5eos_text.x = 18;
                        progress_1_5eos_text.y = 855;
                        progress_1_5eos_text.size = 18;
                        progress_1_5eos_text.textColor = 0x000000;
                        progress_1_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable");
                        this.gameContainer.addChild(progress_1_5eos_text);
                        progress_2_5eos = new egret.Shape();
                        progress_2_5eos.graphics.beginFill(0xFFFF00);
                        progress_2_5eos.graphics.lineStyle(2, 0x000000);
                        progress_2_5eos.graphics.drawRoundRect(15, 890, 100, 30, 15, 15);
                        progress_2_5eos.graphics.endFill();
                        progress_2_5eos.touchEnabled = true;
                        progress_2_5eos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.filterAndUpdateGameList.bind(this, 5, 2, "game_2_png", this.fiveEosContainer), this);
                        this.gameContainer.addChild(progress_2_5eos);
                        progress_2_5eos_text = new egret.TextField();
                        progress_2_5eos_text.x = 18;
                        progress_2_5eos_text.y = 895;
                        progress_2_5eos_text.size = 18;
                        progress_2_5eos_text.textColor = 0x000000;
                        progress_2_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing");
                        this.gameContainer.addChild(progress_2_5eos_text);
                        //******??????/????????????******
                        this.login = this.createBitmapByName("login_png");
                        this.login.x = 1180;
                        this.login.y = 10;
                        this.login.touchEnabled = true;
                        this.login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginGame, this);
                        this.logout = this.createBitmapByName("logout_png");
                        this.logout.x = 1180;
                        this.logout.y = 10;
                        this.logout.touchEnabled = true;
                        this.logout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.logoutGame, this);
                        //??????Scatter??????????????????????????????????????????/??????????????????????????????
                        ScatterUtils.getIdentity().then(function (identiy) {
                            if (identiy == null) {
                                _this.gameContainer.addChild(_this.login);
                            }
                            else {
                                ScatterUtils.login();
                                _this.gameContainer.addChild(_this.logout);
                            }
                        });
                        //************************ 
                        // ***????????????????????????***
                        this.messageContainer.x = 600;
                        this.messageContainer.y = 200;
                        this.messageContainer.width = 350;
                        this.messageContainer.height = 250;
                        //this.stage.addChild(this.messageContainer)
                        this.messageBox.graphics.clear();
                        this.messageBox.graphics.beginFill(0xF7CDA4, 0.8);
                        this.messageBox.graphics.lineStyle(2, 0x000000, 0.5);
                        this.messageBox.graphics.drawRoundRect(0, 0, 350, 250, 15, 15);
                        this.messageBox.graphics.endFill();
                        this.messageContainer.addChild(this.messageBox);
                        messageTitleBox = new egret.Shape();
                        messageTitleBox.graphics.beginFill(0x4F4F4F, 0.8);
                        messageTitleBox.graphics.drawRoundRect(0, 0, 350, 30, 15, 15);
                        this.messageContainer.addChild(messageTitleBox);
                        this.messageTitle.x = 145;
                        this.messageTitle.y = 3;
                        this.messageTitle.size = 20;
                        this.messageTitle.textColor = 0xFFFFFF;
                        this.messageTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.notice.bar.title");
                        this.messageContainer.addChild(this.messageTitle);
                        this.message.x = 10;
                        this.message.y = 35;
                        this.message.width = 330;
                        this.message.height = 200;
                        this.message.size = 20;
                        this.message.textColor = 0x000000;
                        this.message.$setWordWrap(true);
                        this.message.$setMultiline(true);
                        this.messageContainer.addChild(this.message);
                        description = this.createBitmapByName("description_png");
                        this.gameContainer.addChild(description);
                        description.x = 1310;
                        description.y = 10;
                        description.width = 110;
                        description.touchEnabled = true;
                        description.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            _this.gameContainer.addChild(_this.descriptionContainer);
                        }, this);
                        descriptionTitle = new egret.TextField();
                        descriptionTitle.x = 1315;
                        descriptionTitle.y = 25;
                        descriptionTitle.size = 20;
                        descriptionTitle.textColor = 0x1C1C1C;
                        descriptionTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.desc.caption");
                        this.gameContainer.addChild(descriptionTitle);
                        localeContainer = new egret.DisplayObjectContainer();
                        localeContainer.x = 1435;
                        localeContainer.y = 13;
                        localeContainer.touchEnabled = true;
                        this.gameContainer.addChild(localeContainer);
                        localeBox = new egret.Shape();
                        localeBox.graphics.clear();
                        localeBox.graphics.beginFill(0xF7CDA4);
                        localeBox.graphics.lineStyle(2, 0x000000, 0.5);
                        localeBox.graphics.drawRect(0, 0, 60, 40);
                        localeBox.graphics.endFill();
                        localeContainer.addChild(localeBox);
                        localeTitle = new egret.TextField();
                        localeTitle.x = 10;
                        localeTitle.y = 10;
                        localeTitle.size = 20;
                        localeTitle.textColor = 0x443A3A;
                        localeTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale == "zh_CN" ? "en_US" : "zh_CN", "locale");
                        localeContainer.addChild(localeTitle);
                        localeContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            if (LocaleUtils.locale == "zh_CN") {
                                LocaleUtils.locale = "en_US";
                            }
                            else {
                                LocaleUtils.locale = "zh_CN";
                            }
                            localStorage.setItem("eatchicken_locale", LocaleUtils.locale);
                            localeTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale == "zh_CN" ? "en_US" : "zh_CN", "locale");
                            staticLabelI18N();
                        }, this);
                        //****************
                        // ***????????????***
                        this.descriptionContainer.x = 350;
                        this.descriptionContainer.y = 60;
                        this.descriptionContainer.width = 800;
                        this.descriptionContainer.height = 1000;
                        // this.stage.addChild(this.descriptionContainer)
                        this.descriptionBox.graphics.clear();
                        this.descriptionBox.graphics.beginFill(0xF7CDA4, 0.8);
                        this.descriptionBox.graphics.lineStyle(2, 0x000000, 0.8);
                        this.descriptionBox.graphics.drawRoundRect(0, 0, 800, 1000, 15, 15);
                        this.descriptionBox.graphics.endFill();
                        this.descriptionContainer.addChild(this.descriptionBox);
                        descriptioTitleBox = new egret.Shape();
                        descriptioTitleBox.graphics.beginFill(0x4F4F4F, 0.8);
                        descriptioTitleBox.graphics.drawRoundRect(0, 0, 800, 30, 15, 15);
                        this.descriptionContainer.addChild(descriptioTitleBox);
                        this.descriptionTitle.x = 350;
                        this.descriptionTitle.y = 5;
                        this.descriptionTitle.size = 20;
                        this.descriptionTitle.textColor = 0xFFFFFF;
                        this.descriptionTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.desc.caption");
                        this.descriptionContainer.addChild(this.descriptionTitle);
                        descriptionClose = this.createBitmapByName("close_png");
                        this.descriptionContainer.addChild(descriptionClose);
                        descriptionClose.x = 770;
                        descriptionClose.y = 0;
                        descriptionClose.touchEnabled = true;
                        descriptionClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            _this.gameContainer.removeChild(_this.descriptionContainer);
                        }, this);
                        this.description.x = 10;
                        this.description.y = 35;
                        this.description.width = 780;
                        this.description.height = 980;
                        this.description.size = 22;
                        this.description.textColor = 0x000000;
                        this.description.$setWordWrap(true);
                        this.description.$setMultiline(true);
                        this.description.textFlow = new egret.HtmlTextParser().parser(LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.desc"));
                        /*
                        `?????????????????????\n\n`
                                            + `1. ????????????????????????????????????????????????scatter???????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `2. ???????????????????????????????????????????????????????????????\n\n`
                                            + `3. ??????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `4. ??????????????????????????????????????????????????????????????????????????????scatter?????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `5. ?????????????????????????????????2??????2????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `6. ????????????30?????????????????????????????????????????????????????????????????????30??????????????????????????????????????????30????????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `7. ???????????????????????????3?????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `8. ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `9. ??????????????????????????????????????????30????????????????????????????????????????????????\n\n`
                                            + `10. ?????????????????????????????????????????????????????????????????????EOS??????????????????????????????????????????????????????????????????\n\n`
                                            + `11. ??????????????????????????????????????????????????????????????????EOS?????????????????????????????????\n\n`
                                            + `12. ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? \n\n`
                                            + `???????????????scatter??????????????????????????????\n`
                                            + `1. <a href = 'https://get-scatter.com'><u>https://get-scatter.com</u></a> \n`
                                            + `2. <a href = 'https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle'><u>https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle </u></a>`
                    )
                    
                    this.description.text = `?????????????????????\n\n`
                                            + `1. ????????????????????????????????????????????????scatter???????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `2. ???????????????????????????????????????????????????????????????\n\n`
                                            + `3. ??????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `4. ??????????????????????????????????????????????????????????????????????????????scatter?????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `5. ?????????????????????????????????2??????2????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `6. ????????????30?????????????????????????????????????????????????????????????????????30??????????????????????????????????????????30????????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `7. ???????????????????????????3?????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `8. ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                            + `9. ??????????????????????????????????????????30????????????????????????????????????????????????\n\n`
                                            + `10. ?????????????????????????????????????????????????????????????????????EOS??????????????????????????????????????????????????????????????????\n\n`
                                            + `11. ??????????????????????????????????????????????????????????????????EOS?????????????????????????????????\n\n`
                                            + `12. ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? \n\n`
                                            + `???????????????scatter??????????????????????????????\n`
                                            + `1. https://get-scatter.com \n`
                                            + `2. https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle`
                    */
                        this.description.scrollV = 0;
                        this.descriptionContainer.addChild(this.description);
                        //????????????????????????????????????
                        this.oneEosContainer.x = 180;
                        this.oneEosContainer.y = 70;
                        this.gameContainer.addChild(this.oneEosContainer);
                        this.threeEosContainer.x = 180;
                        this.threeEosContainer.y = 390;
                        this.gameContainer.addChild(this.threeEosContainer);
                        this.fiveEosContainer.x = 180;
                        this.fiveEosContainer.y = 700;
                        this.gameContainer.addChild(this.fiveEosContainer);
                        //this.stage.addChild(this.textfield)
                        //this.popMessageBox()
                        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                            this.mobile = true;
                        }
                        //??????????????????????????????????????????
                        this.refreshHouseList();
                        staticLabelI18N = function () {
                            _this.description.textFlow = new egret.HtmlTextParser().parser(LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.desc"));
                            _this.descriptionTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.desc.caption");
                            _this.messageTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.notice.bar.title");
                            descriptionTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.desc.caption");
                            progress_all_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all");
                            progress_all_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all");
                            progress_all_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all");
                            progress_1_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable");
                            progress_1_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable");
                            progress_1_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable");
                            progress_2_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing");
                            progress_2_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing");
                            progress_2_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing");
                            _this.updateGameList(_this.eos_one.slice(0, 7), "game_png", _this.oneEosContainer, _this.eos_one, 0);
                            _this.updateGameList(_this.eos_three.slice(0, 7), "game_1_png", _this.threeEosContainer, _this.eos_three, 0);
                            _this.updateGameList(_this.eos_five.slice(0, 7), "game_2_png", _this.fiveEosContainer, _this.eos_five, 0);
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.popMessageBox = function (msgText) {
        var _this = this;
        /*
        if ( !this.stage.contains(this.messageContainer)){
            this.messageContainer.x = this.stage.width/2 - 100
            this.messageContainer.y = 50
            this.stage.addChild(this.messageContainer)
        }
        */
        //???????????????
        egret.clearTimeout(this.messageTimeout);
        this.messageTimeout = egret.setTimeout(function () {
            // this.stage.removeChild(this.messageBox)
            // this.stage.removeChild(this.message)
            // this.stage.removeChild(this.messageContainer)
            _this.message.text = "";
            _this.gameContainer.removeChild(_this.messageContainer);
        }, this, 4000);
        this.gameContainer.addChild(this.messageContainer);
        this.message.text = msgText;
    };
    /**
     * ????????????????????????????????????
     *
     */
    Main.prototype.refreshHouseList = function () {
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
                            var _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        //????????????????????????
                                        /* await this.houseList.map( house=>{
                                             if (this.stage.contains(house)){
                                                 this.stage.removeChild(house);
                                                 house.destroy()
                                                 house=null
                                             }
                                             
                                         }) */
                                        this.eos_one, this.eos_three, this.eos_five = [];
                                        // ????????????????????????
                                        console.log(games);
                                        if (!games.rows) return [3 /*break*/, 4];
                                        _a = this;
                                        return [4 /*yield*/, games.rows.filter(function (gameJson) {
                                                return gameJson.join_eos == "1.0000 EOS";
                                            })];
                                    case 1:
                                        _a.eos_one = _d.sent();
                                        _b = this;
                                        return [4 /*yield*/, games.rows.filter(function (gameJson) {
                                                return gameJson.join_eos == "3.0000 EOS";
                                            })];
                                    case 2:
                                        _b.eos_three = _d.sent();
                                        _c = this;
                                        return [4 /*yield*/, games.rows.filter(function (gameJson) {
                                                return gameJson.join_eos == "5.0000 EOS";
                                            })];
                                    case 3:
                                        _c.eos_five = _d.sent();
                                        this.updateGameList(this.eos_one.slice(0, 7), "game_png", this.oneEosContainer, this.eos_one, 0);
                                        this.updateGameList(this.eos_three.slice(0, 7), "game_1_png", this.threeEosContainer, this.eos_three, 0);
                                        this.updateGameList(this.eos_five.slice(0, 7), "game_2_png", this.fiveEosContainer, this.eos_five, 0);
                                        return [3 /*break*/, 5];
                                    case 4:
                                        //alert("???????????????")
                                        this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale, "game.not.found"));
                                        _d.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); }).catch(function (e) {
                            console.error(e);
                            //alert("????????????????????????")
                            _this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale, "game.fetch.failure"));
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
    Main.prototype.filterAndUpdateGameList = function (eos, progress, cardType, container) {
        return __awaiter(this, void 0, void 0, function () {
            var list, gameList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        list = [];
                        switch (eos) {
                            case 1:
                                list = this.eos_one;
                                break;
                            case 3:
                                list = this.eos_three;
                                break;
                            case 5:
                                list = this.eos_five;
                                break;
                            default:
                        }
                        if (!(list.length > 0)) return [3 /*break*/, 4];
                        gameList = void 0;
                        if (!(progress < 0)) return [3 /*break*/, 1];
                        gameList = list;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, list.filter(function (game) {
                            return game.game_progress == progress;
                        })];
                    case 2:
                        gameList = _a.sent();
                        _a.label = 3;
                    case 3:
                        this.updateGameList(gameList.slice(0, 7), cardType, container, gameList, 0);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.updateGameList = function (array, cardType, container, fullArray, currentIdx) {
        var _this = this;
        container.removeChildren();
        array.map(function (gameJson, idx) {
            //console.log(gameJson)
            _this.createHouse({ name: "johny", bitmap: cardType }, gameJson).then(function (house) {
                house.setPosition(new egret.Point(180 * idx, 0));
                container.addChild(house);
                var progress;
                var color;
                switch (gameJson.game_progress) {
                    case 0:
                        progress = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.notstart"); //"???????????????"
                        color = 0x00EE00;
                        break;
                    case 1:
                        progress = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable"); //"???????????????"
                        color = 0x00EE00;
                        break;
                    case 2:
                        progress = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing"); //"???????????????"
                        color = 0xFFFF00;
                        break;
                    case 3:
                        progress = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.over"); //"???????????????"
                        color = 0xFF0000;
                        break;
                    default:
                        progress = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.notstart"); //"???????????????"
                }
                var detailBox = new egret.Shape();
                detailBox.graphics.beginFill(color);
                detailBox.graphics.lineStyle(2, 0x000000, 0.5);
                detailBox.graphics.drawRoundRect(180 * idx, 215, 150, 40, 15, 15);
                detailBox.graphics.endFill();
                container.addChild(detailBox);
                var message = new egret.TextField();
                message.x = 180 * idx;
                message.y = 216;
                message.size = 18;
                message.textColor = 0x000000;
                message.text = " " + LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.room.num") + (gameJson.game_id + 1) + "   " + LocaleUtils.getLabelById(LocaleUtils.locale, "game.player") + " " + gameJson.players.length + "\n"
                    + (" " + LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status") + " " + progress);
                container.addChild(message);
            });
        });
        var count = 0;
        fullArray.map(function (el, idx) {
            if (fullArray.length > 7 && idx % 7 == 0) {
                var seqBox = new egret.Shape();
                var fillColor = (idx == currentIdx) ? 0xFA8258 : 0xFFFFFF;
                seqBox.graphics.beginFill(fillColor);
                seqBox.graphics.lineStyle(1, 0x000000, 0.5);
                seqBox.graphics.drawRect(50 * count, 260, 30, 30);
                seqBox.graphics.endFill();
                container.addChild(seqBox);
                seqBox.touchEnabled = true;
                seqBox.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.updateGameList.bind(_this, fullArray.slice(idx, idx + 7), cardType, container, fullArray, idx), _this);
                var seq = new egret.TextField();
                seq.x = count < 10 ? 50 * count + 10 : 50 * count + 5;
                seq.y = 268;
                seq.size = 18;
                seq.textColor = 0x000000;
                count++;
                seq.text = count.toString();
                container.addChild(seq);
            }
        });
    };
    /**
     * ????????????????????????
     *
     */
    Main.prototype.createGame = function (game_eos) {
        var _this = this;
        ScatterUtils.getIdentity().then(function (identity) {
            if (identity == null) {
                //alert(ScatterUtils.message.authority)
                _this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale, "game.wallet.authority"));
                return;
            }
            ScatterUtils.createGame(game_eos + " EOS").then(function (transaction) {
                console.log("create", transaction);
                // ???????????????????????? 
                if (transaction.processed) {
                    _this.refreshHouseList();
                    //     } else if(transaction.login == "failed"){
                }
                else {
                    transaction = JSON.parse(transaction);
                    //alert("??????????????????:"+transaction.error.details[0].message)
                    _this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale, "hall.notice.failed.create", [transaction.error.details[0].message]));
                }
            }).catch(function (e) {
                console.log(e);
                //alert("??????????????????")
                _this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale, "hall.notice.cancel.create"));
            });
        });
    };
    /**
     *  ????????????????????????????????????????????????????????????
     *  ?????????@param: ????????????????????????????????? ?????????{name:?????????, bitmap:?????????}
     *       @game: ?????????????????????????????? ??????game_id???join_eos????????????????????????????????????
     */
    Main.prototype.createHouse = function (param, gameJson) {
        return __awaiter(this, void 0, void 0, function () {
            var house;
            return __generator(this, function (_a) {
                house = new House(param, gameJson);
                //let houseBitMap = house.getBitmap()
                //this.stage.addChild(houseBitMap); 
                //this.selectedHouse = house
                // ???????????????????????????????????????????????????
                house.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    var gameId = house.getID();
                    document.location.href = 'game.html?id=' + gameId;
                    /*
                        if(this.selectedHouse == house){
                            // ?????????????????????house, ?????????????????????
                            //return
                        }
                        this.selectedHouse = house
                        console.log("this.selectedHouse", this.selectedHouse)
                        this.showLife(this.stage, house)
                        this.showText(gameJson.game_id+"??????:"+(gameJson.game_progress==2?"?????????":"?????????"), {x: house.x, y: house.y+80 } )
                        this.initBoard().then( ()=>{  //??????????????????????????????????????????????????????????????????
                            this.updateObjectsInBoard(house).then( ()=>{
                                this.updateClockInStage(house.getClock())
                            })
                        })
                    */
                }, this);
                // ????????????????????????
                // houseBitMap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                // houseBitMap.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                return [2 /*return*/, house
                    // let result = await ScatterUtils.createGame("1.0000 EOS")
                    // console.log("create", result)
                ];
            });
        });
    };
    /**
     * ????????????
     *
     */
    Main.prototype.loginGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                ScatterUtils.login().then(function (message) {
                    if (message.login) {
                        //alert("??????: "+ message.details)
                        //this.popMessageBox("??????: "+ message.details)
                        if (_this.gameContainer.contains(_this.login)) {
                            _this.gameContainer.removeChild(_this.login);
                        }
                        if (!_this.gameContainer.contains(_this.logout)) {
                            _this.gameContainer.addChild(_this.logout);
                        }
                        _this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale, "game.message.login.success", [message.account]));
                    }
                    else {
                        if (message.code == 1) {
                            _this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale, "game.wallet.nowallet"));
                        }
                        else if (message.code == 2) {
                            _this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale, "game.wallet.locked", [LocaleUtils.getLabelById(LocaleUtils.locale, "game.wallet.walletlock"), LocaleUtils.getLabelById(LocaleUtils.locale, "game.wallet.noidentity")]));
                        }
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
     * ????????????
     *
     */
    Main.prototype.logoutGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                ScatterUtils.logout().then(function (message) {
                    //     ScatterUtils.getCurrentAccountName().then( name=>{
                    //alert(message.details)
                    //this.popMessageBox(message.details)
                    if (message.logout) {
                        if (_this.gameContainer.contains(_this.logout)) {
                            _this.gameContainer.removeChild(_this.logout);
                        }
                        if (!_this.gameContainer.contains(_this.login)) {
                            _this.gameContainer.addChild(_this.login);
                        }
                        _this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale, "game.message.logout.success", [message.account]));
                    }
                    else {
                        // logout fail
                    }
                    //       })                                           
                }).catch(function (e) {
                    console.log("e", e);
                    _this.popMessageBox(e);
                });
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.animation = function (animateJson) {
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
    //******************************************************************************************************************* */    
    //************************************************??????????????????????????????************************************************* */
    //******************************************************************************************************************* */
    /**
     *  ???????????????/??????????????????
     *
     */
    Main.prototype.recall = function (player) {
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
     *  ??????????????????????????????????????????
     *  ?????????@_action: ????????????
     */
    Main.prototype.initTask = function (_action) {
        var _this = this;
        //this.canvas.addEventListener('mousemove',this.onMove.bind(this));
        if (this.selectedPlayer) {
            this.unmountMovement();
            //??????json?????? {action:string, target:Object, status:string} - action: idle/enforce/attack, target:Town/Warrior, status: completed
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
     *  ????????????????????????????????????
     *  ?????????@target: ?????????????????????
     */
    Main.prototype.showLife = function (container, target) {
        var life = target.getLife();
        var color;
        if (life.remain >= life.full * 0.6) {
            color = 0x00EE00; // ??????????????? ??????
        }
        else if (life.remain >= life.full * 0.4 && life.remain < life.full * 0.6) {
            color = 0xFFFF00; // ??????????????? ??????
        }
        else {
            color = 0xFF0000; // ??????????????? ??????
        }
        this._life.graphics.clear();
        this._life.graphics.lineStyle(4, color);
        this._life.graphics.moveTo(target.getPosition().x, target.getPosition().y);
        this._life.graphics.lineTo(target.getPosition().x + life.remain, target.getPosition().y);
        container.addChild(this._life);
    };
    Main.prototype.showText = function (_text, position) {
        this.textfield.x = position.x;
        this.textfield.y = position.y;
        this.textfield.size = 22;
        this.textfield.textColor = 0x000000;
        this.textfield.text = _text;
    };
    /**
     *  ?????????????????????
     *  ?????????@_url: ????????????
     */
    Main.prototype.actionSound = function (_url) {
        var sound = new egret.Sound();
        sound.addEventListener(egret.Event.COMPLETE, function (e) {
            sound.play(0, 1);
        }, this);
        sound.load(_url);
    };
    /**
     *  ?????????????????????????????????
     *  ?????????@_url: ????????????
     */
    Main.prototype.backgroundSound = function (_url) {
        if (this.backgroundMusicChannel) {
            this.backgroundMusicChannel.stop();
        }
        this.backgroundMusic.addEventListener(egret.Event.COMPLETE, this.play, this);
        this.backgroundMusic.load(_url);
    };
    Main.prototype.play = function () {
        this.backgroundMusicChannel = this.backgroundMusic.play(0, 0);
    };
    /**
     *  ?????????????????????????????????????????????
     *  ?????????@evt: ?????????????????????????????????????????????
     */
    Main.prototype.movePlayer = function (evt) {
        console.log("moving");
        // let warrior = this.selectedWarrior
        if (this.selectedPlayer == null || typeof (this.selectedPlayer) == "undefined") {
            return;
        }
        if (this.stage.contains(this._life)) {
            this.stage.removeChild(this._life);
        }
        //?????????????????????
        var playerBitmap = this.selectedPlayer.getBitmap();
        egret.Tween.removeTweens(playerBitmap);
        //??????????????????/??????
        var startPoint = { x: playerBitmap.x, y: playerBitmap.y };
        var endPoint = { x: evt.stageX, y: evt.stageY };
        var action = this.selectedPlayer.getTask().action;
        this.drawRoute(startPoint, endPoint, action);
        // ???????????????????????????offset = ????????????/2
        var playerOffsetPoint = { x: evt.stageX - 17, y: evt.stageY - 25 };
        //???????????????3???
        egret.Tween.get(playerBitmap).to(playerOffsetPoint, 3000, egret.Ease.sineIn).wait(500).call(this.doAction.bind(this, this.selectedPlayer, action, playerOffsetPoint, endPoint));
    };
    Main.prototype.mountMovement = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.movePlayer, this);
    };
    Main.prototype.unmountMovement = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.movePlayer, this);
    };
    /**
     *  ??????????????????????????????????????????
     *  ?????? @warrior: ????????????
     *       @action: ????????????
     *       @warriorOffsetPoint: ???????????????????????????
     *       @attackPoint:?????????
     */
    Main.prototype.doAction = function (player, action, playerOffsetPoint, attackPoint) {
        var _this = this;
        //????????????????????????,??????????????????,??????this.flat, this.attack
        this.clearRoute(action);
        //?????????????????????????????????????????????????????????
        var actionObject = player.getTask().target;
        var executable = (actionObject == null || actionObject.getBitmap() == null) ? false : actionObject.getBitmap().hitTestPoint(attackPoint.x, attackPoint.y, true);
        console.log("execute=" + executable);
        if (executable) {
            var _actionShow_1 = this.createBitmapByName("sword_png");
            _actionShow_1.x = playerOffsetPoint.x;
            _actionShow_1.y = playerOffsetPoint.y;
            this.stage.addChild(_actionShow_1);
            //??????????????????????????????????????????
            if (action == "attack") {
                this.attackTarget(playerOffsetPoint).then(function () {
                    //?????????????????????????????????????????????idle????????????????????????                                  
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
     *  ???????????????????????????????????????
     *  ?????????@warriorOffsetPoint: ???????????????????????????
     *       @actionObject: ????????????
     */
    Main.prototype.attackTarget = function (playerOffsetPoint) {
        var _this = this;
        /*
         let _actionShow = this.createBitmapByName("sword_png")
             _actionShow.x = playerOffsetPoint.x
             _actionShow.y = playerOffsetPoint.y
             this.board.addChild(_actionShow)
             */
        //????????????????????????
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
        //?????????????????????
        /* playersInCell.map(player=>{
             let _life = player.getLife()
             _life.remain = _life.remain - _life.full*0.2
             player.setLife(_life)
             this.showLife(this.board, player)

         }) */
        // ??????????????????????????????????????????20%
        //         if ( _life.remain <=0){ // ????????????0???????????????????????????           
        //             this.board.removePlayer(actionObject) 
        /*
        if (actionObject instanceof House){
            //??????????????????????????????
            let list = actionObject.getPlayerList()
            list.map( async (player)=>{
                this.stage.removeChild(player.getBitmap())
                await this.removePlayerIcon(player)
                this.refrashPlayerIcon()
            })
            
        } else if (actionObject instanceof Player){
            //????????????????????????????????????
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
        //????????????
        //let gold = actionObject.getGold()
        //????????????????????????
        var moneyFactory = new egret.MovieClipDataFactory(RES.getRes("money_json"), RES.getRes("money_png"));
        var money = new egret.MovieClip(moneyFactory.generateMovieClipData("money"));
        // role.gotoAndPlay(1, 3);
        money.x = playerOffsetPoint.x;
        money.y = playerOffsetPoint.y - 30;
        this.board.addChild(money);
        money.play(2);
        // ????????????
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
     *  ????????????????????????????????????????????????????????????????????????????????????????????????
     *  ?????????@start: ???????????????
     *       @end: ???????????????
     *       @action: ??????
     */
    Main.prototype.drawRoute = function (start, end, action) {
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
        // this.attack, this.enforce ???????????????????????????????????????????????????
        this[action].x = end.x - endOffsetX;
        this[action].y = end.y - endOffsetY;
        this.stage.addChild(this[action]);
    };
    /**
     *  ??????????????????????????????????????????
     *  ?????????@action: ??????
     */
    Main.prototype.clearRoute = function (action) {
        this._route.graphics.clear();
        if (this.stage.contains(this[action])) {
            this.stage.removeChild(this[action]);
        }
        if (this.stage.contains(this._life)) {
            this.stage.removeChild(this._life);
        }
    };
    /**
     * ??????name?????????????????????Bitmap?????????name???????????????resources/resource.json????????????????????????
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main.prototype.mouseDown = function (evt) {
        if (this.touchPoints[evt.touchPointID] == null) {
            this.touchPoints[evt.touchPointID] = new egret.Point(evt.stageX, evt.stageY);
            this.touchPoints["names"].push(evt.touchPointID);
        }
        this.touchCon++;
        if (this.touchCon == 2) {
            this.distance = this.getTouchDistance();
        }
    };
    Main.prototype.mouseMove = function (evt) {
        //egret.log("touch move:"+evt.touchPointID);
        if (this.touchCon == 2) {
            this.touchPoints[evt.touchPointID].x = evt.stageX;
            this.touchPoints[evt.touchPointID].y = evt.stageY;
            var newdistance = this.getTouchDistance();
            this.gameContainer.scaleX = newdistance / this.distance;
            this.gameContainer.scaleY = this.gameContainer.scaleX;
        }
        else if (this.mobile) {
            var _x = evt.stageX - this.touchPoints[evt.touchPointID].x;
            var _y = evt.stageY - this.touchPoints[evt.touchPointID].y;
            this.gameContainer.x = _x + this.lastPositionX;
            this.gameContainer.y = _y + this.lastPositionY;
        }
    };
    Main.prototype.mouseUp = function (evt) {
        delete this.touchPoints[evt.touchPointID];
        this.touchCon--;
        this.lastPositionX = this.gameContainer.x;
        this.lastPositionY = this.gameContainer.y;
        //
        this.width *= this.scaleX;
        this.height *= this.scaleY;
        this.scaleX = 1;
        this.scaleY = 1;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    Main.prototype.getTouchDistance = function () {
        var _distance = 0;
        var names = this.touchPoints["names"];
        _distance = egret.Point.distance(this.touchPoints[names[names.length - 1]], this.touchPoints[names[names.length - 2]]);
        //alert(_distance) 
        return _distance;
    };
    /**
     *  ??????????????????????????????????????????
     */
    Main.prototype.removePlayerIcon = function (player) {
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
     *  ?????????????????????????????????
     */
    Main.prototype.refrashPlayerIcon = function () {
        this.soilderIconList.map(function (obj, idx) {
            obj.icon.x = 110 + idx * 68;
        });
    };
    /**
     * ?????????????????????????????????????????????
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
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
            // ??????????????????
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
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map