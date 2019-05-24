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
        taskprefab:cc.Prefab,
        content:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        Global.GetMission((res)=>{
            //state:1请求成功
            if(res.state == 1){
                if(this.node.name == "daystaskView"){
                    if(res.result.daymission.list.length>0){
                        for(let i=0;i<res.result.daymission.list.length;i++){
                            var task = cc.instantiate(this.taskprefab);
                            task.getComponent("TaskPrefab").init(res.result.daymission.type,res.result.daymission.list[i]);
                            this.content.addChild(task);
                        }
                    }
                }else{
                    if(res.result.pgmission.list.length>0){
                        for(let i=0;i<res.result.pgmission.list.length;i++){
                            var task = cc.instantiate(this.taskprefab);
                            task.getComponent("TaskPrefab").init(res.result.pgmission.type,res.result.pgmission.list[i]);
                            this.content.addChild(task);
                        }
                    }
                }
            }
        });
    },

    // update (dt) {},
});
