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
        people:{
            default:null,
            type:cc.Label,
        },
        dienumber:{
            default:null,
            type:cc.Label,
        },
        userKill:{
            default:null,
            type:cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //注册监听事件
        cc.game.on('change',function (people){
             this.people.string = people.toString();
             this.dienumber.string = Global.dienumber.toString();
             this.userKill.string = cc.find("Canvas/player").getComponent("Player").killsnumber;
            },this);
    },
    // update (dt) {},
    onDestroy(){
        cc.game.off('change');
    }
});
