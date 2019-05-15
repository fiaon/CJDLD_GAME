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
            type:cc.Node,
        },
        skill1:{
            default:null,
            type:cc.Node,
        },
        skill1_mask:{
            default:null,
            type:cc.Sprite,
        },
        skill2:{
            default:null,
            type:cc.Node,
        },
        skill2_mask:{
            default:null,
            type:cc.Sprite,
        },
        attack:{
            default:null,
            type:cc.Node,
        },
        player:{
            default:null,
            type:cc.Node,
        },
        bullet:{
            default:null,
            type:cc.Prefab,
        },
        mogu:{
            default:null,
            type:cc.Prefab,
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.Max_r = 49;
        this.skillCd = 1.5;
        this.is_Cd = false;
        this.Rocker.x = 0;
        this.Rocker.y = 0;
        this.dir = cc.v2(0,0);
        this.skill2cd = 3;
        this.skill2_Cd = false;
        this.skill_bullet = cc.find("Canvas/skill_bullet");
        this.map =  cc.find("Canvas/bg001");
        //console.log(this.skill2.getChildByName("tubiao").getComponent(cc.Sprite).spriteFrame.name);

        this.Rocker.on(cc.Node.EventType.TOUCH_START,function(e){
            var w_pos = e.getLocation();
            var pos = this.node.convertToNodeSpaceAR(w_pos);
            var len = pos.mag();//获取向量长度
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;

            if(len > this.Max_r){
                pos.x = this.Max_r * pos.x / len;
                pos.y = this.Max_r * pos.y / len;
            }
            this.Rocker.setPosition(pos);
        },this);
   
        this.Rocker.on(cc.Node.EventType.TOUCH_MOVE,function(e){
            var w_pos = e.getLocation();
            var pos = this.node.convertToNodeSpaceAR(w_pos);

            var len = pos.mag();
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;

            if(len > this.Max_r){
                pos.x = this.Max_r * pos.x / len;
                pos.y = this.Max_r * pos.y / len;
            }
            this.Rocker.setPosition(pos);
        },this);
   
        this.Rocker.on(cc.Node.EventType.TOUCH_END,function(e){
           this.Rocker.setPosition(cc.v2(0,0));
           this.dir = cc.v2(0, 0);
        },this);
   
        this.Rocker.on(cc.Node.EventType.TOUCH_CANCEL,function(e){
            this.Rocker.setPosition(cc.v2(0,0));
            this.dir = cc.v2(0, 0);
        },this);
        this.skill1.on(cc.Node.EventType.TOUCH_START,function(e){
            if(!this.is_Cd){
                this.attack.getComponent(cc.Animation).play('attack');
                this.playerAttack();
                this.is_Cd = true;  
            }
        },this);
        this.skill2.on(cc.Node.EventType.TOUCH_START,function(e){
            if(!this.skill2_Cd){
                switch(this.skill2.getChildByName("tubiao").getComponent(cc.Sprite).spriteFrame.name)
                {
                case "skill_1":
                    this.SkillForLuBan();
                    break;
                case "skill_2":
                    this.SkillForDuiZhang();
                break;
                case "skill_3":
                    this.SkillForTiMo();
                break;
                default:
                break;
                }
                
                this.skill2_Cd = true;  
            }
        },this);
    },
    //平A技能（往前撞击）
    playerAttack(){
        this.player.getComponent("Player").isattack = true;
        this.player.getComponent("Player").behit = true;
        // 将角度转换为弧度
        let radian  = cc.misc.degreesToRadians(this.player.getComponent("Player").player.rotation);
        let comVec = cc.v2(0, 1);// 一个向上的对比向量
        let dirVec = comVec.rotate(-radian);
        // this.player.x += dirVec.x*100;
        // this.player.y += dirVec.y*100;
        let x = this.player.x+dirVec.x*200;
        let y =this.player.y+dirVec.y*200;
        var top = this.map.height / 2;
        var bottom = -top;
        var left = - this.map.width / 2;
        var right = -left;
        var outScreen = x < left || x > right || y < bottom || y > top;
        if(!outScreen){
            cc.tween(this.player)
            .to(1, { position: cc.v2(x,y) })
            .start()
        }
        this.scheduleOnce(function() {
            this.player.getComponent("Player").behit = false;
            this.player.getComponent("Player").isattack = false;
        }, 1);
    },
    //鲁班技能
    SkillForLuBan(){
        //生成子弹预设体
        var bullet = cc.instantiate(this.bullet);
        this.skill_bullet.position = this.player.position;
        this.skill_bullet.addChild(bullet);
        // 将角度转换为弧度
        // bullet.rotation = this.player.getComponent("Player").player.rotation+90;
        // let radian  = cc.misc.degreesToRadians(this.player.getComponent("Player").player.rotation);
        // let comVec = cc.v2(0, 1);// 一个向上的对比向量
        // let dirVec = comVec.rotate(-radian);
        // var posx = bullet.x + dirVec.x*100;
        // var posy = bullet.y + dirVec.y*100;
        // cc.tween(bullet)
        // .to(1, { position: cc.v2(posx,posy) })
        // .start()
        // this.schedule(function() {
        //    bullet.getComponent(cc.Animation).play('skill_boom');
        // }, 0, 0,1);
    },
    //队长技能
    SkillForDuiZhang(){
        this.player.getComponent("Player").AddDun();
    },
    //提莫技能
    SkillForTiMo(){
        var mogu = cc.instantiate(this.mogu);
        let radian  = cc.misc.degreesToRadians(this.player.getComponent("Player").player.rotation);
        let comVec = cc.v2(0, 1);// 一个向上的对比向量
        let dirVec = comVec.rotate(-radian);
        mogu.x = this.player.x +dirVec.x*30;
        mogu.y = this.player.y +dirVec.y*30;
        cc.find("Canvas").addChild(mogu);
    },
    update (dt) {
        //如果技能没进入cd return
        if(this.is_Cd){
            //显示技能遮罩
            if(this.skill1_mask.fillRange >= 0){
                //this.skill1_mask.node.active = true;
                this.skill1_mask.fillRange -= (dt/this.skillCd);
            }else{
                this.is_Cd = false;
                //this.skill1_mask.node.active = false;
                this.skill1_mask.fillRange =1;
            }
        }
        if(this.skill2_Cd){
            //显示技能遮罩
            if(this.skill2_mask.fillRange >= 0){
                //this.skill1_mask.node.active = true;
                this.skill2_mask.fillRange -= (dt/this.skill2cd);
            }else{
                this.skill2_Cd = false;
                //this.skill1_mask.node.active = false;
                this.skill2_mask.fillRange =1;
            }
        }
        
    },
});
