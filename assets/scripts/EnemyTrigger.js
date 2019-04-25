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
        map:{
            default:null,
            type:cc.Node,
        },
        speed:100,
        is_trigger:false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.dir = cc.v2(0,0);
        
    },

    update (dt) {
        if(this.is_trigger && !Global.is_end){
            var vx = this.dir.x * this.speed;
            var vy = this.dir.y * this.speed;

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
        this.dir.x = this.pos.x / len;
        this.dir.y = this.pos.y / len;

        this.is_trigger =true;
    },
    
    onCollisionEnter: function (other, self) {
        //判断碰撞的类型
        this.ComputeDir(other.node.position)
    },
    onCollisionStay: function (other, self) {
        
        if(other.node.group == "player"){
            this.ComputeDir(other.node.position)
        }else{
            if(other.node.group == "gem"){
                this.ComputeDir(other.node.position)
            }else if(other.node.group == "item"){
                this.ComputeDir(other.node.position)
            }
        } 
    },
    // onCollisionExit: function (other, self) {
    //     if(other.node.group == "player"){
    //         console.log("enemyPos "+ this.enemy.position);
    //         this.is_trigger = false;
    //     }
    // }
});
