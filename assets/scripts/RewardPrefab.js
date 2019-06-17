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
        btn:cc.Button,
        text:cc.Node,
        number:cc.Label,
        type:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init:function(type,data){
        this.type = type;
        let self = this;
        // 类型 1:英雄  2:签到  3:转盘  4:视频结束 5：游戏结束的点击金币
        if(this.type == 2){
            if(data.curday>0&&data.curday <5){
                var imgurl = "coin";
                this.signtype = 2;//0：金币 1：钻石
                cc.loader.loadRes(imgurl, cc.SpriteFrame, function (err, spriteFrame) {
                    self.img.spriteFrame = spriteFrame;
                });
            }else if(data.curday>=5&&data.curday <7){
                var imgurl = "diamonds";
                this.signtype = 1;
                cc.loader.loadRes(imgurl, cc.SpriteFrame, function (err, spriteFrame) {
                    self.img.spriteFrame = spriteFrame;
                });
            }else{
                var imgurl = "bigdiamonds";
                this.signtype = 1;
                cc.loader.loadRes(imgurl, cc.SpriteFrame, function (err, spriteFrame) {
                    self.img.spriteFrame = spriteFrame;
                });
            }
            this.signNum = data.number;
            self.number.string = "x"+data.number*2;
        }else if(this.type == 3){
            this.text.active = false;
            this.btn.node.active = false;
            this.UserChange(data);
        }else if(this.type == 5){
            this.signNum = data;
            this.text.active = false;
            this.number.string = "x"+data;
            this.btn.node.getChildByName("textImg").active = false;
            this.btn.node.getChildByName("confirm").active = true;
             //增加金币
             Global.UserChange(2,1,"签到",this.signNum,(res)=>{
                if(res.state ==1){
                    Global.gold+= this.signNum;
                    cc.game.emit('UserChang');
                }
            });
        }
    },
    OnClose(){
        if(this.type == 2){
            Global.UserSign(2,(res)=>{
                if(res.state ==1){
                    //增加金币
                    Global.UserChange(this.signtype,1,"签到",this.signNum,(res)=>{
                        if(res.state ==1){
                            if(this.signtype == 2){
                                Global.gold+= this.signNum;
                            }else{
                                Global.diamond+= this.signNum;
                            }
                            cc.game.emit('UserChang');
                        }
                    });
                }
            });
            Global.is_sign = true;
        }
        this.node.destroy();
    },
    UserChange(data){
        switch(data){
            case 1:
                this.signtype = 2;
                //增加金币
                Global.UserChange(this.signtype,1,"转盘奖励",100,(res)=>{
                    if(res.state ==1){
                        if(this.signtype == 2){
                            Global.gold+= 100;
                            cc.game.emit('UserChang');
                        }
                    }
                });
                this.number.string = "x100";
                break;
            case 3:
                this.signtype = 2;
                //增加金币
                Global.UserChange(this.signtype,1,"转盘奖励",50,(res)=>{
                    if(res.state ==1){
                        if(this.signtype == 2){
                            Global.gold+= 50;
                            cc.game.emit('UserChang');
                        }
                    }
                });
                this.number.string = "x50";
                break;
            case 5:
                this.signtype = 2;
                //增加金币
                Global.UserChange(this.signtype,1,"转盘奖励",1000,(res)=>{
                    if(res.state ==1){
                        if(this.signtype == 2){
                            Global.gold+= 1000;
                            cc.game.emit('UserChang');
                        }
                    }
                });
                this.number.string = "x1000";
                break;
            case 6:
                this.signtype = 2;
                //增加金币
                Global.UserChange(this.signtype,1,"转盘奖励",400,(res)=>{
                    if(res.state ==1){
                        if(this.signtype == 2){
                            Global.gold+= 400;
                            cc.game.emit('UserChang');
                        }
                    }
                });
                this.number.string = "x400";
                break;
            case 8:
                this.signtype = 2;
                //增加金币
                Global.UserChange(this.signtype,1,"转盘奖励",200,(res)=>{
                    if(res.state ==1){
                        if(this.signtype == 2){
                            Global.gold+= 200;
                            cc.game.emit('UserChang');
                        }
                    }
                });
                this.number.string = "x200";
                break;
            default:
            break;
        }
    },
    // update (dt) {},
});
