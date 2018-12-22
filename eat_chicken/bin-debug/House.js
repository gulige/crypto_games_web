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
var House = (function (_super) {
    __extends(House, _super);
    function House(param, _game) {
        var _this = _super.call(this) || this;
        _this.life = { full: 100, remain: 100 };
        _this.gold = 100; //city 100 gold unit
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
        this.houseBitmap.width = 80;
        this.houseBitmap.height = 80;
        this.houseBitmap.touchEnabled = true;
        this.id = this.game.game_id;
        this.joinEos = this.game.join_eos;
        this.playerList = []; //初始化士兵列表
    };
    House.prototype.createPlayer = function (accName, cell_id) {
        var player = new Player(this);
        player.setName(accName);
        player.setCellId(cell_id);
        //var colorFlilter = new egret.ColorMatrixFilter(this.colorMatrix);
        //warrior.getBitmap().filters = [colorFlilter];
        this.playerList.push(player);
        return player;
    };
    House.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    House.prototype.getBitmap = function () {
        return this.houseBitmap;
    };
    House.prototype.getPlayerList = function () {
        return this.playerList;
    };
    House.prototype.getPosition = function () {
        var position = { x: this.houseBitmap.x, y: this.houseBitmap.y };
        return position;
    };
    House.prototype.setPosition = function (_position) {
        this.houseBitmap.x = _position.x;
        this.houseBitmap.y = _position.y;
    };
    House.prototype.getLife = function () {
        return this.life;
    };
    House.prototype.setLife = function (_life) {
        this.life = _life;
    };
    House.prototype.destroy = function () {
        this.houseBitmap = null;
        this.playerList = [];
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
    House.prototype.getGold = function () {
        return this.gold;
    };
    House.prototype.setGold = function (_gold) {
        this.gold = _gold;
    };
    House.prototype.getHouseName = function () {
        return this.name;
    };
    House.prototype.clearPlayerList = function () {
        this.playerList = [];
    };
    return House;
}(egret.DisplayObjectContainer));
__reflect(House.prototype, "House");
//# sourceMappingURL=House.js.map