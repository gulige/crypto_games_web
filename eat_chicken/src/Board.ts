

class Board extends egret.DisplayObjectContainer {

    //private townBitmap: egret.Bitmap
    private uuid
    private life = {full:100, remain:100}
    private gold = 100  //city 100 gold unit
    //private position: egret.Point
    private cellList: Array<Cell>
    private playerContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
    private colorMatrix = [
        0.3,0.6,0,0,0,
        0.3,0.6,0,0,0,
        0.3,0.6,0,0,0,
        0,0,0,1,0
    ];

    public constructor(x:number, y:number) {
        super();
        this.createBoard(x, y);
    }

    private createBoard(x:number, y:number): void {
      //  this.name = param.name
       // this.townBitmap = this.createBitmapByName(param.bitmap);
       // this.townBitmap.width = 80;
      //  this.townBitmap.height = 80;
       // this.townBitmap.touchEnabled = true;
      //  this.uuid = new Date().getTime()  // will use [username + date] or uuid generator later
        this.cellList =[]  //初始化cell列表并加入棋盘
        for (var _x=0;_x<x; _x++){
            for (var _y=0;_y<y; _y++){
                let cell = this.createCell(_x, _y, this.cellList.length )
                this.addChild(cell.getBitmap());
            }
        }
        //将玩家容器加入棋盘，用于不同游戏房间的玩家重置
        this.addChild(this.playerContainer)

    }

    public createCell(x:number,y:number,id:number){        
        var cell = new Cell(x,y,id)
        //var colorFlilter = new egret.ColorMatrixFilter(this.colorMatrix);
        //warrior.getBitmap().filters = [colorFlilter];
        this.cellList.push(cell)
        return cell        
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }  

    public getCellList(){
        return this.cellList
    }

    public async getCellByXY(rowX:number, rowY:number ) {
        let cell = await this.cellList.filter(_cell=>{
            let cell_X_Y = _cell.getXY()
            return (cell_X_Y.x == rowX && cell_X_Y.y==rowY ) 
        })
        return cell[0]
    }

    public putPlayer(player){
        this.playerContainer.addChild(player)
    }

    public clearPlayers(){
        this.playerContainer.removeChildren()
    }

    public removePlayer(player:Player){
        this.playerContainer.removeChild(player.getBitmap())
    }


}