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
        toggle:{
            default:[],
            type:cc.Toggle,
        },
        Background:{
            default:[],
            type:cc.Sprite,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let self = this;
        this.music =  cc.sys.localStorage.getItem("music");
        if (this.music == null) {
            this.music = "1";//0关，1开
        }
        this.sound =  cc.sys.localStorage.getItem("sound");
        if (this.sound == null) {
            this.sound = "1";//0关，1开
        }
        if(this.music == "1"){
            this.toggle[0].getComponent(cc.Toggle).isChecked = true;
            let url = 'off.png';
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.Background[0].spriteFrame = spriteFrame;
            });
            //self.Background[0].spriteFrame = new cc.SpriteFrame(cc.url.raw('off.png'));
        }else{
            this.toggle[0].getComponent(cc.Toggle).isChecked = false;
            let url = 'on.png';
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.Background[0].spriteFrame = spriteFrame;
            });
            //self.Background[0].spriteFrame = new cc.SpriteFrame(cc.url.raw('on.png'));
        }
        if(this.sound == "1"){
            this.toggle[1].getComponent(cc.Toggle).isChecked = true;
            let url = 'off.png';
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.Background[1].spriteFrame = spriteFrame;
            });
            //self.Background[1].spriteFrame = new cc.SpriteFrame(cc.url.raw('off.png'));
        }else{
            this.toggle[1].getComponent(cc.Toggle).isChecked = false;
            let url = 'on.png';
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.Background[1].spriteFrame = spriteFrame;
            });
            //self.Background[1].spriteFrame = new cc.SpriteFrame(cc.url.raw('on.png'));
        }
    },
    onCheckMusic(){
        let self = this;
        if(this.toggle[0].getComponent(cc.Toggle).isChecked){
            let url = 'off.png';
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.Background[0].spriteFrame = spriteFrame;
            });
            //self.Background[0].spriteFrame = new cc.SpriteFrame(cc.url.raw('off.png'));
            this.music =  cc.sys.localStorage.setItem("music","1");
        }else{
            let url = 'on.png';
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.Background[0].spriteFrame = spriteFrame;
            });
            //self.Background[0].spriteFrame = new cc.SpriteFrame(cc.url.raw('on.png'));
            this.music =  cc.sys.localStorage.setItem("music","0");
        }
    },
    onCheckSound(){
        let self = this;
        if(this.toggle[1].getComponent(cc.Toggle).isChecked){
            let url = 'off.png';
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.Background[1].spriteFrame = spriteFrame;
            });
            //self.Background[1].spriteFrame = new cc.SpriteFrame(cc.url.raw('off.png'));
            this.music =  cc.sys.localStorage.setItem("sound","1");
        }else{
            let url = 'on.png';
            cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
                self.Background[1].spriteFrame = spriteFrame;
            });
            //self.Background[1].spriteFrame = new cc.SpriteFrame(cc.url.raw('on.png'));
            this.music =  cc.sys.localStorage.setItem("sound","0");
        }
    },
    CloseView(){
        this.node.destroy();
    }
    // update (dt) {},
});
