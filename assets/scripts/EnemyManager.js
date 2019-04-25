// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        trigger:{
            default:null,
            type:require("EnemyTrigger"),
        },
        map:{
            default:null,
            type:cc.Node,
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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
        this.ismove = false;

        //定义玩家信息
        this.curhp = 3;
        this.maxhp = 3;
        this.lv = 1;
        this.exp = 0;
        this.skillNum =0;
        this.isDun = false;//是否有护盾

        this.enemylv.string = this.lv;
        this.enemyexp.fillRange =0;
        this.enemyhp.progress = this.curhp/this.maxhp;

        this.player = this.node.getChildByName("playerImg");
    },
    
    update (dt) {
        if(!this.trigger.is_trigger && this.trigger.dir!= null){
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
    },
    onCollisionEnter: function (other, self) {
        //判断碰撞的类型
        if(other.node.group == "gem"){
            other.node.destroy();
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
            other.node.destroy();
            if(other.node.name == "item_dunPrefab"){
                console.log("机器人加盾");
            }else if(other.node.name == "item_hpPrefab"){
                if(this.curhp < this.maxhp){
                    this.curhp +=1;
                    this.enemyhp.progress = this.curhp/this.maxhp;
                }
            }else if(other.node.name == "item_xiePrefab"){

                this.trigger.speed = 200;
                this.scheduleOnce(function() {
                    this.trigger.speed = 100;
                }, 3);
            }
        }else if(other.node.group == "player"){
            console.log("机器人攻击玩家");
            other.node.getComponent("Player").HeroDamage();
        }
    },
    onCollisionExit: function (other, self) {
        
        console.log("enemyPos "+ self.node.position);
        this.trigger.is_trigger = false;
        
        
    },
    enemylvUp(){
        this.lvUp.active = true;
        this.lvUp.runAction(cc.sequence(cc.delayTime(0.5), cc.fadeOut(1.0), cc.callFunc(()=>{
            this.lvUp.opacity = 255;
            this.lvUp.active = false;
        },this)));
    },
    //受伤
    EnemyDamage(){
        if(this.curhp!=0){
            this.curhp -=1;
            this.enemyhp.progress = this.curhp/this.maxhp;
        }else if(this.curhp <=0){
            this.EnemyDead();
        }
        
    },
    EnemyDead(){
        if(this.curhp <=0){
            //死亡动画

            //掉装备
        }
    },
});
