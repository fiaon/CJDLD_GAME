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
        timeDown:{
            default:null,
            type:cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.time = 10;
        this.timeDown.string = this.time +"s";
        this.schedule(this.doCountdownTime,1);
    },
    doCountdownTime(){
        //每秒更新显示信息
        if (this.time > 0 ) {
            this.time -= 1;
            this.timeDown.string = this.time+"s";
            this.countDownShow(this.time);
        }
    },
    countDownShow(temp){
        if(temp <= 0){
            //倒计时结束
            this.node.active = false;
            this.unschedule(this.doCountdownTime);
            cc.find("Canvas/GameController").active= true;
            cc.find("Canvas/EnemyController").active= true;
            cc.find("Canvas/mask").active= true;
        }
    },
    // update (dt) {},
});
