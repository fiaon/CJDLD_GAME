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
        trigger:{
            default:null,
            type:require("EnemyTrigger"),
        },
        map:{
            default:null,
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
        this.ismove = false;
    },
    
    update (dt) {
        if(!this.trigger.is_trigger && this.trigger.dir!= null){
            if(this.ismove){
                var vx = this.trigger.dir.x * this.trigger.speed;
                var vy = this.trigger.dir.y * this.trigger.speed;

                var sx = vx * dt;
                var sy = vy * dt;
                this.node.x += sx;
                this.node.y += sy;
                //方向计算
                var r = Math.atan2(this.trigger.dir.y,this.trigger.dir.x);
                var degree = r * 180/(Math.PI);
                degree = 360 - degree + 90;
                this.node.rotation = degree;
                //人物移动不能超过地图边界
                if(this.node.x<0 && Math.abs(this.node.x + sx-this.node.width/2)>=(this.map.width/2)){
                    this.ismove = false;
                }else if(this.node.x>0 && Math.abs(this.node.x + sx+this.node.width/2)>=(this.map.width/2)){
                    this.ismove = false;
                }else if(this.node.y>0 && Math.abs(this.node.y + sy+this.node.height/2)>=(this.map.height/2)){
                    this.ismove = false;
                }else if(this.node.y<0 && Math.abs(this.node.y + sy-this.node.height/2)>=(this.map.height/2)){
                    this.ismove = false;
                }
            }else{
                var vx = this.trigger.dir.x * this.trigger.speed;
                var vy = this.trigger.dir.y * this.trigger.speed;

                var sx = vx * dt;
                var sy = vy * dt;
                this.node.x -= sx;
                this.node.y -= sy;
                //方向计算
                var r = Math.atan2(this.trigger.dir.y,this.trigger.dir.x);
                var degree = r * 180/(Math.PI);
                degree = 360 - degree + 90;
                this.node.rotation = degree+180;
                //人物移动不能超过地图边界
                if(this.node.x<0 && Math.abs(this.node.x + sx-this.node.width/2)>=(this.map.width/2)){
                    this.ismove = true;
                }else if(this.node.x>0 && Math.abs(this.node.x + sx+this.node.width/2)>=(this.map.width/2)){
                    this.ismove = true;
                }else if(this.node.y>0 && Math.abs(this.node.y + sy+this.node.height/2)>=(this.map.height/2)){
                    this.ismove = true;
                }else if(this.node.y<0 && Math.abs(this.node.y + sy-this.node.height/2)>=(this.map.height/2)){
                    this.ismove = true;
                }
            }
            
            
        }
    },
    onCollisionEnter: function (other, self) {
        //判断碰撞的类型
        if(other.node.group == "gem"){
            other.node.destroy();
            console.log("增加经验值");
        }else if(other.node.group == "item"){
            other.node.destroy();
            if(other.node.name == "item_dunPrefab"){
                console.log("加盾");
            }else if(other.node.name == "item_hpPrefab"){
                console.log("加血");
            }else if(other.node.name == "item_xiePrefab"){

                this.trigger.speed = 200;
                this.scheduleOnce(function() {
                    this.trigger.speed = 100;
                }, 3);
            }
        }
    },
    onCollisionExit: function (other, self) {
        
        console.log("enemyPos "+ self.node.position);
        this.trigger.is_trigger = false;
        
        
    }
});
