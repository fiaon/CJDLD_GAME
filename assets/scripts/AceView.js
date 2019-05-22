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
        rankPrefab:cc.Prefab,
        content:{
            default:null,
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        Global.GetAllRank((res)=>{
            if(res.result.Obj.length>0){
                for(let i=0;i<res.result.Obj.length;i++){
                    var rank = cc.instantiate(this.rankPrefab);
                    rank.getComponent("RankItem").init(i,res.result.Obj[i]);
                    this.content.addChild(rank);
                }
                
            }
        });
    },

    // update (dt) {},
});
