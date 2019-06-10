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
        Richlabel:{
            default:null,
            type:cc.RichText,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    Show(name_1,name_2){
        this.Richlabel.string = "<color=#00ff00>"+name_1+"</c>"+"击杀了"+"<color=#FF0000>"+name_2+"</color>";
        // this.node.runAction(cc.sequence(cc.delayTime(2.0), cc.fadeOut(1.0), cc.callFunc(()=>{
        //     this.node.destroy();
        // },this)));
        this.scheduleOnce(function() {
            this.node.destroy();
        }, 1);
    },
    Show_2(name_1){
        this.Richlabel.string = "<color=#00ff00>"+name_1+"</c>"+"<color=#FF0000>被淹死了</color>";
        // this.node.runAction(cc.sequence(cc.delayTime(2.0), cc.fadeOut(1.0), cc.callFunc(()=>{
        //     this.node.destroy();
        // },this)));
        this.scheduleOnce(function() {
            this.node.destroy();
        }, 1);
    },
    // update (dt) {},
});
