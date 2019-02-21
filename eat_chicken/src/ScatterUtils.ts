class ScatterUtils extends Object {

    private static eos = null
    private static connected:boolean = false;
    private static currentAccount = null;
    //public static identity = ScatterJS.scatter.identity

    public static message = {
        authority:"未授权用户，请先登录",
        walletlock: "钱包已上锁",
        noidentity: "未验证钱包身份",
        nowallet: "亲，还没有装钱包哟",
        login: "已登陆游戏",
        logout: "已登出游戏"
    }    
    /**
     * descrition: 设置Scatter钱包 EO主链/测试链值
     */
    private static chain = {
        main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
        jungle: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473', // jungle testnet
        dev: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
    }

    /**
     * descrition: 设置Scatter钱包区块主链类型
     */
    private static Blockchains = {
        EOSIO:'eos',     // EOS
        Ethereum:'eth',  // Ethereum
        Tron:'trx'       // TRON
    };

    private static contact = {
        jungle: 'eat1chicken2'
    }

    /**
     * descrition: 设置Scatter钱包连接参数
     */
    private static network =  {
        EOS:{
            blockchain:'eos',
            protocol:'http',
            //host:'jungle2.cryptolions.io',
            host:'121.168.149.101',
            //port:443,
            port:8888,
            chainId: ScatterUtils.chain.jungle 
        },
        ETH:{
            blockchain:'eth',
            protocol:'http',
            host:'114.115.135.201',
            port:8888,
            chainId: ScatterUtils.chain.dev
        },
        TRX:{
            blockchain:'trx',
            protocol:'http',
            host:'114.115.135.201',
            port:8888,
            chainId: ScatterUtils.chain.dev
        }
            
    };

    /**
     * descrition: EOS实例化配置
     */
    private static config = {
        keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3', // eosio
                    '5KRF8dr2fvHx9dVQyBqWwYhs7KvT8UdCb8Fy6hpWqHp6yZ1K6T3' // player1, player2
                    ], // 配置私钥字符串
       // httpEndpoint: 'http://114.115.135.201:8888', // EOS开发链url与端口
       // httpEndpoint: 'https://jungle2.cryptolions.io:443',
        httpEndpoint: 'http://121.168.149.101:8888',
        //chainId: ScatterUtils.chain.dev, // 通过cleos get info可以获取chainId
        chainId: ScatterUtils.chain.jungle,
        expireInSeconds: 60,
        broadcast: true,
        debug: false,
        sign: true
    }    

    /**
     * descrition: 获取Scatter钱包实例
     * return: 唯一实例化EOS 
     */
    private static async getEOS(){
        if (this.eos == null){
            // 如果没用通过Scatter取得EOS实例，则使用EOS自己实例化。当没有Scatter的玩家可以通过该实例访问游戏信息
            return Eos(this.config)
        }
        return this.eos
    }
    
    /**
     * descrition: 连接Scatter钱包，如果没有Scatter钱包，返回false
     * return: true-浏览器已安装Scatter钱包； false-浏览器没有安装Scatter钱包 
     */
    public static async connect(){
        //ScatterJS.plugins( new ScatterEOS() );

        this.connected = await ScatterJS.scatter.connect('scatter')  // param string can be any value
        
        return this.connected
    } 

    /**
     * descrition: 登陆Scatter钱包并获取身份
     * 
     * return: 1) {login:true,  details:{name: "<EOS账户名>", authority: "active", blockchain: "eos"} 
     *         2) {login:false, details:{type: "locked", message: "The user's Scatter is locked. They have been notified and should unlock before continuing." }
     *         3) {login:false, details:{type: "identity_rejected", message: "User rejected the provision of an Identity"} }
     *         4) {login:false, details:{type: "no_connection" , message:"No Scatter connected"} }
     */
    public static async login(){
        
        await this.connect();
        if (!this.connected) {
            console.log('not connected');
            return { login:false, details : this.message.nowallet }  
        }
        try {
            //*** 验证Scatter钱包身份，如果Scatter没有解锁 或者 没有身份 则抛Excetion */
            //console.log("start identify")
            let message = await ScatterJS.scatter.getIdentity({accounts:[this.network.EOS]}).then( identities =>{
                console.log("identities", identities, ScatterJS.scatter.identity)
                this.currentAccount = identities.accounts[0];           
                
            // **** 通过Scatter 建立Scatter-EOS实例
                this.eos = ScatterJS.scatter.eos(this.network.EOS, Eos);
                /*
                const web3 = ScatterJS.scatter.eth( this.network.ETH, Web3 );

                const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';
                const fullNode = 'https://api.trongrid.io';
                const solidityNode = 'https://api.trongrid.io';
                const eventServer = 'https://api.trongrid.io/';
                const tron = ScatterJS.scatter.trx(this.network.TRX, new TronWeb(fullNode, fullNode, eventServer));
                */
                //console.log("login success,", this.currentAccount)

                return { login:true, details :this.currentAccount.name }
            })
            return message
              
        } catch (e) {           
            //console.log("login fail,", e)
            //没有解锁或没有身份
            return { login:false, details : "未能使用钱包，可能是"+this.message.walletlock+"或者"+this.message.noidentity }  
        }
    }

    /**
     * descrition: 获取当前Scatter中EOS账户信息
     * return: Json格式返回当前Scatter中EOS账户信息
     */
    public static async getAccountInfo(){
        if (this.eos == null) {
            this.eos = await this.getEOS()
        }

        let account_info = await this.eos.getAccount(this.currentAccount.name).then((data) => {
            console.log(data) 
            return data   
        }).catch((e) => {
            //console.error(e);
            return e
        }) 
        return account_info
    }

    /**
     * descrition: 获取所有游戏信息
     * return: Json格式返回当前游戏信息
     */
    public static async getAllGamesInfo(){
        if (this.eos == null) {
            this.eos = await this.getEOS()
        }

        let games_info = await this.eos.getTableRows(
            {
                json: true,
                scope: this.contact.jungle,
                code: this.contact.jungle,
                table: "games"
            }
        ).then((data) => {
            console.log(data) 
           return data
        }).catch((e) => {
            //console.error(e);
            return e
        }) 
        return games_info
    }

    /**
     * descrition: 获取指定游戏信息
     * @param: id：游戏ID
     * return: Json格式返回指定游戏信息
     */
    public static async getGameInfo(id:number){
        if (this.eos == null) {
            this.eos = await this.getEOS()
        }

        let game_info = await this.eos.getTableRows(
            {
                json: true,
                    scope: this.contact.jungle,
                    code: this.contact.jungle,
                    table: "games",
                    limit:1,
                    lower_bound: id,
                    upper_bound: id + 1
            }
        ).then((data) => {
            //console.log(data) 
            return data
        }).catch((e) => {
            //console.error(e);
            return e
        }) 
        return game_info;
    }

    /**
     * descrition: 创建游戏
     * @param joinEOS: 创建游戏的EOS, 例如"1.0000 EOS"
     * return: 返回EOS 交易成功或失败信息
     */
    public static async createGame(joinEOS: string){
       
        let result = await this.eos.transaction(
            {
                actions: [
                    {
                        account: 'eosio.token',
                        name: 'transfer',
                        authorization: [{
                            actor: this.currentAccount.name,
                            permission: 'active'
                        }],
                        data: {
                            from: this.currentAccount.name,
                            to: this.contact.jungle,
                            quantity: joinEOS,
                            memo: ''
                        }
                    }
                ]
            }
        ).then((res) => {
            //console.log(res)   
            return res          
        }).catch((e) => {
            //console.error(e);
            return e
        })
        return result;
    }

    /**
     * descrition: 加入游戏
     * @param  gameId: 游戏ID
     * @param  transferEOS: 加入游戏的EOS, 例如"1.0000 EOS"
     * @param  joinX: 加入游戏起始 X 位置
     * @param  joinY: 加入游戏起始 Y 位置
     * return:  返回EOS 交易成功或失败信息
     */
    public static async joinGame(gameId: number, transferEOS: string, joinX:number, joinY:number){
        
        let result = await this.eos.transaction(
            {
                actions: [
                    {
                        account: 'eosio.token',
                        name: 'transfer',
                        authorization: [{
                            actor: this.currentAccount.name,
                            permission: 'active'
                        }],
                        data: {
                            from: this.currentAccount.name,
                            to: this.contact.jungle,
                            quantity: transferEOS,
                            memo: gameId + ',' + joinX + ',' + joinY
                        }
                    }
                ]
            }
        ).then((res) => {
            console.log("res", res)  
            return res             
        }).catch((e) => {
            //console.error(e);
            return e
        })
        return result
    }

    /**
     * descrition: 设置地图
     * @param  gameId: 游戏ID
     * return： 返回设置地图成功或失败信息
     */
    static async setMap(gameId: number){
       let result = await fetch('http://114.115.135.201:52919/api?a=setmap&game_id='+gameId, {
                    method: 'GET'
               // body: JSON.stringify({category:[newCategory]})        
             })
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson)
                return myJson
            })
        return result
    }

    /**
     * descrition: 开始游戏
     * @param  gameId: 游戏ID
     * return： 返回EOS 交易成功或失败信息
     */
    public static async kickOff(gameId: number){
        
        let result = await this.eos.transaction(
            {
                actions: [
                    {
                        account: this.contact.jungle,
                        name: 'kickoff',
                        authorization: [{
                            actor: this.currentAccount.name,
                            permission: 'active'
                        }],
                        data: {
                            who: this.currentAccount.name,
                            game_id: gameId
                        }
                    }
                ]
            }
        ).then((res) => {
            //console.log("res", res)  
            return res             
        }).catch((e) => {
            //console.error("e",e);
            return e
        })
        return result
    }

    /**
     * descrition: 移动
     * @param  gameId: 游戏ID
     * @param  moveX: 移动到 X 位置
     * @param  moveY  移动到 Y 位置
     */
    public static async move(gameId: number, moveX:number, moveY:number){
        
        let result = await this.eos.transaction(
            {
                actions: [
                    {
                        account: this.contact.jungle,
                        name: 'move',
                        authorization: [{
                            actor: this.currentAccount.name,
                            permission: 'active'
                        }],
                        data: {
                            who: this.currentAccount.name,
                            game_id: gameId,
                            row: moveX,
                            column: moveY
                        }
                    }
                ]
            }
        ).then((res) => {
            //console.log("res", res)  
            return res             
        }).catch((e) => {
            //console.error("e",e);
            return e
        })
        return result
    }

    /**
     * descrition: 登出钱包(游戏)
     * 
     */
    public static async logout(){
        //ScatterJS.scatter.forgetIdentity();
        try{
            //ScatterJS.scatter.logout();
            let _currentAccountName = this.currentAccount.name
            ScatterJS.scatter.forgetIdentity();
            this.currentAccount = null;
            this.eos = null;
            return {logout:true, details: _currentAccountName + this.message.logout}
        } catch (e){
            console.log(e)
            return {logout:false, details: "登出失败"}
        }
        

    }

    /**
     * descrition: 获取当前钱包用户名
     * 
     */
    public static getCurrentAccountName(){
        if (this.currentAccount != null) {
            return this.currentAccount.name;
        }else {
            return null;
        }
       
    }

    /**
     * descrition: 获取当前钱包用户身份，用于判断登录状态
     * 
     */
    public static async getIdentity(){
        return ScatterJS.scatter.identity
    }

    public static async nowseconds(){
        let result = await fetch('http://114.115.135.201:52920/api/?a=now', {
                    method: 'GET'
               // body: JSON.stringify({category:[newCategory]})        
             })
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                return myJson
            })
        return result
    }

}