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
var SecPointer = (function (_super) {
    __extends(SecPointer, _super);
    function SecPointer() {
        var _this = _super.call(this) || this;
        _this.mySec = new egret.Shape();
        _this.addChild(_this.mySec);
        return _this;
    }
    SecPointer.prototype.initSec = function (length, time) {
        //let time:Date = new Date();
        this.mySec.graphics.clear();
        this.mySec.graphics.lineStyle(4, 0xFF0000);
        this.mySec.graphics.moveTo(0, 0);
        this.mySec.graphics.lineTo(0, -length);
        this.mySec.anchorOffsetY = 0;
        this.mySec.anchorOffsetX = 0;
        this.mySec.rotation = time.getSeconds() * 6;
        this.mySec.graphics.endFill();
    };
    return SecPointer;
}(egret.Sprite));
__reflect(SecPointer.prototype, "SecPointer");
//# sourceMappingURL=Second.js.map