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
        duanimg:cc.Sprite,
        duantext:cc.Label,
        starImg:{
            default:[],
            type:cc.Sprite,
        },
        jifenBar:cc.ProgressBar,
        jifenText:cc.Label,
        addScore:cc.Label,
        goldNum:cc.Label,
        diamonds:cc.Label,
        content:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    
    start () {
        this.content.active = false;
        let self = this;
        var kill = cc.find("Canvas/player").getComponent("Player").killsnumber;
        var rank = Global.enemynumber-Global.dienumber+1;
        //结算请求.会返回获得的金币钻石和积分
        Global.GameSettle(Global.defhid,kill,rank,(res)=>{
            if(res.state ==1){
                self.goldNum.string = "x"+res.result.Gold;
                self.diamonds.string = "x"+res.result.Diamonds;
            }
            
        });
        this.time = 10;
        this.number =0;
        this.timeDown.string = this.time;
        this.goldnumber.string = this.number;
        cc.find("Canvas/mask").active= false;
        //赋值结算页面的信息
        let url = Global.userlvl+'.png';
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            self.duanimg.spriteFrame = spriteFrame;
        });
        this.duantext.string = Global.duntext;
        //设置星星
        switch(Global.userlvl){
            case 1:
               this.ComputeStar(100);
                break;
            case 2:
                this.ComputeStar(150);
                break;
            case 3:
                this.ComputeStar(200);
                break;
            case 4:
                this.ComputeStar(350);
                break;
            case 5:
                this.ComputeStar(500);
                break;
            case 6:
                this.ComputeStar(700);
                break;
            case 7:
                this.ComputeStar(1000);
                break;
            case 8:
                this.ComputeStar(1500);
                break;
            default:
                break;
        }
        if(36-Global.dienumber>3){
            this.addScore.string = "-25";
            
        }else{
            this.addScore.string = "+50";
        }
        
        
    },
    //计算星星段位不同每颗星星的积分不同
    ComputeStar(jifen){
        for(let i =0;i<Global.SeaonLvl.length;i++){
            if(Global.userlvl == Global.SeaonLvl[i].id){
                var score = (Global.score -Global.SeaonLvl[i].minscore +1)/ jifen;
                this.ChangeStarImg(Math.floor(score))
                var curscore =  0;
                if(Global.userlvl==1){
                    curscore = (Global.score -Global.SeaonLvl[i].minscore)%jifen;
                }else{
                    curscore = (Global.score -Global.SeaonLvl[i].minscore +1)%jifen;
                }
                this.jifenBar.progress = curscore / jifen;
                this.jifenText.string = curscore +"/"+jifen;

            }
        }
    },
    ChangeStarImg(num){
        let self = this;
        let starImgurl = "duan_star";
        for(let i=0;i<num;i++){
            cc.loader.loadRes(starImgurl, cc.SpriteFrame, function (err, spriteFrame) {
                self.starImg[i].spriteFrame = spriteFrame;
            });
        }

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
            //this.node.active = false;
            this.unschedule(this.doCountdownTime);
            //关闭按钮点击
            cc.find("Canvas/GameOverView/smallgameView/bg/clickBtn").getComponent(cc.Button).interactable =false;
            var pre = cc.instantiate(this.RewardView);
            pre.getComponent("RewardPrefab").init(5,this.number);
            cc.find("Bg/ConfirmBtn",pre).on(cc.Node.EventType.TOUCH_START,function(e){
                var name = pre.name;
                cc.find("Canvas/"+name).destroy();
                cc.find("Canvas/GameOverView").active =false;
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
    //测试 再来一局
    Again(){
        cc.director.loadScene("Game.fire");
    }
    // update (dt) {},
});
