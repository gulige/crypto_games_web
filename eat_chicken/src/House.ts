

class House extends egret.DisplayObjectContainer {

    private game: any;   // 合约返回的完整 game json 数据, 含board, player 信息
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
    private clock:Clock
    private game_progress:number

    public constructor(param: any, _game:any) {
        super();
        this.game = _game
        this.createHouse(param);
    }

    private createHouse(param): void {
        this.name = param.name
        this.houseBitmap = this.createBitmapByName(param.bitmap);
        this.houseBitmap.width = 150;
        this.houseBitmap.height = 212;
        this.houseBitmap.touchEnabled = true;
        this.addChild(this.houseBitmap)
        this.touchEnabled = true;

        this.id = this.game.game_id
        this.joinEos = this.game.join_eos
        this.game_progress - this.game.game_progress

        this.playerList =[]  //初始化士兵列表
        this.createPlayers(this.game.players)
        this.clock = new Clock()  //初始化时分秒为0：0：0的时钟
        
    }

    public updateHouse(_game:any): void{
        this.game = _game
        this.game_progress - this.game.game_progress
        this.updatePlayers(this.game.players)
    }

    public async updatePlayers(playersJson){ 
        await playersJson.map( async playerJson=>{
            let player = await this.getPlayerByName(playerJson.acc_name)
            if (player == null) {  // new player
                this.createPlayer(playerJson)
            } else {
                player.updatePlayer(playerJson)
            }
        })   
    }

    public createPlayers(playersJson){ 
        playersJson.map( playerJson=>{
            this.createPlayer(playerJson)
            //return player 
        })       
               
    }

    private createPlayer(playerJson){
        let name = this.playerList.length%2 ==0? "avtar_male_png":"avtar_female_png"
        var player = new Player(name, playerJson)
        
        //var colorFlilter = new egret.ColorMatrixFilter(this.colorMatrix);
        //warrior.getBitmap().filters = [colorFlilter];
        this.playerList.push(player)
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public async getPlayerByName(name:string){
        let player = await this.playerList.filter( _player=>{
            return _player.getName() == name
        })
        if (player.length > 0){
            return player[0];  //一个游戏房间中玩家名字是唯一
        } else {
            return null;
        }
    }

    public async getPlayerListByCellId(cell_id){
        let players = await this.playerList.filter( player=>{
            return player.getCellId() == cell_id
        })
        return players
    }

    public getBitmap(){
        return this.houseBitmap
    }

    public getPlayerList(){
        return this.playerList
    }

    public getPosition(){
        var position = {x:this.x, y:this.y}
        return position
    }

    public setPosition(_position: egret.Point): void{
        this.x = _position.x
        this.y = _position.y
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
        this.game=null
        this.clock = null
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

    public getClock(){
        return this.clock;
    }

    public getBoard(){
        return this.game.board
    }

    public getProgress(){
        return this.game.game_progress
    }

    public getStep(){
        return this.game.step
    }

    public getSafeAreaRadius(): number{
        return this.game.safe_area_radius
    }

    public async getFullPlayersJsonByCellId(cell_id){
        let playersJson = await this.game.players.filter( playerJson=>{
            return playerJson.cell_id == cell_id
        })
        return playersJson
    }

    public getPlayerJsonList(){
        return this.game.players
    }

    public getTotalJoinPlayers(){
        return this.game.total_join_players
    }

    public getDeadPlayers(){
        return this.game.dead_players
    }

    public getAlivePlayers(){
        return (this.game.total_join_players - this.game.dead_players)
    }

    public getEOSInHouse(){
        return this.getTotalJoinPlayers() * parseFloat(this.getJoinEos().substr(0,6))
    }
}