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
        speed:100,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    },

    start () {
        //开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
        

        //定义玩家信息
        this.curhp = 3;
        this.maxhp = 3;
        this.lv = 1;
        this.exp = 0;
        this.skillNum =0;
        this.damage = 0;
        this.isDun = false;//是否有护盾
        this.is_chidu = false;//是否吃毒
        this.behit = false;//是否被攻击（被攻击是不能移动）
        this.time = 3;
        this.killername = "";//杀我的人

        this.Herolv.string = this.lv;
        this.Heroexp.fillRange =0;
        this.Herohp.progress = this.curhp/this.maxhp;
        this.Heroname.string = Global.name;
        //this.HeroDamage();

        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.player = this.node.getChildByName("playerImg");

        this.NodePool = cc.find("Canvas/GameController").getComponent("GameItemManager");
        
    },

     update (dt) {
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
        
        //如果吃毒
        if(this.is_chidu){
            if(this.time>0){
                this.time -=dt;
             }else{
                 this.HeroDamage();
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
                this.Herolv.string = this.lv;
                if(this.Herolv.string <=5){
                    this.Heroexp.fillRange = this.exp /(-18);
                }else if(this.Herolv.string <=10){
                    this.Heroexp.fillRange = this.exp /(-36);
                }else if(this.Herolv.string <=15){
                    this.Heroexp.fillRange = this.exp /(-54);
                }
    
                if(this.exp == 18 && this.lv<=5){
                    this.lv +=1;
                    this.exp =0;
                    if(this.curhp < this.maxhp){
                        this.curhp +=1;
                        this.Herohp.progress = this.curhp/this.maxhp;
                    }
                    this.HeroLvUp();
                }else if(this.exp == 36 && this.lv<=10){
                    this.lv +=1;
                    this.exp =0;
                    if(this.curhp < this.maxhp){
                        this.curhp +=1;
                        this.Herohp.progress = this.curhp/this.maxhp;
                    }
                    this.HeroLvUp();
                }else if(this.exp == 54 && this.lv<=15){
                    this.lv +=1;
                    this.exp =0;
                    if(this.curhp < this.maxhp){
                        this.curhp +=1;
                        this.Herohp.progress = this.curhp/this.maxhp;
                    }
                    this.HeroLvUp();
                }
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
    
                    this.speed = 200;
                    this.scheduleOnce(function() {
                        this.speed = 100;
                    }, 3);
                }
            }
        }else if(self.tag ==1 && other.tag ==0&&this.Rocker.is_Cd){
            if(other.node.group == "enemy"){
                if(other.getComponent("EnemyManager").trigger.behit){
                    other.getComponent("EnemyManager").EnemyDamage();
                    other.getComponent("EnemyManager").killername = this.Heroname.string;//杀我的人
                }
            }
        }
        
    },
    HeroDead(){
        if(this.curhp <=0){
            //死亡动画

            //跳出结算界面
            //this.node.destroy();
            cc.find("Canvas/GameOverView").active = true;
            //cc.find("Canvas/UI Camera").active = false;
            //cc.find("Canvas/Main Camera").getComponent(cc.Camera).cullingMask |= 1<<1;
            //cc.find("Canvas/GameOverView").x = cc.find("Canvas/Main Camera").x;
            //cc.find("Canvas/GameOverView").y = cc.find("Canvas/Main Camera").y;
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
        if(this.isDun){
            this.player.getChildByName("dun").active = false;
            this.isDun = false;
        }else{
            this.curhp -=1;
            this.Herohp.progress = this.curhp/this.maxhp;
            //实现闪烁效果。播放眩晕动画
            this.player.getChildByName("yun").getComponent(cc.Animation).play('yun').repeatCount =10;
            //闪烁
            this.node.runAction(cc.blink(3, 3));
            //被击中状态不能进行移动等操作（机器人也不能动）
            this.behit = true;
            this.scheduleOnce(function() {
                this.behit = false;
            }, 3);
            this.HeroDead();
        }
    },
    HeroLvUp(){
        this.lvUp.active = true;
        this.Herolv.string = this.lv;
        this.lvUp.runAction(cc.sequence(cc.delayTime(0.5), cc.fadeOut(1.0), cc.callFunc(()=>{
            this.lvUp.opacity = 255;
            this.lvUp.active = false;
        },this)));
    },
});
