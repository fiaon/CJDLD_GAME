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
        gemPrefab:{
            default:[],
            type:cc.Prefab,
        },
        ItemPrefab:{
            default:[],
            type:cc.Prefab,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        this.ismove = false;

        //定义玩家信息
        this.curhp = 3;
        this.maxhp = 3;
        this.lv = 1;
        this.exp = 0;
        this.skillNum =0;
        this.isDun = false;//是否有护盾
        this.is_chidu = false;//是否吃毒
        this.time = 3;

        this.enemylv.string = this.lv;
        this.enemyexp.fillRange =0;
        this.enemyhp.progress = this.curhp/this.maxhp;

        this.player = this.node.getChildByName("playerImg");
        this.NodePool = cc.find("Canvas/GameController").getComponent("GameItemManager");
        this.enemyPool = cc.find("Canvas/EnemyController").getComponent("EnemyController");
        this.map =  cc.find("Canvas/bg001");
    },

    start () {
        
    },
    
    update (dt) {
        if(!this.trigger.is_trigger && this.trigger.dir!= null &&this.trigger.behit){
            if(this.ismove){
                var vx = this.trigger.dir.x * this.trigger.speed;
                var vy = this.trigger.dir.y * this.trigger.speed;

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
                var vx = this.trigger.dir.x * this.trigger.speed;
                var vy = this.trigger.dir.y * this.trigger.speed;

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
                 this.EnemyDamage();
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
    
                    this.trigger.speed = 200;
                    this.scheduleOnce(function() {
                        this.trigger.speed = 100;
                    }, 3);
                }
            }else if(self.tag ==0 && other.tag ==0&&this.trigger.cd){
                if(other.node.group == "player"){
                    //眩晕状态无敌。不会给重复攻击
                    if(!other.getComponent("Player").behit){
                        other.getComponent("Player").HeroDamage();
                    }
                }
            }
        }
        
    },
    onCollisionExit: function (other, self) {
        
        this.trigger.is_trigger = false;
    },
    enemylvUp(){
        this.lvUp.active = true;
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
    EnemyDamage(){
        if(this.isDun){
            this.player.getChildByName("dun").active = false;
            this.isDun = false;
        }else{
            this.curhp -=1;
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

            this.EnemyDead();
        } 
    },
    EnemyDead(){
        if(this.curhp <=0){
            //死亡动画
            var img =  cc.instantiate(this.mubei);
            img.x = this.node.x;
            img.y = this.node.y;
            cc.find("Canvas").addChild(img);
            // img.runAction(cc.sequence(cc.delayTime(0.5), cc.fadeOut(1.0), cc.callFunc(()=>{
            //     img.destroy();
            // },this)));
            //this.node.destroy();
            this.enemyPool.onEnemyKilled(this.node);
            //随机概率掉装备 (小动画先生成几个然后随机往几个方向移动)
            this.DropItem();
            peopleNumber.getInstance().changeNumber();
        }
    },
    //掉落装备
    DropItem(){
        var gemnum = Math.round(Math.random()*2) +1;
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
        var str = Math.round(Math.random()*4);
        var item =  cc.instantiate(this.gemPrefab[str]);
        item.x = this.node.x;
        item.y = this.node.y;
        cc.find("Canvas").addChild(item);
        let radian  = cc.misc.degreesToRadians(Math.round(Math.random()*360));
        let comVec = cc.v2(0, 1);// 一个向上的对比向量
        let dirVec = comVec.rotate(-radian);
        cc.tween(item)
        .to(1, { position: cc.v2(this.node.x+dirVec.x*80,this.node.y+dirVec.y*80) })
        .start()
    },
    //随机生成道具
    CreateItem(){
        var str = Math.round(Math.random()*2);
        var item =  cc.instantiate(this.ItemPrefab[str]);
        item.x = this.node.x;
        item.y = this.node.y;
        cc.find("Canvas").addChild(item);
        let radian  = cc.misc.degreesToRadians(Math.round(Math.random()*360));
        let comVec = cc.v2(0, 1);// 一个向上的对比向量
        let dirVec = comVec.rotate(-radian);
        cc.tween(item)
        .to(1, { position: cc.v2(this.node.x+dirVec.x*80,this.node.y+dirVec.y*80) })
        .start()
    },
});
