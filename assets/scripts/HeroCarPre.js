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
        costBtn:cc.Node,
        videoBtn:cc.Node,
        tip:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init:function(heroid){
        let self = this;
        Global.GetUserHeros((res)=>{
            if(res.state ==1){
                if(res.result.length>=0){
                    for(let i=0;i<res.result.length;i++){
                        if(res.result[i].heroid == heroid){
                            self.costBtn.active = false;
                            self.videoBtn.active = false;
                            self.tip.active = false;
                        }
                    }
                }
            }
        });
         
    },
    // update (dt) {},
});
