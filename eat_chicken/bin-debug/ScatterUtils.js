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
     * descrition: ??????Scatter????????????
     * return: ???????????????EOS
     */
    ScatterUtils.getEOS = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.eos == null) {
                    // ??????????????????Scatter??????EOS??????????????????EOS???????????????????????????Scatter????????????????????????????????????????????????
                    return [2 /*return*/, Eos(this.config)];
                }
                return [2 /*return*/, this.eos];
            });
        });
    };
    /**
     * descrition: ??????Scatter?????????????????????Scatter???????????????false
     * return: true-??????????????????Scatter????????? false-?????????????????????Scatter??????
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
     * descrition: ??????Scatter?????????????????????
     *
     * return: 1) {login:true,  details:{name: "<EOS?????????>", authority: "active", blockchain: "eos"}
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
                            return [2 /*return*/, { login: false, code: 1 }];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, ScatterJS.scatter.getIdentity({ accounts: [this.network.EOS] }).then(function (identities) {
                                console.log("identities", identities, ScatterJS.scatter.identity);
                                _this.currentAccount = identities.accounts[0];
                                // **** ??????Scatter ??????Scatter-EOS??????
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
                                return { login: true, account: _this.currentAccount.name }; // login success
                            })];
                    case 3:
                        message = _a.sent();
                        return [2 /*return*/, message];
                    case 4:
                        e_1 = _a.sent();
                        //console.log("login fail,", e)
                        //???????????????????????????
                        return [2 /*return*/, { login: false, code: 2 }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * descrition: ????????????Scatter???EOS????????????
     * return: Json??????????????????Scatter???EOS????????????
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
     * descrition: ????????????????????????
     * return: Json??????????????????????????????
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
                            scope: this.contact.jungle,
                            code: this.contact.jungle,
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
     * descrition: ????????????????????????
     * @param: id?????????ID
     * return: Json??????????????????????????????
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
                            scope: this.contact.jungle,
                            code: this.contact.jungle,
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
     * descrition: ????????????
     * @param joinEOS: ???????????????EOS, ??????"1.0000 EOS"
     * return: ??????EOS ???????????????????????????
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
                                        to: this.contact.jungle,
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
     * descrition: ????????????
     * @param  gameId: ??????ID
     * @param  transferEOS: ???????????????EOS, ??????"1.0000 EOS"
     * @param  joinX: ?????????????????? X ??????
     * @param  joinY: ?????????????????? Y ??????
     * return:  ??????EOS ???????????????????????????
     */
    ScatterUtils.joinGame = function (gameId, transferEOS, joinRow, joinCol) {
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
                                        to: this.contact.jungle,
                                        quantity: transferEOS,
                                        memo: gameId + ',' + joinRow + ',' + joinCol
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
     * descrition: ????????????
     * @param  gameId: ??????ID
     * return??? ???????????????????????????????????????
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
     * descrition: ????????????
     * @param  gameId: ??????ID
     * return??? ??????EOS ???????????????????????????
     */
    ScatterUtils.kickOff = function (gameId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.eos.transaction({
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
     * descrition: ??????
     * @param  gameId: ??????ID
     * @param  moveX: ????????? X ??????
     * @param  moveY  ????????? Y ??????
     */
    ScatterUtils.move = function (gameId, moveRow, moveCol) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.eos.transaction({
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
                                        row: moveRow,
                                        column: moveCol
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
     * descrition: ????????????(??????)
     *
     */
    ScatterUtils.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _currentAccountName;
            return __generator(this, function (_a) {
                _currentAccountName = this.currentAccount.name;
                try {
                    //ScatterJS.scatter.logout();            
                    ScatterJS.scatter.forgetIdentity();
                    this.currentAccount = null;
                    this.eos = null;
                    return [2 /*return*/, { logout: true, account: _currentAccountName }];
                }
                catch (e) {
                    console.log(e);
                    return [2 /*return*/, { logout: false, account: _currentAccountName }];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * descrition: ???????????????????????????
     *
     */
    ScatterUtils.getCurrentAccountName = function () {
        if (this.currentAccount != null) {
            return this.currentAccount.name;
        }
        else {
            return null;
        }
    };
    /**
     * descrition: ?????????????????????????????????????????????????????????
     *
     */
    ScatterUtils.getIdentity = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ScatterJS.scatter.identity];
            });
        });
    };
    ScatterUtils.nowseconds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://114.115.135.201:52920/api/?a=now', {
                            method: 'GET'
                            // body: JSON.stringify({category:[newCategory]})        
                        })
                            .then(function (response) {
                            return response.json();
                        })
                            .then(function (myJson) {
                            return myJson;
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ScatterUtils.eos = null;
    ScatterUtils.connected = false;
    ScatterUtils.currentAccount = null;
    //public static identity = ScatterJS.scatter.identity
    ScatterUtils.message = {
        authority: "??????????????????????????????",
        walletlock: "???????????????",
        noidentity: "?????????????????????",
        nowallet: "???????????????????????????",
        login: "???????????????",
        logout: "???????????????"
    };
    /**
     * descrition: ??????Scatter?????? EO??????/????????????
     */
    ScatterUtils.chain = {
        main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        jungle: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
        dev: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
    };
    /**
     * descrition: ??????Scatter????????????????????????
     */
    ScatterUtils.Blockchains = {
        EOSIO: 'eos',
        Ethereum: 'eth',
        Tron: 'trx' // TRON
    };
    ScatterUtils.contact = {
        jungle: 'eat1chicken2'
    };
    /**
     * descrition: ??????Scatter??????????????????
     */
    ScatterUtils.network = {
        EOS: {
            blockchain: 'eos',
            protocol: 'https',
            //host:'jungle2.cryptolions.io',
            host: 'eos-jungle.eosblocksmith.io',
            port: 443,
            //port:8888,
            chainId: ScatterUtils.chain.jungle
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
     * descrition: EOS???????????????
     */
    ScatterUtils.config = {
        keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
            '5KRF8dr2fvHx9dVQyBqWwYhs7KvT8UdCb8Fy6hpWqHp6yZ1K6T3' // player1, player2
        ],
        // httpEndpoint: 'http://114.115.135.201:8888', // EOS?????????url?????????
        // httpEndpoint: 'https://jungle2.cryptolions.io:443',
        httpEndpoint: 'https://eos-jungle.eosblocksmith.io:443',
        //chainId: ScatterUtils.chain.dev, // ??????cleos get info????????????chainId
        chainId: ScatterUtils.chain.jungle,
        expireInSeconds: 60,
        broadcast: true,
        debug: false,
        sign: true
    };
    return ScatterUtils;
}(Object));
__reflect(ScatterUtils.prototype, "ScatterUtils");
//# sourceMappingURL=ScatterUtils.js.map