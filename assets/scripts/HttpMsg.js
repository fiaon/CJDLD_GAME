// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//往
var HttpMsg = cc.Class({
    

    ctor () {
        
    },

    HttpPost(url){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log(response);
            }
        };
        var url_temp = "http://wx.zaohegame.com:8099/game/"+url;//UserLogin
        xhr.open("POST", url_temp, true);
        xhr.send();
    }

});
HttpMsg._instance = null;
HttpMsg.getInstance = function () {
    if(!HttpMsg._instance){
        HttpMsg._instance = new HttpMsg();
    }
    return HttpMsg._instance;
}

module.exports = HttpMsg;
