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
        rank:cc.Label,
        headImg:cc.Sprite,
        sexImg:cc.Sprite,
        username:cc.Label,
        killnum:cc.Label,
        hurtnum:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let self = this;
        self.rank.string = Global.enemynumber -Global.dienumber+1;
        var imgurl = Global.avatarUrl +"?aaa=aa.jpg";
        cc.loader.load({url:imgurl, type: 'jpg'},function(err, texture){
            if(texture){ 
                var spriteFrame = new cc.SpriteFrame(texture);
                self.headImg.spriteFrame = spriteFrame;
            }
        });
        //1：男 2：女 0：未知
        if(Global.sex ==1){
            let url = "game/boy";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.sexImg.spriteFrame = spriteFrame;
            });
        }else if(Global.sex ==2){
            let url = "game/girl";
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.sexImg.spriteFrame = spriteFrame;
            });
        }else{
            self.sexImg.node.active = false;
        }
        self.username.string = Global.name;
        var num = cc.find("Canvas/player").getComponent("Player").killsnumber;
        self.killnum.string = num;
        self.hurtnum.string = parseInt(num)*3;
        
    },
    GameAgain(){
        //再来一局按钮线跳到首页出现推广窗口
        Global.is_Again = true;
        cc.director.loadScene("GameStart.fire");
    }

    // update (dt) {},
});
