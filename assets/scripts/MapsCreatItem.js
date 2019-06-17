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
        GameItem:{
            default:null,
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.GameitemMan = this.GameItem.getComponent("GameItemManager");
    },

    start () {
        this.CreateGem();
    },
    //生成宝珠
    CreateGem(){
        var ran = Math.round(Math.random()*30)+30;
        for(let j=0;j<ran;j++){
            this.GameitemMan.CreateGem(this.node.width,this.node.height,this.node);
        }
    },
    //生成道具
    CreateItem(){
        var ran = Math.round(Math.random()*5)+10;
        for(let j=0;j<ran;j++){
            this.GameitemMan.CreateItem(this.node.width,this.node.height,this.node);
        }
    },
    //补充宝珠
    AddItem(){
        //当个区域宝珠少于一半数创建
        if(this.node.childrenCount<(this.ran/2)){
            let num = this.node.children.length;
            //回收该区域剩下的宝珠
            for(let i=0;i<num;i++){
                this.GameitemMan.onGemKilled(this.node.children[0]);
            }
            //创建宝珠
            this.CreateGem();
        }
    },
    //update (dt) {},
});
