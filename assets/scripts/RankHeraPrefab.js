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
        head:cc.Sprite,
        icon:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init: function (rank,data) {
        let avatarUrl = data;
       
        this.createImage(avatarUrl);
        let self = this;
        if(rank==0){
            cc.loader.loadRes('first.png', cc.SpriteFrame, function (err, spriteFrame) {
                self.icon.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }else if(rank==1){
            cc.loader.loadRes('second.png', cc.SpriteFrame, function (err, spriteFrame) {
                self.icon.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }else if(rank==2){
            cc.loader.loadRes('Third.png', cc.SpriteFrame, function (err, spriteFrame) {
                self.icon.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
    },
    createImage(avatarUrl) {
        if (CC_WECHATGAME) {
            try {
                cc.loader.load({
                    url: avatarUrl+"?aaa=aa.jpg", type: 'jpg'
                }, (err, texture) => {
                    this.head.spriteFrame = new cc.SpriteFrame(texture);
                });
            }catch (e) {
                cc.log(e);
                
            }
        } else {
            cc.loader.load({
                url: avatarUrl+"?aaa=aa.jpg", type: 'jpg'
            }, (err, texture) => {
                this.head.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }
    // update (dt) {},
});
