class HourPointer extends egret.Sprite{
    public myHour:egret.Shape;
    public constructor(){
        super();
        this.myHour=new egret.Shape();
        this.addChild(this.myHour);
    }

    public initHour(length:number, time:Date){
       // let time:Date = new Date();
        let getHours=time.getHours();
        // 转化为12小时
        getHours=getHours>12?getHours-12:getHours;
        this.myHour.graphics.clear();
        this.myHour.graphics.lineStyle(8,0xEE0000);
        this.myHour.graphics.moveTo(0,0);
        this.myHour.graphics.lineTo( 0, -length );
        this.myHour.anchorOffsetY = 0;
        this.myHour.anchorOffsetX = 0;
        this.myHour.rotation=getHours*30;
        this.myHour.graphics.endFill();
    }
}
