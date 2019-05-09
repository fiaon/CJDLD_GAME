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
        map:{
            default:null,
            type:cc.Node,
        },
        gemPrefab:{
            default:[],
            type:cc.Prefab,
        },
        ItemPrefab:{
            default:[],
            type:cc.Prefab,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.GemPool = new cc.NodePool();
        this.ItemPool = new cc.NodePool();
        for(var i=0;i<200;i++){
            var str = Math.round(Math.random()*4);
            var item =  cc.instantiate(this.gemPrefab[str]);
            this.GemPool.put(item);
        }
        for(var i=0;i<40;i++){
            var str = Math.round(Math.random()*2);
            var item =  cc.instantiate(this.ItemPrefab[str]);
            this.ItemPool.put(item);
        }
    },

    start () {
        for(var i=0;i<200;i++){
            this.CreateGem();
        }
        for(var i=0;i<40;i++){
            this.CreateItem();
        }
    },
    CreateGem(){
        var x = Math.random()*(this.map.width/2 - (this.map.width/-2)) + (this.map.width/-2);
        var y = Math.random()*(this.map.height/2 - (this.map.height/-2)) + (this.map.height/-2);
        // var str = Math.round(Math.random()*4);
        // var item =  cc.instantiate(this.gemPrefab[str]);
        let item = null;
        if (this.GemPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            item = this.GemPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            item = cc.instantiate(this.gemPrefab[Math.round(Math.random()*4)]);
        }
        item.x = x;
        item.y = y;
        item.parent = this.node;
        //this.node.addChild(item);
    },
    CreateItem(){
        var x = Math.random()*(this.map.width/2 - (this.map.width/-2)) + (this.map.width/-2);
        var y = Math.random()*(this.map.height/2 - (this.map.height/-2)) + (this.map.height/-2);
        // var str = Math.round(Math.random()*2);
        // var item =  cc.instantiate(this.ItemPrefab[str]);
        let item = null;
        if (this.ItemPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            item = this.ItemPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            item = cc.instantiate(this.ItemPrefab[Math.round(Math.random()*2)]);
        }
        item.x = x;
        item.y = y;
        item.parent = this.node;
        //this.node.addChild(item);
    },
    onGemKilled: function (gem) {
        // gem 应该是一个 cc.Node
        this.GemPool.put(gem); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },
    onItemKilled: function (item) {
        this.ItemPool.put(item); 
    },
    update (dt) {
        //当宝石给吃了50个的时候在创建一些宝石
        if(this.GemPool.size() >50){
            for(var i=0;i<this.GemPool.size();i++){
                this.CreateGem();
            }
        }
        if(this.ItemPool.size() >15){
            for(var i=0;i<this.ItemPool.size();i++){
                this.CreateItem();
            }
        }
        if(Global.dienumber == Global.enemynumber&&Global.is_end ==false){
            cc.find("Canvas/GameOverView").active = true;
            Global.is_end = true;
        }
    },
});
