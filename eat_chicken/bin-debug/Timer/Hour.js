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
var HourPointer = (function (_super) {
    __extends(HourPointer, _super);
    function HourPointer() {
        var _this = _super.call(this) || this;
        _this.myHour = new egret.Shape();
        _this.addChild(_this.myHour);
        return _this;
    }
    HourPointer.prototype.initHour = function (length, time) {
        // let time:Date = new Date();
        var getHours = time.getHours();
        // 转化为12小时
        getHours = getHours > 12 ? getHours - 12 : getHours;
        this.myHour.graphics.clear();
        this.myHour.graphics.lineStyle(8, 0xEE0000);
        this.myHour.graphics.moveTo(0, 0);
        this.myHour.graphics.lineTo(0, -length);
        this.myHour.anchorOffsetY = 0;
        this.myHour.anchorOffsetX = 0;
        this.myHour.rotation = getHours * 30;
        this.myHour.graphics.endFill();
    };
    return HourPointer;
}(egret.Sprite));
__reflect(HourPointer.prototype, "HourPointer");
//# sourceMappingURL=Hour.js.map