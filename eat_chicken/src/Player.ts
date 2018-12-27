

class Player extends egret.DisplayObjectContainer {

    private playerBitmap: egret.Bitmap
    private house: House
    private task = {action:"idle", target:null, status:null}
    private position: egret.Point = new egret.Point(0,0)
    private life = {full:40, remain:40}
    private uuid 
    private accName  // player eos account name
    private gold = 5  //warrior 5 gold unit
    private cell_id:number

    public constructor(house:House) {
        super();
        this.createPlayer(house);
    }

    private createPlayer(house:House): void {
        this.playerBitmap = this.createBitmapByName(house.name+"_soilder_png");
        this.playerBitmap.width = 48;
        this.playerBitmap.height = 70;
        this.playerBitmap.x = this.position.x //初始化位置
        this.playerBitmap.y = this.position.y
        this.playerBitmap.touchEnabled = true;
        this.addChild(this.playerBitmap)
        this.touchEnabled = true;

        this.house = house
        this.uuid = new Date().getTime() // will use [username + date] or uuid generator later
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public getBitmap(){
        return this.playerBitmap
    }

    public setTask(_task): void{
        this.task = _task
    }

    public getTask(){
        return this.task
    }

    public getHouse(){
        return this.house
    }

     public getPosition(){
        var position = {x:this.x, y:this.y}
        return position
    }

    public setPosition(_position: egret.Point): void{
        this.x = _position.x
        this.y = _position.y
    }

    public getName(){
        return this.accName
    }

    public setName(__accName: string ): void{
        this.accName = __accName
    }

    public getLife(){
        return this.life
    }

    public setLife(_life): void{
        this.life = _life
    }

    public destroy(){
        this.playerBitmap = null
    }

    public getUUID(){
        return this.uuid
    }

    public getGold(){
        return this.gold
    }

    public setGold(_gold): void{
        this.gold = _gold
    }

    public getCellId(){
        return this.cell_id
    }

    public setCellId(_cell_id){
        this.cell_id = _cell_id
    }
}