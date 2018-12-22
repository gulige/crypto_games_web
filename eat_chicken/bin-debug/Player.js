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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(house) {
        var _this = _super.call(this) || this;
        _this.task = { action: "idle", target: null, status: null };
        _this.position = new egret.Point(0, 0);
        _this.life = { full: 40, remain: 40 };
        _this.gold = 5; //warrior 5 gold unit
        _this.createPlayer(house);
        return _this;
    }
    Player.prototype.createPlayer = function (house) {
        this.playerBitmap = this.createBitmapByName(house.name + "_soilder_png");
        this.playerBitmap.width = 48;
        this.playerBitmap.height = 70;
        this.playerBitmap.x = this.position.x; //初始化位置
        this.playerBitmap.y = this.position.y;
        this.playerBitmap.touchEnabled = true;
        this.house = house;
        this.uuid = new Date().getTime(); // will use [username + date] or uuid generator later
    };
    Player.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Player.prototype.getBitmap = function () {
        return this.playerBitmap;
    };
    Player.prototype.setTask = function (_task) {
        this.task = _task;
    };
    Player.prototype.getTask = function () {
        return this.task;
    };
    Player.prototype.getHouse = function () {
        return this.house;
    };
    Player.prototype.getPosition = function () {
        var position = { x: this.playerBitmap.x, y: this.playerBitmap.y };
        return position;
    };
    Player.prototype.setPosition = function (_position) {
        this.playerBitmap.x = _position.x;
        this.playerBitmap.y = _position.y;
    };
    Player.prototype.getName = function () {
        return this.accName;
    };
    Player.prototype.setName = function (__accName) {
        this.accName = __accName;
    };
    Player.prototype.getLife = function () {
        return this.life;
    };
    Player.prototype.setLife = function (_life) {
        this.life = _life;
    };
    Player.prototype.destroy = function () {
        this.playerBitmap = null;
    };
    Player.prototype.getUUID = function () {
        return this.uuid;
    };
    Player.prototype.getGold = function () {
        return this.gold;
    };
    Player.prototype.setGold = function (_gold) {
        this.gold = _gold;
    };
    Player.prototype.getCellId = function () {
        return this.cell_id;
    };
    Player.prototype.setCellId = function (_cell_id) {
        this.cell_id = _cell_id;
    };
    return Player;
}(egret.DisplayObjectContainer));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map