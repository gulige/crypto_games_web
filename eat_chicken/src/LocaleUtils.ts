class LocaleUtils extends egret.HashObject {

    public static locale:string = "zh_CN"; 

    private static items = {
        zh_CN:
        {
            'locale': '中文',
            'hall.login': '登录',
            'hall.logout': '登出',
            'hall.login.success': '欢迎：{1}',
            'hall.logout.success': '{1}已登出游戏',
            'hall.game.desc.caption': ' 游戏说明',
            'hall.notice.bar.title': '通告栏',
            'hall.notice.failed.create': '创建游戏失败:{1}',
            'hall.notice.cancel.create': '取消创建游戏',
            'hall.game.status.all': ' 全部 ',
            'hall.game.status.notstart': '游戏未开始',
            'hall.game.status.joinable': '游戏可加入',
            'hall.game.status.ongoing': '游戏进行中',
            'hall.game.status.over': '游戏已结束',
            'hall.game.room.num': '房号',
            'hall.game.status': '状态:',
            'game.statistic.bar.title' : '统计栏',
            'game.message.bar.title' : '消息栏',
            'game.grid.bar.title' : '格子栏',
            'game.statistic.total.players': '总玩家数:',
            'game.statistic.total.eos': '总EOS数:',
            'game.statistic.survive.players': '生存玩家:',
            'game.message.setmap.success': '棋盘地图设定成功',
            'game.message.can.move': '玩家{1}可以移动',
            'game.message.move.failed': '移动失败',
            'game.message.logout.success': '{1}已登出游戏',
            'game.message.login.success': '欢迎：{1}',
            'game.message.join.success': '加入游戏！',
            'game.message.join.failed':"加入游戏失败:{1}",
            'game.start': '开始游戏',
            'game.start.success': '游戏启动成功！',
            'game.start.fail': '游戏启动失败:{1}',
            'game.honor.bulletin': '荣誉榜',
            'game.honor.winner': '本局赢家：',
            'game.honor.killer': '最佳杀手：',
            'game.honor.eos.winner' : '最多EOS赢家：',
            'game.not.found': '无游戏信息',
            'game.player': '玩家:',
            'game.weapon': '武器:', 
            'game.force': '攻击力:',  
            'game.defence': '防御力:', 
            'game.item': '物品:', 
            'game.fetch.failure':'获取游戏信息失败',
            'game.wallet.nowallet': '亲，还没有装钱包哟',
            'game.wallet.locked': '未能使用钱包，可能是{1}或者{2}',
            'game.wallet.authority':"未授权用户，请先登录",
            'game.wallet.walletlock': "钱包已上锁",
            'game.wallet.noidentity': "未验证钱包身份", 
            'game.item.fall': '{1}即将降落',       
            'hall.game.desc': '游戏规则说明：\n1. 进入游戏大厅，点击左上角按钮弹出scatter界面，确认后创建新的一局游戏，新局将出现在游戏大厅中，新局的创建者叫局主；\n2. 在游戏大厅中点击新建的游戏，进入游戏界面；\n3. 游戏的局主点击左列中间按钮随机出该局的地图道具分布；\n4. 之后，其他玩家可以选择地图上的某个格子位置，点击弹出scatter界面，确认后加入游戏，玩家的角色将空降到该地图格子中；\n5. 局主可以在参与人数达到2人或2人以上的情况下，随时点击左列“开始游戏”按钮来开局（在设置地图道具后半小时内未开局的情况下系统将自动关闭游戏）；\n6. 游戏将以30秒间隔的时间节奏来推进游戏，所有参与玩家可以在30秒内移动一步（或原地不动），30秒后游戏将做出一轮判决，直到判决出游戏的最终胜利者结束；\n7. 地图上有毒气圈，每3分钟向内扩大一圈，凡是处于毒气圈内的玩家将会受到伤害；\n8. 地图上分布有各类道具，玩家移动进入地图格子时，可以立即拾取枪械或防具，或触发地图事件（如武器空投）；\n9. 当同一格子内有多名玩家时，每30秒一轮的判决将会让玩家相互攻击；\n10. 当有一半玩家阵亡时，地图上将会在某个格子上空投EOS（空投发生时，该格子上的玩家将被全部杀死）；\n11. 击杀其他玩家，可获得被击杀玩家身上一定比例的EOS，以及额外的击杀奖励；\n12. 击杀数最高的玩家，将会获得“杀手”的奖励，游戏的最后一名玩家，将会获得“胜利者”的奖励\n另外，关于scatter钱包的设置，请参考：\n1. https://get-scatter.com\n2. https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle'
        },
        en_US:
        {
            'locale': 'ENG',
            'hall.login': 'Login',
            'hall.logout': 'Logout',
            'hall.login.success': 'Welcome：{1}',
            'hall.logout.success': '{1} has logged out of the game',
            'hall.game.desc.caption': 'Instructions',
            'hall.notice.bar.title': 'Notice',
            'hall.notice.cancel.create': 'Cancelled creating a game',
            'hall.game.status.all': '   All ',
            'hall.game.status.notstart': 'Not Start',
            'hall.game.status.joinable': '  Joinable',
            'hall.game.status.ongoing': '  Ongoing',
            'hall.game.status.over': 'GameOver',
            'hall.game.room.num': 'Rm.',
            'hall.game.status': 'Status:',
            'game.statistic.bar.title' : 'Statistics',
            'game.message.bar.title' : 'Message',
            'game.grid.bar.title' : 'Grids',
            'game.statistic.total.players': 'Total players:',
            'game.statistic.total.eos': 'Total EOS:',
            'game.statistic.survive.players': 'Total survival players:',
            'game.message.setmap.success': 'The board map is set successfully',
            'game.message.can.move': 'Player {1} can move',
            'game.message.move.failed': 'Fail to move',
            'game.message.logout.success': '{1} has logged out of the game',
            'game.message.login.success': 'Welcome: {1}',
            'game.message.join.success': 'Joined the game!',
            'game.message.join.failed':"Joined the game failed:{1}",
            'game.start': 'Game Kick Off',
            'game.start.success': 'The game started successfully!',
            'game.start.fail': 'The game started failed:{1}',
            'game.honor.bulletin': 'Honor',
            'game.honor.winner': 'Winner:',
            'game.honor.killer': 'Best killer:',
            'game.honor.eos.winner' : 'EOS winners:',
            'game.not.found': 'Game not found',
            'game.player': 'Player:',
            'game.weapon': 'Weapon:', 
            'game.force': 'Force:',  
            'game.defence': 'Defence:', 
            'game.item': 'Items:', 
            'game.fetch.failure':'Fail to get game',
            'game.wallet.nowallet': 'Scatter wallet has not been installed',
            'game.wallet.locked': 'Cannot use wallet，probably {1} or {2}',
            'game.wallet.authority':"Unauthenticated user, please login first",
            'game.wallet.walletlock': "Scatter is locked",
            'game.wallet.noidentity': "Scatter unidentified",
            'game.item.fall': '{1} will fall', 
            'hall.game.desc': "Game rules description:\n1. Enter the game lobby, click the button in the upper left corner to pop up the scatter interface, confirm to create a new game, the new game will appear in the game hall, the creator of the new game is called the game host;\n2. Click on the newly created game in the game lobby to enter the game;\n3. The game host clicks on the middle button in the left column to randomly distribute the map props of the game;\n4. After that, other players can select a grid position on the map. Click to pop up the scatter interface, confirm and join the game, the player's character will be airborne to the map grid;\n5. The host can click the 'Kickoff' button to start the game at any time in the case of 2 or more participants (the system will automatically close the game if it is not kicked off within half an hour after setting the game map);\n6. The system will advance the game at a time interval of 30 seconds, and all participating players can move one step in 30 seconds (Or not moving), after 30 seconds, the game will make a round of judgment until the final winner of the game is judged;\n7. There is a poisonous air circle on the map, which expands inward every 3 minutes. All players in the poisonous gas circle will be hurt;\n8. There are various kinds of props on the map. When the player moves into one map grid, he can immediately pick up firearms or armor, or trigger map events (such as weapon airdrops) in the grid;\n9. When there are multiple players in the same grid, a round of judgment every 30 seconds will force players to attack each other;\n10. When half of the players are killed, the system will cast EOS on a map grid (When airdrop occurs, players on the grid will be killed all the time);\n11. Killing other players will get a certain percentage of EOS on the slain, as well as additional killing rewards;\n12. Kill the highest number of players, will get the 'killer' reward, the last player of the game, will receive the 'winner' reward\nIn addition, regarding the setting of the scatter wallet, please refer to:\n1. https://get-scatter. Com\n2. https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle"
        
        }
             

        
    }

    public static getLabelById(locale:string, id: string) {
        let label = this.items[locale][id]
        console.log(label)
        return label
    }

    public static getLabelByIdAndValue(locale:string, id: string, array:Array<any>) {
        let label = this.items[locale][id]
        
        array.map( (a,i)=>{
            //i++
            label = label.replace(/\{.\}/, a)
        })
        return label
    }

}