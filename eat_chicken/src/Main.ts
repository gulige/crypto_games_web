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

            private gameContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private _touchStatus:boolean = false;              //???????????????????????????????????????true
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

            //private houseList:Array<House> = []
            private eos_one:Array<any> = []
            private eos_three:Array<any> = []
            private eos_five:Array<any> = []
            private board: Board = null;

            private login:egret.Bitmap;
            private logout:egret.Bitmap;

            
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

            private messageContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private messageBox:egret.Shape = new egret.Shape();            
            private message:egret.TextField = new egret.TextField();
            private messageTitle = new egret.TextField();

            private descriptionContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private descriptionBox:egret.Shape = new egret.Shape();            
            private description:egret.TextField = new egret.TextField();
            private descriptionTitle = new egret.TextField();

            private canvas;
            //??????????????????
            private townRandomName = ["johny", "kitty", "peter"]
            private num = 0

            private oneEosContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private threeEosContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
            private fiveEosContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()

            private messageTimeout = null;
            //PC ?????? ????????????
            private mobile:boolean = false;  //if mobile device

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

                
              //  var image = new eui.Image();
              //  image.source = "resource/assets/west.jpg";
               // this.addChild(image);
               // image.x = 100;
               // image.y = 100;
                this.createGameScene()
/*
                let self:GameList=this;
                let url: string = "resource/assets/west.jpg";
                let urlLoader: egret.URLLoader = new egret.URLLoader();
                urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
                //load complete
                urlLoader.addEventListener(egret.Event.COMPLETE, async function (event: egret.Event) {   
                    var loader:egret.URLLoader = <egret.URLLoader>event.target;       
                    var texture:egret.Texture = <egret.Texture>urlLoader.data;
                    self.addChild(new egret.Bitmap(texture))
                    
                    self.createGameScene()

                }, url);
                //this.createGameScene()
                urlLoader.load(new egret.URLRequest(url));
*/
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
                 await this.loadResource()

                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);

                this.stage.addChild(this.gameContainer)
            // let canvas=document.getElementsByTagName("CANVAS")[0];
                //console.log(canvas)
                //****** ??????????????????????????????????????????????????? ******

                //???????????????????????????????????????   
                 // 1 EOS game list          
                let createGameFlat_1eos = this.createBitmapByName("EOS_1_png");
                this.gameContainer.addChild(createGameFlat_1eos);
                createGameFlat_1eos.width = 100;
                createGameFlat_1eos.height = 100;
                createGameFlat_1eos.x=15
                createGameFlat_1eos.y=70
                createGameFlat_1eos.touchEnabled = true;
                createGameFlat_1eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createGame.bind(this,"1.0000"),this)
                //????????????game list
                let progress_all_1eos:egret.Shape = new egret.Shape(); 
                progress_all_1eos.graphics.beginFill(0x00EE00);
                progress_all_1eos.graphics.lineStyle(2, 0x000000);
                progress_all_1eos.graphics.drawRoundRect(15, 180, 100, 30, 15,15);
                progress_all_1eos.graphics.endFill();
                progress_all_1eos.touchEnabled = true;
                progress_all_1eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.filterAndUpdateGameList.bind(this, 1, -1, "game_png", this.oneEosContainer),this)
                this.gameContainer.addChild(progress_all_1eos);
                let progress_all_1eos_text:egret.TextField = new egret.TextField(); 
                progress_all_1eos_text.x = 35
                progress_all_1eos_text.y = 185
                progress_all_1eos_text.size = 18
                progress_all_1eos_text.textColor = 0x000000   
                progress_all_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all")            
                this.gameContainer.addChild(progress_all_1eos_text);
                //?????????1 game list (?????????)
                let progress_1_1eos:egret.Shape = new egret.Shape(); 
                progress_1_1eos.graphics.beginFill(0x00EE00);
                progress_1_1eos.graphics.lineStyle(2, 0x000000);
                progress_1_1eos.graphics.drawRoundRect(15, 220, 100, 30, 15,15);
                progress_1_1eos.graphics.endFill();
                progress_1_1eos.touchEnabled = true;
                progress_1_1eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.filterAndUpdateGameList.bind(this, 1, 1, "game_png", this.oneEosContainer),this)
                this.gameContainer.addChild(progress_1_1eos);
                let progress_1_1eos_text:egret.TextField = new egret.TextField(); 
                progress_1_1eos_text.x = 18
                progress_1_1eos_text.y = 225
                progress_1_1eos_text.size = 18
                progress_1_1eos_text.textColor = 0x000000   
                progress_1_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable")             
                this.gameContainer.addChild(progress_1_1eos_text);
                //?????????2 game list (???????????????)
                let progress_2_1eos:egret.Shape = new egret.Shape(); 
                progress_2_1eos.graphics.beginFill(0xFFFF00);
                progress_2_1eos.graphics.lineStyle(2, 0x000000);
                progress_2_1eos.graphics.drawRoundRect(15, 260, 100, 30, 15,15);
                progress_2_1eos.graphics.endFill();
                progress_2_1eos.touchEnabled = true;
                progress_2_1eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.filterAndUpdateGameList.bind(this, 1, 2, "game_png", this.oneEosContainer),this)
                this.gameContainer.addChild(progress_2_1eos);        
                let progress_2_1eos_text:egret.TextField = new egret.TextField(); 
                progress_2_1eos_text.x = 18
                progress_2_1eos_text.y = 265
                progress_2_1eos_text.size = 18
                progress_2_1eos_text.textColor = 0x000000   
                progress_2_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing")            
                this.gameContainer.addChild(progress_2_1eos_text);
                //------------
                // 3 EOS game list
                let createGameFlat_3eos = this.createBitmapByName("EOS_3_png");
                this.gameContainer.addChild(createGameFlat_3eos);
                createGameFlat_3eos.width = 100;
                createGameFlat_3eos.height = 100;
                createGameFlat_3eos.x=15
                createGameFlat_3eos.y=390
                createGameFlat_3eos.touchEnabled = true;
                createGameFlat_3eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createGame.bind(this,"3.0000"),this)
                //????????????game list
                let progress_all_3eos:egret.Shape = new egret.Shape(); 
                progress_all_3eos.graphics.beginFill(0x00EE00);
                progress_all_3eos.graphics.lineStyle(2, 0x000000);
                progress_all_3eos.graphics.drawRoundRect(15, 500, 100, 30, 15,15);
                progress_all_3eos.graphics.endFill();
                progress_all_3eos.touchEnabled = true;
                progress_all_3eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.filterAndUpdateGameList.bind(this, 3, -1, "game_1_png", this.threeEosContainer),this)
                this.gameContainer.addChild(progress_all_3eos);
                let progress_all_3eos_text:egret.TextField = new egret.TextField(); 
                progress_all_3eos_text.x = 35
                progress_all_3eos_text.y = 505
                progress_all_3eos_text.size = 18
                progress_all_3eos_text.textColor = 0x000000   
                progress_all_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all")             
                this.gameContainer.addChild(progress_all_3eos_text);
                //?????????1 game list (?????????)
                let progress_1_3eos:egret.Shape = new egret.Shape(); 
                progress_1_3eos.graphics.beginFill(0x00EE00);
                progress_1_3eos.graphics.lineStyle(2, 0x000000);
                progress_1_3eos.graphics.drawRoundRect(15, 540, 100, 30, 15,15);
                progress_1_3eos.graphics.endFill();
                progress_1_3eos.touchEnabled = true;
                progress_1_3eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.filterAndUpdateGameList.bind(this, 3, 1, "game_1_png", this.threeEosContainer),this)
                this.gameContainer.addChild(progress_1_3eos);
                let progress_1_3eos_text:egret.TextField = new egret.TextField(); 
                progress_1_3eos_text.x = 18
                progress_1_3eos_text.y = 545
                progress_1_3eos_text.size = 18
                progress_1_3eos_text.textColor = 0x000000   
                progress_1_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable")              
                this.gameContainer.addChild(progress_1_3eos_text);
                //?????????2 game list (???????????????)
                let progress_2_3eos:egret.Shape = new egret.Shape(); 
                progress_2_3eos.graphics.beginFill(0xFFFF00);
                progress_2_3eos.graphics.lineStyle(2, 0x000000);
                progress_2_3eos.graphics.drawRoundRect(15, 580, 100, 30, 15,15);
                progress_2_3eos.graphics.endFill();
                progress_2_3eos.touchEnabled = true;
                progress_2_3eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.filterAndUpdateGameList.bind(this, 3, 2, "game_1_png", this.threeEosContainer),this)
                this.gameContainer.addChild(progress_2_3eos);        
                let progress_2_3eos_text:egret.TextField = new egret.TextField(); 
                progress_2_3eos_text.x = 18
                progress_2_3eos_text.y = 585
                progress_2_3eos_text.size = 18
                progress_2_3eos_text.textColor = 0x000000   
                progress_2_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing")           
                this.gameContainer.addChild(progress_2_3eos_text);
                //------------
                 // 5 EOS game list
                let createGameFlat_5eos = this.createBitmapByName("EOS_5_png");
                this.gameContainer.addChild(createGameFlat_5eos);
                createGameFlat_5eos.width = 100;
                createGameFlat_5eos.height = 100;
                createGameFlat_5eos.x=15
                createGameFlat_5eos.y=700
                createGameFlat_5eos.touchEnabled = true;
                createGameFlat_5eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.createGame.bind(this,"5.0000"),this)
                //????????????game list
                let progress_all_5eos:egret.Shape = new egret.Shape(); 
                progress_all_5eos.graphics.beginFill(0x00EE00);
                progress_all_5eos.graphics.lineStyle(2, 0x000000);
                progress_all_5eos.graphics.drawRoundRect(15, 810, 100, 30, 15,15);
                progress_all_5eos.graphics.endFill();
                progress_all_5eos.touchEnabled = true;
                progress_all_5eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.filterAndUpdateGameList.bind(this, 5, -1, "game_2_png", this.fiveEosContainer),this)
                this.gameContainer.addChild(progress_all_5eos);
                let progress_all_5eos_text:egret.TextField = new egret.TextField(); 
                progress_all_5eos_text.x = 35
                progress_all_5eos_text.y = 815
                progress_all_5eos_text.size = 18
                progress_all_5eos_text.textColor = 0x000000   
                progress_all_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all")             
                this.gameContainer.addChild(progress_all_5eos_text);
                //?????????1 game list (?????????)
                let progress_1_5eos:egret.Shape = new egret.Shape(); 
                progress_1_5eos.graphics.beginFill(0x00EE00);
                progress_1_5eos.graphics.lineStyle(2, 0x000000);
                progress_1_5eos.graphics.drawRoundRect(15, 850, 100, 30, 15,15);
                progress_1_5eos.graphics.endFill();
                progress_1_5eos.touchEnabled = true;
                progress_1_5eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.filterAndUpdateGameList.bind(this, 5, 1, "game_2_png", this.fiveEosContainer),this)
                this.gameContainer.addChild(progress_1_5eos);
                let progress_1_5eos_text:egret.TextField = new egret.TextField(); 
                progress_1_5eos_text.x = 18
                progress_1_5eos_text.y = 855
                progress_1_5eos_text.size = 18
                progress_1_5eos_text.textColor = 0x000000   
                progress_1_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable")             
                this.gameContainer.addChild(progress_1_5eos_text);
                //?????????2 game list (???????????????)
                let progress_2_5eos:egret.Shape = new egret.Shape(); 
                progress_2_5eos.graphics.beginFill(0xFFFF00);
                progress_2_5eos.graphics.lineStyle(2, 0x000000);
                progress_2_5eos.graphics.drawRoundRect(15, 890, 100, 30, 15,15);
                progress_2_5eos.graphics.endFill();
                progress_2_5eos.touchEnabled = true;
                progress_2_5eos.addEventListener(egret.TouchEvent.TOUCH_TAP,this.filterAndUpdateGameList.bind(this, 5, 2, "game_2_png", this.fiveEosContainer),this)
                this.gameContainer.addChild(progress_2_5eos);        
                let progress_2_5eos_text:egret.TextField = new egret.TextField(); 
                progress_2_5eos_text.x = 18
                progress_2_5eos_text.y = 895
                progress_2_5eos_text.size = 18
                progress_2_5eos_text.textColor = 0x000000   
                progress_2_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing")            
                this.gameContainer.addChild(progress_2_5eos_text);

                
                //******??????/????????????******
                this.login = this.createBitmapByName("login_png");           
                this.login.x=1180
                this.login.y=10
                this.login.touchEnabled = true;
                this.login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginGame ,this) 
             
                this.logout = this.createBitmapByName("logout_png");     
                this.logout.x=1180
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


                // ***????????????????????????***
                this.messageContainer.x = 600
                this.messageContainer.y = 200
                this.messageContainer.width = 350
                this.messageContainer.height = 250
                //this.stage.addChild(this.messageContainer)
                this.messageBox.graphics.clear()
                this.messageBox.graphics.beginFill(0xF7CDA4,0.8);
                this.messageBox.graphics.lineStyle(2, 0x000000, 0.5);
                this.messageBox.graphics.drawRoundRect(0, 0, 350, 250, 15,15);
                this.messageBox.graphics.endFill();
                this.messageContainer.addChild(this.messageBox);

                var messageTitleBox = new egret.Shape();
                messageTitleBox.graphics.beginFill(0x4F4F4F,0.8);
                messageTitleBox.graphics.drawRoundRect(0, 0, 350, 30, 15,15);
                this.messageContainer.addChild(messageTitleBox);
                
                this.messageTitle.x = 145
                this.messageTitle.y = 3
                this.messageTitle.size = 20
                this.messageTitle.textColor = 0xFFFFFF
                this.messageTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.notice.bar.title")
                this.messageContainer.addChild(this.messageTitle);

                this.message.x = 10
                this.message.y = 35
                this.message.width = 330
                this.message.height = 200
                this.message.size = 20
                this.message.textColor = 0x000000                  
                this.message.$setWordWrap(true)
                this.message.$setMultiline(true)
                this.messageContainer.addChild(this.message);
                // ***********
                
                //????????????button
                let description = this.createBitmapByName("description_png");
                this.gameContainer.addChild(description);
                description.x=1310
                description.y=10
                description.width = 110
                description.touchEnabled = true;
                description.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                    this.gameContainer.addChild(this.descriptionContainer)
                },this)

                let descriptionTitle = new egret.TextField();
                descriptionTitle.x =1315
                descriptionTitle.y = 25
                descriptionTitle.size = 20
                descriptionTitle.textColor = 0x1C1C1C
                descriptionTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale,"hall.game.desc.caption")
                this.gameContainer.addChild(descriptionTitle); 

                // ***??????????????? ??????/??????***
                let localeContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
                localeContainer.x = 1435
                localeContainer.y = 13
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
                    staticLabelI18N()
                   
                 } ,this)
                 //****************


                // ***????????????***
                this.descriptionContainer.x = 350
                this.descriptionContainer.y = 60
                this.descriptionContainer.width = 800
                this.descriptionContainer.height = 1000
               // this.stage.addChild(this.descriptionContainer)
                this.descriptionBox.graphics.clear()
                this.descriptionBox.graphics.beginFill(0xF7CDA4,0.8);
                this.descriptionBox.graphics.lineStyle(2, 0x000000, 0.8);
                this.descriptionBox.graphics.drawRoundRect(0, 0, 800, 1000, 15,15);
                this.descriptionBox.graphics.endFill();
                this.descriptionContainer.addChild(this.descriptionBox);              

                var descriptioTitleBox = new egret.Shape();
                descriptioTitleBox.graphics.beginFill(0x4F4F4F,0.8);
                descriptioTitleBox.graphics.drawRoundRect(0, 0, 800, 30, 15,15);
                this.descriptionContainer.addChild(descriptioTitleBox);
                
                this.descriptionTitle.x = 350
                this.descriptionTitle.y = 5
                this.descriptionTitle.size = 20
                this.descriptionTitle.textColor = 0xFFFFFF
                this.descriptionTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.desc.caption")
                this.descriptionContainer.addChild(this.descriptionTitle);
                
                let descriptionClose = this.createBitmapByName("close_png");
                this.descriptionContainer.addChild(descriptionClose);
                descriptionClose.x=770
                descriptionClose.y=0
                descriptionClose.touchEnabled = true;
                descriptionClose.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                    this.gameContainer.removeChild(this.descriptionContainer)
                },this)

                this.description.x = 10
                this.description.y = 35
                this.description.width = 780
                this.description.height = 980
                this.description.size = 22
                this.description.textColor = 0x000000                  
                this.description.$setWordWrap(true)
                this.description.$setMultiline(true)
                this.description.textFlow  = new egret.HtmlTextParser().parser(LocaleUtils.getLabelById(LocaleUtils.locale,"hall.game.desc") )

                    /*
                    `?????????????????????\n\n`
                                        + `1. ????????????????????????????????????????????????scatter???????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `2. ???????????????????????????????????????????????????????????????\n\n`
                                        + `3. ??????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `4. ??????????????????????????????????????????????????????????????????????????????scatter?????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `5. ?????????????????????????????????2??????2????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `6. ????????????30?????????????????????????????????????????????????????????????????????30??????????????????????????????????????????30????????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `7. ???????????????????????????3?????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `8. ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `9. ??????????????????????????????????????????30????????????????????????????????????????????????\n\n`
                                        + `10. ?????????????????????????????????????????????????????????????????????EOS??????????????????????????????????????????????????????????????????\n\n`
                                        + `11. ??????????????????????????????????????????????????????????????????EOS?????????????????????????????????\n\n`
                                        + `12. ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? \n\n`
                                        + `???????????????scatter??????????????????????????????\n`
                                        + `1. <a href = 'https://get-scatter.com'><u>https://get-scatter.com</u></a> \n`
                                        + `2. <a href = 'https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle'><u>https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle </u></a>`
                )
                
                this.description.text = `?????????????????????\n\n`
                                        + `1. ????????????????????????????????????????????????scatter???????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `2. ???????????????????????????????????????????????????????????????\n\n`
                                        + `3. ??????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `4. ??????????????????????????????????????????????????????????????????????????????scatter?????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `5. ?????????????????????????????????2??????2????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `6. ????????????30?????????????????????????????????????????????????????????????????????30??????????????????????????????????????????30????????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `7. ???????????????????????????3?????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `8. ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\n`
                                        + `9. ??????????????????????????????????????????30????????????????????????????????????????????????\n\n`
                                        + `10. ?????????????????????????????????????????????????????????????????????EOS??????????????????????????????????????????????????????????????????\n\n`
                                        + `11. ??????????????????????????????????????????????????????????????????EOS?????????????????????????????????\n\n`
                                        + `12. ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? \n\n`
                                        + `???????????????scatter??????????????????????????????\n`
                                        + `1. https://get-scatter.com \n`
                                        + `2. https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle`
                */                        
                this.description.scrollV = 0                     
                this.descriptionContainer.addChild(this.description);

                //????????????????????????????????????
                this.oneEosContainer.x = 180
                this.oneEosContainer.y = 70
                this.gameContainer.addChild(this.oneEosContainer)

                this.threeEosContainer.x = 180
                this.threeEosContainer.y = 390
                this.gameContainer.addChild(this.threeEosContainer)

                this.fiveEosContainer.x = 180
                this.fiveEosContainer.y = 700
                this.gameContainer.addChild(this.fiveEosContainer)


                //this.stage.addChild(this.textfield)
                //this.popMessageBox()
                if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                    this.mobile = true
                }
                
                //??????????????????????????????????????????
                this.refreshHouseList()
                // ?????????????????????????????????5??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                //egret.setInterval(()=>{                  
                //    this.refreshHouseList()                                        
                //}, this, 5000)  //???5????????????????????????????????????????????????

                //this.stage.y=150
                let staticLabelI18N = () =>{
                    this.description.textFlow  = new egret.HtmlTextParser().parser(LocaleUtils.getLabelById(LocaleUtils.locale,"hall.game.desc") )
                    this.descriptionTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.desc.caption")
                    this.messageTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.notice.bar.title")
                    descriptionTitle.text = LocaleUtils.getLabelById(LocaleUtils.locale,"hall.game.desc.caption")
                    progress_all_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all")
                    progress_all_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all")
                    progress_all_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.all")
                    progress_1_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable") 
                    progress_1_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable") 
                    progress_1_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.joinable") 
                    progress_2_1eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing") 
                    progress_2_3eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing") 
                    progress_2_5eos_text.text = LocaleUtils.getLabelById(LocaleUtils.locale, "hall.game.status.ongoing") 
                    this.updateGameList(this.eos_one.slice(0,7), "game_png", this.oneEosContainer, this.eos_one, 0)
                    this.updateGameList(this.eos_three.slice(0,7), "game_1_png", this.threeEosContainer, this.eos_three, 0)
                    this.updateGameList(this.eos_five.slice(0,7), "game_2_png", this.fiveEosContainer, this.eos_five, 0)
                }
            }
            

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
                   this.gameContainer.removeChild(this.messageContainer)
                },this, 4000)
                this.gameContainer.addChild(this.messageContainer)
                this.message.text = msgText
            }

            
            
            /**
             * ???????????????????????????????????? 
             * 
             */
            private async refreshHouseList(){
                
                // 
              /*  ScatterUtils.nowseconds(0).then( result=>{
                    console.log("nowseconds", result)

                }) */
                await ScatterUtils.getAllGamesInfo().then( async games=>{
                    //????????????????????????
                   /* await this.houseList.map( house=>{
                        if (this.stage.contains(house)){
                            this.stage.removeChild(house);
                            house.destroy()
                            house=null
                        }
                        
                    }) */
                    this.eos_one, this.eos_three, this.eos_five = []
                    
                    // ????????????????????????
                    console.log(games)
                    if (games.rows){

                        this.eos_one = await games.rows.filter( gameJson=>{
                            return gameJson.join_eos == "1.0000 EOS"
                        })
                        this.eos_three = await games.rows.filter( gameJson=>{
                            return gameJson.join_eos == "3.0000 EOS"
                        })
                        this.eos_five = await games.rows.filter( gameJson=>{
                            return gameJson.join_eos == "5.0000 EOS"
                        })
                        this.updateGameList(this.eos_one.slice(0,7), "game_png", this.oneEosContainer, this.eos_one, 0)
                        this.updateGameList(this.eos_three.slice(0,7), "game_1_png", this.threeEosContainer, this.eos_three, 0)
                        this.updateGameList(this.eos_five.slice(0,7), "game_2_png", this.fiveEosContainer, this.eos_five, 0)
                        /*
                        await eos_one.map( (gameJson,idx)=>{
                            //console.log(gameJson)
                            this.createHouse({name:"johny", bitmap:"game_png"},gameJson).then( house=>{
                               // console.log(house)
                                house.setPosition(new egret.Point(170*(1+idx),50))
                                this.stage.addChild(house)
                                this.houseList.push(house)
                            })
                        })
                        */
                    }else {
                        //alert("???????????????")
                        this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.not.found"))
                    }

                }).catch((e) => {
                    console.error(e);
                    //alert("????????????????????????")
                    this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.fetch.failure"))
                }) 
                
                
            }

            private async filterAndUpdateGameList(eos, progress, cardType, container:egret.DisplayObjectContainer){

                let list:Array<any> = []
                switch (eos) {
                    case 1:
                        list = this.eos_one
                        break;
                    case 3:   
                        list = this.eos_three
                        break;
                    case 5:   
                        list = this.eos_five
                        break;       
                    default:
                        
                }
                if (list.length > 0){
                    let gameList;
                    if (progress < 0){ //??????
                        gameList = list
                    } else {  //??????????????????
                        gameList = await list.filter( game=>{
                        return game.game_progress == progress
                    })
                    }
                    
                    this.updateGameList(gameList.slice(0,7),cardType, container, gameList, 0)
                }
            }

            private updateGameList(array, cardType,container:egret.DisplayObjectContainer, fullArray, currentIdx:number){
                container.removeChildren()
                array.map( (gameJson,idx)=>{
                    //console.log(gameJson)
                    this.createHouse({name:"johny", bitmap:cardType},gameJson).then( house=>{
                        house.setPosition(new egret.Point(180*idx,0))
                        container.addChild(house)
                        let progress
                        let color
                        switch (gameJson.game_progress) {
                            case 0:
                                progress = LocaleUtils.getLabelById(LocaleUtils.locale,"hall.game.status.notstart") //"???????????????"
                                color = 0x00EE00
                                break;
                            case 1:   
                                progress = LocaleUtils.getLabelById(LocaleUtils.locale,"hall.game.status.joinable") //"???????????????"
                                color = 0x00EE00
                                break;
                            case 2:   
                                progress = LocaleUtils.getLabelById(LocaleUtils.locale,"hall.game.status.ongoing") //"???????????????"
                                color = 0xFFFF00
                                break; 
                            case 3:   
                                progress = LocaleUtils.getLabelById(LocaleUtils.locale,"hall.game.status.over") //"???????????????"
                                color = 0xFF0000
                                break;       
                            default:
                                progress = LocaleUtils.getLabelById(LocaleUtils.locale,"hall.game.status.notstart") //"???????????????"
                        }

                        let detailBox:egret.Shape = new egret.Shape(); 
                        detailBox.graphics.beginFill(color);
                        detailBox.graphics.lineStyle(2, 0x000000, 0.5);
                        detailBox.graphics.drawRoundRect(180*idx, 215, 150, 40, 15,15);
                        detailBox.graphics.endFill();
                        container.addChild(detailBox);
                        let message:egret.TextField = new egret.TextField(); 
                        message.x = 180*idx
                        message.y = 216
                        message.size = 18
                        message.textColor = 0x000000   
                        message.text = ` ${LocaleUtils.getLabelById(LocaleUtils.locale,"hall.game.room.num")}${gameJson.game_id + 1}   ${LocaleUtils.getLabelById(LocaleUtils.locale,"game.player")} ${gameJson.players.length}\n`   
                                        + ` ${LocaleUtils.getLabelById(LocaleUtils.locale,"hall.game.status")} ${progress}`          
                        container.addChild(message);
                    })
                })

                let count = 0
                fullArray.map( (el, idx)=>{                          
                    if ( fullArray.length > 7 && idx%7 == 0){
                        let seqBox:egret.Shape = new egret.Shape(); 
                        let fillColor = (idx == currentIdx)? 0xFA8258 : 0xFFFFFF 
                        seqBox.graphics.beginFill(fillColor);
                        seqBox.graphics.lineStyle(1, 0x000000, 0.5);
                        seqBox.graphics.drawRect(50*count, 260, 30, 30);
                        seqBox.graphics.endFill();
                        container.addChild(seqBox);
                        seqBox.touchEnabled = true;
                        seqBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateGameList.bind(this,fullArray.slice(idx,idx+7),cardType,container, fullArray, idx), this);
                        let seq:egret.TextField = new egret.TextField(); 
                        seq.x = count < 10? 50*count+10:50*count+5;
                        seq.y = 268;
                        seq.size = 18;
                        seq.textColor = 0x000000;
                        count++; 
                        seq.text = count.toString();                                                 
                        container.addChild(seq);
                    }
                })
            }

            
            /**
             * ???????????????????????? 
             * 
             */
            private createGame(game_eos:string){
                ScatterUtils.getIdentity().then( identity=>{
                    if (identity==null){
                        //alert(ScatterUtils.message.authority)
                        this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"game.wallet.authority"))
                        return
                    }

                    ScatterUtils.createGame(game_eos+" EOS").then( transaction=>{
                        console.log("create", transaction)

                        // ???????????????????????? 
                        if (transaction.processed){
                            this.refreshHouseList()
                //     } else if(transaction.login == "failed"){

                        } else {
                            transaction = JSON.parse(transaction)
                            //alert("??????????????????:"+transaction.error.details[0].message)
                            this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale,"hall.notice.failed.create",[transaction.error.details[0].message]))
                        }    
                        
                    }).catch((e) => {
                        console.log(e);
                        //alert("??????????????????")
                        this.popMessageBox(LocaleUtils.getLabelById(LocaleUtils.locale,"hall.notice.cancel.create"))
                    })

                })                                                          
            }

            

            /** 
             *  ????????????????????????????????????????????????????????????
             *  ?????????@param: ????????????????????????????????? ?????????{name:?????????, bitmap:?????????}
             *       @game: ?????????????????????????????? ??????game_id???join_eos????????????????????????????????????
             */
            private async createHouse(param, gameJson) {
                //????????????????????????????????????
                //param.name = this.townRandomName[this.num]
                //this.num = this.num < 2? this.num+1 : this.num-1

            // this.unmountMovement()        
                let house = new House(param, gameJson)
                //let houseBitMap = house.getBitmap()
                //this.stage.addChild(houseBitMap); 
                //this.selectedHouse = house
                // ???????????????????????????????????????????????????
                house.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{  
                    let gameId = house.getID()
                    document.location.href = 'game.html?id='+ gameId
                    /*
                        if(this.selectedHouse == house){
                            // ?????????????????????house, ?????????????????????
                            //return
                        }
                        this.selectedHouse = house
                        console.log("this.selectedHouse", this.selectedHouse)
                        this.showLife(this.stage, house)
                        this.showText(gameJson.game_id+"??????:"+(gameJson.game_progress==2?"?????????":"?????????"), {x: house.x, y: house.y+80 } )
                        this.initBoard().then( ()=>{  //?????????????????????????????????????????????????????????????????? 
                            this.updateObjectsInBoard(house).then( ()=>{
                                this.updateClockInStage(house.getClock())
                            })
                        })
                    */
                    
                }, this)

                // ????????????????????????
            // houseBitMap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
            // houseBitMap.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);

                return house
            // let result = await ScatterUtils.createGame("1.0000 EOS")
            // console.log("create", result)
            }

         


            /**
             * ????????????
             * 
             */
            private async loginGame(){

                ScatterUtils.login().then( message=>{
                      
                    if (message.login){  //??????????????? ????????????/??????????????????
                        //alert("??????: "+ message.details)
                        //this.popMessageBox("??????: "+ message.details)
                        if (this.gameContainer.contains(this.login)) {
                            this.gameContainer.removeChild(this.login)
                        }
                        if (!this.gameContainer.contains(this.logout)) {
                            this.gameContainer.addChild(this.logout)
                        }
                        this.popMessageBox( LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale,"game.message.login.success", [message.account])  ) 
                    } else {
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
                        //this.popMessageBox(message.details)
                    if (message.logout){
                        if (this.gameContainer.contains(this.logout)) {
                            this.gameContainer.removeChild(this.logout)
                        }
                        if (!this.gameContainer.contains(this.login)) {
                            this.gameContainer.addChild(this.login)
                        }
                        this.popMessageBox(LocaleUtils.getLabelByIdAndValue(LocaleUtils.locale,"game.message.logout.success", [message.account]))
                    } else {
                        // logout fail
                    }
                    
             //       })                                           
                }).catch( e=>{
                    console.log("e",e)
                    this.popMessageBox(e)
                })
            } 


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

            private showText(_text:string, position:any){
                this.textfield.x = position.x
                this.textfield.y = position.y
                this.textfield.size = 22
                this.textfield.textColor = 0x000000
                this.textfield.text = _text
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
                let fightFactory = new egret.MovieClipDataFactory(RES.getRes("fight_json"),RES.getRes("fight_png"));
                let fighting:egret.MovieClip = new egret.MovieClip(fightFactory.generateMovieClipData("fight"));
                // role.gotoAndPlay(1, 3);
                fighting.x = playerOffsetPoint.x;
                fighting.y = playerOffsetPoint.y;
                fighting.width = 50;
                fighting.height = 50;
                this.board.addChild(fighting); 
                fighting.play(20)

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
                    }, 1000);
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

            /** 
             *  ??????????????????
             */
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