

class Player extends egret.DisplayObjectContainer {

    private playerBitmap: egret.Bitmap
    private playerProfile: egret.Bitmap
    private house: House
    private task = {action:"idle", target:null, status:null}
    private position: egret.Point = new egret.Point(0,0)
    
    private uuid 
    private accName  // player eos account name
    private cell_id:number
    private armor:number
    private attack:number
    private hp:number
    private defense:number
    private items = []
    private weapon: number
    private gold:number
    private kills: number
    private moveable: boolean
    private gentle: number

    public constructor(name:string, playerJson:any) {
        super();
        this.createPlayer(name, playerJson);
    }

    private createPlayer(name:string,playerJson:any): void {
        this.playerBitmap = this.createBitmapByName(name);
        this.playerBitmap.width = 70;
        this.playerBitmap.height = 70;
        this.playerProfile = this.createBitmapByName("profile_"+name);
        if (name.indexOf("female")>=0){
            this.setGentle(1)  //female
        } else {
            this.setGentle(0)  //male
        }
        //this.playerBitmap.x = this.position.x //初始化位置
        //this.playerBitmap.y = this.position.y
        //this.playerBitmap.touchEnabled = true;
        this.addChild(this.playerBitmap)
        //this.touchEnabled = true;

        //this.house = house
       // this.uuid = new Date().getTime() // will use [username + date] or uuid generator later
        this.setName(playerJson.acc_name)
        this.setCellId(playerJson.cell_id)
        this.setArmor(playerJson.armor)
        this.setAttack(playerJson.attack)
        this.setLife(playerJson.hp)
        this.setDefense(playerJson.defense)
        this.setItems(playerJson.items)
        this.setWeapon(playerJson.weapon)
        this.setGold(playerJson.win_eos)
        this.setKills(playerJson.kill_count)
    }

    public updatePlayer(playerJson:any){
        //this.setName(playerJson.acc_name)
        this.setCellId(playerJson.cell_id)
        this.setArmor(playerJson.armor)
        this.setAttack(playerJson.attack)
        this.setLife(playerJson.hp)
        this.setDefense(playerJson.defense)
        this.setItems(playerJson.items)
        this.setWeapon(playerJson.weapon)
        this.setGold(playerJson.win_eos)
        this.setKills(playerJson.kill_count)
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public getBitmap(): egret.Bitmap{
        return this.playerBitmap
    }

    public getPlayerProfile(): egret.Bitmap{
        return this.playerProfile
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

    public setPosition(_position): void{
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
        return this.hp
    }

    public setLife(hp): void{
        this.hp = hp
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

    public getArmor(){
        return this.armor
    }

    public setArmor(_armor): void{
        this.armor = _armor
    }

    public getAttack(){
        return this.attack
    }

    public setAttack(_attack): void{
        this.attack = _attack
    }

    public getDefense(){
        return this.defense
    }

    public setDefense(_defense): void{
        this.defense = _defense
    }

    public getWeapon(){
        return this.weapon
    }

    public setWeapon(_weapon): void{
        this.weapon = _weapon
    }

    public getItems(){
        return this.items
    }

    public setItems(_items): void{
        this.items = _items
    }

    public isAlive(): boolean{
        if (this.getLife()>0){
            return true
        } else {
            return false
        }
    }

    public getKills(){
        return this.kills
    } 

    public setKills(_kills){
        this.kills = _kills
    }

    public setMoveable(_moveable:boolean){
        this.moveable = _moveable
    }

    public isMoveable(){
        return this.moveable
    }

    public setGentle(num){
        this.gentle = num
    }

    public getGentle(){
        return this.gentle
    }
}