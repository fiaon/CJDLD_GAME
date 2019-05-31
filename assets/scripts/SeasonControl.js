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
        seasonprefab:cc.Prefab,
        time:cc.Label,
        content:cc.Node,
        text:cc.RichText,
        recordView:cc.Node,
        recordcontent:cc.Node,
        recordPrefab:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var timedate = new Date();
        this.day = 0;
        this.hour = 0;
        Global.GetSeaonLvl((res)=>{
            this.day = Math.floor((res.result.etime - timedate.getTime())/86400000);
            this.hour = Math.floor((res.result.etime - timedate.getTime())%86400000/3600000);
            this.time.string = this.day+"天"+this.hour+"小时";
            if(res.result.list.length>0){
                for(let i=res.result.list.length-1;i>=0;i--){
                    var season = cc.instantiate(this.seasonprefab);
                    season.getComponent("SeasonPrefab").init(res.result.list[i]);
                    this.content.addChild(season);
                    if(res.result.list[i].id == Global.userlvl){
                        let score = res.result.list[i].maxscore - Global.score;
                        this.text.string = "还差<size=60><color=#EEE83E>"+score+"</c></size>积分可获得更高奖励";
                    }
                }
            }
        });
    },
    OpenRecordView(){
        this.recordView.active = true;
        Global.GetUserSeaon((res)=>{
            if(res.result.length>0){
                for(let i=0;l<res.result.length;i++){
                    var record = cc.instantiate(this.recordPrefab);
                    record.getComponent("SeasonRecordPrefab").init(res.result[i]);
                    this.recordcontent.addChild(record);
                }
            }
        });
    },

    // update (dt) {},
});
