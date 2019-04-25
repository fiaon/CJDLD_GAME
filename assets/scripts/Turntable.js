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
        spinBtn: {
            default: null,      // The default value will be used only when the component attachin                    // to a node for the first time
            type:cc.Button,     // optional, default is typeof default
            visible: true,      // optional, default is true
            displayName: 'SpinBtn', // optional
        },
        wheelSp:{
            default:null,
            type:cc.Sprite
        },
        maxSpeed:{
            default:3,
            type:cc.Float,
            max:10,
            min:2,
        },
        duration:{
            default:3,
            type:cc.Float,
            max:5,
            min:1,
            tooltip:"减速前旋转时间"
        },
        acc:{
            default:0.1,
            type:cc.Float,
            max:0.2,
            min:0.01,
            tooltip:"加速度"
        },
        targetID:{
            default:0,
            type:cc.Integer,
            max:8,
            min:0,
            tooltip:"指定结束时的齿轮"
        },
        springback:{
            default:true,
            tooltip:"旋转结束是否回弹"
        },
        // effectAudio:{
        //     default:null,
        //     url:cc.AudioClip,
        // },
        prefab:{
            default:null,
            type:cc.Prefab,
        }
    },

    // use this for initialization
    onLoad: function () {
        this.wheelState = 0;    
        this.curSpeed = 0;
        this.spinTime = 0;                   //减速前旋转时间
        this.gearNum = 8;
        this.defaultAngle = 360/8/2;        //修正默认角度
        this.gearAngle = 360/this.gearNum;   //每个齿轮的角度
        this.wheelSp.node.rotation = this.defaultAngle;
        this.finalAngle = 0;                   //最终结果指定的角度
        this.effectFlag = 0;                 //用于音效播放
        
        this.spinBtn.node.on(cc.Node.EventType.TOUCH_END,function(event)
        {
            if(this.wheelState !== 0)
            {
                 return;
            }
            this.decAngle = 2*360;  // 减速旋转两圈
            this.wheelState = 1;
            this.curSpeed = 0;
            this.spinTime = 0;
            // var act = cc.rotateTo(10, 360*10);
            // this.wheelSp.node.runAction(act.easing(cc.easeSineInOut()));
        }.bind(this));
    },

    start:function()
    {
        // cc.log('....start');
    },
    
    caculateFinalAngle:function(targetID)
    {
        this.finalAngle = 360-this.targetID*this.gearAngle + this.defaultAngle;
        if(this.springback)
        {
            this.finalAngle += this.gearAngle;
        }
    },
   
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.wheelState === 0)
        {
            return;
        }
        // cc.log('......update');
        // cc.log('......state=%d',this.wheelState);
       
        this.effectFlag += this.curSpeed;
        if(!cc.sys.isBrowser && this.effectFlag >= this.gearAngle)
        {
            if(this.audioID)
            {
                // cc.audioEngine.pauseEffect(this.audioID);
            }
            // this.audioID = cc.audioEngine.playEffect(this.effectAudio,false);
            //this.audioID = cc.audioEngine.playEffect(cc.url.raw('resources/Sound/game_turntable.mp3'));
            this.effectFlag = 0;
        }
        if(this.wheelState == 1)
        {
            // cc.log('....加速,speed:' + this.curSpeed);
            this.spinTime += dt;
            this.wheelSp.node.rotation = this.wheelSp.node.rotation + this.curSpeed;
            if(this.curSpeed <= this.maxSpeed)
            {
                this.curSpeed += this.acc;
            }
            else
            {
                if(this.spinTime<this.duration)
                {
                    return;
                }
                // cc.log('....开始减速');
                //设置目标角度
                this.finalAngle = 360-this.targetID*this.gearAngle + this.defaultAngle;
                this.maxSpeed = this.curSpeed;
                if(this.springback)
                {
                    this.finalAngle += this.gearAngle;
                }
                //this.wheelSp.node.rotation = this.finalAngle;
                this.wheelState = 2;
            }
        }
        else if(this.wheelState == 2)
        {
            // cc.log('......减速');
            var curRo = this.wheelSp.node.rotation; //应该等于finalAngle
            var hadRo = curRo - this.finalAngle;
            this.curSpeed = this.maxSpeed*((this.decAngle-hadRo)/this.decAngle) + 0.2; 
            this.wheelSp.node.rotation = curRo + this.curSpeed;

            if((this.decAngle-hadRo)<=0)
            {  
                // cc.log('....停止');
                this.wheelState = 0;
                this.wheelSp.node.rotation = this.finalAngle;
                //转盘停止跳出提示框
                var pre = cc.instantiate(this.prefab);
                this.node.addChild(pre);
                
                if(this.springback)
                {
                    //倒转一个齿轮
                    var act = new cc.rotateBy(0.5, -this.gearAngle);
                    var seq = cc.sequence(new cc.delayTime(0.3),act,cc.callFunc(this.showRes, this));
                    this.wheelSp.node.runAction(seq);
                }
            }
        }
    },

});
