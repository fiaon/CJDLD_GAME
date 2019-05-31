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
        enemy:{
            default:null,
            type:cc.Node,
        },
        is_trigger:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dir = cc.v2(0,0);
        this.behit = true;
        this.cd = false;
        this.map =  cc.find("Canvas/bg001");
        this.gameuuid = this.enemy.getComponent("EnemyManager").gameuuid;
    },

    start () {
        
    },

    update (dt) {
        if(this.is_trigger && !Global.is_end && this.behit){
            var vx = this.dir.x * this.enemy.getComponent("EnemyManager").speed;
            var vy = this.dir.y * this.enemy.getComponent("EnemyManager").speed;

            var sx = vx * dt;
            var sy = vy * dt;
            //移动
            this.enemy.x += sx;
            this.enemy.y += sy;
            //方向计算
            var r = Math.atan2(this.dir.y,this.dir.x);
            var degree = r * 180/(Math.PI);
            degree = 360 - degree + 90;
            this.enemy.getComponent("EnemyManager").player.rotation = degree;
            //人物移动不能超过地图边界
            if(this.enemy.x<0 && Math.abs(this.enemy.x -this.node.width/2)>=(this.map.width/2)){
                this.is_trigger =false;
            }else if(this.enemy.x>0 && Math.abs(this.enemy.x +this.node.width/2)>=(this.map.width/2)){
                this.is_trigger =false;
            }else if(this.enemy.y>0 && Math.abs(this.enemy.y +this.node.height/2)>=(this.map.height/2)){
                this.is_trigger =false;
            }else if(this.enemy.y<0 && Math.abs(this.enemy.y -this.node.height/2)>=(this.map.height/2)){
                this.is_trigger =false;
            }
        }
    },
    ComputeDir(otherpos){
    
        this.pos = otherpos.sub(this.enemy.position);
        var len = this.pos.mag();
        if(len !=0 ){
            this.dir.x = this.pos.x / len;
            this.dir.y = this.pos.y / len;
            this.is_trigger =true;
        }

    },
    
    onCollisionEnter: function (other, self) {
        //判断碰撞的类型
        if(this.behit){
            if(other.node.group == "player"){
                this.playerAttack(other.node.position);
            }else if(other.node.group == "enemy" && other.getComponent("EnemyManager").gameuuid != this.gameuuid){
                this.playerAttack(other.node.position);
            }else if(other.node.group == "gem"){
                this.ComputeDir(other.node.position);
            }else if(other.node.group == "item"){
                this.ComputeDir(other.node.position);
            }
        }
        
    },
    onCollisionStay: function (other, self) {
        
        
        if(other.node.group == "gem"&&this.behit){
            this.ComputeDir(other.node.position);
        }else if(other.node.group == "item"&&this.behit){
            this.ComputeDir(other.node.position);
        }
        
    },
    //平A技能（往前撞击）
    playerAttack(otherpos){
        this.enemy.getComponent("EnemyManager").isattack = true;
        this.pos = otherpos.sub(this.enemy.position);
        var len = this.pos.mag();
        this.dir.x = this.pos.x / len;
        this.dir.y = this.pos.y / len;
        //方向计算
        var r = Math.atan2(this.dir.y,this.dir.x);
        var degree = r * 180/(Math.PI);
        degree = 360 - degree + 90;
        this.enemy.getComponent("EnemyManager").player.rotation = degree;
        //播放特效
        this.enemy.getComponent("EnemyManager").player.getChildByName("attack").getComponent(cc.Animation).play('attack');
        // 将角度转换为弧度
        let radian  = cc.misc.degreesToRadians(degree);
        let comVec = cc.v2(0, 1);// 一个向上的对比向量
        let dirVec = comVec.rotate(-radian);
        this.cd = true;
        this.scheduleOnce(function() {
            this.cd = false;
            this.enemy.getComponent("EnemyManager").isattack = false;
        }, 1);
        cc.tween(this.enemy)
        .to(1, { position: cc.v2(this.enemy.x+dirVec.x*80,this.enemy.y+dirVec.y*80) })
        .start()
    },
    
});
