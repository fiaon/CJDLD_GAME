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
        Rocker:{
            default:null,
            type:require("Rocker"),
        },
        map:{
            default:null,
            type:cc.Node,
        },
        speed:100,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
    },

     update (dt) {
        if(this.Rocker.dir.mag()<0.5){
            return;
        }
        
        var vx = this.Rocker.dir.x * this.speed;
        var vy = this.Rocker.dir.y * this.speed;

        var sx = vx * dt;
        var sy = vy * dt;
        //人物移动不能超过地图边界
        if(this.node.x<0 && Math.abs(this.node.x + sx-this.node.width/2)>=(this.map.width/2)){
            return;
        }else if(this.node.x>0 && Math.abs(this.node.x + sx+this.node.width/2)>=(this.map.width/2)){
            return;
        }else if(this.node.y>0 && Math.abs(this.node.y + sy+this.node.height/2)>=(this.map.height/2)){
            return;
        }else if(this.node.y<0 && Math.abs(this.node.y + sy-this.node.height/2)>=(this.map.height/2)){
            return;
        }
        //移动
        this.node.x += sx;
        this.node.y += sy;
        //方向计算
        var r = Math.atan2(this.Rocker.dir.y,this.Rocker.dir.x);
        var degree = r * 180/(Math.PI);
        degree = 360 - degree + 90;
        this.node.rotation = degree;
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

                this.speed = 200;
                this.scheduleOnce(function() {
                    this.speed = 100;
                }, 3);
            }
        }
        
    },
});