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
        mask:{
            default:null,
            type:cc.Mask,
        },
        is_suodu:false,
        time:10,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.mask._clearGraphics.rect(-20000, -20000, 60000 ,60000); 
        this.mask._clearGraphics.fill();
    },

    start () {

    },

     update (dt) {
         if(!this.is_suodu){
             return;
         }
         if(this.time>=0){
            this.node.width -= dt*20;
            this.node.height -= dt*20;
            this.time -=dt;
         }else{
            this.is_suodu = false;
            this.time =10;
         }
         
     },
});
