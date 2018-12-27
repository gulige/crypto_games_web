class SecPointer extends egret.Sprite{
    public mySec:egret.Shape;
    public constructor(){
        super();
        this.mySec=new egret.Shape();
        this.addChild(this.mySec);
    }

    public initSec(length:number,time:Date){
        //let time:Date = new Date();
        this.mySec.graphics.clear();
        this.mySec.graphics.lineStyle(4,0xFF0000);
        this.mySec.graphics.moveTo(0,0);
        this.mySec.graphics.lineTo( 0,-length );
        this.mySec.anchorOffsetY = 0;
        this.mySec.anchorOffsetX = 0;
        this.mySec.rotation=time.getSeconds()*6;
        this.mySec.graphics.endFill();
    }
}
