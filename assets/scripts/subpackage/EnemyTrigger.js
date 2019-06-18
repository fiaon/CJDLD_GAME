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
        // var manager = cc.director.getCollisionManager();
        // manager.enabledDebugDraw = true;
        this.dir = cc.v2(0,0);
        this.behit = true;
        this.cd = false;
        this.map =  cc.find("Canvas/bg001");
        this.gameuuid = this.enemy.getComponent("EnemyManager").gameuuid;
        this.isGO = true;
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
        this.isGO = false;
        //cc.v2(0,0)因为otherpos是通过机器人节点转换的原来是传入this.enemy.position
        var pos = otherpos.sub(cc.v2(0,0));
        var len = pos.mag();
        if(len !=0 ){
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;
            this.is_trigger =true;
        }
    },
    // lookAtObj(target){
    //     //计算出朝向
    //     var dx = target.x - this.node.x;
    //     var dy = target.y - this.node.y;
    //     var dir = cc.v2(dx,dy);
    
    //     //根据朝向计算出夹角弧度
    //     var angle = dir.signAngle(cc.v2(1,0));
    
    //     //将弧度转换为欧拉角
    //     var degree = angle / Math.PI * 180;
    
    //     //赋值给节点
    //     this.node.rotation = degree;
    // },
    //道具的节点坐标转换成机器人下的坐标(直接转换世界坐标位置不对)
    convetOtherNodeSpaceAR(node, targetNode) {
        if (!node || !targetNode) {
            return null;
        }
        //先转成世界坐标
        let worldPoint = node.convertToWorldSpaceAR(cc.v2(0, 0));
        return targetNode.convertToNodeSpaceAR(worldPoint);
    },

    onCollisionEnter: function (other, self) {
        //判断碰撞的类型
        if(this.behit&&this.isGO){
            if(other.node.group == "player"){
                this.playerAttack(other.node.position);
            }else if(other.node.group == "enemy" && other.getComponent("EnemyManager").gameuuid != this.gameuuid){
                this.playerAttack(other.node.position);
            }else if(other.node.group == "gem"){
                this.ComputeDir(this.convetOtherNodeSpaceAR(other.node,this.enemy));
            }
        }
        
    },
    onCollisionStay: function (other, self) {
        if(this.isGO){
            if(other.node.group == "gem"&&this.behit){
                // console.log("Stayposition: "+this.convetOtherNodeSpaceAR(other.node,this.enemy));
                // console.log("本地坐标: "+other.node.position);
                // console.log("Stay本地转世界坐标: "+other.node.convertToWorldSpaceAR(cc.v2(0, 0)));
                this.ComputeDir(this.convetOtherNodeSpaceAR(other.node,this.enemy));
            }
        }   
    },
    onCollisionExit: function (other, self) {
        this.isGO = true;
    },
    //平A技能（往前撞击）
    playerAttack(otherpos){
        this.enemy.getComponent("EnemyManager").isattack = true;
        var pos = otherpos.sub(this.enemy.position);
        var len =  pos.mag();
        this.dir.x =  pos.x / len;
        this.dir.y =  pos.y / len;
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
        this.behit = false;
        this.scheduleOnce(function() {
            this.cd = false;
            this.behit = true;
            this.enemy.getComponent("EnemyManager").isattack = false;
        }, 1);
        cc.tween(this.enemy)
        .to(1, { position: cc.v2(this.enemy.x+dirVec.x*80,this.enemy.y+dirVec.y*80) })
        .start()
    },
    
});
