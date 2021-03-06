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
        },
        heroname:{
            default:[],
            type:cc.Label,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let self = this;
        Global.GetUserHeros((res)=>{
            if(res.result.length!=0){
                for(let i=0;i<res.result.length;i++){
                    if(res.result[i].type == 1){
                        cc.loader.loadRes('have.png', cc.SpriteFrame, function (err, spriteFrame) {
                            self.heroPrefab[res.result[i].heroid-1].getChildByName("type").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        
                    }else{
                        if(res.result[i].trialscount>0){
                            cc.loader.loadRes('surplus.png', cc.SpriteFrame, function (err, spriteFrame) {
                                self.heroPrefab[res.result[i].heroid-1].getChildByName("type").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            });
                            cc.find("tpye/number",self.heroPrefab[res.result[i].heroid-1]).active = true;
                            let imgurl = 'number_'+res.result[i].trialscount+'.png';
                            cc.loader.loadRes(imgurl, cc.SpriteFrame, function (err, spriteFrame) {
                                cc.find("tpye/number",self.heroPrefab[res.result[i].heroid-1]).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            });
                        }
                    }
                }
            }
        });
        Global.GetAllHeros((res)=>{
            if(res.result.length!=0){
                for(let i=0;i<res.result.length;i++){
                    this.heroname[i].string = res.result[i].name;
                }
            }
        });
    },
    
    BackScene(){

    },
    // update (dt) {},
});
