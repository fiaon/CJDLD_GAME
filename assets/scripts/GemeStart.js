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
        rankPrefab:cc.Prefab,
        heroname:cc.Label,
        heroImg:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let self = this;
        Global.Getinfo();
        if(Global.is_Again){
            cc.find("Canvas/DOYouLikeView").active =true;
            Global.is_Again = false;
        }
        //微信的头像和名字
        var imgurl = Global.avatarUrl +"?aaa=aa.jpg";
        cc.loader.load({url:imgurl, type: 'jpg'},function(err, texture){
            if(texture){ 
                var spriteFrame = new cc.SpriteFrame(texture);
                cc.find("Canvas/Player/headBG/head").getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });
        cc.find("Canvas/Player/name").getComponent(cc.Label).string = Global.name;
        for(let i =0;i<Global.SeaonLvl.length;i++){
            if(Global.userlvl == Global.SeaonLvl[i].id){
                Global.duntext = Global.SeaonLvl[i].name;
                cc.find("Canvas/Player/lvname").getComponent(cc.Label).string = Global.duntext;
                let url = Global.SeaonLvl[i].id+'.png';
                cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find("Canvas/Player/Lv").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }
        }
        Global.GetAllRank((res)=>{
            if(res.result.rank.length>0){
                if(res.result.rank.length>=3){
                    for(let i=0;i<3;i++){
                        var imgurl = res.result.rank[i].headurl;
                        var pos = "Canvas/RankingList/bg";
                        var rank = cc.instantiate(this.rankPrefab);
                        rank.getComponent("RankHeraPrefab").init(i,imgurl);
                        cc.find(pos).addChild(rank);
                    }
                }else{
                    for(let i=0;i<res.result.rank.length;i++){
                        var imgurl = res.result.rank[i].headurl;
                        var pos = "Canvas/RankingList/bg";
                        var rank = cc.instantiate(this.rankPrefab);
                        rank.getComponent("RankHeraPrefab").init(i,imgurl);
                        cc.find(pos).addChild(rank);
                    }
                }
            }
        });
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
