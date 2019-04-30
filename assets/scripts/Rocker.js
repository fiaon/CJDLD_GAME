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
        Rocker:{
            default:null,
            type:cc.Node,
        },
        skill1:{
            default:null,
            type:cc.Node,
        },
        skill1_mask:{
            default:null,
            type:cc.Sprite,
        },
        attack:{
            default:null,
            type:cc.Node,
        },
        player:{
            default:null,
            type:cc.Node,
        },
        
        is_Cd:false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.Max_r = 49;
        this.skillCd = 1.5;
        this.Rocker.x = 0;
        this.Rocker.y = 0;
        this.dir = cc.v2(0,0);

        this.Rocker.on(cc.Node.EventType.TOUCH_START,function(e){
            var w_pos = e.getLocation();
            var pos = this.node.convertToNodeSpaceAR(w_pos);
            var len = pos.mag();//获取向量长度
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;

            if(len > this.Max_r){
                pos.x = this.Max_r * pos.x / len;
                pos.y = this.Max_r * pos.y / len;
            }
            this.Rocker.setPosition(pos);
        },this);
   
        this.Rocker.on(cc.Node.EventType.TOUCH_MOVE,function(e){
            var w_pos = e.getLocation();
            var pos = this.node.convertToNodeSpaceAR(w_pos);

            var len = pos.mag();
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;

            if(len > this.Max_r){
                pos.x = this.Max_r * pos.x / len;
                pos.y = this.Max_r * pos.y / len;
            }
            this.Rocker.setPosition(pos);
        },this);
   
        this.Rocker.on(cc.Node.EventType.TOUCH_END,function(e){
           this.Rocker.setPosition(cc.v2(0,0));
           this.dir = cc.v2(0, 0);
        },this);
   
        this.Rocker.on(cc.Node.EventType.TOUCH_CANCEL,function(e){
            this.Rocker.setPosition(cc.v2(0,0));
            this.dir = cc.v2(0, 0);
        },this);
        this.skill1.on(cc.Node.EventType.TOUCH_START,function(e){
            if(!this.is_Cd){
                this.attack.getComponent(cc.Animation).play('attack');
                this.playerAttack();
                this.is_Cd = true;
            }
        },this);
    },
    //平A技能（往前撞击）
    playerAttack(){
        // 将角度转换为弧度
        let radian  = cc.misc.degreesToRadians(this.player.getComponent("Player").player.rotation);
        let comVec = cc.v2(0, 1);// 一个向上的对比向量
        let dirVec = comVec.rotate(-radian);
        this.player.x += dirVec.x*100;
        this.player.y += dirVec.y*100;
    },
    update (dt) {
        //如果技能没进入cd return
        if(!this.is_Cd){
            return;
        }
        //显示技能遮罩
        if(this.skill1_mask.fillRange >= 0){
            //this.skill1_mask.node.active = true;
            this.skill1_mask.fillRange -= (dt/this.skillCd);
        }else{
            this.is_Cd = false;
            //this.skill1_mask.node.active = false;
            this.skill1_mask.fillRange =1;
            console.log("冷却完成");
        }
    },
});
