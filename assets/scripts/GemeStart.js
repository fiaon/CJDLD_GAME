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
    
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
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
    },

    // update (dt) {},
});
