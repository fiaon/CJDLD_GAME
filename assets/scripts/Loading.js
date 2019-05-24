// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var HttpMsg = require("HttpMsg");
cc.Class({
    extends: cc.Component,

    properties: {
        loadtext:{
            default:null,
            type:cc.Label,
        },
        progressBar: {
            default: null,
            type: cc.ProgressBar,
        },
        text:{
            default:null,
            type:cc.Label,
        },
        startBtn:{
            default:null,
            type:cc.Button,
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad () {
        this._urls = [
            {url:'http://127.0.0.1（这里填你的服务器ip)/test.php?url=http://127.0.0.1（这里填你的服务器ip)/image1.png', type:'png'},
            {url:'http://127.0.0.1（这里填你的服务器ip)/test.php?url=http://127.0.0.1（这里填你的服务器ip)/image2.png', type:'png'},
            
        ];
 
        this.resource = null;
        this.progressBar.progress = 0;
 
        
        this._clearAll();
        Global.Login();
        //cc.loader.load(this._urls, this._progressCallback.bind(this), this._completeCallback.bind(this));
    },
 
    start () {
        this.progressBar.node.active = false;
        this.loadtext.node.active =false;
        this.text.node.active =false;
        this.startBtn.node.active =true;
        this.enabled = false;
    },
 
    _clearAll: function() {
        for(var i = 0; i < this._urls.length; ++i) {
            var url = this._urls[i];
            cc.loader.release(url);
        }
    },
 
    _progressCallback: function(completeCount, totalCount, res) {
        //加载进度回调
        console.log('第 ' + completeCount + '加载完成！');
        this.progress = completeCount / totalCount;
        this.resource = res;
        this.completeCount = completeCount;
        this.totalCount = totalCount;
        
    },
 
    _completeCallback: function(err, texture) {
        //加载完成回调
        
    },
 
    update (dt) {
        if(!this.resource){
            return ;
        }
        var progress = this.progressBar.progress;
        if(progress >= 1){
            console.log('加载完成')
            //加载完成
            this.progressBar.node.active = false;
            this.loadtext.node.active =false;
            this.text.node.active =false;
            this.startBtn.node.active =true;
            this.enabled = false;
            return ;
        }
 
        if(progress < this.progress){
            progress += dt;
        }
        var number_jindu = parseInt(progress * 100);
        this.loadtext.string = number_jindu-1+'%';
        this.progressBar.progress = progress;
 
    },
    onTouchBtn(){
        Global.GetUesrInfo();
        Global.GetSeaonLvl();
    }

});
