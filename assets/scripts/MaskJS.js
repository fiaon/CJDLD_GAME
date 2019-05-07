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
        tip_prefab:{
            default:null,
            type:cc.Prefab,
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent(cc.Mask)._clearGraphics.rect(-20000, -20000, 60000 ,60000); 
        this.node.getComponent(cc.Mask)._clearGraphics.fill();

    },

    start () {
        //出现提示
        this.is_suodu= false;
        this.time=0;
        this.scheduleOnce(function() {
            let tip = cc.instantiate(this.tip_prefab);
            if (tip) {
                cc.find("Canvas").addChild(tip);
                let src = tip.getComponent(require("TipShow"));
                if (src) {
                    src.label.string = "海水还有10s后扩大笼罩范围";
                }
            }
            this.time = 20;
        }, 10);
        this.scheduleOnce(function() {
            this.is_suodu= true;
        }, 20);
    },

     update (dt) {
         if(!this.is_suodu){
             return;
         }
         if(this.time>=0){
            this.node.width -= dt*32;
            this.node.height -= dt*32;
            this.node.getComponent(cc.BoxCollider).size.width = this.node.width;
            this.node.getComponent(cc.BoxCollider).size.height = this.node.height;
            this.time -=dt;
         }else{
            this.is_suodu = false;
         }
         
     },
     //开始触发
     onCollisionEnter: function (other, self) {
        if(other.node.group == "player"){
            other.getComponent("Player").is_chidu = false;
            console.log("英雄在安全区");
        }else if(other.node.group == "enemy"){
            other.getComponent("EnemyManager").is_chidu = false;
        }
    },
    //持续触发
    onCollisionStay: function (other, self) {
        if(other.node.group == "player"){
            other.getComponent("Player").is_chidu = false;
        }else if(other.node.group == "enemy"){
            other.getComponent("EnemyManager").is_chidu = false;
        }
    },
    //触发结束
    onCollisionExit: function (other, self) {
        if(other.node.group == "player"){
            other.getComponent("Player").is_chidu = true;
            console.log("英雄在毒圈");
        }else if(other.node.group == "enemy"){
            other.getComponent("EnemyManager").is_chidu = true;
        }
    },
});
