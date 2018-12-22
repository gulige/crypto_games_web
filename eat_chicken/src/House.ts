

class House extends egret.DisplayObjectContainer {

    private game: any;
    private houseBitmap: egret.Bitmap
    private id: number
    private joinEos: string

    private life = {full:100, remain:100}
    private gold = 100  //city 100 gold unit
    //private position: egret.Point
    private playerList: Array<Player>
    private colorMatrix = [
        0.3,0.6,0,0,0,
        0.3,0.6,0,0,0,
        0.3,0.6,0,0,0,
        0,0,0,1,0
    ];

    public constructor(param: string, _game:any) {
        super();
        this.game = _game
        this.createHouse(param);
    }

    private createHouse(param): void {
        this.name = param.name
        this.houseBitmap = this.createBitmapByName(param.bitmap);
        this.houseBitmap.width = 80;
        this.houseBitmap.height = 80;
        this.houseBitmap.touchEnabled = true;
        this.id = this.game.game_id
        this.joinEos = this.game.join_eos
        this.playerList =[]  //初始化士兵列表
    }

    public createPlayer(accName, cell_id){        
        var player = new Player(this)
        player.setName(accName)
        player.setCellId(cell_id)
        //var colorFlilter = new egret.ColorMatrixFilter(this.colorMatrix);
        //warrior.getBitmap().filters = [colorFlilter];
        this.playerList.push(player)
        return player        
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public getBitmap(){
        return this.houseBitmap
    }

    public getPlayerList(){
        return this.playerList
    }

    public getPosition(){
        var position = {x:this.houseBitmap.x, y:this.houseBitmap.y}
        return position
    }

    public setPosition(_position: egret.Point): void{
        this.houseBitmap.x = _position.x
        this.houseBitmap.y = _position.y
    }

    public getLife(){
        return this.life
    }

    public setLife(_life): void{
        this.life = _life
    }

    public destroy(){
        this.houseBitmap = null
        this.playerList = []
    }

    public getID(){
        return this.id
    }

    private setID(_id){
        return this.id = _id
    }

    public getJoinEos(){
        return this.joinEos
    }



    public getGold(){
        return this.gold
    }

    public setGold(_gold): void{
        this.gold = _gold
    }

    public getHouseName(){
        return this.name
    }

    public clearPlayerList(){
        this.playerList=[]
    }
}