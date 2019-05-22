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
        userPrefab:cc.Prefab,
        content:{
            default:null,
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        Global.GetAllRank((res)=>{
            if(res.result.rank.length>0){
                for(let i=0;i<res.result.rank.length;i++){
                    var rank = cc.instantiate(this.rankPrefab);
                    rank.getComponent("RankItem").init(i,res.result.rank[i]);
                    this.content.addChild(rank);
                }
            }
            var user = cc.instantiate(this.userPrefab);
            user.getComponent("UserRank").init(res.result.user);
            this.node.addChild(user);
        });
    },

    // update (dt) {},
});
