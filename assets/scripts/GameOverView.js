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
        timeDown:{
            default:null,
            type:cc.Label,
        },
        goldnumber:{
            default:null,
            type:cc.Label,
        },
        RewardView:{
            default:null,
            type:cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    
    start () {
        this.time = 10;
        this.number =0;
        this.timeDown.string = this.time;
        this.goldnumber.string = this.number;
        
        //赋值结算页面的信息

    },
    //倒计时
    doCountdownTime(){
        //每秒更新显示信息
        if (this.time > 0 ) {
            this.time -= 1;
            this.timeDown.string = this.time;
            this.countDownShow(this.time);
        }
    },

    countDownShow(temp){
        if(temp <= 0){
            //倒计时结束
            this.unschedule(this.doCountdownTime);
            //关闭按钮点击
            cc.find("Canvas/GameOverView/smallgameView/bg/clickBtn").getComponent(cc.Button).interactable =false;
            var pre = cc.instantiate(this.RewardView);
            cc.find("Bg/Video",pre).active = false;
            cc.find("Bg/CloseBtn",pre).active = false;
            cc.find("Bg/Number",pre).getComponent(cc.Label).string = "x" + this.goldnumber.string;
            cc.find("Bg/ConfirmBtn",pre).y = -95;
            cc.find("Bg/ConfirmBtn/textImg",pre).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/confirm.png'));
            cc.find("Bg/ConfirmBtn/textImg",pre).width = 30;
            cc.find("Bg/ConfirmBtn/textImg",pre).height = 15;
            cc.find("Bg/ConfirmBtn",pre).on(cc.Node.EventType.TOUCH_START,function(e){
                this.node.active = false;
                var name = pre.name;
                cc.find("Canvas/"+name).destroy();
                cc.find("Canvas/GameOver_2View_danren").active = true;
            },this);
            pre.group = "GameUI";
            cc.find("Canvas").addChild(pre);
            //打开广告
        }
    },
    onClickGame(){
        this.number +=1;
        this.goldnumber.string = this.number;
    },
    //观看视频领取双倍
    videoBtn(){

    },
    //稍后领取
    pickBtn(){
        cc.find("Canvas/GameOverView/bg").active = false;
        cc.find("Canvas/GameOverView/smallgameView").active = true;
        // 倒计时
        this.schedule(this.doCountdownTime,1);
    },

    // update (dt) {},
});
