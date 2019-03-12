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
var Pan = (function (_super) {
    __extends(Pan, _super);
    function Pan(radius) {
        var _this = _super.call(this) || this;
        _this.Init(radius);
        return _this;
    }
    Pan.prototype.Init = function (radius) {
        this.initCircle(radius);
        this.initScale(radius);
    };
    Pan.prototype.initCircle = function (radius) {
        this.mypan = new egret.Shape();
        this.mypan.graphics.beginFill(0xFFFFFF);
        this.mypan.graphics.drawCircle(0, 0, radius);
        this.mypan.graphics.endFill();
        this.addChild(this.mypan);
    };
    Pan.prototype.initScale = function (radius) {
        for (var j = 0; j < 60; j++) {
            this.myscale1 = new egret.Shape();
            this.myscale1.graphics.lineStyle(2, 0x000000);
            this.myscale1.graphics.moveTo(0, 0);
            this.myscale1.graphics.lineTo(0, 5);
            // this.myscale1.y = -200;
            this.myscale1.graphics.endFill();
            this.myscale1.anchorOffsetY = radius;
            this.myscale1.rotation = j * 6;
            this.addChild(this.myscale1);
        }
        for (var i = 0; i < 12; i++) {
            this.myscale2 = new egret.Shape();
            this.myscale2.graphics.lineStyle(4, 0x000000);
            this.myscale2.graphics.moveTo(0, 0);
            this.myscale2.graphics.lineTo(0, 10);
            this.myscale2.graphics.endFill();
            this.myscale2.anchorOffsetY = radius;
            this.myscale2.rotation = i * 30; //锚点就是轴心
            this.addChild(this.myscale2);
        }
    };
    return Pan;
}(egret.Sprite));
__reflect(Pan.prototype, "Pan");
//# sourceMappingURL=Pan.js.map