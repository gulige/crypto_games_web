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


        class Game extends egret.DisplayObjectContainer {

            private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
            private _distance:egret.Point = new egret.Point();
            private textfield: egret.TextField = new egret.TextField();
            
            private tmxTileMap = tiled.TMXTilemap
            private _route: egret.Shape = new egret.Shape();
            private _life: egret.Shape = new egret.Shape();
            
           // private gameId
            private currentHouse:House
            private selectedPlayer: Player;
            private setMapFlat: egret.Bitmap;
            private kickOffFlat: egret.Bitmap;
            private fight: egret.Bitmap;
            private soilderIconList = []
            private enforce:egret.Bitmap 
            private attack:egret.Bitmap
            private idle:egret.Bitmap 

            //private houseList:Array<House> = []
            private board: Board = null;

            private login:egret.Bitmap;
            private logout:egret.Bitmap;

            private clock:Clock
            private backgroundMusic:egret.Sound = new egret.Sound()
            private backgroundMusicChannel:egret.SoundChannel

            private playerInfo:egret.Shape = new egret.Shape();
            private player_name  = new egret.TextField();
            private player_hp  = new egret.TextField();
            private player_attack  = new egret.TextField();
            private player_defense  = new egret.TextField();
            private player_eos = new egret.TextField();
            private player_item = new egret.TextField();
            private player_weapon = new egret.TextField();

            private safeAreaTop:egret.Shape = new egret.Shape();
            private safeAreaLeft:egret.Shape = new egret.Shape();
            private safeAreaRight:egret.Shape = new egret.Shape();
            private safeAreaBottom:egret.Shape = new egret.Shape();

            private playerProfileListContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            //** 荣誉榜 */
            private honorListContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private honorListBox:egret.Shape = new egret.Shape();            
            private honorListText:egret.TextField = new egret.TextField();
            // 统计看板
            private summaryContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private summaryBox:egret.Shape = new egret.Shape();            
            private summaryContent:egret.TextField = new egret.TextField();

            // 格子内容栏
            private cellDetailsContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private cellDetailsBox:egret.Shape = new egret.Shape();            
            private cellDetailsContent:egret.TextField = new egret.TextField();

            // 事件/提示信息栏
            private messageContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private messageBox:egret.Shape = new egret.Shape();            
            private message:egret.TextField = new egret.TextField();

            // 移动区域显示
            private moveZoneContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private moveZoneBox:egret.Shape = new egret.Shape(); 

            private canvas;
            //临时随机演示
            private townRandomName = ["johny", "kitty", "peter"]
            private num = 0
            //
            private interval = null;
            private messageTimeout = null;
            //毒气
            private poisons = []
            //格子内容可见/不可见图标
            private show:egret.Bitmap;
            private hide:egret.Bitmap;

            colorFlilter = new egret.ColorMatrixFilter([
                                            0.3,0.6,0,0,0,
                                            0.3,0.6,0,0,0,
                                            0.3,0.6,0,0,0,
                                            0,0,0,1,0
                                        ]);

            public constructor() {
                super();
                this.canvas = document.getElementsByTagName("CANVAS")[0]
                //this.canvas.addEventListener('mousemove',this.onMove.bind(this));
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
                 
                //await  ScatterUtils.getAllGamesInfo()
                //await ScatterUtils.getGameInfo(3)
                
                //await ScatterUtils.createGame("1.0000 EOS")
                //await ScatterUtils.joinGame(9, "1.0000 EOS", 0, 0)
                //await ScatterUtils.kickoff(10)
                // let info = await ScatterUtils.move(10, 1 ,2)
                // console.log("info",info)
                console.log("url", window.location.href)
                

                
/*
                let self:Game=this;
                let url: string = "resource/desert.tmx";
                let urlLoader: egret.URLLoader = new egret.URLLoader();
                urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                //load complete
                urlLoader.addEventListener(egret.Event.COMPLETE, function (event: egret.Event): void {
                    let data: any = egret.XML.parse(event.target.data);
                    this.tmxTileMap = new tiled.TMXTilemap(2000, 2000, data, url);
                    this.tmxTileMap.render();
                   // self.addChild(this.tmxTileMap);
                // tmxTileMap.touchEnabled = true;
                // tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_TAP,self.move,self);
                //this.tmxTileMap.touchEnabled = true;
                //  this.tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.mouseDown, self);
                //  this.tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_END, self.mouseUp, self);           

                    var image = new eui.Image();
                image.source = "resource/assets/bg.png";
                self.addChild(image);
                    self.createGameScene()

                }, url);
                urlLoader.load(new egret.URLRequest(url));
                    var image = new eui.Image();
                image.source = "resource/assets/bg.png";
                image.width=this.width
                this.addChild(image);

                */
                    await this.loadResource()
                    //await RES.loadConfig("resource/lazy.res.json", "resource/");
                    //await RES.loadGroup("lazy", 0);
                    this.createGameScene()
                    await RES.loadConfig("resource/lazy.res.json", "resource/");
                    await RES.loadGroup("lazy", 0);
                    
                    
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

                //游戏大厅，游戏创建图标，位置为左上栏             
                let createGameFlat = this.createBitmapByName("town_png");
                this.stage.addChild(createGameFlat);
                createGameFlat.width = 80;
                createGameFlat.height = 80;
                createGameFlat.x=10
                createGameFlat.y=5
                createGameFlat.touchEnabled = true;
                createGameFlat.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                    document.location.href = 'index.html'
                }  ,this)

                //地图图标，点击设置棋盘地图，位置为左栏
                this.setMapFlat = this.createBitmapByName("setmap_png");
                //this.stage.addChild(setMapFlat);
                this.setMapFlat.width=80
                this.setMapFlat.height=80
                this.setMapFlat.x=10
                this.setMapFlat.y=115
                this.setMapFlat.touchEnabled = true;
                this.setMapFlat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setMap ,this)
            
                //小旗图标，点击Kick off游戏，位置为左栏
                this.kickOffFlat = this.createBitmapByName("kickoff_png");
                //this.stage.addChild(kickOffFlat);
                this.kickOffFlat.x=10
                this.kickOffFlat.y=220
                this.kickOffFlat.touchEnabled = true;
                this.kickOffFlat.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                    this.kickOff.call(this)
                    this.currentHouse.getPlayerList().map( player=>{
                        player.setMoveable(true)
                    })
                } ,this)                 

                // ***统计看板***
                this.summaryContainer.x = 1200
                this.summaryContainer.y = 100 
                this.summaryContainer.width = 250
                this.summaryContainer.height = 100
                this.stage.addChild(this.summaryContainer)
                this.summaryBox.graphics.clear()
                this.summaryBox.graphics.beginFill(0xF7CDA4,0.2);
                this.summaryBox.graphics.lineStyle(2, 0x000000, 0.5);
                this.summaryBox.graphics.drawRoundRect(0, 0, 250, 100, 15,15);
                this.summaryBox.graphics.endFill();        
                this.summaryContainer.addChild(this.summaryBox);
                var summaryTitleBox = new egret.Shape();
                summaryTitleBox.graphics.beginFill(0x4F4F4F,0.8);
                summaryTitleBox.graphics.drawRoundRect(0, 0, 250, 30, 15,15);
                this.summaryContainer.addChild(summaryTitleBox);
                var summaryTitle = new egret.TextField();
                summaryTitle.x = 100
                summaryTitle.y = 5
                summaryTitle.size = 20
                summaryTitle.textColor = 0xFFFFFF
                summaryTitle.text = '统计栏'
                this.summaryContainer.addChild(summaryTitle);

                this.summaryContent.x = 10
                this.summaryContent.y = 35
                this.summaryContent.width = 250
                this.summaryContent.height = 100
                this.summaryContent.size = 20
                this.summaryContent.textColor = 0x000000                  
                this.summaryContent.$setWordWrap(true)
                //this.summaryContent.type = egret.TextFieldType.INPUT
                this.summaryContent.$setMultiline(true)
                this.summaryContent.restrict = ""
                this.summaryContainer.addChild(this.summaryContent);

                // ***游戏滚动消息看板***
                this.messageContainer.x = 1200
                this.messageContainer.y = 210
                this.messageContainer.width = 250
                this.messageContainer.height = 250
                this.stage.addChild(this.messageContainer)
                this.messageBox.graphics.clear()
                this.messageBox.graphics.beginFill(0xF7CDA4,0.4);
                this.messageBox.graphics.lineStyle(2, 0x000000, 0.5);
                this.messageBox.graphics.drawRoundRect(0, 0, 250, 250, 15,15);
                this.messageBox.graphics.endFill();
                this.messageContainer.addChild(this.messageBox);

                var messageTitleBox = new egret.Shape();
                messageTitleBox.graphics.beginFill(0x4F4F4F,0.8);
                messageTitleBox.graphics.drawRoundRect(0, 0, 250, 30, 15,15);
                this.messageContainer.addChild(messageTitleBox);
                var messageTitle = new egret.TextField();
                messageTitle.x = 100
                messageTitle.y = 5
                messageTitle.size = 20
                messageTitle.textColor = 0xFFFFFF
                messageTitle.text = '消息栏'
                this.messageContainer.addChild(messageTitle);

                this.message.x = 10
                this.message.y = 35
                this.message.width = 230
                this.message.height = 200
                this.message.size = 20
                this.message.textColor = 0x000000                  
                this.message.$setWordWrap(true)
                this.message.$setMultiline(true)
                //this.message.$setBold(true)
                this.messageContainer.addChild(this.message);
                // ***********

                // ***格子栏***
                this.cellDetailsContainer.x = 1200
                this.cellDetailsContainer.y = 470 
                this.cellDetailsContainer.width = 250
                this.cellDetailsContainer.height = 500
                //this.stage.addChild(this.cellDetailsContainer)
                this.cellDetailsBox.graphics.clear()
                this.cellDetailsBox.graphics.beginFill(0xF7CDA4,0.4);
                this.cellDetailsBox.graphics.lineStyle(2, 0x000000, 0.5);
                this.cellDetailsBox.graphics.drawRoundRect(0, 0, 250, 500, 15,15);
                this.cellDetailsBox.graphics.endFill();
                this.cellDetailsContainer.addChild(this.cellDetailsBox);

                var cellDetailsTitleBox = new egret.Shape();
                cellDetailsTitleBox.graphics.beginFill(0x4F4F4F,0.8);
                cellDetailsTitleBox.graphics.drawRoundRect(0, 0, 250, 30, 15,15);
                this.cellDetailsContainer.addChild(cellDetailsTitleBox);
                var cellDetailsTitle = new egret.TextField();
                cellDetailsTitle.x = 100
                cellDetailsTitle.y = 5
                cellDetailsTitle.size = 20
                cellDetailsTitle.textColor = 0xFFFFFF
                cellDetailsTitle.text = '格子栏'
                this.cellDetailsContainer.addChild(cellDetailsTitle);

                this.cellDetailsContent.x = 10
                this.cellDetailsContent.y = 35
                this.cellDetailsContent.width = 230
                this.cellDetailsContent.height = 450
                this.cellDetailsContent.size = 20
                this.cellDetailsContent.textColor = 0x000000                  
                this.cellDetailsContent.$setWordWrap(true)
                this.cellDetailsContent.$setMultiline(true)
                this.cellDetailsContainer.addChild(this.cellDetailsContent);
                //移动区域
                this.moveZoneContainer.width = 240
                this.moveZoneContainer.height = 240
                this.moveZoneBox.graphics.clear()
                this.moveZoneBox.graphics.beginFill(0x0000FF,0.1);
                this.moveZoneBox.graphics.drawRoundRect(0, 0, 240, 240, 15,15);
                this.moveZoneBox.graphics.endFill();
                //this.moveZoneBox.graphics.lineStyle(4, 0x00EE00, 0.4);
                //this.moveZoneBox.graphics.drawRect(0, 0, 240, 240);
                this.moveZoneContainer.addChild(this.moveZoneBox);   
                // this.moveZoneContainer.$setVisible(false)          

                // ***创建游戏荣誉榜***
                this.honorListContainer.width = 880
                this.honorListContainer.height = 880
                this.honorListBox.graphics.clear()
                this.honorListBox.graphics.beginFill(0x444444, 0.8);
                this.honorListBox.graphics.drawRoundRect(0, 0, 880, 880, 15,15);
                this.honorListBox.graphics.endFill();
                this.honorListContainer.addChild(this.honorListBox);
                this.honorListContainer.addChild(this.createBitmapByName("gameover_jpg"));
                this.honorListText.width = 880
                this.honorListText.height = 880
                this.honorListText.size = 22
                this.honorListText.textColor = 0xFFFFFF                  
                this.honorListText.$setWordWrap(true)
                this.honorListText.$setMultiline(true)
                this.honorListContainer.addChild(this.honorListText);
                // ***********

                

                //******登陆/登出功能******
                this.login = this.createBitmapByName("login_png");           
                this.login.x=1200
                this.login.y=10
                this.login.touchEnabled = true;
                this.login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginGame ,this) 
             
                this.logout = this.createBitmapByName("logout_png");     
                this.logout.x=1200
                this.logout.y=10
                this.logout.touchEnabled = true;
                this.logout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.logoutGame ,this) 

                //根据Scatter当前身份状况判断是否已经登陆/登出，并显示相应按钮
                ScatterUtils.getIdentity().then( identiy=>{
                    if (identiy==null){ 
                        this.stage.addChild(this.login);
                    } else {
                        ScatterUtils.login()
                        this.stage.addChild(this.logout);
                    }
                }) 
                //************************ 

                //******show/hide 格子内容******
                this.show = this.createBitmapByName("show_png");           
                this.show.x=1350
                this.show.y=10
                this.show.width = 40
                this.show.height = 40
                this.show.touchEnabled = true;
                this.show.$setVisible(false)
                this.stage.addChild(this.show)
                this.show.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                    this.show.$setVisible(false)
                    this.hide.$setVisible(true)
                    this.changeDetailMode(false)
                } ,this) 
             
                this.hide = this.createBitmapByName("hide_png");     
                this.hide.x=1350
                this.hide.y=10
                this.hide.width = 40
                this.hide.height = 40
                this.hide.touchEnabled = true;               
                this.stage.addChild(this.hide)
                this.hide.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                    this.show.$setVisible(true)
                    this.hide.$setVisible(false)
                    this.changeDetailMode(true)
                } ,this)

                //***背景音乐设置 */
                /*
                let play_glory = this.createBitmapByName("play_png");
                this.stage.addChild(play_glory);
                play_glory.x=1400
                play_glory.y=300
                play_glory.touchEnabled = true;
                play_glory.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backgroundSound.bind(this, RES.getRes("glory_1_mp3").url) ,this) 

                let play_honor = this.createBitmapByName("play_png");
                this.stage.addChild(play_honor);
                play_honor.x=1400
                play_honor.y=350
                play_honor.touchEnabled = true;
                play_honor.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backgroundSound.bind(this, RES.getRes("honor_1_mp3").url) ,this)
                */
                let play_easy = this.createBitmapByName("music_png");
                this.stage.addChild(play_easy);
                play_easy.x=1400
                play_easy.y=5
                play_easy.touchEnabled = true;
                play_easy.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                    if (this.backgroundMusicChannel){
                        this.backgroundMusicChannel.stop()
                    }            
                    play_easy.$setVisible(false)
                    play_stop.$setVisible(true)

                } ,this)
                this.stage.addChild(play_easy);
                this.backgroundSound(RES.getRes("easy_1_mp3").url)

                let play_stop = this.createBitmapByName("mute_png");
                this.stage.addChild(play_stop);
                play_stop.$setVisible(false)
                play_stop.x=1400
                play_stop.y=5
                play_stop.touchEnabled = true;
                play_stop.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                    this.backgroundSound(RES.getRes("easy_1_mp3").url)
                    play_easy.$setVisible(true)
                    play_stop.$setVisible(false)
                 } ,this)
                
                /******************** */                 
                
                this.stage.addChild(this.textfield)
                //this.popMessageBox()
                
                
                //let gameId = window.location.href.match(/(?<=id=).+/)[0]
                let gameId = window.location.href.substr(window.location.href.indexOf("=")+1)
                this.initBoard().then( ()=>{  //如果棋盘没有初始化，则先初始化再更新棋盘玩家 
                    this.refreshHouse(gameId).then( ()=>{
                        this.updateClockInStage(this.currentHouse.getClock())                        
                    })
                    // 建立与合约的定时器，每5秒更新一次数据到每个游戏房间，然后更新正在打开的棋盘玩家，然后渲染战斗（如果有的话）
                    this.interval = egret.setInterval( async ()=>{ 
                    
                        await this.refreshHouse(gameId)
                        //this.popHonorList()
                        //游戏全局看板
                        this.updateSummaryBoard()

                        let game_progress = this.currentHouse.getProgress()
                        //游戏结束不再更新
                        if (game_progress==3){
                            //弹出游戏结束荣誉榜
                            egret.setTimeout( ()=>{
                                this.popHonorList()
                            },this, 5000)
                            
                            if (this.interval){
                                egret.clearInterval(this.interval)
                            }
                        }
                        
                    }, this, 5000)  //每5秒从合约从取得所有游戏信息并更新

                })
                
            }

            /**
             * 初始化功能键
             */
            private updateButton(){              
                let isOwner = this.currentHouse.getOwner() == ScatterUtils.getCurrentAccountName()
                if (isOwner){
                    if (!this.stage.contains(this.setMapFlat)){
                        this.stage.addChild(this.setMapFlat)
                        this.stage.addChild(this.kickOffFlat)
                    }

                    let progress = this.currentHouse.getProgress()
                    if (progress === 0){
                       // this.setMapFlat.touchEnabled = true
                       // this.setMapFlat.filters = [this.colorFlilter];
                        this.kickOffFlat.touchEnabled = false
                        this.kickOffFlat.filters = [this.colorFlilter];
                    } else if (progress ===1){
                        this.setMapFlat.touchEnabled = false
                        this.setMapFlat.filters = [this.colorFlilter];
                        this.kickOffFlat.touchEnabled = true
                        this.kickOffFlat.filters = [];
                    } else {  //游戏进行中
                        this.setMapFlat.touchEnabled = false
                        this.setMapFlat.filters = [this.colorFlilter];
                        this.kickOffFlat.touchEnabled = false
                        this.kickOffFlat.filters =[this.colorFlilter];
                    }
                } else {
                    if (this.stage.contains(this.setMapFlat)){
                        this.stage.removeChild(this.setMapFlat)
                        this.stage.removeChild(this.kickOffFlat)
                    }
                }        
            }
            
            /**
             * 初始化棋盘，生成里面cell元素并定位，生成点击cell触发移动事件或玩家加入游戏
             * 
             */
            private async initBoard(){  //棋盘为静态物体
                if (this.board == null) {
                    this.board = new Board(11,11)   // 构建棋盘 11 x 11
                    this.board.x = 300  //定位棋盘在stage中的位置
                    this.board.y = 100 
                    this.board.width = 880
                    this.board.height = 880
                    this.stage.addChild(this.board);
                    
                    //cell添加点击移动事件
                    let cells = this.board.getCellList()
                    cells.map( cell=>{
                        
                        //let cellXY = cell.getXY()  // cell在棋盘中的 X/Y 轴坐标
                        // 监听格子点击事件并根据游戏状态行动
                        cell.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  
                            if (this.currentHouse == null) {return}   

                            if (cell.onDetailMode()){
                                this.showCellDetails(cell.getID())
                            } else {
                                let game_progress = this.currentHouse.getProgress()
                                if (game_progress==0){  //游戏未开始
                                    
                                } else if (game_progress==1) { // 棋盘地图已经设定
                                    this.currentHouse.getPlayerByName(ScatterUtils.getCurrentAccountName()).then( currentPlayer =>{
                                        if (currentPlayer===null){  //当前用户未加入游戏
                                            //this.joinGame(cellXY.x, cellXY.y, cell.getPosition())
                                            this.joinGame(cell)
                                        }
                                    })                                 
                                } else if (game_progress==2) { // 游戏开始中
                                    this.currentHouse.getPlayerByName(ScatterUtils.getCurrentAccountName()).then( currentPlayer =>{
                                        if (currentPlayer!==null && currentPlayer.isMoveable()){  
                                            //this.move(cellXY.x, cellXY.y, cell.getPosition())  //cellXY 为 棋盘的x/y轴坐标；  cell.x, cell.y 为棋盘的像素坐标
                                            this.move(cell)
                                    }
                                    })
                                    
                                }
                            }
                                                                                  
                        }, this)

                    })
                   
                }
                    
            }

            /**
             * 格子的具体内容显示开关
             */
            private changeDetailMode(detailMode:boolean){
                if (detailMode==true){
                    this.stage.addChild(this.cellDetailsContainer)
                } else {
                    if (this.stage.contains(this.cellDetailsContainer)){
                        this.stage.removeChild(this.cellDetailsContainer)
                    }
                }
                
                let cells = this.board.getCellList()
                cells.map( cell=>{                  
                    cell.showDetailMode(detailMode)
                })
            }

            /**
             * 显示格子的具体内容
             */
            private async showCellDetails(cellID: number){
                this.cellDetailsContent.text =""
                let playerJsonInCell = await this.currentHouse.getFullPlayersJsonByCellId(cellID)
                playerJsonInCell.map( playerJson=>{
                    this.currentHouse.getPlayerByName(playerJson.acc_name).then( player=>{
                        if (player.isAlive() ){  //有生命值的玩家才显示
                            let items = ()=>{
                                let nameStr = ''
                                player.getItems().map( id=>{
                                    nameStr = nameStr + ItemUtils.getItemNameById(id)+'\n         '
                                })
                                return nameStr
                            }
                            this.cellDetailsContent.text = this.cellDetailsContent.text
                                                        + `玩家: ${player.getName()}\n`
                                                        + `HP: ${player.getLife() }\n`
                                                        + `武器: ${ItemUtils.getItemNameById(player.getWeapon()) }\n`
                                                        + `攻击力: ${player.getAttack() }\n`
                                                        + `防御力: ${player.getDefense() }\n`
                                                        + `EOS: ${player.getGold()/10000 }\n`
                                                        + `物品: ${items() }\n\n`                        
                        }
                    })                      
                })
                
            }

            /** 
             *  描述：点击玩家条栏产生的选中士兵对象行为
             *  参数：@player: 点选的玩家对象
             */
            private selectPlayer(player: Player){
                this.board.setIndex(player, 1)
                //this.showPlayerInfo(player)
                let gentle = player.getGentle()
                if (gentle == 0){
                    this.actionSound(RES.getRes("yes_mp3").url)
                } else {
                    this.actionSound(RES.getRes("yes_female_mp3").url)
                }
                
                let items = ()=>{
                    let nameStr = ''
                    player.getItems().map( id=>{
                        nameStr = nameStr + ItemUtils.getItemNameById(id)+'\n         '
                    })
                    return nameStr
                }

                var text =  `玩家: ${player.getName()}\n`
                            + `HP: ${player.getLife() }\n`
                            + `武器: ${ItemUtils.getItemNameById(player.getWeapon()) }\n`
                            + `攻击力: ${player.getAttack() }\n`
                            + `防御力: ${player.getDefense() }\n`
                            + `EOS: ${player.getGold()/10000 }\n`
                            + `物品: ${items() }\n\n`
                this.popMessageBox(text)            
            }

            /**
             * 游戏滚动消息看板 
             * 
             */
            private popMessageBox(msgText){
                /*
                if ( !this.stage.contains(this.messageContainer)){
                    this.messageContainer.x = this.stage.width/2 - 100
                    this.messageContainer.y = 50
                    this.stage.addChild(this.messageContainer)               
                }               
                */
                //重置计时器
                egret.clearTimeout(this.messageTimeout)
                this.messageTimeout = egret.setTimeout(()=>{
                   // this.stage.removeChild(this.messageBox)
                   // this.stage.removeChild(this.message)
                   // this.stage.removeChild(this.messageContainer)
                   this.message.text=""
                },this, 4000)

                this.message.text = msgText
            }

            private popHonorList(){

                this.board.addChild(this.honorListContainer)               
                this.honorListText.y = 150            
                this.honorListText.text = `本局赢家: ${this.currentHouse.getWinner()}\n`
                                           + `最佳杀手:  ${this.currentHouse.getBestKiller() }\n`
                                           + `最多EOS赢家: ${this.currentHouse.getBestEOSWin() }`
            }

            /**
             * 游戏全局统计数据看板 
             * 
             */
            private updateSummaryBoard(){
                let playerJsonArray = this.currentHouse.getPlayerJsonList()     
                this.summaryContent.text = `总玩家数: ${this.currentHouse.getTotalJoinPlayers()}\n`
                                           + `总EOS数: ${this.currentHouse.getEOSInHouse()+".0000" }\n`
                                           + `生存玩家: ${this.currentHouse.getAlivePlayers() }`
            }

            /**
             * 生成毒气/安全区域 
             * 
             */
            private createSafeAreaInBoard(radius:number){
                console.log(this.board.width)
                //console.log(radius)
                if ( !this.board.contains(this.safeAreaTop)){
                    this.board.addChild(this.safeAreaTop);
                    this.board.addChild(this.safeAreaLeft);
                    this.board.addChild(this.safeAreaRight);
                    this.board.addChild(this.safeAreaBottom);
                }
                this.safeAreaTop.graphics.clear()
                this.safeAreaTop.graphics.beginFill(0x00FF00, 0.2);            
                this.safeAreaTop.graphics.drawRect(0, 0, this.board.width, (5-radius)*80);
                this.safeAreaTop.graphics.endFill();

                this.safeAreaLeft.graphics.clear()
                this.safeAreaLeft.graphics.beginFill(0x00FF00, 0.2);            
                this.safeAreaLeft.graphics.drawRect(0, (5-radius)*80, (5-radius)*80, this.board.height-((5-radius)*80*2));
                //this.safeAreaLeft.graphics.drawRect(0, (5-radius)*80, (5-radius)*80, this.board.height-((5-radius)*80));
                this.safeAreaLeft.graphics.endFill();

                this.safeAreaRight.graphics.clear()
                this.safeAreaRight.graphics.beginFill(0x00FF00, 0.2);            
                this.safeAreaRight.graphics.drawRect(this.board.width-(5-radius)*80, (5-radius)*80, (5-radius)*80, this.board.height-((5-radius)*80*2));
                //this.safeAreaRight.graphics.drawRect(this.board.width-(5-radius)*80, (5-radius)*80, this.board.width, this.board.height-((5-radius)*80));
                this.safeAreaRight.graphics.endFill();

                this.safeAreaBottom.graphics.clear()
                this.safeAreaBottom.graphics.beginFill(0x00FF00, 0.2);            
                this.safeAreaBottom.graphics.drawRect(0, this.board.height-(5-radius)*80, this.board.width, (5-radius)*80);
                //this.safeAreaBottom.graphics.drawRect(0, this.board.height-(5-radius)*80, this.board.width, (5-radius)*80);
                this.safeAreaBottom.graphics.endFill();
               // this.safeArea.graphics.endFill();
                //this.safeArea.graphics.beginFill(0x000000, 0.2);
                //this.safeArea.graphics.drawRect(50, 50, this.board.width-100, this.board.height-100);
                //一下为产生毒气及移动效果
                let n = 5-radius  //先判断毒气区的格数
                if (this.poisons.length < n*4){  //当前毒气数小于应该产生毒气数，就生成新毒气
                    for (let idx=this.poisons.length/4; idx < n; idx++){
                        for (let a=0; a < 4; a++){  //每轮有四个毒气排列
                            let start, end
                            if (a==0){  //左 --> 右   每行由左移到右的毒气
                                start = {x:0, y:idx*80}
                                end = {x:800, y:idx*80}
                            } else if(a==1){ // 上 --> 下   每列由上移到下的毒气
                                start = {x:idx*80, y:0}
                                end = {x:idx*80, y:800}
                            } else if(a==2){ // 下 --> 上   每列由下移到上的毒气
                                start = {x:(800 - idx*80), y:800}
                                end = {x:(800 - idx*80), y:0}
                            } else if (a==3){  //右 --> 左    每行由右移到左的毒气
                                start = {x:800, y:(800 - idx*80)}
                                end = {x:0, y:(800 - idx*80)}
                            }
                            this.animation({json:"poison_json",png:"poison_png", data:"poison",x:start.x, y:start.y}).then( animate=>{
                                animate.$setScaleX(0.6);
                                animate.$setScaleY(0.6);
                                animate.$alpha = 0.5;
                                animate.play(-1);   
                                //cell.addPoison(animate);
                                //cell.setIndex(animate, 2)  
                                this.board.addChild(animate);
                                this.poisons.push(animate)  
                                tween(animate, start, end)                  
                            })

                        }                      
                    }

                }

                let tween =(obj, start, end)=>{
                    egret.Tween.get(obj).to( end, (6000+4000*Math.random()), egret.Ease.sineIn ).wait(0).call( tween.bind(this,obj, end, start) )
                } 
            }

            /**
             * 棋盘中玩家状态更新。从合约获取玩家信息，清空棋盘上玩家/物品对象，重新生成最新玩家对象和物品并加入棋盘  
             * 
             */
            private async updateObjectsInBoard(house: House){
                //
                
                this.board.clearPlayers()  //先清除所有玩家
                let board = house.getBoard()  //board 为合约返回并存储在house的棋盘/格子数组
                let cellList = this.board.getCellList()
                let progress = house.getProgress()  //取得当前游戏progress
                let step = house.getStep()          //取得当前游戏step

                await cellList.map( async (cell, idx)=>{

                    let cellElement = board[idx]  //取得合约棋盘每个格子最新数据集
                    let prvItem = await cell.getItem()
                    let newItemId = cellElement.item                   
                    let newItem = await ItemUtils.createItemById(newItemId)
                    //let playerArray = cellElement.players
                    let playerJsonInCell = await house.getFullPlayersJsonByCellId(cell.getID())
                                       
                    //this.board.putPlayer(item); //将道具物品放入棋盘
                    //使用playerJsonArray而不是cellElement.players的原因是，如果玩家被炸弹炸死，合约返回来的格子是没有该玩家的，从而无法判断渲染结果
                    if (playerJsonInCell.length > 0){
                        
                        let latestMoveInPlayer = async ()=>{
                            let evtList = await cellElement.event_list.filter( event=>{
                                return (event.evt == "move" || event.evt == "join")
                            })
                            if (evtList.length > 0){
                                let playerName = evtList[evtList.length-1].who
                                return playerName
                            } else {
                                return null
                            }
                            
                        }
                        let latestPlayerName = await latestMoveInPlayer()
                        //该格子内所有玩家产生的移动效果
                        await playerJsonInCell.map( playerJson=>{
                            house.getPlayerByName(playerJson.acc_name).then( player=>{
                                if (player.isAlive() ){  //有生命值的玩家才显示
                                
                                    if (player.x == 0 && player.y == 0){  //第一次进入棋盘的玩家
                                        
                                        player.setPosition( new egret.Point(cell.x + 10*Math.random(), cell.y + 10*Math.random() ))
                                    }
                                    this.board.putPlayer(player);  //将创建的玩家放入棋盘
                                   // 获取最后进入格子的玩家，将会显示在最顶层
                                    if ( player.getName()==latestPlayerName ){
                                        this.board.setIndex(player, 1)
                                    } else {
                                        this.board.setIndex(player, 0)
                                    }
                                    //egret.Tween.get(player).to( {x:cell.x + 10*Math.random() , y:cell.y+ 10*Math.random() }, 500, egret.Ease.sineIn )
                                    //let playerCid = player.getCellId()
                                    let playerName = player.getName()
                                    //谁可以移动：1.移动位置了的玩家 2.非当前玩家 - 因为当前玩家靠点击移动
                                    if (playerName!== ScatterUtils.getCurrentAccountName() ) {
                                        let _x = player.x-cell.x
                                        let _y = player.y-cell.y
                                        if ( _x>0 && _x<80 && _y>0 && _y<80 ){  //目前player的position还未更新，以此判断player之前是不是处于当前cell，来判断是否曾经移动
                                            egret.Tween.get(player).to( {x:cell.x + 10*Math.random() , y:cell.y+ 10*Math.random() }, 500, egret.Ease.sineIn )
                                        } else {
                                            let horse_json, horse_png   
                                            if (player.x > cell.x){
                                                //horse_json = "horse-left_json"
                                                horse_png = "horse-left_png"
                                            } else {
                                                //horse_json = "horse_json"
                                                horse_png = "horse_png"
                                            }
                                            player.$setVisible(false)
                                            this.animation({json:"horse_json",png:horse_png, data:"horse",x:player.x, y:player.y}).then( horse=>{
                                                this.board.addChild(horse); 
                                                horse.$setScaleX(0.8);
                                                horse.$setScaleY(0.8);
                                                horse.play(-1) 
                                                let _pos = {x:cell.x + 10*Math.random() , y:cell.y+ 10*Math.random() } 
                                                egret.Tween.get(horse).to(_pos , 500, egret.Ease.sineIn )
                                                    .wait(0).call( ()=>{
                                                        this.board.removeChild(horse)
                                                        player.$setVisible(true)
                                                        player.setPosition(_pos)
                                                    })

                                            })
                                        }      
                                    }                          
                                }
                            })                      
                        })
                        //检查物品触发事件渲染效果
                        if (progress == 2){  
                            if (prvItem!=null && newItem!=null){
                                this.checkCellItemEffect(cell,prvItem,newItem)
                            }
                             
                        }

                        //检查格子战斗渲染
                        if (progress == 3){ //该逻辑检查游戏进度为3时，是否发生最后一次战斗并渲染效果                         
                            let centerCellElementEvtList = board[60].event_list
                            let last_evt = centerCellElementEvtList[centerCellElementEvtList.length-1]
                            this.checkBattersInCell(last_evt.progress, last_evt.step, cellElement.event_list, cell)
                        } else {
                            this.checkBattersInCell(progress, step, cellElement.event_list, cell)
                        }    
                    }
                    
                    // 当物品ID不为0 以及 tick为0 时，物品可见可捡
                    let tick = cellElement.item_drop_ticks
                    let trigger = cellElement.item_drop_triggered
                    //预告空降信息
                    if (trigger===1){
                        if (tick!==0){  //空降未降落
                            if (!cell.hasFallDownSign()){ //如果还没有空降指示，就添加
                                this.animation({json:"arrow-down_json",png:"arrow-down_png", data:"arrow-down",x:30, y:30}).then( animate=>{
                                    animate.play(-1);    
                                    cell.addChild(animate);
                                    cell.addFallDownSign(true)                                                 
                                })
                            }
                            // 滚动通知
                            this.popMessageBox(ItemUtils.getItemNameById(newItem.getId()) + "即将降落")
                        } else {  // 发生空降
                            cell.removeChildren();  //注意：清除所有物品要放在加入新物品前执行。此处主要为清除空降指示
                        }  
             
                    }
                    if(tick == 0){
                        // 将物品放入格子内
                        newItem.x = 15
                        newItem.y = 15
                        await cell.addItem(newItem)
                        //检查是否产生物品降落效果
                        //武器空投的过程是：
                        //1. 进入某个格子后，触发武器空投倒计时，item_drop_triggered 从0变1
                        //2. item_drop_ticks减少
                        //3. item_drop_ticks=0时，空投发生，就可以捡了
                        // 首先item_drop_triggered从0变1，然后item_drop_ticks开始倒计时，当值为0时就是空降武器。 Eos直接从-1变0，没有triggered和倒计时
                        
                        //console.log(trigger,prvItem, newItemId)
                        if (trigger == 1 && prvItem!==null && prvItem.getId() ===0 && (newItemId == 5 || newItemId == 8 || newItemId == 13)){                        
                            //降落效果
                            newItem.y = -300
                            egret.Tween.get(newItem).to( {x:0, y:0}, 1500, egret.Ease.sineIn )
                                .wait(0).call( ()=>{   //添加物品在地图触地音效   
                                    //console.log("item_fall_mp3")                                                          
                                    this.actionSound(RES.getRes("item_fall_mp3").url)                                                             
                                });
                        }
                    } 
                         
                })
            }

            /**
             * 更新游戏玩家头像列表，有生命值的玩家可以点击查看，无生命值玩家变灰色
             * @list: 玩家列表 
             * 
             */
            private updatePlayerProfileInStage(list){
                if ( !this.stage.contains(this.playerProfileListContainer)){
                    this.stage.addChild(this.playerProfileListContainer)
                    this.playerProfileListContainer.x = 300  //1200
                    this.playerProfileListContainer.y =10
                    //this.playerProfileListContainer.$setWidth(80)
                    //this.playerProfileListContainer.$setHeight(100)
                }               
                this.playerProfileListContainer.removeChildren()
                list.map( (player, idx)=>{
                    let portraitFrame
                    if (player.getName()==ScatterUtils.getCurrentAccountName()){
                        portraitFrame = this.createBitmapByName("portraitFrame_self_png");
                    } else {
                        portraitFrame = this.createBitmapByName("portraitFrame_png");
                    }
                    portraitFrame.$setX(80*idx+5)
                    portraitFrame.$setY(6)
                    portraitFrame.$setWidth(72)
                    portraitFrame.$setHeight(68)
                    let texture = player.getPlayerProfile().texture
                    let profileBitMap = new egret.Bitmap(texture)
                    profileBitMap.$setX(80*idx)
                    profileBitMap.$setY(0)
                    profileBitMap.$setWidth(80)
                    profileBitMap.$setHeight(72)
                    
                    this.playerProfileListContainer.addChild(portraitFrame)
                    this.playerProfileListContainer.addChild(profileBitMap)
                    if (player.isAlive()){
                        profileBitMap.touchEnabled = true
                        profileBitMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectPlayer.bind(this, player), this)
                    } else {  // 如果玩家生命值为0，玩家变灰色
                         
                        profileBitMap.filters = [this.colorFlilter];
                    }                          
                })
                
            }
            
            /**
             * 从合约取得最新游戏信息并更新游戏房间，数据分拆
             * 
             */
            private async refreshHouse(id){         
                
                await ScatterUtils.getGameInfo(parseInt(id)).then( async game=>{
                   
                    // 重新添加/更新游戏房间
                    console.log(game)
                    if (game.rows.length>0){
                        let gameJson = game.rows[0]
                        if (this.currentHouse==null){
                            this.currentHouse = new House({name:"johny", bitmap:"house_png"}, gameJson)
                        } else {
                            await this.currentHouse.updateHouse(gameJson)
                        }
                            
                        await this.updateObjectsInBoard(this.currentHouse)

                        this.createSafeAreaInBoard(this.currentHouse.getSafeAreaRadius())

                        this.updatePlayerProfileInStage(this.currentHouse.getPlayerList())

                        this.updateButton()
                        this.checkMoveZone()

                    } else {
                        //alert("无游戏信息")
                        this.currentHouse = null
                        this.popMessageBox("无游戏信息")
                        
                    }

                }).catch((e) => {
                    console.error(e);
                    //alert("获取游戏信息失败")
                    this.currentHouse = null
                    this.popMessageBox("获取游戏信息失败")
                    
                }) 
                
                
            }


            /**
             * 加入游戏(房间) 
             * 
             */
            private joinGame(cell:Cell){

                ScatterUtils.getIdentity().then( identity=>{
                    if (identity==null){
                        //alert(ScatterUtils.message.authority)
                        this.popMessageBox(ScatterUtils.message.authority)
                        return
                    }
                    /*
                    if (this.currentHouse==null){  // 判断是否有选中的城市，没有则不join       
                        console.log("no house selected")
                        //alert("请选择加入的游戏房间")
                        this.popMessageBox("游戏失效")
                        return
                    }
                    */
                    let cellXY = cell.getXY()
                    let position = cell.getPosition()
                    ScatterUtils.joinGame(this.currentHouse.getID(), this.currentHouse.getJoinEos(), cellXY.y, cellXY.x).then( transaction=>{
                        console.log("transaction", transaction)        
                        
                        if ( !transaction.processed ){  //交易失败
                            transaction = JSON.parse(transaction)
                            //alert("加入游戏失败:"+transaction.error.details[0].message)
                            this.popMessageBox("加入游戏失败:"+transaction.error.details[0].message)
                        } else {
                            //alert("加入游戏！")
                            this.popMessageBox("加入游戏！")
                            //添加玩家降落地图效果
                            let tmpPlayer = new Player('jump_png', {})
                            this.board.putPlayer(tmpPlayer)
                            tmpPlayer.setPosition( new egret.Point(position.x, position.y - 300 ))
                            egret.Tween.get(tmpPlayer).to( position, 300, egret.Ease.sineIn )
                                .wait(0).call( ()=>{  //添加玩家加入游戏时调入地图触地音效                                
                                    this.actionSound(RES.getRes("player_fall_mp3").url)                                                             
                                });
                        }
                    }).catch((e) => {
                        console.error(e);
                        //alert("加入游戏失败:"+ e)
                        this.popMessageBox("加入游戏失败:"+ e)
                    })

                })                        
            }

            /**
             * 设置调用api设置合约地图 
             * 
             */
            private async setMap(){
                 ScatterUtils.getIdentity().then( identity=>{
                    if (identity==null){
                        //alert(ScatterUtils.message.authority)
                        this.popMessageBox(ScatterUtils.message.authority)
                        return
                    }

                    
                    ScatterUtils.setMap(this.currentHouse.getID()).then( result=>{           
                        console.log("result", result)
                        if (result.succ == 1){
                            //alert("棋盘地图设定成功！")       
                            this.popMessageBox("棋盘地图设定成功！")         
                        } else {
                            //alert("棋盘地图设定失败："+ result.errmsg)
                            //alert("棋盘地图已经设定")
                            this.popMessageBox("棋盘地图已经设定")
                        }
                        
                    })

                 })
                
            }

            /**
             * 点击棋盘位置，触发移动请求，验证放在后台合约，前端只根据结果显示
             * 
             */     
            private async move(cell:Cell){
                 ScatterUtils.getIdentity().then( identity=>{
                    if (identity==null){
                        //alert(ScatterUtils.message.authority)
                        this.popMessageBox(ScatterUtils.message.authority)   
                        return
                    }
                    let cellXY = cell.getXY()
                    let position = cell.getPosition()
                    this.animation({json:"arrow-down_json",png:"arrow-down_png", data:"arrow-down",x:position.x+30,y:position.y+25}).then( arrow=>{
                        this.board.addChild(arrow); 
                        arrow.$setScaleX(1.5);
                        arrow.$setScaleY(1.5);
                        arrow.play(-1)
                        
                        //let gameId = this.selectedHouse.getID()
                        ScatterUtils.move(this.currentHouse.getID(), cellXY.y , cellXY.x).then( async transaction=>{
                            if ( !transaction.processed ){  //移动失败
                                transaction = JSON.parse(transaction)
                                //alert("移动失败："+transaction.error.details[0].message)
                                //this.popMessageBox("移动失败："+transaction.error.details[0].message)  
                                this.popMessageBox("移动失败")  
                                this.board.removeChild(arrow)
                            } else {                    
                                this.currentHouse.getPlayerByName(ScatterUtils.getCurrentAccountName()).then( currentPlayer =>{
                                    //console.log("currentPlayer", currentPlayer)
                                    if (currentPlayer!=null){ //如果找到相应的玩家，则先产生移动效果，再更新棋盘玩家
                                        //let currentPlayerBitmap = currentPlayer[0].getBitmap()
                                    // let position = currentPlayer[0].getPosition() 
                                        let horse_json, horse_png   
                                        if (currentPlayer.x > position.x){
                                            //horse_json = "horse-left_json"
                                            horse_png = "horse-left_png"
                                        } else {
                                            //horse_json = "horse_json"
                                            horse_png = "horse_png"
                                        }
                                        currentPlayer.$setVisible(false)
                                        this.animation({json:"horse_json",png:horse_png, data:"horse",x:currentPlayer.x, y:currentPlayer.y}).then( horse=>{
                                            this.board.addChild(horse); 
                                            horse.$setScaleX(0.8);
                                            horse.$setScaleY(0.8);
                                            horse.play(-1)     
                                            egret.Tween.get(horse).to( position, 500, egret.Ease.sineIn )
                                                .wait(0).call( ()=>{
                                                    this.board.removeChild(horse)
                                                    this.board.removeChild(arrow)
                                                    currentPlayer.setPosition(position)
                                                    currentPlayer.$setVisible(true)
                                                    
                                                })

                                        })                              
                                        
                                        currentPlayer.setMoveable(false) // 一个step里移动后就不能再移动
                                        this.checkMoveZone()
                                    // .wait(0).call(this.updatePlayersInBoard.bind(this,gameId))
                                    // .wait(0).call( ()=>{
                                    //      this.board.getCellByXY(moveX,moveY).then( async cell=>{
                                    //          this.checkCellItem(cell)
                                    //      })                                  
                                    // });       
                                    } else {  //如果找不到相应的玩家，直接更新棋盘玩家，没有移动效果
                                    //   this.updatePlayersInBoard(gameId).then( ()=>{
                                    //       this.checkCell(moveX,moveY)
                                    //  })
                                    }
                                })                                                                           
                            }
                        }).catch((e) => {
                            console.error(e);
                            //alert("移动失败")
                            this.popMessageBox("移动失败")
                            this.board.removeChild(arrow)
                        }) 
                    })
                 })
                
            }

            /**
             * 显示玩家可以移动的区间
             */
            private async checkMoveZone(){
                this.currentHouse.getPlayerByName(ScatterUtils.getCurrentAccountName()).then( currentPlayer =>{
                    if (currentPlayer!=null){
                        let isMoveable = currentPlayer.isMoveable()
                        if (isMoveable){
                            this.board.getCellById(currentPlayer.getCellId()).then( cell=>{
                                this.moveZoneContainer.x = cell.getPosition().x - 80 
                                this.moveZoneContainer.y = cell.getPosition().y - 80 
                                this.board.addChild(this.moveZoneContainer) 
                                this.popMessageBox("玩家"+currentPlayer.getName()+"可以移动")
                                //this.board.setIndex(this.moveZoneBox, -10)
                                //this.moveZoneBox.$setVisible(true)
                                //this.moveZoneContainer.$setVisible(true)
                            })
                            
                        } else {
                            //this.moveZoneContainer.$setVisible(false)
                            if (this.board.contains(this.moveZoneContainer)){
                                this.board.removeChild(this.moveZoneContainer)
                            }
                        }
                    }
                })
            }

            /**
             * 根据当前游戏战斗结算，对棋盘进行战斗渲染
             * 
             */
            private async checkBattersInCell(progress, step, eventList, cell){
                let attact_evt = await eventList.filter(  event=>{  //返回符合条件的战斗事件: 条件：与游戏progress，step一致，并且属于最新发生的attack事件                      
                    return  (event.progress==progress && event.step==step && event.evt=="attack" )
                })
                console.log("attact_evt", attact_evt)
                if (attact_evt.length > 0){  //如果有战斗，则渲染战斗场景
                    //  this.board.getCellById(cellElement.cell_id).then( async cell=>{
                        let time = cell.getBattleTime()
                        let nowSeconds = new Date().getTime()
                        //console.log("time", nowSeconds - time)
                            if (nowSeconds - time >= 30000){  //在一个格子里30秒内只会有一次战斗渲染
                                cell.setBattleTime(nowSeconds)
                                this.attackTarget(cell.getPosition())
                            // console.log("playersInCell",playersInCell)
                                // if (playersInCell.length > 1){
                                    
                                    
                                // }
                            }                                
                    //    })
                }
            }

            /**
             * Description: 检查物品触发事件渲染效果，例如炸弹爆炸
             * @cell: 检查的Cell
             * @prvItem: Cell的上一个item状态
             * @newItem: Cell的最新item状态
             */
            private async checkCellItemEffect(cell: Cell, prvItem: Item, newItem: Item){
               
                //let item = cell.getItem()
                //item.setPosition(new egret.Point(0, 0))

                if (prvItem.getId()==1 && newItem.getId()==0){  //触发地雷/炸弹
                    this.animation({json:"explosion_json",png:"explosion_png", data:"explosion",x:cell.x-20,y:cell.y-30}).then( animate=>{
                        this.board.addChild(animate); 
                        animate.play(1)
                        if (cell.contains(prvItem)){
                            cell.removeChild(prvItem)
                        }
                        
                        this.actionSound(RES.getRes("blow_mp3").url)
                        this.actionSound(RES.getRes("destroyhuman_wav").url)
                        setTimeout(()=> {
                            this.board.removeChild(animate)                                    
                            animate == null
                        }, 1000); 
                    })
                } else {
                   // let position = {x:0, y:-30}
                   // egret.Tween.get(prvItem).to( position, 300, egret.Ease.sineIn )
                   // .wait(0).call( ()=>{
                   //     cell.addItem(newItem)
                   // })
                }                 

            }

            /**
             * kick off 游戏
             * 
             */
            private async kickOff(){
                ScatterUtils.getIdentity().then( identity=>{
                    if (identity==null){
                        //alert(ScatterUtils.message.authority)
                        this.popMessageBox(ScatterUtils.message.authority)
                        return
                    }

                    if (!this.currentHouse){   // 判断是否有选中的城市，没有则不join       
                        console.log("no house selected")
                        //alert("请选择Kick Off的游戏房间")
                        this.popMessageBox("游戏失效")
                        return
                    }
                    //let game_id = this.selectedHouse.getID()
                    ScatterUtils.kickOff(this.currentHouse.getID()).then( transaction=>{
                        console.log(transaction)
                        if ( !transaction.processed ){  //交易失败
                            transaction = JSON.parse(transaction)
                            //alert("KickOff游戏失败："+transaction.error.details[0].message)
                            this.popMessageBox("启动游戏失败："+transaction.error.details[0].message)
                        } else {
                            this.popMessageBox("游戏启动成功！")
                            let clock = this.currentHouse.getClock()
                            clock.start()
                        }
                    })
                })
                
            }

           

            private updateClockInStage(_clock:Clock){
                if (this.stage.contains(this.clock)){
                    this.stage.removeChild(this.clock)
                }
                this.clock = _clock
                this.clock.x = 50
                this.clock.y = 400
                this.clock.start()
                this.stage.addChild(this.clock)
            }





            /**
             * 登陆游戏
             * 
             */
            private async loginGame(){               

                 ScatterUtils.login().then( message=>{
                      
                    if (message.login){  //登陆成功， 进行登陆/登出按钮转换
                        //alert("欢迎: "+ message.details)
                        this.animation({json:"identity_json",png:"identity_png", data:"identity",x:150, y:280}).then( animate=>{
                                let shadowBox = new egret.Shape();  
                                shadowBox.graphics.beginFill(0x444444, 0.8);
                                shadowBox.graphics.drawRoundRect(0, 0, 880, 880, 15,15);
                                shadowBox.graphics.endFill();
                                animate.$setScaleX(1.5);
                                animate.$setScaleY(1.5);
                                animate.play(1);  
                                this.board.addChild(shadowBox)   
                                this.board.addChild(animate);  
                                egret.setTimeout( ()=>{
                                       
                                    this.board.removeChild(animate); 
                                    this.board.removeChild(shadowBox)
                                    //alert("欢迎: "+ message.details)
                                    this.popMessageBox("欢迎: "+ message.details)
                                }, this, 8000)
                                             
                            })
                        //this.popMessageBox("欢迎: "+ message.details)
                        if (this.stage.contains(this.login)) {
                            this.stage.removeChild(this.login)
                        }
                        if (!this.stage.contains(this.logout)) {
                            this.stage.addChild(this.logout)
                        }

                    } else {
                        //alert(message.details)
                        this.popMessageBox(message.details)
                    }                 

                }).catch( e=>{
                    console.log("e",e)
                    //alert(e)
                    this.popMessageBox(e)
                })
            }    

            /**
             * 登出游戏
             * 
             */
             private async logoutGame(){

                 
                ScatterUtils.logout().then( message=>{
               //     ScatterUtils.getCurrentAccountName().then( name=>{
                        //alert(message.details)
                        this.popMessageBox(message.details)
                        if (message.logout){
                            if (this.stage.contains(this.logout)) {
                                this.stage.removeChild(this.logout)
                            }
                            if (!this.stage.contains(this.login)) {
                                this.stage.addChild(this.login)
                            }
                        }
             //       })                                           
                }).catch( e=>{
                    console.log("e",e)
                    //alert(e)
                    this.popMessageBox(e)
                })
            } 

            /**
             * 游戏动画方式实现
             * 
             */
            private async animation(animateJson){              
                let animateFactory = new egret.MovieClipDataFactory(RES.getRes(animateJson.json),RES.getRes(animateJson.png));
                let animate:egret.MovieClip = new egret.MovieClip(animateFactory.generateMovieClipData(animateJson.data));
                // role.gotoAndPlay(1, 3);
                animate.x = animateJson.x;
                animate.y = animateJson.y;
               // animate.width = 800;
               // animate.height = 800;               
                return animate;
            }

            /**
             * 显示玩家信息
             * 
             */
            private showPlayerInfo(target: Player){
                /*
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
                this.board.addChild(this._life)
                */
                //
                if (this.board.contains(this.playerInfo)){
                    this.board.removeChild(this.playerInfo)
                }
                this.playerInfo.graphics.clear()
                this.playerInfo.graphics.beginFill(0xEEEEEE);
                this.playerInfo.graphics.drawRoundRect(0, 0, 120, 160, 15,15);
                this.playerInfo.graphics.endFill();
                this.playerInfo.x = target.x + 50
                this.playerInfo.y = target.y
                this.board.addChild(this.playerInfo);

                this.player_name.x = this.playerInfo.x
                this.player_name.y = this.playerInfo.y
                this.player_name.size = 18
                this.player_name.textColor = 0x000000
                this.player_name.text = "玩家:" + target.getName()
                this.board.addChild(this.player_name);


                this.player_hp.x = this.playerInfo.x
                this.player_hp.y = this.playerInfo.y + 20
                this.player_hp.size = 18
                this.player_hp.textColor = 0x000000
                this.player_hp.text = "HP: " + target.getLife()
                this.board.addChild(this.player_hp);

                this.player_weapon.x = this.playerInfo.x
                this.player_weapon.y = this.playerInfo.y + 40
                this.player_weapon.size = 18
                this.player_weapon.textColor = 0x000000
                this.player_weapon.text = "武器: " + ItemUtils.getItemNameById(target.getWeapon())
                this.board.addChild(this.player_weapon);

                this.player_attack.x = this.playerInfo.x
                this.player_attack.y = this.playerInfo.y + 60
                this.player_attack.size = 18
                this.player_attack.textColor = 0x000000
                this.player_attack.text = "攻击力: " + target.getAttack()
                this.board.addChild(this.player_attack);

                this.player_defense.x = this.playerInfo.x
                this.player_defense.y = this.playerInfo.y + 80
                this.player_defense.size = 18
                this.player_defense.textColor = 0x000000
                this.player_defense.text = "防御力: " + target.getDefense()
                this.board.addChild(this.player_defense);

                this.player_eos.x = this.playerInfo.x
                this.player_eos.y = this.playerInfo.y + 100
                this.player_eos.size = 18
                this.player_eos.textColor = 0x000000
                this.player_eos.text = "EOS: " + target.getGold()
                this.board.addChild(this.player_eos);

                let items = ()=>{
                    let nameStr = ''
                    target.getItems().map( id=>{
                        nameStr = nameStr + ItemUtils.getItemNameById(id)+'\n         '
                    })
                    return nameStr
                }
                this.player_item.x = this.playerInfo.x
                this.player_item.y = this.playerInfo.y + 120
                this.player_item.size = 18
                this.player_item.textColor = 0x000000              
                this.player_item.text = "物品: " + items()
                this.board.addChild(this.player_item);

                setTimeout(()=>{
                    this.board.removeChild(this.playerInfo)
                    this.board.removeChild(this.player_name)
                    this.board.removeChild(this.player_hp)
                    this.board.removeChild(this.player_weapon);
                    this.board.removeChild(this.player_attack)
                    this.board.removeChild(this.player_defense)
                    this.board.removeChild(this.player_eos)
                    this.board.removeChild(this.player_item)
                },8000)
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
            private selectSoulder(player: Player){
                this.board.setIndex(player, 1)
                //this.showPlayerInfo(player)
                this.actionSound(RES.getRes("yes_mp3").url)

                var text =  `玩家: ${player.getName()}\n`
                            + `HP: ${player.getLife() }\n`
                            + `武器: ${ItemUtils.getItemNameById(player.getWeapon()) }\n`
                            + `攻击力: ${player.getAttack() }\n`
                            + `防御力: ${player.getDefense() }\n`
                            + `EOS: ${player.getGold() }\n\n`
                this.popMessageBox(text)            
                /*
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
                    */  
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
             *  描述：游戏背景行为声效
             *  参数：@_url: 音效地址
             */
            private backgroundSound(_url){
                if (this.backgroundMusicChannel){
                    this.backgroundMusicChannel.stop()
                }
                this.backgroundMusic.addEventListener(egret.Event.COMPLETE, this.play, this);
                this.backgroundMusic.load(_url)
            }

            private play(){
                this.backgroundMusicChannel = this.backgroundMusic.play(0,0);
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
                        this.attackTarget(playerOffsetPoint).then( ()=>{
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
            private attackTarget(playerOffsetPoint){
               /* 
                let _actionShow = this.createBitmapByName("sword_png")
                    _actionShow.x = playerOffsetPoint.x
                    _actionShow.y = playerOffsetPoint.y          
                    this.board.addChild(_actionShow)
                    */
                //创建攻击动画效果
                let fightFactory = new egret.MovieClipDataFactory(RES.getRes("fighting_json"),RES.getRes("fighting_png"));
                let fighting:egret.MovieClip = new egret.MovieClip(fightFactory.generateMovieClipData("fighting"));
                // role.gotoAndPlay(1, 3);
                fighting.x = playerOffsetPoint.x-20;
                fighting.y = playerOffsetPoint.y-25;
                //fighting.width = 50;
                //fighting.height = 50;
                this.board.addChild(fighting); 
                fighting.play(5)

                this.actionSound(RES.getRes("shooting_mp3").url)

                //显示玩家生命值
               /* playersInCell.map(player=>{
                    let _life = player.getLife()
                    _life.remain = _life.remain - _life.full*0.2
                    player.setLife(_life)
                    this.showLife(this.board, player)

                }) */
                // 生命值减损，默认一次攻击扣减20%
                
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
                    //let gold = actionObject.getGold()
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
                        if (this.board.contains(this._life)){
                            this.board.removeChild(this._life)
                        }
                        
                        fighting == null
                        resolve()
                    }, 7000);
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