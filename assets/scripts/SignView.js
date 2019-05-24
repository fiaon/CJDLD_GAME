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
        sign:{
            default:[],
            type:cc.Node,
        },
        receivePrefab:cc.Prefab,
        ReceiveBtn:cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.curday = 0;
        Global.GetUserSignInfo((res)=>{
            if(res.state == 1){
                if(res.result.istoday!=0||res.result.isvideo!=0){
                    for(let i=0;i<res.result.days;i++){
                        this.sign[i].getChildByName("mask").active = true;
                        this.ReceiveBtn.interactable = false;
                    }
                }else if(res.result.istoday ==0||res.result.isvideo==0){
                    this.curday = res.result.days;
                    if(res.result.days>1){
                        for(let i=0;i<res.result.days-1;i++){
                            this.sign[i].getChildByName("mask").active = true;
                        }
                    }
                }
            }
        });
        // this.ReceiveBtn.interactable = false;
    },
    //领取奖励
    Receive(){
        var receive = cc.instantiate(this.receivePrefab);
        var num = this.sign[this.curday-1].getChildByName("number").getComponent(cc.Label).string;
        var arr = num.split("x");
        let data = {
            curday:this.curday,
            number:parseInt(arr[1]),
        }
        receive.getComponent("RewardPrefab").init(2,data);
        cc.find("Canvas").addChild(receive);
    },
    // update (dt) {},
});
