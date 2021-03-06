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
        audioPlayer: {
            default: null,
            type: cc.AudioSource,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node);
    },

    start () {
        //this.isPlay = false;
        this.music = cc.sys.localStorage.getItem("music");
        if(this.music == 1){
            this.audioPlayer.play();
        }else{
            this.audioPlayer.stop();
        }
        // cc.game.on('Music',function(isPlay){
        //     this.isPlay = isPlay;
        // });
    },

    update (dt) {
        // if(!this.isPlay){
        //     return;
        // }
        // this.music = cc.sys.localStorage.getItem("music");
        // if(this.music == 1){
        //     this.audioPlayer.play();
        //     this.isPlay = false;
        // }else{
        //     this.audioPlayer.stop();
        //     this.isPlay = false;
        // }
    },
});
