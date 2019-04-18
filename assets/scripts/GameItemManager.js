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

    // onLoad () {},

    start () {
        for(var i=0;i<100;i++){
            this.CreateGem();
        }
        for(var i=0;i<20;i++){
            this.CreateItem();
        }
    },
    CreateGem(){
        var x = Math.random()*(this.map.width/2 - (this.map.width/-2)) + (this.map.width/-2);
        var y = Math.random()*(this.map.height/2 - (this.map.height/-2)) + (this.map.height/-2);
        var str = Math.ceil(Math.random()*4);
        var item =  cc.instantiate(this.gemPrefab[str]);
        item.x = x;
        item.y = y;
        //item.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(str));
        this.node.addChild(item);
    },
    CreateItem(){
        var x = Math.random()*(this.map.width/2 - (this.map.width/-2)) + (this.map.width/-2);
        var y = Math.random()*(this.map.height/2 - (this.map.height/-2)) + (this.map.height/-2);
        var str = Math.ceil(Math.random()*2);
        var item =  cc.instantiate(this.ItemPrefab[str]);
        item.x = x;
        item.y = y;
        this.node.addChild(item);
    }
    // update (dt) {},
});
