        //////////////////////////////////////////////////////////////////////////////////////
        //
        //  Copyright (c) 2014-present, Egret Technology.
        //  All rights reserved.
        //  Redistribution and use in source and binary forms, with or without
        //  modification, are permitted provided that the following conditions are met:
        //
        //     * Redistributions of source code must retain the above copyright
        //       notice, this list of conditions and the following disclaimer.
        //     * Redistributions in binary form must reproduce the above copyright
        //       notice, this list of conditions and the following disclaimer in the
        //       documentation and/or other materials provided with the distribution.
        //     * Neither the name of the Egret nor the
        //       names of its contributors may be used to endorse or promote products
        //       derived from this software without specific prior written permission.
        //
        //  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
        //  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
        //  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
        //  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
        //  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
        //  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
        //  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
        //  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
        //  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
        //  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        //
        //////////////////////////////////////////////////////////////////////////////////////


        class Main extends egret.DisplayObjectContainer {

            private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
            private _distance:egret.Point = new egret.Point();
            private textfield: egret.TextField = new egret.TextField();
            
            private tmxTileMap = tiled.TMXTilemap
            private _route: egret.Shape = new egret.Shape();
            private _life: egret.Shape = new egret.Shape();
            
            private selectedHouse:House
            private selectedPlayer: Player;
            private sword: egret.Bitmap;
            private fight: egret.Bitmap;
            private soilderIconList = []
            private enforce:egret.Bitmap 
            private attack:egret.Bitmap
            private idle:egret.Bitmap 

            private houseList:Array<House> = []
            private board: Board = null;

            private login:egret.Bitmap;
            private logout:egret.Bitmap;

            private canvas;
            //临时随机演示
            private townRandomName = ["johny", "kitty", "peter"]
            private num = 0

            public constructor() {
                super();
                this.canvas = document.getElementsByTagName("CANVAS")[0]
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            }

            private onAddToStage(event: egret.Event) {

                egret.lifecycle.addLifecycleListener((context) => {
                    // custom lifecycle plugin
                    context.onUpdate = () => {
                    }
                })

                egret.lifecycle.onPause = () => {
                    egret.ticker.pause();
                }

                egret.lifecycle.onResume = () => {
                    egret.ticker.resume();
                }

                this.runGame().catch(e => {
                    console.log(e);
                })
            }

            /**
             * 开始运行游戏：加载地图，资源配置
             */
            private async runGame() {

               // await ScatterUtils.login()
                //await ScatterUtils.getAccountInfo()
                // await  ScatterUtils.getAccountInfo()
                //await  ScatterUtils.getAllGamesInfo()
                //await ScatterUtils.getGameInfo(3)
                
                //await ScatterUtils.createGame("1.0000 EOS")
                //await ScatterUtils.joinGame(9, "1.0000 EOS", 0, 0)
                //await ScatterUtils.kickoff(10)
                // let info = await ScatterUtils.move(10, 1 ,2)
                // console.log("info",info)

                

                await this.loadResource()

                let self:Main=this;
                let url: string = "resource/desert.tmx";
                let urlLoader: egret.URLLoader = new egret.URLLoader();
                urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                //load complete
                urlLoader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event): void {
                    let data: any = egret.XML.parse(event.target.data);
                    this.tmxTileMap = new tiled.TMXTilemap(2000, 2000, data, url);
                    this.tmxTileMap.render();
                    self.addChild(this.tmxTileMap);
                // tmxTileMap.touchEnabled = true;
                // tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_TAP,self.move,self);
                //this.tmxTileMap.touchEnabled = true;
                //  this.tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.mouseDown, self);
                //  this.tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_END, self.mouseUp, self);           

                    self.createGameScene()

                }, url);
                urlLoader.load(new egret.URLRequest(url));

            }

        

            /**
             * 加载资源/配置
             */
            private async loadResource() {
                try {
                    const loadingView = new LoadingUI();
                    this.stage.addChild(loadingView);
                    await RES.loadConfig("resource/default.res.json", "resource/");
                    await RES.loadGroup("preload", 0, loadingView);
                    this.stage.removeChild(loadingView);
                }
                catch (e) {
                    console.error(e);
                }
            }

        

            /**
             * 创建游戏场景
             * Create a game scene
             */
            private async createGameScene() {

            // let canvas=document.getElementsByTagName("CANVAS")[0];
                //console.log(canvas)
                //****** 以下为游戏工具栏，位于地图舞台左侧 ******

                //城堡图，游戏创建图标，位置为左上栏             
                let createGameFlat = this.createBitmapByName("city_png");
                this.stage.addChild(createGameFlat);
                createGameFlat.width = 80;
                createGameFlat.height = 100;
                createGameFlat.x=10
                createGameFlat.y=5
                createGameFlat.touchEnabled = true;
                createGameFlat.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createGame.bind(this,{name:"johny", bitmap:"house_png"}),this)

                //地图图标，点击设置棋盘地图，位置为左栏
                let setMapFlat = this.createBitmapByName("bg1_jpg");
                this.stage.addChild(setMapFlat);
                setMapFlat.x=10
                setMapFlat.y=115
                setMapFlat.touchEnabled = true;
                setMapFlat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setMap ,this)
            
                //士兵图标，点击加入游戏，位置为左栏
                let joinGameFlat = this.createBitmapByName("soilder_png");
                this.stage.addChild(joinGameFlat);
                joinGameFlat.x=10
                joinGameFlat.y=200
                joinGameFlat.width=55
                joinGameFlat.height=80
                joinGameFlat.touchEnabled = true;
                joinGameFlat.addEventListener(egret.TouchEvent.TOUCH_TAP,this.joinGame ,this)  

                //小旗图标，点击Kick off游戏，位置为左栏
                let kickOffFlat = this.createBitmapByName("recall_png");
                this.stage.addChild(kickOffFlat);
                kickOffFlat.x=10
                kickOffFlat.y=300
                kickOffFlat.touchEnabled = true;
                kickOffFlat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.kickOff ,this)   


                this.login = this.createBitmapByName("login_png");           
                this.login.x=1150
                this.login.y=10
                this.login.touchEnabled = true;
                this.login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginGame ,this) 

                //小旗图标，点击Kick off游戏，位置为左栏
                this.logout = this.createBitmapByName("logout_png");     
                this.logout.x=1150
                this.logout.y=10
                this.logout.touchEnabled = true;
                this.logout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.logoutGame ,this) 

                ScatterUtils.getIdentiy().then( identiy=>{
                    if (identiy==null){ 
                        this.stage.addChild(this.login);
                    } else {
                        ScatterUtils.login()
                        this.stage.addChild(this.logout);
                    }
                }) 
                

                

                this.stage.addChild(this.textfield)
                /*
                //红色旗，增援任务创建图标，位置为左栏
                let _flat = this.createBitmapByName("flat_png");
                this.addChild(_flat);
                _flat.x=0
                _flat.y=100
                _flat.touchEnabled = true;
                _flat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.initTask.bind(this,"enforce") ,this)
                //瞄准视觉图，攻击任务创建图标，位置为左栏
                let _attack = this.createBitmapByName("attack_png");
                this.addChild(_attack);
                _attack.x=0
                _attack.y=150
                _attack.touchEnabled = true;
                _attack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.initTask.bind(this, "attack"),this) 
                //士兵图，士兵创建图标，位置为左栏
                
                //绿色旗，士兵召回图标，位置为左栏
                
                
                //以下为全局共享图标创建：增援/标记/攻击/待命/攻击中。根据操作对象不同而使用
                this.enforce = this.createBitmapByName("flat_png")
                this.sword = this.createBitmapByName("sword_png")
                this.attack = this.createBitmapByName("attack_png")
                this.idle = this.createBitmapByName("flat_png")
                this.fight = this.createBitmapByName("fight_gif")
                this.addChild(this._route);
                */
                
                //更新游戏房间列表，位置为上栏
                this.refreshHouseList()
            }


            
            /**
             * 初始化棋盘，生成里面cell元素并定位，生成点击cell触发移动事件
             * 
             */
            private async initBoard(){  //棋盘为静态物体
                if (this.board == null) {
                    this.board = new Board(11,11)   // 构建棋盘 11 x 11
                    this.board.x = 180  //定位棋盘在stage中的位置
                    this.board.y = 110 
                    this.stage.addChild(this.board);

                    //cell添加点击移动事件
                    let cells = this.board.getCellList()
                    cells.map( cell=>{
                        let cellBiteMap = cell.getBitmap()
                        let cellXY = cell.getXY()  // cell在棋盘中的 X/Y 轴坐标
                        cellBiteMap.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{              
                            this.move(cellXY.x, cellXY.y, cell.getPosition())  //cellXY 为 棋盘的x/y轴坐标；  cell.x, cell.y 为棋盘的像素坐标
                        
                        }, this)
                    })
                }
                    
            }

            /**
             * 棋盘中玩家状态更新。从合约获取玩家信息，清空棋盘上玩家对象，重新生成最新玩家对象并加入棋盘 
             * 
             */
            private async updatePlayersInBoard(gameId:number){
                //获取游戏信息时加载loading等待图标
                const loadingView = new LoadingUI();
                this.board.addChild(loadingView);        

                // 获取该房间游戏的信息，显示在棋盘上
                ScatterUtils.getGameInfo(gameId).then( result=>{
                    this.board.removeChild(loadingView);
                    //清除棋盘上原有玩家以及游戏房间中的玩家对象
                    this.board.clearPlayers()
                    this.selectedHouse.clearPlayerList()

                    console.log("game info", result)
                    if (result.rows.length > 0){
                        let players = result.rows[0].players
                        players.map( (playerJson, idx)=>{
                            this.createPlayer(playerJson)  //根据合约最新返回的玩家信息，创建游戏中的玩家对象
                        })
                    } else {
                        alert("无玩家")
                    }
                    
                }).catch((e) => {
                    console.error(e);
                    alert("获取游戏信息失败："+ e)
                })

            }
            
            /**
             * 更新顶部栏的游戏房间列表 
             * 
             */
            private async refreshHouseList(){
                
                // 
                await ScatterUtils.getAllGamesInfo().then( games=>{
                    //清除已有游戏房间
                    this.houseList.map( house=>{
                        if (this.stage.contains(house.getBitmap())){
                            this.stage.removeChild(house.getBitmap());
                            house.destroy()
                        }
                        
                    })
                    // 重新添加游戏房间
                    console.log(games)
                    games.rows.map( (game,idx)=>{
                        console.log(game)
                        this.createHouse({name:"johny", bitmap:"house_png"},game).then( house=>{
                            console.log(house)
                            house.setPosition(new egret.Point(100*(1+idx),5))
                            this.houseList.push(house)
                        })
                        ////let house = new House(game)
                        //house.setPosition(new egret.Point(100,100))
                        //this.stage.addChild(_player);
                    })

                }).catch((e) => {
                    console.error(e);
                    alert("获取游戏信息失败")
                }) 
                
                
            }

            /**
             * 创建游戏(房间) 
             * 
             */
            private createGame(){
                ScatterUtils.getIdentiy().then( identity=>{
                    if (identity==null){
                        alert(ScatterUtils.message.authority)
                        return
                    }

                    ScatterUtils.createGame("1.0000 EOS").then( transaction=>{
                        console.log("create", transaction)

                        // 判断是否创建成功 
                        if (transaction.processed){
                            this.refreshHouseList()
                //     } else if(transaction.login == "failed"){

                        } else {
                            transaction = JSON.parse(transaction)
                            alert("创建游戏失败:"+transaction.error.details[0].message)
                        }    
                        
                    }).catch((e) => {
                        console.log(e);
                        alert("取消创建游戏")
                    })

                })                                                          
            }

            /**
             * 加入游戏(房间) 
             * 
             */
            private joinGame(){

                ScatterUtils.getIdentiy().then( identity=>{
                    if (identity==null){
                        alert(ScatterUtils.message.authority)
                        return
                    }
                    if (!this.selectedHouse){   // 判断是否有选中的城市，没有则不join       
                        console.log("no house selected")
                        alert("请选择加入的游戏房间")
                        return
                    }
                    ScatterUtils.joinGame(this.selectedHouse.getID(), this.selectedHouse.getJoinEos(), 10, 10).then( transaction=>{
                        console.log("transaction", transaction)        
                        
                        if ( !transaction.processed ){  //交易失败
                            transaction = JSON.parse(transaction)
                            alert("加入游戏失败:"+transaction.error.details[0].message)
                        } else {
                            alert("加入游戏！")
                        }
                    }).catch((e) => {
                        console.error(e);
                        alert("加入游戏失败:"+ e)
                    })

                })                        
            }

            /**
             * 设置调用api设置合约地图 
             * 
             */
            private async setMap(){
                 ScatterUtils.getIdentiy().then( identity=>{
                    if (identity==null){
                        alert(ScatterUtils.message.authority)
                        return
                    }

                    if (!this.selectedHouse){   // 判断是否有选中的城市，没有则不setmap      
                        console.log("no house selected")
                        alert("请选择设定棋盘的游戏房间")
                        return
                    }
                    ScatterUtils.setMap(this.selectedHouse.getID()).then( result=>{           
                        console.log("result", result)
                        if (result.succ == 1){
                            alert("棋盘地图设定成功！")                
                        } else {
                            //alert("棋盘地图设定失败："+ result.errmsg)
                            alert("棋盘地图已经设定")
                        }
                        
                    })

                 })
                
            }

            /**
             * 点击棋盘位置，触发移动请求，验证放在后台合约，前端只根据结果显示
             * 
             */     
            private async move(moveX:number, moveY:number, position:any){
                 ScatterUtils.getIdentiy().then( identity=>{
                    if (identity==null){
                        alert(ScatterUtils.message.authority)
                        return
                    }

                    let gameId = this.selectedHouse.getID()
                    ScatterUtils.move(gameId, moveX ,moveY).then( async transaction=>{
                        console.log("move transaction", transaction)
                        if ( !transaction.processed ){  //移动失败
                            transaction = JSON.parse(transaction)
                            alert("移动失败："+transaction.error.details[0].message)
                        } else {    
                            let name = await ScatterUtils.getCurrentAccountName() //通过钱包获取当前玩家账户名
                            console.log("name", name)
                            console.log("this.selectedHouse", this.selectedHouse)
                            let currentPlayer = this.selectedHouse.getPlayerList().filter( player=>{
                                
                                return player.getName() == name  //通过当前玩家账户名 取得当前棋盘玩家对象
                            })
                            console.log("currentPlayer", currentPlayer)
                            if (currentPlayer.length>0){ //如果找到相应的玩家，则先产生移动效果，再更新棋盘玩家
                                let currentPlayerBitmap = currentPlayer[0].getBitmap()
                               // let position = currentPlayer[0].getPosition()
                                egret.Tween.get(currentPlayerBitmap).to( position, 1000, egret.Ease.sineIn )
                                .wait(0).call(this.updatePlayersInBoard.bind(this,gameId))
                                .wait(500).call(this.checkCell.bind(this,currentPlayer[0]));       
                            } else {  //如果找不到相应的玩家，直接更新棋盘玩家，没有移动效果
                                this.updatePlayersInBoard(gameId)
                            }
                                                
                        }

                    }).catch((e) => {
                        console.error(e);
                        alert("移动失败")
                    }) 

                 })
                
            }

            private async checkCell(currentPlayer:Player){
                //console.log("currentPlayer",currentPlayer)
               // console.log("getPlayerList",this.selectedHouse.getPlayerList())
                let _currentPlayer = this.selectedHouse.getPlayerList().filter( player=>{
                    return player.getName() == currentPlayer.getName()
                })
                let encounter = await this.selectedHouse.getPlayerList().filter( player=>{
                    return player.getCellId() == _currentPlayer[0].getCellId()
                })
                console.log("encounter",encounter)
                if (encounter.length > 1){
                    this.attackTarget(currentPlayer.getPosition(), currentPlayer)
                }
            }

            /**
             * kick off 游戏
             * 
             */
            private async kickOff(){
                ScatterUtils.getIdentiy().then( identity=>{
                    if (identity==null){
                        alert(ScatterUtils.message.authority)
                        return
                    }

                    if (!this.selectedHouse){   // 判断是否有选中的城市，没有则不join       
                        console.log("no house selected")
                        alert("请选择Kick Off的游戏房间")
                        return
                    }
                    ScatterUtils.kickOff(this.selectedHouse.getID()).then( transaction=>{
                        console.log(transaction)
                        if ( !transaction.processed ){  //交易失败
                            transaction = JSON.parse(transaction)
                            alert("KickOff游戏失败："+transaction.error.details[0].message)
                        } else {
                            alert("游戏 Kick Off！")
                            this.refreshHouseList()
                            this.initBoard().then( ()=>{  //如果棋盘没有初始化，则先初始化再更新棋盘玩家 
                                
                                this.updatePlayersInBoard(this.selectedHouse.getID())
                            })
                            
                        }
                    })
                })
                
            }

            /** 
             *  描述：点击创建城堡图标产生的生成游戏房间
             *  参数：@param: 创建城市所需要的参数。 格式：{name:城市名, bitmap:位图名}
             *       @game: 合约返回的游戏信息， 包含game_id，join_eos等，初始化游戏房间时使用
             */
            private async createHouse(param, game) {
                //示例中临时随机指定城市名
                param.name = this.townRandomName[this.num]
                this.num = this.num < 2? this.num+1 : this.num-1

            // this.unmountMovement()        
                let house = new House(param, game)
                let houseBitMap = house.getBitmap()
                this.stage.addChild(houseBitMap); 
                //this.selectedHouse = house
                // 以下为点击房间所产生的相应事件行为
                houseBitMap.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  

                        if(this.selectedHouse == house){
                            // 重复点击同一个house, 看是否需要处理
                            //return
                        }
                        this.selectedHouse = house
                        this.showLife(this.stage, house)
                        this.showText(game.game_id+"号房:"+(game.game_progress==2?"已开局":"未开局"), {x: houseBitMap.x, y: houseBitMap.y+80 } )
                        this.initBoard().then( ()=>{  //如果棋盘没有初始化，则先初始化再更新棋盘玩家 
                            this.updatePlayersInBoard(game.game_id)
                        })

                    
                }, this)

                // 可拖拉创建的城市
            // houseBitMap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
            // houseBitMap.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);

                return house
            // let result = await ScatterUtils.createGame("1.0000 EOS")
            // console.log("create", result)
            }


            /** 
             *  描述：更新棋盘玩家时，生成最新玩家信息
             *  参数：@playerJson 合约返回的player信息，包含账户名acc_name, 所在位置cell_id
             */
            private async createPlayer(playerJson){
                //this.unmountMovement()
                if (!this.selectedHouse){   // 判断是否有选中的城市，没有则不生成士兵        
                    console.log("no town selected")
                    return
                }
            //  let playerList =this.selectedHouse.getPlayerList()
            //  if (playerList.length < 5){  // 每城市只允许5组战士，超出将不再生成，直至有生成士兵被摧毁，形成空缺
                    let cell_id = playerJson.cell_id  // playerJson 包含合约返回的player所在cell_id
                    let player = this.selectedHouse.createPlayer(playerJson.acc_name, cell_id)
                    
                    let cell = await this.board.getCellList().filter( cell=>{  //通过cell_id，查找所在地图的cell位置，并返回cell对象
                        return cell.getID() == cell_id
                    })
                    let cell_position = cell[0].getPosition()
                    //将player定位在相应cell的位置
                    let _x = cell_position.x 
                    let _y = cell_position.y 
                    player.setPosition( new egret.Point(_x, _y ))
                    //将player加入舞台
                    let playerBitmap = player.getBitmap()        
                    this.board.putPlayer(playerBitmap);  //将创建的玩家放入棋盘
                    //this.board.setChildIndex(playerBitmap, 10)

                    // 可拖拉移动玩家
                    //playerBitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                    //playerBitmap.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);

                    playerBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  
                    
                        //this.selectedPlayer = player
                        this.showLife(this.board, player)
                    
                    }, this)
                    //指定当前生成士兵为选定士兵
                    /*
                    this.selectedPlayer = player

                    //该士兵(点击)被攻击逻辑代码
                    playerBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                        //任务为攻击的士兵，将攻击被点选士兵
                        if (this.selectedPlayer && this.selectedPlayer != player && this.selectedPlayer.getTask().action=="attack"){
                            let task = this.selectedPlayer.getTask()
                            task.target = player // assign current target player to select player: task = {action:attack}
                            this.selectedPlayer.setTask(task)
                        }   
                    }, this)

                    // 生成顶部区域士兵栏标签，点选时，被绑定的士兵将被选中
                    let houseName = this.selectedHouse.getHouseName()
                    let soilderIcon = this.createBitmapByName(houseName+"_soilder_png");
                    this.soilderIconList.push({key: player.getUUID(), icon: soilderIcon})
                    this.stage.addChild(soilderIcon);
                    soilderIcon.width = 68;
                    soilderIcon.height = 100;
                    soilderIcon.x = 110 + (this.soilderIconList.length -1) * 68
                    soilderIcon.touchEnabled = true;
                    soilderIcon.addEventListener(egret.TouchEvent.TOUCH_END, this.selectPlayer.bind(this,player), this) 
                    */
            //  } else {
            //       this.selectedPlayer = null
            //    }

            //   setTimeout( ()=> {
                    //恢复移动监听
                //       this.mountMovement()
                //    },300)  
            }


            /**
             * 登陆游戏
             * 
             */
            private async loginGame(){
                ScatterUtils.connect().then( connected=>{
                    if (!connected){
                        alert("亲，还没有装钱包哟")
                        return
                    }
                })
                ScatterUtils.login().then( message=>{
                    
                    if (message.login){  //登陆成功， 进行登陆/登出按钮转换
                        alert("欢迎: "+ message.details)
                        if (this.stage.contains(this.login)) {
                            this.stage.removeChild(this.login)
                        }
                        if (!this.stage.contains(this.logout)) {
                            this.stage.addChild(this.logout)
                        }

                    } else {
                        alert(message.details)
                    }                 

                }).catch( e=>{
                    console.log("e",e)
                    alert(e)
                })
            }    

            /**
             * 登出游戏
             * 
             */
             private async logoutGame(){
                ScatterUtils.logout().then( message=>{
                    ScatterUtils.getCurrentAccountName().then( name=>{
                        alert(message.details)
                        if (message.logout){
                            if (this.stage.contains(this.logout)) {
                                this.stage.removeChild(this.logout)
                            }
                            if (!this.stage.contains(this.login)) {
                                this.stage.addChild(this.login)
                            }
                        }
                    })                                           
                }).catch( e=>{
                    console.log("e",e)
                    alert(e)
                })
            } 

        //******************************************************************************************************************* */    
        //************************************************以下为无用或辅助方法************************************************* */
        //******************************************************************************************************************* */
            
            /** 
             *  描述：撤回/召回所选士兵
             *  
             */
            private recall(player: Player){
                if (!player) {player = this.selectedPlayer}
                if (player){
                    this.unmountMovement()
                    this.clearRoute(player.getTask().action)
                // if (!this.selectedWarrior) {return}
                    let status = player.getTask().status
                    let house = player.getHouse()
                    let recallPoint = house.getPosition()  // {x:number , y:number}
                    let playerBitmap = player.getBitmap()
                    egret.Tween.removeTweens(playerBitmap)
                    if (status && status == "completed"){  //已执行任务士兵，召回时间，设为1秒
                        egret.Tween.get( playerBitmap ).to( recallPoint, 1000, egret.Ease.sineIn )
                    } else { //行军中或待命中士兵，撤回时间为立刻0秒
                        egret.Tween.get( playerBitmap ).to( recallPoint, 0, egret.Ease.sineIn )
                    }
                    player.setTask({action:"idle", target:null, status:null})
                }       
            }

            /** 
             *  描述：点击创建所选士兵的任务
             *  参数：@_action: 任务名称 
             */
            private initTask(_action:string){
                //this.canvas.addEventListener('mousemove',this.onMove.bind(this));
                if (this.selectedPlayer){
                    this.unmountMovement()
                    //任务json对象 {action:string, target:Object, status:string} - action: idle/enforce/attack, target:Town/Warrior, status: completed
                    this.selectedPlayer.setTask({action:_action,target:null,status:null})
                    setTimeout( ()=> {
                        this.mountMovement()
                    },300)
                
                } else {
                    console.log("no warrior selected")
                }
                
            }


            /** 
             *  描述：显示所选目标生命值
             *  参数：@target: 生命值所属目标
             */
            private showLife(container, target){
                let life = target.getLife()
                let color

                if (life.remain >= life.full*0.6 ) {
                    color = 0x00EE00   // 绿色生命值 健康
                } else if (life.remain >= life.full*0.4 && life.remain < life.full*0.6 ){
                    color = 0xFFFF00   // 黄色生命值 危险
                } else {
                    color = 0xFF0000   // 红色生命值 危殆
                }
                this._life.graphics.clear()
                this._life.graphics.lineStyle(4, color);
                this._life.graphics.moveTo(target.getPosition().x, target.getPosition().y);
                this._life.graphics.lineTo(target.getPosition().x + life.remain, target.getPosition().y);
                container.addChild(this._life)
            }

            private showText(_text:string, position:any){
                this.textfield.x = position.x
                this.textfield.y = position.y
                this.textfield.size = 22
                this.textfield.textColor = 0x000000
                this.textfield.text = _text
            }

            /** 
             *  描述：点击士兵条栏产生的选中士兵对象行为
             *  参数：@warrior: 点选的士兵对象
             */
            private selectPlayer(player: Player){
                this.unmountMovement()
                //判断当前点选士兵是否为当前城市所有
                let belonging = player.getHouse() == this.selectedHouse? true : false
                if (!belonging){
                    //判断当前点选士兵任务是否为增援当前所选城市
                    let task = player.getTask()
                    if (task.action =="enforce" && task.target == this.selectedHouse ){
                        belonging = true
                    }
                }
                if (belonging){  //如果所选士兵属于或增援选定城市，则该士兵可以被调用
                    this.selectedPlayer = player
                    // 提升对象到显示层顶端
                    this.stage.setChildIndex(this.selectedPlayer.getBitmap(), 10)
                    //标签所选士兵
                    this.showLife(this.board, player)

                    //选中士兵应答声效
                    this.actionSound(RES.getRes("ack_mp3").url)
                }  
                setTimeout( ()=> { //恢复移动监听
                        this.mountMovement()
                    },300)    
            }

            /** 
             *  描述：行为声效
             *  参数：@_url: 音效地址
             */
            private actionSound(_url){
                let sound: egret.Sound = new egret.Sound()
                sound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
                    sound.play(0,1);
                }, this);
                sound.load(_url)
            }

            /** 
             *  描述：移动士兵到舞台点击的位置
             *  参数：@evt: 鼠标点击地图后产生的移动终止点
             */
            private movePlayer(evt:egret.TouchEvent){
            console.log("moving")
            // let warrior = this.selectedWarrior
            if (this.selectedPlayer == null || typeof(this.selectedPlayer)=="undefined"  ) {
                return
            }

            if (this.stage.contains(this._life)){ //移除当前选中士兵标签
                this.stage.removeChild(this._life)
            }
            //移除已存在缓动
            let playerBitmap = this.selectedPlayer.getBitmap()
            egret.Tween.removeTweens(playerBitmap)
            //定义移动起始/终结
            let startPoint = {x:playerBitmap.x, y:playerBitmap.y }
            let endPoint = {x:evt.stageX, y:evt.stageY }

            let action = this.selectedPlayer.getTask().action
            this.drawRoute(startPoint, endPoint, action)
            // 士兵终点位置微调：offset = 图片尺寸/2
            let playerOffsetPoint = {x:evt.stageX - 17, y:evt.stageY -25 }
            //行军时间为3秒
            egret.Tween.get( playerBitmap ).to( playerOffsetPoint, 3000, egret.Ease.sineIn ).wait(500).call(this.doAction.bind(this, this.selectedPlayer, action, playerOffsetPoint, endPoint)); 
            

            }

            private mountMovement(){
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.movePlayer, this)
            }

            private unmountMovement(){
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.movePlayer, this)
            }

            /** 
             *  描述：到达任务地址后执行任务
             *  参数 @warrior: 士兵对象
             *       @action: 任务名称
             *       @warriorOffsetPoint: 攻击执行士兵中心点
             *       @attackPoint:攻击点
             */
            private doAction(player, action, playerOffsetPoint, attackPoint){
                //清除已有线路痕迹,清除目标图标,例如this.flat, this.attack
                this.clearRoute(action)
                //判断如果士兵触碰目标，则触发行动可执行
                let actionObject = player.getTask().target
                let executable:boolean = ( actionObject==null || actionObject.getBitmap()==null )? false : actionObject.getBitmap().hitTestPoint( attackPoint.x, attackPoint.y,true );

                console.log("execute="+ executable)
                if (executable){
                    let _actionShow = this.createBitmapByName("sword_png")
                    _actionShow.x = playerOffsetPoint.x
                    _actionShow.y = playerOffsetPoint.y          
                    this.stage.addChild(_actionShow)
                    //如果是攻击，则触发攻击效果图
                    if (action == "attack"){
                        this.attackTarget(playerOffsetPoint, actionObject).then( ()=>{
                            //攻击完毕后，士兵回撤，状重置为idle，等待下一次任务                                  
                            player.setTask({action:"attack", target:null, status:"completed"})
                            this.recall(player)
                        })
                        
                    } else {
                        player.setTask({action:"enforce", target:actionObject, status:"completed"})
                    }
                    
                    setTimeout(()=> {
                        this.stage.removeChild(_actionShow)
                        _actionShow = null
                    }, 1000);

                } else { // 如果移动行为没有触发执行结果，则设为idle状态
                    player.setTask({action:"idle", target:null})
                }
            }

            /** 
             *  描述：执行攻击任务效果展示
             *  参数：@warriorOffsetPoint: 攻击执行士兵中心点
             *       @actionObject: 攻击对象
             */
            private attackTarget(playerOffsetPoint, actionObject){
                let _actionShow = this.createBitmapByName("sword_png")
                    _actionShow.x = playerOffsetPoint.x
                    _actionShow.y = playerOffsetPoint.y          
                    this.board.addChild(_actionShow)
                //创建攻击动画效果
                let fightFactory = new egret.MovieClipDataFactory(RES.getRes("fight_json"),RES.getRes("fight_png"));
                let fighting:egret.MovieClip = new egret.MovieClip(fightFactory.generateMovieClipData("fight"));
                // role.gotoAndPlay(1, 3);
                fighting.x = playerOffsetPoint.x;
                fighting.y = playerOffsetPoint.y;
                fighting.width = 50;
                fighting.height = 50;
                this.board.addChild(fighting); 
                fighting.play(4)
                this.actionSound(RES.getRes("fighting_mp3").url)
                // 生命值减损，默认一次攻击扣减20%
                let _life = actionObject.getLife()
                _life.remain = _life.remain - _life.full*0.2
                actionObject.setLife(_life)
                this.showLife(this.board, actionObject)
       //         if ( _life.remain <=0){ // 生命值为0，则相关对象被消灭           
       //             this.board.removePlayer(actionObject) 
                    /*
                    if (actionObject instanceof House){
                        //消灭移除城市所属士兵
                        let list = actionObject.getPlayerList()
                        list.map( async (player)=>{
                            this.stage.removeChild(player.getBitmap())
                            await this.removePlayerIcon(player)
                            this.refrashPlayerIcon()
                        })
                        
                    } else if (actionObject instanceof Player){
                        //从所属城市士兵队列中移除
                        let list = actionObject.getHouse().getPlayerList()
                        list.map( async (player, idx)=>{
                            if (actionObject == player){
                                list.splice(idx,1)
                                await this.removePlayerIcon(player)
                                this.refrashPlayerIcon()
                            }                 
                        })            
                    }
                    */
                    //获取金币
                    let gold = actionObject.getGold()
                    //创建攻击动画效果
                    let moneyFactory = new egret.MovieClipDataFactory(RES.getRes("money_json"),RES.getRes("money_png"));
                    let money:egret.MovieClip = new egret.MovieClip(moneyFactory.generateMovieClipData("money"));
                    // role.gotoAndPlay(1, 3);
                    money.x = playerOffsetPoint.x 
                    money.y = playerOffsetPoint.y - 30;
                    this.board.addChild(money); 
                    money.play(2)


                    // 摧毁音效
                    this.actionSound(RES.getRes("destroyhuman_wav").url)
                //    actionObject.destroy()
               //     if (this.selectedHouse == actionObject){
               //         this.selectedHouse = actionObject = null
               //     }
                    
                    setTimeout(()=> {
                        this.board.removeChild(money)
                        money == null
                    }, 2000);
      //          } 
                return new Promise((resolve, reject) =>{
                    setTimeout(()=> {
                        this.board.removeChild(fighting)
                        this.board.removeChild(_actionShow)
                        if (this.board.contains(this._life)){
                            this.board.removeChild(this._life)
                        }
                        
                        fighting == null
                        resolve()
                    }, 1000);
                })
            }

            /** 
             *  描述：移动时绘出的线路图：攻击为红色；增援为绿色；普通移动为黄色
             *  参数：@start: 线路起始点
             *       @end: 线路终止点
             *       @action: 任务
             */
            private drawRoute(start, end, action:string){
                this.clearRoute(action)
                
                let routeColor
                let endOffsetX
                let endOffsetY
                switch (action) {
                    case "attack":
                        routeColor = 0xFF0000;
                        endOffsetX = 25
                        endOffsetY = 25
                        break;
                    case "enforce":   
                        routeColor = 0x00EE00;
                        endOffsetX = 10
                        endOffsetY = 50
                        break;
                    default:
                        routeColor = 0xFFFF00;
                        endOffsetX = 10
                        endOffsetY = 50
                }
                
                this._route.graphics.lineStyle(2, routeColor);
                this._route.graphics.moveTo(start.x, start.y);
                this._route.graphics.lineTo(end.x, end.y);
            
                // this.attack, this.enforce 图标显示，精细位置根据图标尺寸调整
                this[action].x = end.x - endOffsetX
                this[action].y = end.y - endOffsetY
                this.stage.addChild(this[action]);
            }

            /** 
             *  描述：清除已有线路和任务图标
             *  参数：@action: 任务
             */
            private clearRoute(action){
                this._route.graphics.clear()
                if (this.stage.contains(this[action])) {
                    this.stage.removeChild(this[action]);
                }
                if (this.stage.contains(this._life)) {
                    this.stage.removeChild(this._life);
                } 
            }

            /**
             * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
             * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
             */
            private createBitmapByName(name: string) {
                let result = new egret.Bitmap();
                let texture: egret.Texture = RES.getRes(name);
                result.texture = texture;
                return result;
            }

            /** 
             *  鼠标左键按下
             */
            private mouseDown(evt:egret.TouchEvent)
            {
                this._touchStatus = true;
                this._distance.x = evt.stageX -  evt.target.x;
                this._distance.y = evt.stageY - evt.target.y;
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }

            /** 
             *  鼠标移动
             */
            private mouseMove(evt:egret.TouchEvent)
            {
                if( this._touchStatus )
                {
                    try{ 
                        evt.target.x = evt.stageX - this._distance.x;
                        evt.target.y = evt.stageY - this._distance.y;
                    } catch (e){ //移动过程中出现的未知问题，待解决
                        console.log(e)
                    }
                
                }
            }

            /** 
             *  鼠标左键抬起
             */
            private mouseUp(evt:egret.TouchEvent)
            {
                this._touchStatus = false;
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }

            /** 
             *  从顶部士兵标签栏移除指定士兵
             */
            private removePlayerIcon(player: Player){
                let id = player.getUUID()
                this.soilderIconList.map( (obj, idx)=>{
                    if (obj.key==id){
                        if (this.stage.contains(obj.icon)){
                            this.stage.removeChild(obj.icon)
                        }
                        
                        this.soilderIconList.splice(idx,1)
                    }
                })
            }

            /** 
             *  顶部士兵标签栏重行排列
             */
            private refrashPlayerIcon(){
                this.soilderIconList.map( (obj, idx)=>{
                    obj.icon.x = 110 + idx * 68
                })
            }

            /**
             * 描述文件加载成功，开始播放动画
             * Description file loading is successful, start to play the animation
             */
            private startAnimation(result: string[]) {
                let parser = new egret.HtmlTextParser();

                let textflowArr = result.map(text => parser.parse(text));
                let textfield = this.textfield;
                let count = -1;
                let change = () => {
                    count++;
                    if (count >= textflowArr.length) {
                        count = 0;
                    }
                    let textFlow = textflowArr[count];

                    // 切换描述内容
                    // Switch to described content
                    textfield.textFlow = textFlow;
                    let tw = egret.Tween.get(textfield);
                    tw.to({ "alpha": 1 }, 200);
                    tw.wait(2000);
                    tw.to({ "alpha": 0 }, 200);
                    tw.call(change, this);
                };

                change();
            }
        }