class Item extends egret.DisplayObjectContainer {


    //private position: egret.Point = new egret.Point(0,0)
    private itemBitMap: egret.Bitmap
    private id:number;

    public constructor(name:string) {
        super();
        this.createItem(name);
    }

    private createItem(name:string): void {
        //this.id = _id
        this.itemBitMap = this.createBitmapByName(name);
        this.itemBitMap.width = 50;   //cell的长/宽
        this.itemBitMap.height = 50;
        //this.position = new egret.Point(this.cellBitmap.width*rowX, this.cellBitmap.height*colY);
        //this.x = this.position.x //初始化位置
        //this.y = this.position.y
        this.itemBitMap.touchEnabled = true;
        //this.cell_X_Y = {x:rowX, y:colY}

        this.addChild(this.itemBitMap)
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
        return this.itemBitMap
    }


     public getPosition(){
        var position = {x:this.x, y:this.y}
        return position
    }

    public setPosition(_position: egret.Point): void{
        this.x = _position.x
        this.y = _position.y
    }

    public getId(){
        return this.id
    }

    public setId(_id){
        this.id = _id
    }

    public destroy(){
        this.itemBitMap = null
    }
}