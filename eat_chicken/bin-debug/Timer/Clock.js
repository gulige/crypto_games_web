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
var Clock = (function (_super) {
    __extends(Clock, _super);
    function Clock() {
        var _this = _super.call(this) || this;
        _this.stageW = 65;
        _this.stageH = 65;
        _this.createMin = new Date().getMinutes();
        _this.createHour = new Date().getHours();
        _this.gameTime = new Date(2018, 1, 1, 0, 0, 0);
        _this.interval = -1;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createGameScene, this);
        //egret.setInterval(this.drawPointer,this,1000);
        _this.createClock();
        return _this;
    }
    //创建时钟背景
    Clock.prototype.createClock = function () {
        //绘制背景色
        // this.stageW=80 //this.stage.stageWidth;
        // this.stageH=80 //this.stage.stageHeight;
        //  let bg=new egret.Shape();
        //   bg.graphics.beginFill(0xffffff);
        //  bg.graphics.drawRect(0,0,this.stageW,this.stageH);
        //   bg.graphics.endFill();
        //  this.addChild(bg);
        //绘制表盘
        this.pan = new Pan(this.stageW);
        this.pan.x = this.stageW / 2;
        this.pan.y = this.stageH / 2;
        this.addChild(this.pan);
        this.HourPointer = new HourPointer();
        this.HourPointer.x = this.stageW / 2;
        this.HourPointer.y = this.stageH / 2;
        this.addChild(this.HourPointer);
        this.HourPointer.initHour(this.stageW / 2 - 20, this.gameTime);
        this.MinPointer = new MinPointer();
        this.MinPointer.x = this.stageW / 2;
        this.MinPointer.y = this.stageH / 2;
        this.addChild(this.MinPointer);
        this.MinPointer.initMin(this.stageW / 2 - 10, this.gameTime);
        this.SecPointer = new SecPointer();
        this.SecPointer.x = this.stageW / 2;
        this.SecPointer.y = this.stageH / 2;
        this.addChild(this.SecPointer);
        this.SecPointer.initSec(this.stageW / 2, this.gameTime);
    };
    //调用指针
    Clock.prototype.drawPointer = function () {
        this.gameTime = new Date(this.gameTime.getTime() + 1000);
        this.SecPointer.initSec(this.stageW - 10, this.gameTime);
        // console.log("time="+this.gameTime.getTime())
        var gameMin = this.gameTime.getMinutes();
        var gameHour = this.gameTime.getHours(); //时针分针旋转判断
        if (gameMin != this.createMin) {
            this.MinPointer.initMin(this.stageW - 20, this.gameTime);
            this.createMin = gameMin;
        }
        if (gameHour != this.createHour) {
            this.HourPointer.initHour(this.stageW - 30, this.gameTime);
            this.createHour = gameHour;
        }
    };
    Clock.prototype.start = function () {
        egret.clearInterval(this.interval);
        this.interval = egret.setInterval(this.drawPointer, this, 1000);
    };
    return Clock;
}(egret.DisplayObjectContainer));
__reflect(Clock.prototype, "Clock");
//# sourceMappingURL=Clock.js.map