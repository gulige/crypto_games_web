class Cell extends egret.DisplayObjectContainer {

    private cellBitmap: egret.Bitmap
    private task = {action:"idle", target:null, status:null}
    private position: egret.Point = new egret.Point(0,0)
    private id: number
    private cell_X_Y
    private item: Item = null

    public constructor(rowX:number, colY:number,id:number) {
        super();
        this.createCell(rowX, colY, id);
    }

    private createCell(rowX:number,colY:number,_id:number): void {
        this.id = _id
        this.cellBitmap = this.createBitmapByName("bg1_jpg");
        this.cellBitmap.width = 80;   //cell的长/宽
        this.cellBitmap.height = 80;
        this.position = new egret.Point(this.cellBitmap.width*rowX, this.cellBitmap.height*colY);
        this.x = this.position.x //初始化位置
        this.y = this.position.y
        this.cellBitmap.touchEnabled = true;
        this.cell_X_Y = {x:rowX, y:colY}

        this.addChild(this.cellBitmap)
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
            this.removeChild(this.item)
        }    
        this.item = _item
        this.addChild(this.item)
    }
   
}