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
        avatarImgSprite: cc.Sprite,
        nickLabel: cc.Label,
        maxkill: cc.Label,
        score:cc.Label,
        dun:cc.Sprite,
        duntext:cc.Label,
        rankImg:cc.Sprite,
        ranknumber_1:cc.Sprite,
        ranknumber_2:cc.Sprite,
    },
    start() {

    },

    init: function (rank, data) {
        let avatarUrl = data.headurl;
        // let nick = data.nickname.length <= 10 ? data.nickname : data.nickname.substr(0, 10) + "...";
        let nick = data.nick;
        

        this.createImage(avatarUrl);
        this.nickLabel.string = nick;
        this.maxkill.string = data.bestkill.toString();
        this.score.string = data.score.toString();
        this.duntext.string = data.thelvlname;
        let url = data.thelvl+'.png';
        let self = this;
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            self.dun.spriteFrame = spriteFrame;
        });
        if(rank == 0){
            cc.loader.loadRes('NO1.png', cc.SpriteFrame, function (err, spriteFrame) {
                self.rankImg.spriteFrame = spriteFrame;
            });
        }else if(rank == 1){
            cc.loader.loadRes('NO2.png', cc.SpriteFrame, function (err, spriteFrame) {
                self.rankImg.spriteFrame = spriteFrame;
            });
        }else if(rank == 2){
            cc.loader.loadRes('NO3.png', cc.SpriteFrame, function (err, spriteFrame) {
                self.rankImg.spriteFrame = spriteFrame;
            });
        }else if(rank <9 && rank>2){
            self.rankImg.node.active = false;
            let rankurl = 'number_'+(rank +1)+'.png';
            cc.loader.loadRes(rankurl, cc.SpriteFrame, function (err, spriteFrame) {
                self.ranknumber_1.spriteFrame = spriteFrame;
            });
        }else{
            self.rankImg.node.active = false;
            self.ranknumber_2.node.active = true;
            let n = rank+1;
            let n_1 = parseInt(n/10);
            let n_2 = n%10;
            let rankurl = 'number_'+n_1+'.png';
            cc.loader.loadRes(rankurl, cc.SpriteFrame, function (err, spriteFrame) {
                self.ranknumber_1.spriteFrame = spriteFrame;
            });
            let rankurl_2 = 'number_'+n_2+'.png';
            cc.loader.loadRes(rankurl_2, cc.SpriteFrame, function (err, spriteFrame) {
                self.ranknumber_2.spriteFrame = spriteFrame;
            });
        }
           
    },
    createImage(avatarUrl) {
        if (CC_WECHATGAME) {
            try {
                // let image = wx.createImage();
                // image.onload = () => {
                //     try {
                //         let texture = new cc.Texture2D();
                //         texture.initWithElement(image);
                //         texture.handleLoadedTexture();
                //         this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
                //     } catch (e) {
                //         cc.log(e);
                        
                //     }
                // };
                // image.src = avatarUrl;
                cc.loader.load({
                    url: avatarUrl+"?aaa=aa.jpg", type: 'jpg'
                }, (err, texture) => {
                    this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
                });
            }catch (e) {
                cc.log(e);
                
            }
        } else {
            cc.loader.load({
                url: avatarUrl+"?aaa=aa.jpg", type: 'jpg'
            }, (err, texture) => {
                this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }

});
