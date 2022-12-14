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

            private gameContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private _touchStatus:boolean = false;              //???????????????????????????????????????true
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

            //????????????????????????
            private playerProfileListContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            //** ????????? */
            private honorListContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private honorListBox:egret.Shape = new egret.Shape();            
            private honorListText:egret.TextField = new egret.TextField();
            // ????????????
            private summaryContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private summaryBox:egret.Shape = new egret.Shape();     
            private summaryTitle = new egret.TextField();       
            private summaryContent:egret.TextField = new egret.TextField();

            // ???????????????
            private cellDetailsContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private cellDetailsBox:egret.Shape = new egret.Shape();   
            private cellDetailsTitle = new egret.TextField();         
            private cellDetailsContent:egret.TextField = new egret.TextField();

            // ??????/???????????????
            private messageContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private messageBox:egret.Shape = new egret.Shape();    
            private messageTitle = new egret.TextField();        
            private message:egret.TextField = new egret.TextField();

            // ??????????????????
            private moveZoneContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private moveZoneBox:egret.Shape = new egret.Shape(); 

            private canvas;
            //PC ?????? ????????????
            private mobile:boolean = false;  //if mobile device
            // ????????? locale 
            //private locale:string = "zh_CN"
            //??????????????????
            private townRandomName = ["johny", "kitty", "peter"]
            private num = 0
            //
            private interval = null;
            private messageTimeout = null;
            //??????
            private poisons = []
            //??????????????????/???????????????
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
             * ????????????????????????????????????????????????
             */
            private async runGame() {
                LocaleUtils.locale = localStorage.getItem("eatchicken_locale")==null? 'zh_CN': localStorage.getItem("eatchicken_locale").toString()
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
             * ????????????/??????
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
             * ??????????????????
             * Create a game scene
             */
            private async createGameScene() {
                
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);

                this.stage.addChild(this.gameContainer)
            // let canvas=document.getElementsByTagName("CANVAS")[0];
                //console.log(canvas)
                //****** ??????????????????????????????????????????????????? ******

                //??????????????????????????????????????????????????????             
                let createGameFlat = this.createBitmapByName("town_png");
                this.gameContainer.addChild(createGameFlat);
                createGameFlat.width = 80;
                createGameFlat.height = 80;
                createGameFlat.x=10
                createGameFlat.y=5
                createGameFlat.touchEnabled = true;
                createGameFlat.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                    document.location.href = 'index.html'
                }  ,this)

                //?????????????????????????????????????????????????????????
                this.setMapFlat = this.createBitmapByName("setmap_png");
                //this.stage.addChild(setMapFlat);
                this.setMapFlat.width=80
                this.setMapFlat.height=80
                this.setMapFlat.x=10
                this.setMapFlat.y=115
                this.setMapFlat.touchEnabled = true;
                this.setMapFlat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setMap ,this)
            
                //?????????????????????Kick off????????????????????????
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

                // ***????????????***
                this.summaryContainer.x = 1200
                this.summaryContainer.y = 100 
                this.summaryContainer.width = 250
                this.summaryContainer.height = 100
                this.gameContainer.addChild(this.summaryContainer)
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
                
                this.summaryTitle.x = 90
                this.summaryTitle.y = 5
                this.summaryTitle.size = 20
                this.summaryTitle.textColor = 0xFFFFFF
                this.summaryTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "game.statistic.bar.title")
                this.summaryContainer.addChild(this.summaryTitle);

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

                // ***????????????????????????***
                this.messageContainer.x = 1200
                this.messageContainer.y = 210
                this.messageContainer.width = 250
                this.messageContainer.height = 250
                this.gameContainer.addChild(this.messageContainer)
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
                
                this.messageTitle.x = 90
                this.messageTitle.y = 5
                this.messageTitle.size = 20
                this.messageTitle.textColor = 0xFFFFFF
                this.messageTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "game.message.bar.title")
                this.messageContainer.addChild(this.messageTitle);

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

                // ***?????????***
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
                
                this.cellDetailsTitle.x = 100
                this.cellDetailsTitle.y = 5
                this.cellDetailsTitle.size = 20
                this.cellDetailsTitle.textColor = 0xFFFFFF
                this.cellDetailsTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "game.grid.bar.title")
                this.cellDetailsContainer.addChild(this.cellDetailsTitle);

                this.cellDetailsContent.x = 10
                this.cellDetailsContent.y = 35
                this.cellDetailsContent.width = 230
                this.cellDetailsContent.height = 450
                this.cellDetailsContent.size = 20
                this.cellDetailsContent.textColor = 0x000000                  
                this.cellDetailsContent.$setWordWrap(true)
                this.cellDetailsContent.$setMultiline(true)
                this.cellDetailsContainer.addChild(this.cellDetailsContent);
                //????????????
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

                // ***?????????????????????***
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

                

                //******??????/????????????******
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

                //??????Scatter??????????????????????????????????????????/??????????????????????????????
                ScatterUtils.getIdentity().then( identiy=>{
                    if (identiy==null){ 
                        this.gameContainer.addChild(this.login);
                    } else {
                        ScatterUtils.login()
                        this.gameContainer.addChild(this.logout);
                    }
                }) 
                //************************ 

                //******show/hide ????????????******
                this.show = this.createBitmapByName("show_png");           
                this.show.x=1350
                this.show.y=10
                this.show.width = 40
                this.show.height = 40
                this.show.touchEnabled = true;
                this.show.$setVisible(false)
                this.gameContainer.addChild(this.show)
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
                this.gameContainer.addChild(this.hide)
                this.hide.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                    this.show.$setVisible(true)
                    this.hide.$setVisible(false)
                    this.changeDetailMode(true)
                } ,this)

                //***?????????????????? */
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
                this.gameContainer.addChild(play_easy);
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
                this.gameContainer.addChild(play_easy);
                this.backgroundSound(RES.getRes("easy_1_mp3").url)

                let play_stop = this.createBitmapByName("mute_png");
                this.gameContainer.addChild(play_stop);
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

                // ***??????????????? ??????/??????***
                let localeContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
                localeContainer.x = 1450
                localeContainer.y = 5
                //localeContainer.width = 250
                //localeContainer.height = 250
                localeContainer.touchEnabled = true;
                this.gameContainer.addChild(localeContainer)
                let localeBox:egret.Shape = new egret.Shape();
                localeBox.graphics.clear()
                localeBox.graphics.beginFill(0xF7CDA4);
                localeBox.graphics.lineStyle(2, 0x000000, 0.5);
                localeBox.graphics.drawRect(0, 0, 60, 40);
                localeBox.graphics.endFill();
                localeContainer.addChild(localeBox);

                let localeTitle = new egret.TextField();
                localeTitle.x = 10
                localeTitle.y = 10
                localeTitle.size = 20
                localeTitle.textColor = 0x443A3A
                localeTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale=="zh_CN"?"en_US":"zh_CN","locale")
                localeContainer.addChild(localeTitle); 

                
                localeContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                    
                    if (LocaleUtils.locale == "zh_CN"){
                        LocaleUtils.locale = "en_US"
                    } else {
                        LocaleUtils.locale = "zh_CN"                      
                    }
                    localStorage.setItem("eatchicken_locale", LocaleUtils.locale)
                    localeTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale=="zh_CN"?"en_US":"zh_CN","locale")
                    this.staticLabelI18N()
                   
                 } ,this)
                
                //***** ???????????????PC???????????????*********
                if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                    this.mobile = true
                }
                 /******************** */  
                
                
                //let gameId = window.location.href.match(/(?<=id=).+/)[0]
                let gameId = window.location.href.substr(window.location.href.indexOf("=")+1)
                this.initBoard().then( ()=>{  //?????????????????????????????????????????????????????????????????? 
                    this.refreshHouse(gameId).then( ()=>{
                        this.updateClockInStage(this.currentHouse.getClock())                        
                    })
                    // ?????????????????????????????????5??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                    this.interval = egret.setInterval( async ()=>{ 
                    
                        await this.refreshHouse(gameId)
                        //this.popHonorList()
                        //??????????????????
                        this.updateSummaryBoard()

                        let game_progress = this.currentHouse.getProgress()
                        //????????????????????????
                        if (game_progress==3){
                            //???????????????????????????
                            egret.setTimeout( ()=>{
                                this.popHonorList()
                            },this, 5000)
                            
                            if (this.interval){
                                egret.clearInterval(this.interval)
                            }
                        }
                        
                    }, this, 5000)  //???5????????????????????????????????????????????????

                })
                
            }

            /**
             * ????????????????????????????????????
             */
            private staticLabelI18N(){
                this.summaryTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "game.statistic.bar.title");
                this.messageTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "game.message.bar.title")
                this.cellDetailsTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "game.grid.bar.title")
                this.updateSummaryBoard()
            }

            /**
             * ??????????????????
             */
            private updateButton(){              
                let isOwner = this.currentHouse.getOwner() == ScatterUtils.getCurrentAccountName()
                if (isOwner){
                    if (!this.gameContainer.contains(this.setMapFlat)){
                        this.gameContainer.addChild(this.setMapFlat)
                        this.gameContainer.addChild(this.kickOffFlat)
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
                    } else {  //???????????????
                        this.setMapFlat.touchEnabled = false
                        this.setMapFlat.filters = [this.colorFlilter];
                        this.kickOffFlat.touchEnabled = false
                        this.kickOffFlat.filters =[this.colorFlilter];
                    }
                } else {
                    if (this.gameContainer.contains(this.setMapFlat)){
                        this.gameContainer.removeChild(this.setMapFlat)
                        this.gameContainer.removeChild(this.kickOffFlat)
                    }
                }        
            }
            
            /**
             * ??????????????????????????????cell??????????????????????????????cell???????????????????????????????????????
             * 
             */
            private async initBoard(){  //?????????????????????
                if (this.board == null) {
                    this.board = new Board(11,11)   // ???????????? 11 x 11
                    this.board.x = 300  //???????????????stage????????????
                    this.board.y = 100 
                    this.board.width = 880
                    this.board.height = 880
                    this.gameContainer.addChild(this.board);
                    
                    //cell????????????????????????
                    let cells = this.board.getCellList()
                    cells.map( cell=>{
                        
                        //let cellXY = cell.getXY()  // cell??????????????? X/Y ?????????
                        // ???????????????????????????????????????????????????
                        cell.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  
                            if (this.currentHouse == null) {return}   

                            if (cell.onDetailMode()){
                                this.showCellDetails(cell.getID())
                            } else {
                                let game_progress = this.currentHouse.getProgress()
                                if (game_progress==0){  //???????????????
                                    
                                } else if (game_progress==1) { // ????????????????????????
                                    this.currentHouse.getPlayerByName(ScatterUtils.getCurrentAccountName()).then( currentPlayer =>{
                                        if (currentPlayer===null){  //???????????????????????????
                                            //this.joinGame(cellXY.x, cellXY.y, cell.getPosition())
                                            this.joinGame(cell)
                                        }
                                    })                                 
                                } else if (game_progress==2) { // ???????????????
                                    this.currentHouse.getPlayerByName(ScatterUtils.getCurrentAccountName()).then( currentPlayer =>{
                                        if (currentPlayer!==null && currentPlayer.isMoveable()){  
                                            //this.move(cellXY.x, cellXY.y, cell.getPosition())  //cellXY ??? ?????????x/y????????????  cell.x, cell.y ????????????????????????
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
             * ?????????????????????????????????
             */
            private changeDetailMode(detailMode:boolean){
                if (detailMode==true){
                    this.gameContainer.addChild(this.cellDetailsContainer)
                } else {
                    if (this.gameContainer.contains(this.cellDetailsContainer)){
                        this.gameContainer.removeChild(this.cellDetailsContainer)
                    }
                }
                
                let cells = this.board.getCellList()
                cells.map( cell=>{                  
                    cell.showDetailMode(detailMode)
                })
            }

            /**
             * ???????????????????????????
             */
            private async showCellDetails(cellID: number){
                this.cellDetailsContent.text =""
                let playerJsonInCell = await this.currentHouse.getFullPlayersJsonByCellId(cellID)
                playerJsonInCell.map( playerJson=>{
                    this.currentHouse.getPlayerByName(playerJson.acc_name).then( player=>{
                        if (player.isAlive() ){  //??????????????????????????????
                            let items = ()=>{
                                let nameStr = ''
                                player.getItems().map( id=>{
                                    nameStr = nameStr + ItemUtils.getItemNameById(id, LocaleUtils.locale)+'\n         '
                                })
                                return nameStr
                            }
                            this.cellDetailsContent.text = this.cellDetailsContent.text
                                                        + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.player")} ${player.getName()}\n`
                                                        + `HP: ${player.getLife() }\n`
                                                        + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.weapon")} ${ItemUtils.getItemNameById(player.getWeapon(),LocaleUtils.locale) }\n`
                                                        + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.force")} ${player.getAttack() }\n`
                                                        + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.defence")} ${player.getDefense() }\n`
                                                        + `EOS: ${player.getGold()/10000 }\n`
                                                        + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.item")} ${items() }\n\n`                        
                        }
                    })                      
                })
                
            }

            /** 
             *  ????????????????????????????????????????????????????????????
             *  ?????????@player: ?????????????????????
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
                        nameStr = nameStr + ItemUtils.getItemNameById(id,LocaleUtils.locale)+'\n         '
                    })
                    return nameStr
                }

                var text =  `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.player")} ${player.getName()}\n`
                            + `HP: ${player.getLife() }\n`
                            + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.weapon")} ${ItemUtils.getItemNameById(player.getWeapon(),LocaleUtils.locale) }\n`
                            + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.force")} ${player.getAttack() }\n`
                            + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.defence")} ${player.getDefense() }\n`
                            + `EOS: ${player.getGold()/10000 }\n`
                            + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.item")} ${items() }\n\n`
                this.popMessageBox(text)        
            }

            /**
             * ???????????????????????? 
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
                //???????????????
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
                this.honorListText.text = `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.honor.winner")} ${this.currentHouse.getWinner()}\n`
                                           + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.honor.killer")}  ${this.currentHouse.getBestKiller() }\n`
                                           + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.honor.eos.winner")} ${this.currentHouse.getBestEOSWin() }`
            }

            /**
             * ?????????????????????????????? 
             * 
             */
            private updateSummaryBoard(){
                let playerJsonArray = this.currentHouse.getPlayerJsonList()     
                this.summaryContent.text = `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.statistic.total.players")} ${this.currentHouse.getTotalJoinPlayers()}\n`
                                           + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.statistic.total.eos")} ${this.currentHouse.getEOSInHouse()+".0000" }\n`
                                           + `${LocaleUtils.getLabelById(LocaleUtils.locale,"game.statistic.survive.players")} ${this.currentHouse.getAlivePlayers() }`
            }

            /**
             * ????????????/???????????? 
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
                //????????????????????????????????????
                let n = 5-radius  //???????????????????????????
                if (this.poisons.length < n*4){  //???????????????????????????????????????????????????????????????
                    for (let idx=this.poisons.length/4; idx < n; idx++){
                        for (let a=0; a < 4; a++){  //???????????????????????????
                            let start, end
                            if (a==0){  //??? --> ???   ??????????????????????????????
                                start = {x:0, y:idx*80}
                                end = {x:800, y:idx*80}
                            } else if(a==1){ // ??? --> ???   ??????????????????????????????
                                start = {x:idx*80, y:0}
                                end = {x:idx*80, y:800}
                            } else if(a==2){ // ??? --> ???   ??????????????????????????????
                                start = {x:(800 - idx*80), y:800}
                                end = {x:(800 - idx*80), y:0}
                            } else if (a==3){  //??? --> ???    ??????????????????????????????
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
             * ?????????????????????????????????????????????????????????????????????????????????/?????????????????????????????????????????????????????????????????????  
             * 
             */
            private async updateObjectsInBoard(house: House){
                //
                
                this.board.clearPlayers()  //?????????????????????
                let board = house.getBoard()  //board ???????????????????????????house?????????/????????????
                let cellList = this.board.getCellList()
                let progress = house.getProgress()  //??????????????????progress
                let step = house.getStep()          //??????????????????step

                await cellList.map( async (cell, idx)=>{

                    let cellElement = board[idx]  //?????????????????????????????????????????????
                    let prvItem = await cell.getItem()
                    let newItemId = cellElement.item                   
                    let newItem = await ItemUtils.createItemById(newItemId)
                    //let playerArray = cellElement.players
                    let playerJsonInCell = await house.getFullPlayersJsonByCellId(cell.getID())
                                       
                    //this.board.putPlayer(item); //???????????????????????????
                    //??????playerJsonArray?????????cellElement.players???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
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
                        //?????????????????????????????????????????????
                        await playerJsonInCell.map( playerJson=>{
                            house.getPlayerByName(playerJson.acc_name).then( player=>{
                                if (player.isAlive() ){  //??????????????????????????????
                                
                                    if (player.x == 0 && player.y == 0){  //??????????????????????????????
                                        
                                        player.setPosition( new egret.Point(cell.x + 10*Math.random(), cell.y + 10*Math.random() ))
                                    }
                                    this.board.putPlayer(player);  //??????????????????????????????
                                   // ????????????????????????????????????????????????????????????
                                    if ( player.getName()==latestPlayerName ){
                                        this.board.setIndex(player, 1)
                                    } else {
                                        this.board.setIndex(player, 0)
                                    }
                                    //egret.Tween.get(player).to( {x:cell.x + 10*Math.random() , y:cell.y+ 10*Math.random() }, 500, egret.Ease.sineIn )
                                    //let playerCid = player.getCellId()
                                    let playerName = player.getName()
                                    //??????????????????1.???????????????????????? 2.??????????????? - ?????????????????????????????????
                                    if (playerName!== ScatterUtils.getCurrentAccountName() ) {
                                        let _x = player.x-cell.x
                                        let _y = player.y-cell.y
                                        if ( _x>0 && _x<80 && _y>0 && _y<80 ){  //??????player???position???????????????????????????player???????????????????????????cell??????????????????????????????
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
                        //????????????????????????????????????
                        if (progress == 2){  
                            if (prvItem!=null && newItem!=null){
                                this.checkCellItemEffect(cell,prvItem,newItem)
                            }
                             
                        }

                        //????????????????????????
                        if (progress == 3){ //??????????????????????????????3???????????????????????????????????????????????????                         
                            let centerCellElementEvtList = board[60].event_list
                            let last_evt = centerCellElementEvtList[centerCellElementEvtList.length-1]
                            this.checkBattersInCell(last_evt.progress, last_evt.step, cellElement.event_list, cell)
                        } else {
                            this.checkBattersInCell(progress, step, cellElement.event_list, cell)
                        }    
                    }
                    
                    // ?????????ID??????0 ?????? tick???0 ????????????????????????
                    let tick = cellElement.item_drop_ticks
                    let trigger = cellElement.item_drop_triggered
                    //??????????????????
                    if (trigger===1){
                        if (tick!==0){  //???????????????
                            if (!cell.hasFallDownSign()){ //???????????????????????????????????????
                                this.animation({json:"arrow-down_json",png:"arrow-down_png", data:"arrow-down",x:30, y:30}).then( animate=>{
                                    animate.play(-1);    
                                    cell.addChild(animate);
                                    cell.addFallDownSign(true)                                                 
                                })
                            }
                            // ????????????
                            this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale,"game.item.fall", [ItemUtils.getItemNameById(newItem.getId(),LocaleUtils.locale)] )) 
                        } else {  // ????????????
                            cell.removeChildren();  //????????????????????????????????????????????????????????????????????????????????????????????????
                        }  
             
                    }
                    if(tick == 0){
                        // ????????????????????????
                        newItem.x = 15
                        newItem.y = 15
                        await cell.addItem(newItem)
                        //????????????????????????????????????
                        //???????????????????????????
                        //1. ??????????????????????????????????????????????????????item_drop_triggered ???0???1
                        //2. item_drop_ticks??????
                        //3. item_drop_ticks=0????????????????????????????????????
                        // ??????item_drop_triggered???0???1?????????item_drop_ticks???????????????????????????0???????????????????????? Eos?????????-1???0?????????triggered????????????
                        
                        //console.log(trigger,prvItem, newItemId)
                        if (trigger == 1 && prvItem!==null && prvItem.getId() ===0 && (newItemId == 5 || newItemId == 8 || newItemId == 13)){                        
                            //????????????
                            newItem.y = -300
                            egret.Tween.get(newItem).to( {x:0, y:0}, 1500, egret.Ease.sineIn )
                                .wait(0).call( ()=>{   //?????????????????????????????????   
                                    //console.log("item_fall_mp3")                                                          
                                    this.actionSound(RES.getRes("item_fall_mp3").url)                                                             
                                });
                        }
                    } 
                         
                })
            }

            /**
             * ??????????????????????????????????????????????????????????????????????????????????????????????????????
             * @list: ???????????? 
             * 
             */
            private updatePlayerProfileInStage(list){
                if ( !this.gameContainer.contains(this.playerProfileListContainer)){
                    this.gameContainer.addChild(this.playerProfileListContainer)
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
                    } else {  // ????????????????????????0??????????????????
                         
                        profileBitMap.filters = [this.colorFlilter];
                    }                          
                })
                
            }
            
            /**
             * ?????????????????????????????????????????????????????????????????????
             * 
             */
            private async refreshHouse(id){         
                
                await ScatterUtils.getGameInfo(parseInt(id)).then( async game=>{
                   
                    // ????????????/??????????????????
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
                        //alert("???????????????")
                        this.currentHouse = null
                        this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.not.found"))
                        
                    }

                }).catch((e) => {
                    console.error(e);
                    //alert("????????????????????????")
                    this.currentHouse = null
                    this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.fetch.failure"))
                    
                }) 
                
                
            }


            /**
             * ????????????(??????) 
             * 
             */
            private joinGame(cell:Cell){

                ScatterUtils.getIdentity().then( identity=>{
                    if (identity==null){
                        //alert(ScatterUtils.message.authority)
                        this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.wallet.authority"))
                        return
                    }
                    /*
                    if (this.currentHouse==null){  // ?????????????????????????????????????????????join       
                        console.log("no house selected")
                        //alert("??????????????????????????????")
                        this.popMessageBox("????????????")
                        return
                    }
                    */
                    let cellXY = cell.getXY()
                    let position = cell.getPosition()
                    ScatterUtils.joinGame(this.currentHouse.getID(), this.currentHouse.getJoinEos(), cellXY.y, cellXY.x).then( transaction=>{
                        console.log("transaction", transaction)        
                        
                        if ( !transaction.processed ){  //????????????
                            transaction = JSON.parse(transaction)
                            //alert("??????????????????:"+transaction.error.details[0].message)
                            this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale,"game.message.join.failed",[transaction.error.details[0].message]))
                        } else {
                            //alert("???????????????")
                            this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.message.join.success"))
                            //??????????????????????????????
                            let tmpPlayer = new Player('jump_png', {})
                            this.board.putPlayer(tmpPlayer)
                            tmpPlayer.setPosition( new egret.Point(position.x, position.y - 300 ))
                            egret.Tween.get(tmpPlayer).to( position, 300, egret.Ease.sineIn )
                                .wait(0).call( ()=>{  //???????????????????????????????????????????????????                                
                                    this.actionSound(RES.getRes("player_fall_mp3").url)                                                             
                                });
                        }
                    }).catch((e) => {
                        console.error(e);
                        //alert("??????????????????:"+ e)
                        this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale,"game.message.join.failed",[e]))
                    })

                })                        
            }

            /**
             * ????????????api?????????????????? 
             * 
             */
            private async setMap(){
                 ScatterUtils.getIdentity().then( identity=>{
                    if (identity==null){
                        //alert(ScatterUtils.message.authority)
                        this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.wallet.authority"))
                        return
                    }

                    
                    ScatterUtils.setMap(this.currentHouse.getID()).then( result=>{           
                        console.log("result", result)
                        if (result.succ == 1){
                            //alert("???????????????????????????")       
                            this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.message.setmap.success"))         
                        } else {
                            //alert("???????????????????????????"+ result.errmsg)
                            //alert("????????????????????????")
                            this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.message.setmap.success"))
                        }
                        
                    })

                 })
                
            }

            /**
             * ????????????????????????????????????????????????????????????????????????????????????????????????
             * 
             */     
            private async move(cell:Cell){
                 ScatterUtils.getIdentity().then( identity=>{
                    if (identity==null){
                        //alert(ScatterUtils.message.authority)
                        this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.wallet.authority"))  
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
                            if ( !transaction.processed ){  //????????????
                                transaction = JSON.parse(transaction)
                                //alert("???????????????"+transaction.error.details[0].message)
                                //this.popMessageBox("???????????????"+transaction.error.details[0].message)  
                                this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.message.move.failed"))  
                                this.board.removeChild(arrow)
                            } else {                    
                                this.currentHouse.getPlayerByName(ScatterUtils.getCurrentAccountName()).then( currentPlayer =>{
                                    //console.log("currentPlayer", currentPlayer)
                                    if (currentPlayer!=null){ //??????????????????????????????????????????????????????????????????????????????
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
                                        
                                        currentPlayer.setMoveable(false) // ??????step??????????????????????????????
                                        this.checkMoveZone()
                                    // .wait(0).call(this.updatePlayersInBoard.bind(this,gameId))
                                    // .wait(0).call( ()=>{
                                    //      this.board.getCellByXY(moveX,moveY).then( async cell=>{
                                    //          this.checkCellItem(cell)
                                    //      })                                  
                                    // });       
                                    } else {  //??????????????????????????????????????????????????????????????????????????????
                                    //   this.updatePlayersInBoard(gameId).then( ()=>{
                                    //       this.checkCell(moveX,moveY)
                                    //  })
                                    }
                                })                                                                           
                            }
                        }).catch((e) => {
                            console.error(e);
                            //alert("????????????")
                            this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.message.move.failed"))
                            this.board.removeChild(arrow)
                        }) 
                    })
                 })
                
            }

            /**
             * ?????????????????????????????????
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
                                this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale,"game.message.can.move", [currentPlayer.getName()])) // "??????"+currentPlayer.getName()+"????????????")
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
             * ????????????????????????????????????????????????????????????
             * 
             */
            private async checkBattersInCell(progress, step, eventList, cell){
                let attact_evt = await eventList.filter(  event=>{  //?????????????????????????????????: ??????????????????progress???step????????????????????????????????????attack??????                      
                    return  (event.progress==progress && event.step==step && event.evt=="attack" )
                })
                console.log("attact_evt", attact_evt)
                if (attact_evt.length > 0){  //???????????????????????????????????????
                    //  this.board.getCellById(cellElement.cell_id).then( async cell=>{
                        let time = cell.getBattleTime()
                        let nowSeconds = new Date().getTime()
                        //console.log("time", nowSeconds - time)
                            if (nowSeconds - time >= 30000){  //??????????????????30?????????????????????????????????
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
             * Description: ?????????????????????????????????????????????????????????
             * @cell: ?????????Cell
             * @prvItem: Cell????????????item??????
             * @newItem: Cell?????????item??????
             */
            private async checkCellItemEffect(cell: Cell, prvItem: Item, newItem: Item){
               
                //let item = cell.getItem()
                //item.setPosition(new egret.Point(0, 0))

                if (prvItem.getId()==1 && newItem.getId()==0){  //????????????/??????
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
             * kick off ??????
             * 
             */
            private async kickOff(){
                ScatterUtils.getIdentity().then( identity=>{
                    if (identity==null){
                        //alert(ScatterUtils.message.authority)
                        this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.wallet.authority"))  
                        return
                    }
                    /*
                    if (!this.currentHouse){   // ?????????????????????????????????????????????join       
                        console.log("no house selected")
                        //alert("?????????Kick Off???????????????")
                        this.popMessageBox("????????????")
                        return
                    }
                    */
                    //let game_id = this.selectedHouse.getID()
                    ScatterUtils.kickOff(this.currentHouse.getID()).then( transaction=>{
                        console.log(transaction)
                        if ( !transaction.processed ){  //????????????
                            transaction = JSON.parse(transaction)
                            //alert("KickOff???????????????"+transaction.error.details[0].message)
                            this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale,"game.start.fail", [transaction.error.details[0].message]))
                        } else {
                            this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.start.success"))
                            let clock = this.currentHouse.getClock()
                            clock.start()
                        }
                    })
                })
                
            }

           

            private updateClockInStage(_clock:Clock){
                if (this.gameContainer.contains(this.clock)){
                    this.gameContainer.removeChild(this.clock)
                }
                this.clock = _clock
                this.clock.x = 50
                this.clock.y = 400
                this.clock.start()
                this.gameContainer.addChild(this.clock)
            }





            /**
             * ????????????
             * 
             */
            private async loginGame(){               

                 ScatterUtils.login().then( message=>{
                      
                    if (message.login){  //??????????????? ????????????/??????????????????
                        //alert("??????: "+ message.details)
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
                                    //alert("??????: "+ message.details)
                                    this.popMessageBox( LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale,"game.message.login.success", [message.account])  ) 
                                }, this, 8000)
                                             
                            })
                        //this.popMessageBox("??????: "+ message.details)
                        if (this.gameContainer.contains(this.login)) {
                            this.gameContainer.removeChild(this.login)
                        }
                        if (!this.gameContainer.contains(this.logout)) {
                            this.gameContainer.addChild(this.logout)
                        }

                    } else {
                        //alert(message.details)
                        if (message.code ==1){
                            this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.wallet.nowallet"))
                        } else if (message.code ==2){
                            this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale,"game.wallet.locked", [LocaleUtils.getLabelById(LocaleUtils.locale,"game.wallet.walletlock"), LocaleUtils.getLabelById(LocaleUtils.locale,"game.wallet.noidentity")]))
                        }
                        
                    }                 

                }).catch( e=>{
                    console.log("e",e)
                    //alert(e)
                    this.popMessageBox(e)
                })
            }    

            /**
             * ????????????
             * 
             */
             private async logoutGame(){

                 
                ScatterUtils.logout().then( message=>{
               //     ScatterUtils.getCurrentAccountName().then( name=>{
                        //alert(message.details)
                        
                    if (message.logout){
                        if (this.gameContainer.contains(this.logout)) {
                            this.gameContainer.removeChild(this.logout)
                        }
                        if (!this.gameContainer.contains(this.login)) {
                            this.gameContainer.addChild(this.login)
                        }
                        this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale,"game.message.logout.success", [message.account]))
                    }  else {
                        // logout fail
                    }
             //       })                                           
                }).catch( e=>{
                    console.log("e",e)
                    //alert(e)
                    this.popMessageBox(e)
                })
            } 

            /**
             * ????????????????????????
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
             * ??????????????????
             * 
             */
            private showPlayerInfo(target: Player){
                /*
                let life = target.getLife()
                let color

                if (life.remain >= life.full*0.6 ) {
                    color = 0x00EE00   // ??????????????? ??????
                } else if (life.remain >= life.full*0.4 && life.remain < life.full*0.6 ){
                    color = 0xFFFF00   // ??????????????? ??????
                } else {
                    color = 0xFF0000   // ??????????????? ??????
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
                this.player_name.text = "??????:" + target.getName()
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
                this.player_weapon.text = "??????: " + ItemUtils.getItemNameById(target.getWeapon(),LocaleUtils.locale)
                this.board.addChild(this.player_weapon);

                this.player_attack.x = this.playerInfo.x
                this.player_attack.y = this.playerInfo.y + 60
                this.player_attack.size = 18
                this.player_attack.textColor = 0x000000
                this.player_attack.text = "?????????: " + target.getAttack()
                this.board.addChild(this.player_attack);

                this.player_defense.x = this.playerInfo.x
                this.player_defense.y = this.playerInfo.y + 80
                this.player_defense.size = 18
                this.player_defense.textColor = 0x000000
                this.player_defense.text = "?????????: " + target.getDefense()
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
                        nameStr = nameStr + ItemUtils.getItemNameById(id,LocaleUtils.locale)+'\n         '
                    })
                    return nameStr
                }
                this.player_item.x = this.playerInfo.x
                this.player_item.y = this.playerInfo.y + 120
                this.player_item.size = 18
                this.player_item.textColor = 0x000000              
                this.player_item.text = "??????: " + items()
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
        //************************************************??????????????????????????????************************************************* */
        //******************************************************************************************************************* */
            
            /** 
             *  ???????????????/??????????????????
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
                    if (status && status == "completed"){  //?????????????????????????????????????????????1???
                        egret.Tween.get( playerBitmap ).to( recallPoint, 1000, egret.Ease.sineIn )
                    } else { //???????????????????????????????????????????????????0???
                        egret.Tween.get( playerBitmap ).to( recallPoint, 0, egret.Ease.sineIn )
                    }
                    player.setTask({action:"idle", target:null, status:null})
                }       
            }

            /** 
             *  ??????????????????????????????????????????
             *  ?????????@_action: ???????????? 
             */
            private initTask(_action:string){
                //this.canvas.addEventListener('mousemove',this.onMove.bind(this));
                if (this.selectedPlayer){
                    this.unmountMovement()
                    //??????json?????? {action:string, target:Object, status:string} - action: idle/enforce/attack, target:Town/Warrior, status: completed
                    this.selectedPlayer.setTask({action:_action,target:null,status:null})
                    setTimeout( ()=> {
                        this.mountMovement()
                    },300)
                
                } else {
                    console.log("no warrior selected")
                }
                
            }


            /** 
             *  ????????????????????????????????????
             *  ?????????@target: ?????????????????????
             */
            private showLife(container, target){
                let life = target.getLife()
                let color

                if (life.remain >= life.full*0.6 ) {
                    color = 0x00EE00   // ??????????????? ??????
                } else if (life.remain >= life.full*0.4 && life.remain < life.full*0.6 ){
                    color = 0xFFFF00   // ??????????????? ??????
                } else {
                    color = 0xFF0000   // ??????????????? ??????
                }
                this._life.graphics.clear()
                this._life.graphics.lineStyle(4, color);
                this._life.graphics.moveTo(target.getPosition().x, target.getPosition().y);
                this._life.graphics.lineTo(target.getPosition().x + life.remain, target.getPosition().y);
                container.addChild(this._life)
            }


            /** 
             *  ????????????????????????????????????????????????????????????
             *  ?????????@warrior: ?????????????????????
             */
            private selectSoulder(player: Player){
                this.board.setIndex(player, 1)
                //this.showPlayerInfo(player)
                this.actionSound(RES.getRes("yes_mp3").url)

                var text =  `??????: ${player.getName()}\n`
                            + `HP: ${player.getLife() }\n`
                            + `??????: ${ItemUtils.getItemNameById(player.getWeapon(),LocaleUtils.locale) }\n`
                            + `?????????: ${player.getAttack() }\n`
                            + `?????????: ${player.getDefense() }\n`
                            + `EOS: ${player.getGold() }\n\n`
                this.popMessageBox(text)            
                /*
                this.unmountMovement()
                //???????????????????????????????????????????????????
                let belonging = player.getHouse() == this.selectedHouse? true : false
                if (!belonging){
                    //???????????????????????????????????????????????????????????????
                    let task = player.getTask()
                    if (task.action =="enforce" && task.target == this.selectedHouse ){
                        belonging = true
                    }
                }
                if (belonging){  //???????????????????????????????????????????????????????????????????????????
                    this.selectedPlayer = player
                    // ??????????????????????????????
                    this.stage.setChildIndex(this.selectedPlayer.getBitmap(), 10)
                    //??????????????????
                    this.showLife(this.board, player)

                    //????????????????????????
                    this.actionSound(RES.getRes("ack_mp3").url)
                }  
                setTimeout( ()=> { //??????????????????
                        this.mountMovement()
                    },300)  
                    */  
            }

            /** 
             *  ?????????????????????
             *  ?????????@_url: ????????????
             */
            private actionSound(_url){
                let sound: egret.Sound = new egret.Sound()
                sound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
                    sound.play(0,1);
                }, this);
                sound.load(_url)
            }


            /** 
             *  ?????????????????????????????????
             *  ?????????@_url: ????????????
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
             *  ?????????????????????????????????????????????
             *  ?????????@evt: ?????????????????????????????????????????????
             */
            private movePlayer(evt:egret.TouchEvent){
                console.log("moving")
                // let warrior = this.selectedWarrior
                if (this.selectedPlayer == null || typeof(this.selectedPlayer)=="undefined"  ) {
                    return
                }

                if (this.stage.contains(this._life)){ //??????????????????????????????
                    this.stage.removeChild(this._life)
                }
                //?????????????????????
                let playerBitmap = this.selectedPlayer.getBitmap()
                egret.Tween.removeTweens(playerBitmap)
                //??????????????????/??????
                let startPoint = {x:playerBitmap.x, y:playerBitmap.y }
                let endPoint = {x:evt.stageX, y:evt.stageY }

                let action = this.selectedPlayer.getTask().action
                this.drawRoute(startPoint, endPoint, action)
                // ???????????????????????????offset = ????????????/2
                let playerOffsetPoint = {x:evt.stageX - 17, y:evt.stageY -25 }
                //???????????????3???
                egret.Tween.get( playerBitmap ).to( playerOffsetPoint, 3000, egret.Ease.sineIn ).wait(500).call(this.doAction.bind(this, this.selectedPlayer, action, playerOffsetPoint, endPoint)); 
                

            }

            private mountMovement(){
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.movePlayer, this)
            }

            private unmountMovement(){
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.movePlayer, this)
            }

            /** 
             *  ??????????????????????????????????????????
             *  ?????? @warrior: ????????????
             *       @action: ????????????
             *       @warriorOffsetPoint: ???????????????????????????
             *       @attackPoint:?????????
             */
            private doAction(player, action, playerOffsetPoint, attackPoint){
                //????????????????????????,??????????????????,??????this.flat, this.attack
                this.clearRoute(action)
                //?????????????????????????????????????????????????????????
                let actionObject = player.getTask().target
                let executable:boolean = ( actionObject==null || actionObject.getBitmap()==null )? false : actionObject.getBitmap().hitTestPoint( attackPoint.x, attackPoint.y,true );

                console.log("execute="+ executable)
                if (executable){
                    let _actionShow = this.createBitmapByName("sword_png")
                    _actionShow.x = playerOffsetPoint.x
                    _actionShow.y = playerOffsetPoint.y          
                    this.stage.addChild(_actionShow)
                    //??????????????????????????????????????????
                    if (action == "attack"){
                        this.attackTarget(playerOffsetPoint).then( ()=>{
                            //?????????????????????????????????????????????idle????????????????????????                                  
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

                } else { // ??????????????????????????????????????????????????????idle??????
                    player.setTask({action:"idle", target:null})
                }
            }

            /** 
             *  ???????????????????????????????????????
             *  ?????????@warriorOffsetPoint: ???????????????????????????
             *       @actionObject: ????????????
             */
            private attackTarget(playerOffsetPoint){
               /* 
                let _actionShow = this.createBitmapByName("sword_png")
                    _actionShow.x = playerOffsetPoint.x
                    _actionShow.y = playerOffsetPoint.y          
                    this.board.addChild(_actionShow)
                    */
                //????????????????????????
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

                //?????????????????????
               /* playersInCell.map(player=>{
                    let _life = player.getLife()
                    _life.remain = _life.remain - _life.full*0.2
                    player.setLife(_life)
                    this.showLife(this.board, player)

                }) */
                // ??????????????????????????????????????????20%
                
       //         if ( _life.remain <=0){ // ????????????0???????????????????????????           
       //             this.board.removePlayer(actionObject) 
                    /*
                    if (actionObject instanceof House){
                        //??????????????????????????????
                        let list = actionObject.getPlayerList()
                        list.map( async (player)=>{
                            this.stage.removeChild(player.getBitmap())
                            await this.removePlayerIcon(player)
                            this.refrashPlayerIcon()
                        })
                        
                    } else if (actionObject instanceof Player){
                        //????????????????????????????????????
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
                    //????????????
                    //let gold = actionObject.getGold()
                    //????????????????????????
                    let moneyFactory = new egret.MovieClipDataFactory(RES.getRes("money_json"),RES.getRes("money_png"));
                    let money:egret.MovieClip = new egret.MovieClip(moneyFactory.generateMovieClipData("money"));
                    // role.gotoAndPlay(1, 3);
                    money.x = playerOffsetPoint.x 
                    money.y = playerOffsetPoint.y - 30;
                    this.board.addChild(money); 
                    money.play(2)


                    // ????????????
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
             *  ????????????????????????????????????????????????????????????????????????????????????????????????
             *  ?????????@start: ???????????????
             *       @end: ???????????????
             *       @action: ??????
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
            
                // this.attack, this.enforce ???????????????????????????????????????????????????
                this[action].x = end.x - endOffsetX
                this[action].y = end.y - endOffsetY
                this.stage.addChild(this[action]);
            }

            /** 
             *  ??????????????????????????????????????????
             *  ?????????@action: ??????
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
             * ??????name?????????????????????Bitmap?????????name???????????????resources/resource.json????????????????????????
             * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
             */
            private createBitmapByName(name: string) {
                let result = new egret.Bitmap();
                let texture: egret.Texture = RES.getRes(name);
                result.texture = texture;
                return result;
            }

            private touchPoints:Object = {names:[]}; //{touchid:touch local,names:[ID1,ID2]};
            private distance:number = 0;

            private touchCon:number = 0;

            private mouseDown(evt:egret.TouchEvent)
            {

                if(this.touchPoints[evt.touchPointID]==null)
                {

                    this.touchPoints[evt.touchPointID] = new egret.Point(evt.stageX,evt.stageY);
                    this.touchPoints["names"].push(evt.touchPointID);
                }
                this.touchCon++;

                if(this.touchCon==2)
                {
                    this.distance = this.getTouchDistance();
                    
                }

            }

            private lastPositionX:number = 0;
            private lastPositionY:number = 0;
            private mouseMove(evt:egret.TouchEvent)
            {
                //egret.log("touch move:"+evt.touchPointID);
              
                if(this.touchCon==2)
                {

                    this.touchPoints[evt.touchPointID].x = evt.stageX;
                    this.touchPoints[evt.touchPointID].y = evt.stageY;
                    var newdistance = this.getTouchDistance();
                    this.gameContainer.scaleX = newdistance/this.distance;
                    this.gameContainer.scaleY = this.gameContainer.scaleX;
                } else if (this.mobile){
                    let _x = evt.stageX - this.touchPoints[evt.touchPointID].x 
                    let _y = evt.stageY - this.touchPoints[evt.touchPointID].y 

                    this.gameContainer.x =  _x + this.lastPositionX;
                    this.gameContainer.y =  _y + this.lastPositionY;
                }
            }

            private mouseUp(evt:egret.TouchEvent)
            {
 
                delete  this.touchPoints[evt.touchPointID];
                this.touchCon--;
                this.lastPositionX = this.gameContainer.x
                this.lastPositionY = this.gameContainer.y
                //
                this.width *= this.scaleX;
                this.height *= this.scaleY;
                this.scaleX = 1;
                this.scaleY = 1;
                this.anchorOffsetX = this.width/2;
                this.anchorOffsetY = this.height/2;

            }

            private getTouchDistance():number
            {
                var _distance:number = 0;
                var names = this.touchPoints["names"];
                _distance = egret.Point.distance( this.touchPoints[names[names.length-1]],
                    this.touchPoints[names[names.length-2]]);
                    //alert(_distance) 
                return _distance;
               
            }

            /** 
             *  ??????????????????
             */
            /*
            private mouseDown(evt:egret.TouchEvent)
            {
                this._touchStatus = true;
                this._distance.x = evt.stageX -  evt.target.x;
                this._distance.y = evt.stageY - evt.target.y;
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            */
            /** 
             *  ????????????
             */
            /*
            private mouseMove(evt:egret.TouchEvent)
            {
                if( this._touchStatus )
                {
                    try{ 
                        evt.target.x = evt.stageX - this._distance.x;
                        evt.target.y = evt.stageY - this._distance.y;
                    } catch (e){ //????????????????????????????????????????????????
                        console.log(e)
                    }
                
                }
            }
            */
            /** 
             *  ??????????????????
             */
            /*
            private mouseUp(evt:egret.TouchEvent)
            {
                this._touchStatus = false;
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            */
            /** 
             *  ??????????????????????????????????????????
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
             *  ?????????????????????????????????
             */
            private refrashPlayerIcon(){
                this.soilderIconList.map( (obj, idx)=>{
                    obj.icon.x = 110 + idx * 68
                })
            }

            /**
             * ?????????????????????????????????????????????
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

                    // ??????????????????
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