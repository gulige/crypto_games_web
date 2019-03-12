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
var MinPointer = (function (_super) {
    __extends(MinPointer, _super);
    function MinPointer() {
        var _this = _super.call(this) || this;
        _this.myMin = new egret.Shape();
        _this.addChild(_this.myMin);
        return _this;
    }
    MinPointer.prototype.initMin = function (length, time) {
        // let time:Date = new Date();
        this.myMin.graphics.clear();
        this.myMin.graphics.lineStyle(6, 0x0000FF);
        this.myMin.graphics.moveTo(0, 0);
        this.myMin.graphics.lineTo(0, -length);
        this.myMin.anchorOffsetY = 0;
        this.myMin.anchorOffsetX = 0;
        this.myMin.rotation = time.getMinutes() * 6;
        this.myMin.graphics.endFill();
    };
    return MinPointer;
}(egret.Sprite));
__reflect(MinPointer.prototype, "MinPointer");
//# sourceMappingURL=Minute.js.map