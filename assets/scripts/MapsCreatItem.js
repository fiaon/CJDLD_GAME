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

    // onLoad () {},

    start () {
        
        
    },
    init:function(){
        this.CreateItem();
    },
    //生成宝珠
    CreateItem(){
        this.ran = Math.round(Math.random()*30)+30;
        for(let j=0;j<this.ran;j++){
            this.GameItem.getComponent("GameItemManager").CreateGem(this.node.width,this.node.height,this.node);
        }
    },
    update (dt) {
        //当个区域宝珠少于一半数创建
        if(this.node.childrenCount<(this.ran/2)){
            let num = this.node.children.length;
            for(let i=0;i<num;i++){
                this.GameItem.getComponent("GameItemManager").onGemKilled(this.node.children[0]);
            }
            this.CreateItem();
        }
    },
});
