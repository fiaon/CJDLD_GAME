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
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.col = true;
        this.player =  cc.find("Canvas/player").getComponent("Player");
    },
    onBoomDestroy(){
        this.node.destroy();
    },
    // update (dt) {},
    onCollisionEnter: function (other, self) {
        if(other.node.group == "enemy"&&this.col){
            this.col = false;
            this.node.getComponent(cc.Animation).play('skill_Mogu');
            other.getComponent("EnemyManager").EnemyDamage();
            other.getComponent("EnemyManager").killername = this.player.Heroname.string;
            console.log("敌人踩到蘑菇");
        }
    },
});
