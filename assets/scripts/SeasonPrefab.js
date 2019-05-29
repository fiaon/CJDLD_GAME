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
        bg:cc.Sprite,
        gold:cc.Label,
        diamonds:cc.Label,
        duanbg:cc.Sprite,
        duantext:cc.RichText,
        duanimg:cc.Sprite,
        cur:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init: function (data) {
        //表示当前段位
        let self = this;
        if(Global.userlvl == data.id){
            let url = 'highLadder_curbg';
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.bg.spriteFrame = spriteFrame;
            });
            self.cur.active = true;
            let duanbgurl = 'highLadder_curbtn';
            cc.loader.loadRes(duanbgurl, cc.SpriteFrame, function (err, spriteFrame) {
                self.duanbg.spriteFrame = spriteFrame;
            });
        }
        self.gold.string = "x"+data.gold;
        self.diamonds.string = "x"+data.diamonds;
        self.duantext.string = data.name;
        let duanimgurl = data.id+'.png';
        cc.loader.loadRes(duanimgurl, cc.SpriteFrame, function (err, spriteFrame) {
            self.duanimg.spriteFrame = spriteFrame;
        });
    },

    // update (dt) {},
});
