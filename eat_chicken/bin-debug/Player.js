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
    function Player(name, playerJson) {
        var _this = _super.call(this) || this;
        _this.task = { action: "idle", target: null, status: null };
        _this.position = new egret.Point(0, 0);
        _this.items = [];
        _this.createPlayer(name, playerJson);
        return _this;
    }
    Player.prototype.createPlayer = function (name, playerJson) {
        this.playerBitmap = this.createBitmapByName(name);
        this.playerBitmap.width = 70;
        this.playerBitmap.height = 70;
        this.playerProfile = this.createBitmapByName("profile_" + name);
        //this.playerBitmap.x = this.position.x //初始化位置
        //this.playerBitmap.y = this.position.y
        //this.playerBitmap.touchEnabled = true;
        this.addChild(this.playerBitmap);
        //this.touchEnabled = true;
        //this.house = house
        // this.uuid = new Date().getTime() // will use [username + date] or uuid generator later
        this.setName(playerJson.acc_name);
        this.setCellId(playerJson.cell_id);
        this.setArmor(playerJson.armor);
        this.setAttack(playerJson.attack);
        this.setLife(playerJson.hp);
        this.setDefense(playerJson.defense);
        this.setItems(playerJson.items);
        this.setWeapon(playerJson.weapon);
        this.setGold(playerJson.win_eos);
        this.setKills(playerJson.kill_count);
    };
    Player.prototype.updatePlayer = function (playerJson) {
        //this.setName(playerJson.acc_name)
        this.setCellId(playerJson.cell_id);
        this.setArmor(playerJson.armor);
        this.setAttack(playerJson.attack);
        this.setLife(playerJson.hp);
        this.setDefense(playerJson.defense);
        this.setItems(playerJson.items);
        this.setWeapon(playerJson.weapon);
        this.setGold(playerJson.win_eos);
        this.setKills(playerJson.kill_count);
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
    Player.prototype.getPlayerProfile = function () {
        return this.playerProfile;
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
        var position = { x: this.x, y: this.y };
        return position;
    };
    Player.prototype.setPosition = function (_position) {
        this.x = _position.x;
        this.y = _position.y;
    };
    Player.prototype.getName = function () {
        return this.accName;
    };
    Player.prototype.setName = function (__accName) {
        this.accName = __accName;
    };
    Player.prototype.getLife = function () {
        return this.hp;
    };
    Player.prototype.setLife = function (hp) {
        this.hp = hp;
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
    Player.prototype.getArmor = function () {
        return this.armor;
    };
    Player.prototype.setArmor = function (_armor) {
        this.armor = _armor;
    };
    Player.prototype.getAttack = function () {
        return this.attack;
    };
    Player.prototype.setAttack = function (_attack) {
        this.attack = _attack;
    };
    Player.prototype.getDefense = function () {
        return this.defense;
    };
    Player.prototype.setDefense = function (_defense) {
        this.defense = _defense;
    };
    Player.prototype.getWeapon = function () {
        return this.weapon;
    };
    Player.prototype.setWeapon = function (_weapon) {
        this.weapon = _weapon;
    };
    Player.prototype.getItems = function () {
        return this.items;
    };
    Player.prototype.setItems = function (_items) {
        this.items = _items;
    };
    Player.prototype.isAlive = function () {
        if (this.getLife() > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    Player.prototype.getKills = function () {
        return this.kills;
    };
    Player.prototype.setKills = function (_kills) {
        this.kills = _kills;
    };
    Player.prototype.setMoveable = function (_moveable) {
        this.moveable = _moveable;
    };
    Player.prototype.isMoveable = function () {
        return this.moveable;
    };
    return Player;
}(egret.DisplayObjectContainer));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map