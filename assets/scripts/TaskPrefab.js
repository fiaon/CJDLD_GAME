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
        img:cc.Sprite,
        taskName:cc.Label,
        completeNum:cc.Label,
        taskNum:cc.Label,
        goldnum:cc.Label,
        diamond:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init:function(type,data){
        if(type == 1){
            this.taskName.string = data.Name +"（  /  ）";
            this.completeNum.string = data.CompleteNum.toString();
            this.taskNum.string = data.TaskNum.toString();
            this.goldnum.string = "x"+data.GiveValue;
            this.diamond.string = "x"+data.GiveValue/10;

        }else{
            // var imgurl = "https://img.zaohegame.com/"+data.Icon;
            this.createImage(data.Icon);
            this.taskName.string = data.Name;
            this.goldnum.string = "x"+data.GiveValue;
        }
    },
    createImage(avatarUrl) {
        if (CC_WECHATGAME) {
            try {
                cc.loader.load({
                    url: avatarUrl, type: 'png'
                }, (err, texture) => {
                    this.img.spriteFrame = new cc.SpriteFrame(texture);
                });
            }catch (e) {
                cc.log(e);
                
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'png'
            }, (err, texture) => {
                this.img.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }

    // update (dt) {},
});
