class Clock extends egret.DisplayObjectContainer {
    public stageW:number = 65;
    public stageH:number = 65;
    public pan:Pan;
    public SecPointer:SecPointer;
    public MinPointer:MinPointer;
    public HourPointer:HourPointer;
    public createMin:number=new Date().getMinutes();
    public createHour:number=new Date().getHours();
    private gameTime:Date = new Date(2018,1,1,0,0,0)
    private interval:number = -1
    
    public constructor() {
        super();
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createGameScene, this);
        //egret.setInterval(this.drawPointer,this,1000);
        this.createClock();
    }
    //创建时钟背景
    public createClock() {
        //绘制背景色
       // this.stageW=80 //this.stage.stageWidth;
       // this.stageH=80 //this.stage.stageHeight;
      //  let bg=new egret.Shape();
     //   bg.graphics.beginFill(0xffffff);
      //  bg.graphics.drawRect(0,0,this.stageW,this.stageH);
     //   bg.graphics.endFill();
      //  this.addChild(bg);
        //绘制表盘
       
        this.pan=new Pan(this.stageW);
        this.pan.x = this.stageW/2;
        this.pan.y = this.stageH/2;
        this.addChild(this.pan);
        this.HourPointer=new HourPointer();
        this.HourPointer.x=this.stageW/2;
        this.HourPointer.y=this.stageH/2;
        this.addChild(this.HourPointer);
        this.HourPointer.initHour(this.stageW/2-20, this.gameTime);
        this.MinPointer=new MinPointer();
        this.MinPointer.x=this.stageW/2;
        this.MinPointer.y = this.stageH/2;
        this.addChild(this.MinPointer);
        this.MinPointer.initMin(this.stageW/2-10, this.gameTime);
        this.SecPointer=new SecPointer();
        this.SecPointer.x=this.stageW/2;
        this.SecPointer.y=this.stageH/2;
        this.addChild(this.SecPointer);
        this.SecPointer.initSec(this.stageW/2, this.gameTime);
      
    }
    //调用指针
    public drawPointer(){
        this.gameTime = new Date(this.gameTime.getTime()+1000);
        this.SecPointer.initSec(this.stageW-10, this.gameTime);

       // console.log("time="+this.gameTime.getTime())
        let gameMin:number=this.gameTime.getMinutes();
        let gameHour:number=this.gameTime.getHours()//时针分针旋转判断
        if (gameMin!=this.createMin){
            this.MinPointer.initMin(this.stageW-20, this.gameTime);
            this.createMin=gameMin;
        }
        if (gameHour!=this.createHour){
            this.HourPointer.initHour(this.stageW-30, this.gameTime);
            this.createHour=gameHour;
        }
    }

    public start(){
        egret.clearInterval(this.interval)
        this.interval = egret.setInterval(this.drawPointer,this,1000);
    }
}
