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
        display:{
            type:cc.Sprite,
            default:null 
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if (CC_WECHATGAME) {
            // 发消息给子域
            window.wx.postMessage({
                messageType: 1,
                score: Global.score,
                maxkill:Global.bestkill,
                duntext:Global.duntext,
                id:Global.userlvl,
            });
        } 
        this.tex = new cc.Texture2D();
        
    },
    submitScoreButtonFunc(){
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: 3,
                score: Global.score,
                maxkill:Global.bestkill,
                duntext:Global.duntext,
                id:Global.userlvl,
            });
        }
    },
    groupFriendButtonFunc: function (event) {
        if (CC_WECHATGAME) {
            window.wx.shareAppMessage({
                success: (res) => {
                    console.log("shareAppMessage: "+res);
                    if (res.shareTickets != undefined && res.shareTickets.length > 0) {
                        window.wx.postMessage({
                            messageType: 5,
                            score: Global.score,
                            maxkill:Global.bestkill,
                            duntext:Global.duntext,
                            id:Global.userlvl,
                            shareTicket: res.shareTickets[0]
                        });
                    }
                }
            });
        }
    },

    _updaetSubDomainCanvas () {
        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    },
    update (dt) {
        this._updaetSubDomainCanvas();
    },
});
