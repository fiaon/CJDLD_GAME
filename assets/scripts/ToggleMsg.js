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
            default:null,
            type:cc.Toggle,
        },
        Background:{
            default:null,
            type:cc.Sprite,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onCheck(){
       if(this.toggle.getComponent(cc.Toggle).isChecked){
           this.Background.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/off.png'));
       }else{
        this.Background.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/on.png'));
       }
    }

    // update (dt) {},
});
