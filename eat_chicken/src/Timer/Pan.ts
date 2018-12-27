class Pan extends egret.Sprite{
    public mypan:egret.Shape;
    public myscale1:egret.Shape;
    public myscale2:egret.Shape;
    public myHour:egret.Shape;
    public mySec:egret.Shape;
    public myMin:egret.Shape;
    public constructor(radius:number){
        super();
        this.Init(radius);
    }

    public Init(radius:number){
        this.initCircle(radius);
        this.initScale(radius);
    }

    public initCircle(radius:number){
        this.mypan=new egret.Shape();
        this.mypan.graphics.beginFill(0xFFFFFF);
        this.mypan.graphics.drawCircle(0,0,radius);
        this.mypan.graphics.endFill();
        this.addChild(this.mypan);
    }

    public initScale(radius){
        for(let j=0;j<60;j++){
            this.myscale1=new egret.Shape();
            this.myscale1.graphics.lineStyle(2,0x000000);
            this.myscale1.graphics.moveTo(0,0);
            this.myscale1.graphics.lineTo( 0, 5 );
            // this.myscale1.y = -200;
            this.myscale1.graphics.endFill();
            this.myscale1.anchorOffsetY = radius;
            this.myscale1.rotation = j*6;
            this.addChild(this.myscale1);
        }

        for(let i=0;i<12;i++){
            this.myscale2=new egret.Shape();
            this.myscale2.graphics.lineStyle(4,0x000000);
            this.myscale2.graphics.moveTo(0,0);
            this.myscale2.graphics.lineTo( 0, 10 );
            this.myscale2.graphics.endFill();
            this.myscale2.anchorOffsetY = radius;
            this.myscale2.rotation = i*30;//锚点就是轴心
            this.addChild(this.myscale2);
        }
    }
}
