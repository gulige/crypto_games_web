class MinPointer extends egret.Sprite{
    public myMin:egret.Shape;
    public constructor(){
        super();
        this.myMin=new egret.Shape();
        this.addChild(this.myMin);
    }

    public initMin(length:number, time: Date){
       // let time:Date = new Date();
        this.myMin.graphics.clear();
        this.myMin.graphics.lineStyle(6,0x0000FF);
        this.myMin.graphics.moveTo(0,0);
        this.myMin.graphics.lineTo( 0, -length );
        this.myMin.anchorOffsetY = 0;
        this.myMin.anchorOffsetX = 0;
        this.myMin.rotation=time.getMinutes()*6;
        this.myMin.graphics.endFill();
    }
}
