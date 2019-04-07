class Cell extends egret.DisplayObjectContainer {

    private cellBitmap: egret.Bitmap
    private detailBitmap: egret.Bitmap
    private cellRect: egret.Shape  = new egret.Shape();
    private task = {action:"idle", target:null, status:null}
    private position: egret.Point = new egret.Point(0,0)
    private id: number
    private cell_X_Y
    private item: Item = null
    private hasPoison = false
    private battleTime:number=0  //seonds
    private fallDownSign:boolean = false

    public constructor(x:number, y:number,id:number) {
        super();
        this.createCell(x, y, id);
    }

    private createCell(x:number,y:number,_id:number): void {
        this.id = _id
        
        this.detailBitmap = this.createBitmapByName("show_png");
        //this.showBitmap.width = 80;   //cell的长/宽
       // this.showBitmap.height = 80;
        this.detailBitmap.$setVisible(false)
        this.addChild(this.detailBitmap);
    
        this.cellRect.graphics.clear()
        this.cellRect.graphics.lineStyle(1,0x000000,0.3)
        this.cellRect.graphics.beginFill(0xF7CDA4,0.2);
        this.cellRect.graphics.drawRect(0, 0, 80, 80);
        this.cellRect.graphics.endFill();
        this.addChild(this.cellRect);

        this.position = new egret.Point(80*x, 80*y);
        this.x = this.position.x //初始化位置
        this.y = this.position.y
        //this.cellBitmap.touchEnabled = true;
        this.cell_X_Y = {x:x, y:y}

        //this.addChild(this.cellBitmap)
        this.touchEnabled = true;
       // this.town = _town
       // this.id = new Date().getTime()
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public getBitmap(){
        return this.cellBitmap
    }

    public setTask(_task): void{
        this.task = _task
    }

    public getTask(){
        return this.task
    }

     public getPosition(){
        var position = {x:this.x, y:this.y}
        return position
    }

    public setPosition(_position: egret.Point): void{
        this.x = _position.x
        this.y = _position.y
    }


    public destroy(){
        this.cellBitmap = null
    }

    public getID(){
        return this.id
    }

    public getXY(){
        return this.cell_X_Y
    }

    public getItem(): Item{
        return this.item
    }

    public setItem(_item:Item): void{
        this.item = _item
    }

    public addItem(_item:Item): void{
        
        if (this.contains(this.item)){
            this.item.destroy()
            this.removeChild(this.item)
        }    
        this.item = _item
        this.addChild(this.item)
    }

    public addPoison(_poison:egret.MovieClip): void{
        this.hasPoison = true
        this.addChild(_poison)
    }

    public getPoison(): boolean{
        return this.hasPoison
    }

    public setBattleTime(time){
        this.battleTime = time 
    }

    public getBattleTime(){
        return this.battleTime
    }

    public setIndex(object, zIndex){
        this.setChildIndex(object, zIndex)
    }

    public hideDetailMode(){
        this.detailBitmap.$setVisible(false)
    }

    public showDetailMode(detailMode:boolean){
        this.detailBitmap.$setVisible(detailMode)
    }

    public onDetailMode(){
        return this.detailBitmap.visible
    }

    public hasFallDownSign():boolean{
        return this.fallDownSign
    }
    
    public addFallDownSign(sign:boolean){
        this.fallDownSign = sign
    }
}