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
        userimg:cc.Sprite,
        username:cc.Label,
        duan:cc.Sprite,
        duantext:cc.Label,
        playcount:cc.Label,
        maxkill:cc.Label,
        win:cc.Label,
        heroimg:cc.Sprite,
        idText:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //赋值
        let self = this;
        var imgurl = Global.avatarUrl +"?aaa=aa.jpg";
        cc.loader.load({url:imgurl, type: 'jpg'},function(err, texture){
            if(texture){ 
                var spriteFrame = new cc.SpriteFrame(texture);
                self.userimg.spriteFrame = spriteFrame;
            }
        });
        this.username.string = Global.name;
        let url = Global.userlvl+'.png';
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            self.duan.spriteFrame = spriteFrame;
        });
        this.duantext.string = Global.duntext;
        this.playcount.string = Global.playcount+"次";
        this.maxkill.string =Global.bestkill+"杀";
        let shenlv = "0%";
        if(Global.wincount!=0||Global.playcount!=0){
            shenlv = (Global.wincount*100 / Global.playcount).toFixed(2) +'%';
        }
        this.win.string = shenlv;
        if(Global.heroid){
            let hero_img = "hero/hero_"+Global.heroid;
            cc.loader.loadRes(hero_img, cc.SpriteFrame, function (err, spriteFrame) {
                self.heroimg.spriteFrame = spriteFrame;
            });
        }
        this.idText.string = "ID:"+Global.userkey;
    },

    // update (dt) {},
});
