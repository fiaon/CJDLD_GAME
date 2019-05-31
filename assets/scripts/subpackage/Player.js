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
        Rocker:{
            default:null,
            type:require("Rocker"),
        },
        map:{
            default:null,
            type:cc.Node,
        },
        Heroexp:{
            default:null,
            type:cc.Sprite,
        },
        Herolv:{
            default:null,
            type:cc.Label,
        },
        Heroname:{
            default:null,
            type:cc.Label,
        },
        Herohp: {
            default: null,
            type: cc.ProgressBar,
        },
        lvUp: {
            default: null,
            type: cc.Node,
        },
        gameuuid:"-1",
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //开启物理
        // cc.director.getPhysicsManager().enabled = true;
        // var draw = cc.PhysicsManager.DrawBits;
        // cc.director.getPhysicsManager().debugDrawFlags = draw.e_shapeBit|draw.e_jointBit;
        // this.rigidBody = this.node.getComponent(cc.RigidBody);
        // this.rigidBody.applyLinearImpulse(cc.v2(1000,1000), this.rigidBody.getWorldPosition(), true);
    },

    start () {
        //开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
        let self = this;

        //定义玩家信息
        this.curhp = 3;
        this.maxhp = 3;
        this.lv = 1;
        this.exp = 0;
        this.xishu = 5;
        this.expnum = 0;
        this.skillNum =0;
        this.damage = 0;
        this.killsnumber = 0;
        this.isDun = false;         //是否有护盾
        this.is_chidu = false;      //是否吃毒
        this.isattack = false;      //是否普攻
        this.behit = false;         //是否被攻击（被攻击是不能移动）
        this.wudi = false;          //是否无敌
        this.time = 3;
        this.killername = null;     //杀我的人
        this.speed=100;             //初始速度
        this.addspeed = 100;        //加速度

        this.Herolv.string = this.lv;
        this.Heroexp.fillRange =0;
        this.Herohp.progress = this.curhp/this.maxhp;
        //this.Heroname.string = Global.name;

        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.player = this.node.getChildByName("playerImg");

        this.NodePool = cc.find("Canvas/GameController").getComponent("GameItemManager");
        //cc.sys.localStorage.setItem(this.gameuuid,"0");
        peopleNumber.getInstance().init();
        let p = peopleNumber.getInstance().people;
        cc.game.emit('change',p);
        // let herourl = 'hero/hero_'+ Global.defhid;
        // cc.loader.loadRes(herourl, cc.SpriteFrame, function (err, spriteFrame) {
        //     self.player.getChildByName("heroImg").getComponent(cc.Sprite).spriteFrame =  spriteFrame;
        // });
        ////获取英雄的速度和技能等级
        // Global.GetUserHeros((res)=>{
        //     if(res.result.length!=0){
        //         for(let i=0;i<res.result.length;i++){
        //             if(res.result[i].heroid == Global.defhid){
        //                 this.speed += 15*res.result[i].skill1;
        //                 this.Rocker.skill2cd -=  0.5*res.result[i].skill2;
        //             }
        //         }
        //     }
        // });
    },

     update (dt) {
        //如果吃毒
        if(this.is_chidu){
            if(this.time>0){
                this.time -=dt;
             }else{
                 this.HeroDamage();
                 this.time =3;
             }
        }

        if(this.Rocker.dir.mag()<0.5){
            return;
        }
        if(!this.behit){
            var vx = this.Rocker.dir.x * this.speed;
            var vy = this.Rocker.dir.y * this.speed;

            var sx = vx * dt;
            var sy = vy * dt;
            //人物移动不能超过地图边界
            if(this.node.x<0 && Math.abs(this.node.x + sx-this.node.width/2)>=(this.map.width/2)){
                return;
            }else if(this.node.x>0 && Math.abs(this.node.x + sx+this.node.width/2)>=(this.map.width/2)){
                return;
            }else if(this.node.y>0 && Math.abs(this.node.y + sy+this.node.height/2)>=(this.map.height/2)){
                return;
            }else if(this.node.y<0 && Math.abs(this.node.y + sy-this.node.height/2)>=(this.map.height/2)){
                return;
            }
            //移动
            this.node.x += sx;
            this.node.y += sy;
            //this.rigidbody.syncPosition(false);;
            // console.log("节点位置 " + this.node.position);
            //方向计算
            var r = Math.atan2(this.Rocker.dir.y,this.Rocker.dir.x);
            var degree = r * 180/(Math.PI);
            degree = 360 - degree + 90;
            this.player.rotation = degree;
        }  
     },
     onCollisionEnter: function (other, self) {
        //判断碰撞的类型
        if(self.tag == 0 ){
            if(other.node.group == "gem"){
                //other.node.destroy();
                this.NodePool.onGemKilled(other.node);
                this.expnum +=1;
                this.exp = this.xishu*(this.lv*(this.lv+1)/2);
                if(this.expnum>=this.exp&& this.lv<=12){
                    this.lv +=1;
                    this.expnum =0;
                    if(this.curhp < this.maxhp){
                        this.curhp +=1;
                        this.Herohp.progress = this.curhp/this.maxhp;
                    }
                    this.HeroLvUp();
                }
                this.Herolv.string = this.lv;
                this.Heroexp.fillRange = this.expnum /this.exp*-1;
                
            }else if(other.node.group == "item"){
                //other.node.destroy();
                this.NodePool.onItemKilled(other.node);
                if(other.node.name == "item_dunPrefab"){
                    this.AddDun();
                }else if(other.node.name == "item_hpPrefab"){
    
                    if(this.curhp < this.maxhp){
                        this.curhp +=1;
                        this.Herohp.progress = this.curhp/this.maxhp;
                        this.player.getChildByName("addHp").getComponent(cc.Animation).play('AddHp');
                    }
                }else if(other.node.name == "item_xiePrefab"){
    
                    this.speed += this.addspeed;
                    this.scheduleOnce(function() {
                        this.speed -= this.addspeed;;
                    }, 3);
                }
            }
        }else if(self.tag ==1 && other.tag ==0&&this.Rocker.is_Cd){
            if(other.node.group == "enemy"){
                if(other.getComponent("EnemyManager").trigger.behit && this.isattack){
                    other.getComponent("EnemyManager").EnemyDamage(1);
                    this.damage +=1;//造成伤害+1
                    other.getComponent("EnemyManager").killername = this.Heroname.string;
                }
            }
        }
        
    },
    HeroDead(){
        if(this.curhp <=0){
            //跳出结算界面
            cc.find("Canvas/GameOverView").active = true;
            Global.is_end = true;
        }
    },
    //攻击
    HeroAttack(){
        this.damage +=1;//造成伤害+1
        if(this.Rocker.is_Cd){

        }
    },
    AddDun(){
        if(!this.isDun){
            this.isDun = true;
            this.player.getChildByName("dun").active = true;
        }
    },
    //受伤
    HeroDamage(){
        if(!this.wudi){
            if(this.isDun){
                this.player.getChildByName("dun").active = false;
                this.isDun = false;
            }else{
                if(this.is_chidu){
                    this.curhp -=1;
                    this.Herohp.progress = this.curhp/this.maxhp;
                }else{
                    this.curhp -=1;
                    this.Herohp.progress = this.curhp/this.maxhp;
                    //实现闪烁效果。播放眩晕动画
                    this.player.getChildByName("yun").getComponent(cc.Animation).play('yun').repeatCount =10;
                    //闪烁
                    this.node.runAction(cc.blink(3, 3));
                    //被击中状态不能进行移动等操作（机器人也不能动）
                    this.behit = true;
                    //晕2秒不能移动
                    this.scheduleOnce(function() {
                        this.behit = false;
                        this.wudi = true;
                        this.player.opacity = 0;
                    }, 2);
                    //晕玩之后无敌3秒
                    this.scheduleOnce(function() {
                        this.wudi = false;
                        this.player.opacity = 255;
                    }, 5);
                }   
                this.HeroDead();
            }

        }
    },
    HeroLvUp(){
        this.lvUp.active = true;
        this.Herolv.string = this.lv;
        this.Rocker.skillCd -=0.2;
        this.lvUp.runAction(cc.sequence(cc.delayTime(0.5), cc.fadeOut(1.0), cc.callFunc(()=>{
            this.lvUp.opacity = 255;
            this.lvUp.active = false;
        },this)));
    },
});
