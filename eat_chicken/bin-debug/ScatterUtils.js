var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ScatterUtils = (function (_super) {
    __extends(ScatterUtils, _super);
    function ScatterUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * descrition: 获取Scatter钱包实例
     * return: 唯一实例化EOS
     */
    ScatterUtils.getEOS = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.eos == null) {
                    // 如果没用通过Scatter取得EOS实例，则使用EOS自己实例化。当没有Scatter的玩家可以通过该实例访问游戏信息
                    return [2 /*return*/, Eos(this.config)];
                }
                return [2 /*return*/, this.eos];
            });
        });
    };
    /**
     * descrition: 连接Scatter钱包，如果没有Scatter钱包，返回false
     * return: true-浏览器已安装Scatter钱包； false-浏览器没有安装Scatter钱包
     */
    ScatterUtils.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //ScatterJS.plugins( new ScatterEOS() );
                        _a = this;
                        return [4 /*yield*/, ScatterJS.scatter.connect('scatter')]; // param string can be any value
                    case 1:
                        //ScatterJS.plugins( new ScatterEOS() );
                        _a.connected = _b.sent(); // param string can be any value
                        return [2 /*return*/, this.connected];
                }
            });
        });
    };
    /**
     * descrition: 登陆Scatter钱包并获取身份
     *
     * return: 1) {login:true,  details:{name: "<EOS账户名>", authority: "active", blockchain: "eos"}
     *         2) {login:false, details:{type: "locked", message: "The user's Scatter is locked. They have been notified and should unlock before continuing." }
     *         3) {login:false, details:{type: "identity_rejected", message: "User rejected the provision of an Identity"} }
     *         4) {login:false, details:{type: "no_connection" , message:"No Scatter connected"} }
     */
    ScatterUtils.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var message, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        if (!this.connected) {
                            console.log('not connected');
                            return [2 /*return*/, { login: false, details: this.message.nowallet }];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, ScatterJS.scatter.getIdentity({ accounts: [this.network.EOS] }).then(function (identities) {
                                console.log("identities", identities, ScatterJS.scatter.identity);
                                _this.currentAccount = identities.accounts[0];
                                // **** 通过Scatter 建立Scatter-EOS实例
                                _this.eos = ScatterJS.scatter.eos(_this.network.EOS, Eos);
                                /*
                                const web3 = ScatterJS.scatter.eth( this.network.ETH, Web3 );
                
                                const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';
                                const fullNode = 'https://api.trongrid.io';
                                const solidityNode = 'https://api.trongrid.io';
                                const eventServer = 'https://api.trongrid.io/';
                                const tron = ScatterJS.scatter.trx(this.network.TRX, new TronWeb(fullNode, fullNode, eventServer));
                                */
                                //console.log("login success,", this.currentAccount)
                                return { login: true, details: _this.currentAccount.name };
                            })];
                    case 3:
                        message = _a.sent();
                        return [2 /*return*/, message];
                    case 4:
                        e_1 = _a.sent();
                        //console.log("login fail,", e)
                        //没有解锁或没有身份
                        return [2 /*return*/, { login: false, details: this.message.walletlock }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * descrition: 获取当前Scatter中EOS账户信息
     * return: Json格式返回当前Scatter中EOS账户信息
     */
    ScatterUtils.getAccountInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, account_info;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.eos == null)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getEOS()];
                    case 1:
                        _a.eos = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.eos.getAccount(this.currentAccount.name).then(function (data) {
                            console.log(data);
                            return data;
                        }).catch(function (e) {
                            //console.error(e);
                            return e;
                        })];
                    case 3:
                        account_info = _b.sent();
                        return [2 /*return*/, account_info];
                }
            });
        });
    };
    /**
     * descrition: 获取所有游戏信息
     * return: Json格式返回当前游戏信息
     */
    ScatterUtils.getAllGamesInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, games_info;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.eos == null)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getEOS()];
                    case 1:
                        _a.eos = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.eos.getTableRows({
                            json: true,
                            scope: "eat.chicken",
                            code: "eat.chicken",
                            table: "games"
                        }).then(function (data) {
                            console.log(data);
                            return data;
                        }).catch(function (e) {
                            //console.error(e);
                            return e;
                        })];
                    case 3:
                        games_info = _b.sent();
                        return [2 /*return*/, games_info];
                }
            });
        });
    };
    /**
     * descrition: 获取指定游戏信息
     * @param: id：游戏ID
     * return: Json格式返回指定游戏信息
     */
    ScatterUtils.getGameInfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, game_info;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.eos == null)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getEOS()];
                    case 1:
                        _a.eos = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.eos.getTableRows({
                            json: true,
                            scope: "eat.chicken",
                            code: "eat.chicken",
                            table: "games",
                            limit: 1,
                            lower_bound: id,
                            upper_bound: id + 1
                        }).then(function (data) {
                            //console.log(data) 
                            return data;
                        }).catch(function (e) {
                            //console.error(e);
                            return e;
                        })];
                    case 3:
                        game_info = _b.sent();
                        return [2 /*return*/, game_info];
                }
            });
        });
    };
    /**
     * descrition: 创建游戏
     * @param joinEOS: 创建游戏的EOS, 例如"1.0000 EOS"
     * return: 返回EOS 交易成功或失败信息
     */
    ScatterUtils.createGame = function (joinEOS) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.eos.transaction({
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
                                        to: 'eat.chicken',
                                        quantity: joinEOS,
                                        memo: ''
                                    }
                                }
                            ]
                        }).then(function (res) {
                            //console.log(res)   
                            return res;
                        }).catch(function (e) {
                            //console.error(e);
                            return e;
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * descrition: 加入游戏
     * @param  gameId: 游戏ID
     * @param  transferEOS: 加入游戏的EOS, 例如"1.0000 EOS"
     * @param  joinX: 加入游戏起始 X 位置
     * @param  joinY: 加入游戏起始 Y 位置
     * return:  返回EOS 交易成功或失败信息
     */
    ScatterUtils.joinGame = function (gameId, transferEOS, joinX, joinY) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.eos.transaction({
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
                                        to: 'eat.chicken',
                                        quantity: transferEOS,
                                        memo: gameId + ',' + joinX + ',' + joinY
                                    }
                                }
                            ]
                        }).then(function (res) {
                            console.log("res", res);
                            return res;
                        }).catch(function (e) {
                            //console.error(e);
                            return e;
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * descrition: 设置地图
     * @param  gameId: 游戏ID
     * return： 返回设置地图成功或失败信息
     */
    ScatterUtils.setMap = function (gameId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://114.115.135.201:52919/api?a=setmap&game_id=' + gameId, {
                            method: 'GET'
                            // body: JSON.stringify({category:[newCategory]})        
                        })
                            .then(function (response) {
                            return response.json();
                        })
                            .then(function (myJson) {
                            console.log(myJson);
                            return myJson;
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * descrition: 开始游戏
     * @param  gameId: 游戏ID
     * return： 返回EOS 交易成功或失败信息
     */
    ScatterUtils.kickOff = function (gameId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.eos.transaction({
                            actions: [
                                {
                                    account: 'eat.chicken',
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
                        }).then(function (res) {
                            //console.log("res", res)  
                            return res;
                        }).catch(function (e) {
                            //console.error("e",e);
                            return e;
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * descrition: 移动
     * @param  gameId: 游戏ID
     * @param  moveX: 移动到 X 位置
     * @param  moveY  移动到 Y 位置
     */
    ScatterUtils.move = function (gameId, moveX, moveY) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.eos.transaction({
                            actions: [
                                {
                                    account: 'eat.chicken',
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
                        }).then(function (res) {
                            //console.log("res", res)  
                            return res;
                        }).catch(function (e) {
                            //console.error("e",e);
                            return e;
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * descrition: 登出钱包(游戏)
     *
     */
    ScatterUtils.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //ScatterJS.scatter.forgetIdentity();
                try {
                    //ScatterJS.scatter.logout();
                    ScatterJS.scatter.forgetIdentity();
                    this.currentAccount = null;
                    this.eos = null;
                    return [2 /*return*/, { logout: true, details: this.message.logout }];
                }
                catch (e) {
                    console.log(e);
                    return [2 /*return*/, { logout: false, details: "登出失败" }];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * descrition: 获取当前钱包用户名
     *
     */
    ScatterUtils.getCurrentAccountName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.currentAccount != null) {
                    return [2 /*return*/, this.currentAccount.name];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    ScatterUtils.getIdentiy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ScatterJS.scatter.identity];
            });
        });
    };
    ScatterUtils.eos = null;
    ScatterUtils.connected = false;
    ScatterUtils.currentAccount = null;
    //public static identity = ScatterJS.scatter.identity
    ScatterUtils.message = {
        authority: "未授权用户，请先登录",
        walletlock: "钱包已上锁",
        identity: "钱包还没有身份",
        nowallet: "还没有安装钱包",
        login: "已登陆",
        logout: "已登出"
    };
    /**
     * descrition: 设置Scatter钱包 EO主链/测试链值
     */
    ScatterUtils.chain = {
        main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
        dev: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
    };
    /**
     * descrition: 设置Scatter钱包区块主链类型
     */
    ScatterUtils.Blockchains = {
        EOSIO: 'eos',
        Ethereum: 'eth',
        Tron: 'trx' // TRON
    };
    /**
     * descrition: 设置Scatter钱包连接参数
     */
    ScatterUtils.network = {
        EOS: {
            blockchain: 'eos',
            protocol: 'http',
            host: '114.115.135.201',
            port: 8888,
            chainId: ScatterUtils.chain.dev
        },
        ETH: {
            blockchain: 'eth',
            protocol: 'http',
            host: '114.115.135.201',
            port: 8888,
            chainId: ScatterUtils.chain.dev
        },
        TRX: {
            blockchain: 'trx',
            protocol: 'http',
            host: '114.115.135.201',
            port: 8888,
            chainId: ScatterUtils.chain.dev
        }
    };
    /**
     * descrition: EOS实例化配置
     */
    ScatterUtils.config = {
        keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
            '5KRF8dr2fvHx9dVQyBqWwYhs7KvT8UdCb8Fy6hpWqHp6yZ1K6T3' // player1, player2
        ],
        httpEndpoint: 'http://114.115.135.201:8888',
        chainId: ScatterUtils.chain.dev,
        expireInSeconds: 60,
        broadcast: true,
        debug: false,
        sign: true
    };
    return ScatterUtils;
}(Object));
__reflect(ScatterUtils.prototype, "ScatterUtils");
//# sourceMappingURL=ScatterUtils.js.map