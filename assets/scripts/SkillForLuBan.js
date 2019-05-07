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
        // 将角度转换为弧度
        this.player =  cc.find("Canvas/player").getComponent("Player");
        this.node.rotation = this.player.player.rotation +90;
        let radian  = cc.misc.degreesToRadians(this.player.player.rotation);
        let comVec = cc.v2(0, 1);// 一个向上的对比向量
        this.dirVec = comVec.rotate(-radian);
    },

    update (dt) {
        if(this.col){
            this.node.x += this.dirVec.x*dt*300;
            this.node.y += this.dirVec.y*dt*300;
            var top = this.player.map.height / 2;
            var bottom = -top;
            var left = - this.player.map.width / 2;
            var right = -left;
            var outScreen = this.node.x < left || this.node.x > right || this.node.y < bottom || this.node.y > top;
            if (outScreen) {
                this.node.destroy();
            }
        }
    },
    onBoomDestroy(){
        this.node.destroy();
    },
    onCollisionEnter: function (other, self) {
        if(other.node.group == "enemy"&&this.col&&other.getComponent("EnemyManager").trigger.behit){
            this.col = false;
            this.node.getComponent(cc.Animation).play('skill_boom');
            other.getComponent("EnemyManager").EnemyDamage();
            console.log("击中敌人");
        }
    },
});
