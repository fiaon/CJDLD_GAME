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
        this.resource = null;
        this.progressBar.progress = 0;
 
        
        Global.Login();
        this.loadRemoteAssets();
    },
 
    start () {
        // this.progressBar.node.active = false;
        // this.loadtext.node.active =false;
        // this.text.node.active =false;
        // this.startBtn.node.active =true;
        // this.enabled = false;
    },
 
 
    // update (dt) {},
    onTouchBtn(){
        Global.GetUesrInfo();
    },
    /**
    * 加载远程资源
    * wx.env.USER_DATA_PATH： 这个是小游戏在手机上的临时目录
    **/
    loadRemoteAssets () {
        const self = this
        const fs = wx.getFileSystemManager()  // 获取微信小游戏sdk中的 文件系统
        // 然后
        const downloadTask = wx.downloadFile({
            url: 'https://img.zaohegame.com/staticfile/wx039e71b55cba9869/res/raw-assets.zip',  // 我们上传到服务器的资源文件压缩包地址
            header: {
                'content-type': 'application/json'
            },
            filePath: '',
            success: function (res){    // 资源下载成功以后，我们将文件解压到小游戏的运行目录
                console.log('资源下载成功', res)
                let zip_res = res.tempFilePath
                fs.unzip({
                    zipFilePath: zip_res,
                    targetPath: wx.env.USER_DATA_PATH + '/res/',
                    success: function (result) {
                        console.log('解压缩成功---', result)
                        wx.setStorageSync('downloaded', true)
                        // self.MainScene.init()       // 解压成功以后再让主场景初始化数据
                        // setTimeout(() => {
                        //     self.hideLoading()
                        // }, 700)
                        self.progressBar.node.active = false;
                        self.loadtext.node.active =false;
                        self.text.node.active =false;
                        self.startBtn.node.active =true;
                        self.enabled = false;
                    }
                })
            },
            fail: function(err){
                console.error('资源下载失败', err)
            },
            complete: function (res) {
                console.log('资源下载 complete')

            }
        })
        if (downloadTask) {     // 资源下载的时候，在界面上展示下载的进度，让用户能感知游戏进程
            downloadTask.onProgressUpdate(function(res){
                self.progressBar.progress = res.progress / 100
                self.loadtext.string = res.progress + '%'
            })
        }
    },

});
