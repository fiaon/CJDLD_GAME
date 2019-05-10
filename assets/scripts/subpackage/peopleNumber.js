// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//玩家总数和死亡数
var peopleNumber = cc.Class({
    // 成员变量
    people: 0,

    ctor () {
        
    },
    init(){
        this.people = Global.enemynumber+1;
    },

    changeNumber(name){
        this.people -= 1;
        cc.game.emit('change',this.people);
    },
});

peopleNumber._instance = null;
peopleNumber.getInstance = function () {
    if(!peopleNumber._instance){
        peopleNumber._instance = new peopleNumber();
    }
    return peopleNumber._instance;
}

module.exports = peopleNumber;
