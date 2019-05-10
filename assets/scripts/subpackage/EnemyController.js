// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var peopleNumber = require("peopleNumber");

cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab:{
            default:null,
            type:cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.enemyPool = new cc.NodePool();
        for(let i = 0; i < Global.enemynumber; ++i){
            let enemy = cc.instantiate(this.enemyPrefab); // 创建节点
            this.enemyPool.put(enemy); // 通过 put 接口放入对象池
        }
    },

    start () {
        this.map =  cc.find("Canvas/bg001");
        for(let i = 0; i < Global.enemynumber; ++i){
            this.createEnemy(i);
        }
        peopleNumber.getInstance().init();
        let p = peopleNumber.getInstance().people;
        cc.game.emit('change',p);
        if(Global.is_end){
            Global.is_end = false;
            Global.dienumber = 0;
        }
    },
    createEnemy: function (i) {
        let enemy = null;
        if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            enemy = this.enemyPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemy = cc.instantiate(this.enemyPrefab);
        }
        var x = Math.random()*(this.map.width/2 - (this.map.width/-2) - enemy.width) + (this.map.width/-2+enemy.width/2);
        var y = Math.random()*(this.map.height/2 - (this.map.height/-2)- enemy.height) + (this.map.height/-2+enemy.height/2);
        enemy.position = cc.v2(x,y);
        let imgurl = "hero/hero_" + Math.round(Math.random()*2+1);
        cc.loader.loadRes(imgurl, cc.SpriteFrame, function (err, spriteFrame) {
            cc.find("playerImg/heroImg",enemy).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        enemy.getComponent("EnemyManager").gameuuid = i.toString();
        //cc.sys.localStorage.setItem(i.toString(),"0");
        enemy.parent = this.node; // 将生成的敌人加入节点树
    },
    // update (dt) {},

    onEnemyKilled: function (enemy) {
        this.enemyPool.put(enemy); 
    },
});
