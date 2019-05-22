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
        heroPrefab:{
            default:[],
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let self = this;
        Global.GetUserHeros((res)=>{
            if(res.result.Obj.length!=0){
                for(let i=0;i<res.result.Obj.length;i++){
                    if(res.result.Obj[i].type == 1){
                        cc.loader.loadRes('have.png', cc.SpriteFrame, function (err, spriteFrame) {
                            self.heroPrefab[res.result.Obj[i].heroid-1].getChildByName("type").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                    }else{
                        if(res.result.Obj[i].trialscount>0){
                            cc.loader.loadRes('surplus.png', cc.SpriteFrame, function (err, spriteFrame) {
                                self.heroPrefab[res.result.Obj[i].heroid-1].getChildByName("type").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            });
                            cc.find("tpye/number",self.heroPrefab[res.result.Obj[i].heroid-1]).active = true;
                            let imgurl = 'number_'+res.result.Obj[i].trialscount+'.png';
                            cc.loader.loadRes(imgurl, cc.SpriteFrame, function (err, spriteFrame) {
                                cc.find("tpye/number",self.heroPrefab[res.result.Obj[i].heroid-1]).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            });
                        }
                    }
                }
            }
        });
    },

    // update (dt) {},
});
