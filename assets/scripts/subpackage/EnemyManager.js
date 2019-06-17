// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var peopleNumber = require("peopleNumber");
var EnemyLevel = cc.Enum({
    lv_simple:1,
    lv_medium:2,
    lv_difficulty:3,
});

cc.Class({
    extends: cc.Component,

    properties: {
        trigger:{
            default:null,
            type:require("EnemyTrigger"),
        },
        enemyexp:{
            default:null,
            type:cc.Sprite,
        },
        enemylv:{
            default:null,
            type:cc.Label,
        },
        enemyname:{
            default:null,
            type:cc.Label,
        },
        enemyhp: {
            default: null,
            type: cc.ProgressBar,
        },
        lvUp: {
            default: null,
            type: cc.Node,
        },
        mubei:{
            default:null,
            type:cc.Prefab,
        },
        tip_prefab:{
            default:null,
            type:cc.Prefab,
        },
        tip2_prefab:{
            default:null,
            type:cc.Prefab,
        },
        gemPrefab:{
            default:[],
            type:cc.Prefab,
        },
        ItemPrefab:{
            default:[],
            type:cc.Prefab,
        },
        gameuuid: "",
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getPhysicsManager().enabled = true;
        this.ismove = false;

        //定义玩家信息
        this.curhp = 3;
        this.maxhp = 3;
        this.lv = 1;
        this.exp = 0;
        this.skillNum =0;
        this.speed=100,
        this.isDun = false;//是否有护盾
        this.is_chidu = false;//是否吃毒
        this.isattack = false;
        this.time = 3;
        this.killername = null;//杀我的人
        this.killsnumber = 0;//杀敌数
        this.killsuuid = null;
         

        this.enemylv.string = this.lv;
        this.enemyexp.fillRange =0;
        this.enemyhp.progress = this.curhp/this.maxhp;

        this.player = this.node.getChildByName("playerImg");
        this.NodePool = cc.find("Canvas/GameController").getComponent("GameItemManager");
        this.enemyPool = cc.find("Canvas/EnemyController").getComponent("EnemyController");
        this.map =  cc.find("Canvas/bg001");
        this.hero = cc.find("Canvas/player").getComponent("Player");
    },

    start () {
        
    },
    init(number){
        //机器人难度
        this.level = number;
        switch(EnemyLevel[number]){
            case "lv_simple":
                break;
            case "lv_medium":
                break;
            case "lv_difficulty":
                break;
            default:
                break;
        }
    },
    
    update (dt) {
        if(Global.is_end){
            return
        }
        if(!this.trigger.is_trigger &&this.trigger.behit){
            //当刚开始没有道具的时候让机器人动起来
            if(this.trigger.dir.x == 0&&this.trigger.dir.y==0){
                this.pos = this.hero.node.position.sub(this.node.position);
                var len = this.pos.mag();
                if(len !=0 ){
                    this.trigger.dir.x = this.pos.x / len;
                    this.trigger.dir.y = this.pos.y / len;
                }
            }
            if(this.ismove){
                var vx = this.trigger.dir.x * this.speed;
                var vy = this.trigger.dir.y * this.speed;

                var sx = vx * dt;
                var sy = vy * dt;
                this.node.x += sx;
                this.node.y += sy;
                //方向计算
                var r = Math.atan2(this.trigger.dir.y,this.trigger.dir.x);
                var degree = r * 180/(Math.PI);
                degree = 360 - degree + 90;
                this.player.rotation = degree;
                //人物移动不能超过地图边界
                if(this.node.x<0 && Math.abs(this.node.x + sx-this.node.width/2)>=(this.map.width/2)){
                    this.ismove = false;
                }else if(this.node.x>0 && Math.abs(this.node.x + sx+this.node.width/2)>=(this.map.width/2)){
                    this.ismove = false;
                }else if(this.node.y>0 && Math.abs(this.node.y + sy+this.node.height/2)>=(this.map.height/2)){
                    this.ismove = false;
                }else if(this.node.y<0 && Math.abs(this.node.y + sy-this.node.height/2)>=(this.map.height/2)){
                    this.ismove = false;
                }
            }else{
                var vx = this.trigger.dir.x * this.speed;
                var vy = this.trigger.dir.y * this.speed;

                var sx = vx * dt;
                var sy = vy * dt;
                this.node.x -= sx;
                this.node.y -= sy;
                //方向计算
                var r = Math.atan2(this.trigger.dir.y,this.trigger.dir.x);
                var degree = r * 180/(Math.PI);
                degree = 360 - degree + 90;
                this.player.rotation = degree+180;
                //人物移动不能超过地图边界
                if(this.node.x<0 && Math.abs(this.node.x + sx-this.node.width/2)>=(this.map.width/2)){
                    this.ismove = true;
                }else if(this.node.x>0 && Math.abs(this.node.x + sx+this.node.width/2)>=(this.map.width/2)){
                    this.ismove = true;
                }else if(this.node.y>0 && Math.abs(this.node.y + sy+this.node.height/2)>=(this.map.height/2)){
                    this.ismove = true;
                }else if(this.node.y<0 && Math.abs(this.node.y + sy-this.node.height/2)>=(this.map.height/2)){
                    this.ismove = true;
                }
            }  
        }
        //如果吃毒
        if(this.is_chidu){
            if(this.time>0){
                this.time -=dt;
             }else{
                 this.EnemyDamage(1);
                 this.time =3;
             }
        }
    },
    onCollisionEnter: function (other, self) {
        //判断碰撞的类型
        if(self.tag == 0 ){
            if(other.node.group == "gem"){
                //other.node.destroy();
                this.NodePool.onGemKilled(other.node);
                //吃掉道具之后让他可以继续追踪道具
                this.trigger.isGO = true;
                this.exp +=1;
                this.enemylv.string = this.lv;
                if(this.enemylv.string <=5){
                    this.enemyexp.fillRange = this.exp /(-18);
                }else if(this.enemylv.string <=10){
                    this.enemyexp.fillRange = this.exp /(-36);
                }else if(this.enemylv.string <=15){
                    this.enemyexp.fillRange = this.exp /(-54);
                }
    
                if(this.exp == 18 && this.lv<=5){
                    this.lv +=1;
                    this.exp =0;
                    if(this.curhp < this.maxhp){
                        this.curhp +=1;
                        this.enemyhp.progress = this.curhp/this.maxhp;
                    }
                    this.enemylvUp();
                }else if(this.exp == 36 && this.lv<=10){
                    this.lv +=1;
                    this.exp =0;
                    if(this.curhp < this.maxhp){
                        this.curhp +=1;
                        this.enemyhp.progress = this.curhp/this.maxhp;
                    }
                    this.enemylvUp();
                }else if(this.exp == 54 && this.lv<=15){
                    this.lv +=1;
                    this.exp =0;
                    if(this.curhp < this.maxhp){
                        this.curhp +=1;
                        this.enemyhp.progress = this.curhp/this.maxhp;
                    }
                    this.enemylvUp();
                }
            }else if(other.node.group == "item"){
                //other.node.destroy();
                this.NodePool.onItemKilled(other.node);
                if(other.node.name == "item_dunPrefab"){
                    this.AddDun();
                }else if(other.node.name == "item_hpPrefab"){
                    if(this.curhp < this.maxhp){
                        this.curhp +=1;
                        this.enemyhp.progress = this.curhp/this.maxhp;
                        this.player.getChildByName("addHp").getComponent(cc.Animation).play('AddHp');
                    }
                }else if(other.node.name == "item_xiePrefab"){
    
                    this.speed = 200;
                    this.scheduleOnce(function() {
                        this.speed = 100;
                    }, 3);
                }
            }else if(self.tag ==0 && other.tag ==0&&this.trigger.cd){
                if(other.node.group == "player"){
                    //眩晕状态无敌。不会给重复攻击
                    if(!other.getComponent("Player").behit&&this.isattack){
                        other.getComponent("Player").HeroDamage();
                        this.killsuuid = other.getComponent("Player").gameuuid;
                    }
                }else if(other.node.group == "enemy"){
                    if(other.getComponent("EnemyManager").trigger.behit&&this.isattack){
                        other.getComponent("EnemyManager").EnemyDamage(1);
                        other.getComponent("EnemyManager").killername = this.enemyname.string;
                        this.killsuuid = other.getComponent("EnemyManager").gameuuid;
                    }
                }
            }
        }
        
    },
    // onCollisionExit: function (other, self) {
        
    //     this.trigger.is_trigger = false;
    // },
    enemylvUp(){
        this.lvUp.active = true;
        this.enemylv.string = this.lv;
        this.lvUp.runAction(cc.sequence(cc.delayTime(0.5), cc.fadeOut(1.0), cc.callFunc(()=>{
            this.lvUp.opacity = 255;
            this.lvUp.active = false;
        },this)));
    },
    //加盾
    AddDun(){
        if(!this.isDun){
            this.isDun = true;
            this.player.getChildByName("dun").active = true;
        }
    },
    //受伤
    EnemyDamage(hurt){
        if(this.isDun){
            this.player.getChildByName("dun").active = false;
            this.isDun = false;
        }else{
            if(this.is_chidu){
                this.curhp -=hurt;
                this.enemyhp.progress = this.curhp/this.maxhp;
            }else{
                this.curhp -=hurt;
                this.enemyhp.progress = this.curhp/this.maxhp;
                //实现闪烁效果。播放眩晕动画
                this.player.getChildByName("yun").getComponent(cc.Animation).play('yun').repeatCount =10;
                //闪烁
                this.node.runAction(cc.blink(3, 3));
                //被击中状态不能进行移动等操作（机器人也不能动）
                this.trigger.behit = false;
                this.scheduleOnce(function() {
                    this.trigger.behit= true;
                }, 3);
            }
            this.EnemyDead();
        } 
    },
    EnemyDead(){
        if(this.curhp <=0){
            //死亡动画
            Global.dienumber += 1;
            var img =  cc.instantiate(this.mubei);
            img.x = this.node.x;
            img.y = this.node.y;
            img.getChildByName("name").getComponent(cc.Label).string = this.enemyname.string;
            cc.find("Canvas/EnemyController").addChild(img);
            img.runAction(cc.sequence(cc.delayTime(0.5), cc.fadeOut(1.0), cc.callFunc(()=>{
                img.destroy();
            },this)));
            this.node.stopAllActions();
            this.node.opacity =0;
            this.scheduleOnce(function() {
                this.enemyPool.onEnemyKilled(this.node);
                this.DropItem();
            }, 1);
            if(cc.find("Canvas/MapDianCol/"+this.gameuuid)){
                cc.find("Canvas/MapDianCol/"+this.gameuuid).destroy();
            }
           
            
            let text = "";
            let others = null;
            if(this.killsuuid && this.killsuuid>0&&cc.find("Canvas/EnemyController/"+this.killsuuid)){
               others = cc.find("Canvas/EnemyController/"+this.killsuuid).getComponent("EnemyManager");
            }
            if(this.killername != null){
                this.ShowKill_2(this.killername,this.enemyname.string);
                if(Global.dienumber == 1){
                    text = " 拿到第一滴血";
                    this.ShowKill(text);
                }
                if(this.killername == this.hero.Heroname.string){
                    this.hero.killsnumber +=1;
                    this.KillsText(parseInt(this.hero.killsnumber));
                }else{
                    if(others &&this.killsuuid == others.gameuuid){
                        others.killsnumber += 1;
                        this.KillsText(parseInt(others.killsnumber));
                    }
                }
            }else{
                this.ShowKill_3(this.enemyname.string);
            }
            peopleNumber.getInstance().changeNumber();
        }
    },
    KillsText(number){
        let text = "";
        switch(number){
                case 3:
                text = " 正在大杀特杀";
                this.ShowKill(text);
                break;
                case 4:
                text = " 正在暴走";
                this.ShowKill(text);
                break;
                case 5:
                text = " 已经无人能挡";
                this.ShowKill(text);
                break;
                case 6:
                text = " 已经势不可挡了";
                this.ShowKill(text);
                break;
                case 10:
                text = " 已经超神了";
                this.ShowKill(text);
                break;
                default:
                break;
            }
    },
    ShowKill(text){
        var tip = cc.instantiate(this.tip_prefab);
        if (tip) {
            cc.find("Canvas").addChild(tip);
            let src = tip.getComponent(require("TipShow"));
            if (src) {
                src.label.string = this.killername+text;
            }
        }
    },
    ShowKill_2(text1,text2){
        var tip = cc.instantiate(this.tip2_prefab);
        if (tip) {
            cc.find("Canvas/map/peopleNumber/content").addChild(tip);
            let src = tip.getComponent(require("KillTipsShow"));
            if (src) {
                src.Show(text1,text2);
            }
        }
    },
    ShowKill_3(text1){
        var tip = cc.instantiate(this.tip2_prefab);
        if (tip) {
            cc.find("Canvas/map/peopleNumber/content").addChild(tip);
            let src = tip.getComponent(require("KillTipsShow"));
            if (src) {
                src.Show_2(text1);
            }
        }
    },
    //掉落装备
    DropItem(){
        var gemnum = Math.round(Math.random()*10) +10;
        for(var i=0;i<gemnum;i++){
            this.CreateGem();
        }
        var itemnum = Math.round(Math.random()*2);
        for(var j=0;j<itemnum;j++){
            this.CreateItem();
        }
    },
    //随机生成宝石
    CreateGem(){
        //从对象池里面取
        let item = null;
        if (this.NodePool.GemPool.size() > 0) { 
            item = this.NodePool.GemPool.get();
        } else { 
            item = cc.instantiate(this.NodePool.gemPrefab[Math.round(Math.random()*4)]);
        }
        item.position = this.node.position;
        item.parent = cc.find("Canvas/GameController");
        let radian  = cc.misc.degreesToRadians(Math.round(Math.random()*360));
        let comVec = cc.v2(0, 1);// 一个向上的对比向量
        let dirVec = comVec.rotate(-radian);
        cc.tween(item)
        .to(1, { position: cc.v2(this.node.x+dirVec.x*80,this.node.y+dirVec.y*80) })
        .start()
    },
    //随机生成道具
    CreateItem(){
        //从对象池里面取
        let item = null;
        if (this.NodePool.ItemPool.size() > 0) { 
            item = this.NodePool.ItemPool.get();
        } else { 
            item = cc.instantiate(this.NodePool.ItemPrefab[Math.round(Math.random()*2)]);
        }
        item.position = this.node.position;
        item.parent = cc.find("Canvas/GameController");
        let radian  = cc.misc.degreesToRadians(Math.round(Math.random()*360));
        let comVec = cc.v2(0, 1);// 一个向上的对比向量
        let dirVec = comVec.rotate(-radian);
        cc.tween(item)
        .to(1, { position: cc.v2(item.x+dirVec.x*80,item.y+dirVec.y*80)})
        .start()
    },
});
