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
        prefab:{
            default:[],
            type:cc.Prefab,
        },
        goldtext:cc.Label,
        diamondtext:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let self = this;
        this.goldtext.string = Global.gold;
        this.diamondtext.string = Global.diamond;
        //监听刚改变金币或者钻石时发送
        cc.game.on('UserChang',function(){
            self.goldtext.string = Global.gold;
            self.diamondtext.string = Global.diamond;
        },this)
    },
    //按钮点击功能（创建预设体）
    onOpen: function (event, customEventData) {
        var node = event.target;
        var button = node.getComponent(cc.Button);
        //这里的 customEventData 参数就等于你之前设置的 "click1 user data"
        for(var i=0;i<this.prefab.length;i++){
            if(this.prefab[i].name == customEventData){
                var pre = cc.instantiate(this.prefab[i]);
                cc.find("Canvas").addChild(pre);
            }
        }
    },
    // update (dt) {},
});
