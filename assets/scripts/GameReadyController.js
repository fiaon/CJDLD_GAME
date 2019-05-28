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
        skill_speed:cc.Label,
        skill_hero:cc.Label,
        heroname:cc.Label,
        heroImg:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let self = this;
        Global.GetUserHeros((res)=>{
            if(res.result.length!=0){
                for(let i=0;i<res.result.length;i++){
                    if(res.result[i].heroid == Global.defhid){
                        this.skill_speed.string = res.result[i].skill1;
                        this.skill_hero.string = res.result[i].skill2;
                        let url = "readyskill_"+Global.defhid;
                        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                            cc.find("Canvas/Skill/bg/skill4/skillImg/img").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        
                    }
                }
            }
        });
        //获取英雄名字
        Global.GetAllHeros((res)=>{
            if(res.state ==1){
                if(res.result.length!=0){
                    for(let i=0;i<res.result.length;i++){
                        if(res.result[i].id == Global.defhid){
                            this.heroname.string = res.result[i].name;
                            let url = "hero/hero_"+Global.defhid;
                            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                                self.heroImg.spriteFrame = spriteFrame;
                            });
                        }
                    }
                }
            }
        });
    },

    // update (dt) {},
});
