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
        toggle:{
            default:[],
            type:cc.Toggle,
        },
        view:{
            default:[],
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.heroid = 1;
    },
    onCheck(){
        if(this.toggle[0].getComponent(cc.Toggle).isChecked){
            this.view[0].active =true;
            this.view[1].active =false;
        }else if(this.toggle[1].getComponent(cc.Toggle).isChecked){
            this.view[0].active =false;
            this.view[1].active =true;
        }
     },
     onHeroCheck(){
        if(this.toggle[0].getComponent(cc.Toggle).isChecked){
            this.view[0].active =true;
            this.view[1].active =false;
            this.view[2].active =false;
            this.SetDefaultHeros(1);
            this.heroid = 1;
            this.view[0].getComponent("HeroCarPre").init(this.heroid);
        }else if(this.toggle[1].getComponent(cc.Toggle).isChecked){
            this.view[0].active =false;
            this.view[1].active =true;
            this.view[2].active =false;
            this.SetDefaultHeros(2);
            this.heroid = 2;
            this.view[1].getComponent("HeroCarPre").init(this.heroid);
        }else if(this.toggle[2].getComponent(cc.Toggle).isChecked){
            this.view[0].active =false;
            this.view[1].active =false;
            this.view[2].active =true;
            this.SetDefaultHeros(3);
            this.heroid = 3;
            this.view[2].getComponent("HeroCarPre").init(this.heroid);
        }
     },
     SetDefaultHeros(id){
        Global.SetDefaultHeros(id,(res)=>{
            if(res.state == 1){
                Global.defhid = id;
            }
        });
     },
     
     BuyHero(){
        // if(Global.diamond>3500){
        //     Global.UserChange(1,1,"购买英雄",-3500,(res)=>{
        //         if(res.state ==1){
        //             Global.diamond+= -3500;
        //             cc.game.emit('UserChang');
        //             Global.BuyHeros(id,(res)=>{
                        
        //             });
        //         }
        //     });
        // }else{
        //     this.tip.active = true;
        // }
        Global.BuyHeros(this.heroid,(res)=>{
            if(res.state ==1){
                this.SetDefaultHeros(this.heroid);
            }
        });
     },
    // update (dt) {},
});
