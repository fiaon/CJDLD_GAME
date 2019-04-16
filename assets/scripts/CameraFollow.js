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
        target:{
            default:null,
            type:cc.Node,
        },
        map:{
            default:null,
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        console.log("画布宽度 "+cc.winSize.width);
    },

    update (dt) {
        if(Math.abs(this.target.x) >= (this.map.width/2 -cc.winSize.width/2) && Math.abs(this.target.y) >= (this.map.height/2 -cc.winSize.height/2)){
            return;
        }else if(Math.abs(this.target.y) >= (this.map.height/2 -cc.winSize.height/2)){
            this.node.x = this.target.x;
            return;
        }else if(Math.abs(this.target.x) >= (this.map.width/2 -cc.winSize.width/2)){
            this.node.y = this.target.y;
            return;
        }
        this.node.x = this.target.x;
        this.node.y = this.target.y;
    },
});
