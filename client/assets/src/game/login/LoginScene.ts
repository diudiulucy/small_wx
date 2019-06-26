const { ccclass, property } = cc._decorator;
import Util = require('../../common/Util');
import NetWorkManager = require('../../common/net/NetWorkManager');
import EventDispatcher = require('../../common/event/EventDispatcher');
import Events = require('../../common/event/Events');
@ccclass
class LoginScene extends cc.Component {

    @property(cc.Node)
    avatar: cc.Node = null;
    // avatarUrl: string = null;
    @property(cc.Node)
    btnLogin: cc.Node = null;

    onLoad() {
        this.addEvent();
        NetWorkManager.getInstance().connectServer();

        // Util.loadRemoteImg(this.avatar.getComponent(cc.Sprite), " https://wx.qlogo.cn/mmopen/vi_32/K8Xo1DPvO6gxqlPBXjqBdO7dAlpsYWhQ7fhfvniagvR78lGW1uTXKfXg2ZFUUVH0p7d9gojbUVBNbK64kQb4n1A/132");
        if (Util.isWXGame()) {
            let self = this;
            // window['wx'].getSetting({
            //     success(res) {
            //         if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            let systemInfo = window['wx'].getSystemInfoSync();
            let button = window['wx'].createUserInfoButton({
                type: 'text',
                text: '',
                style: {
                    left: 0,
                    top: 0,
                    width: systemInfo.screenWidth,
                    height: systemInfo.screenHeight,
                    lineHeight: 40,
                    // backgroundColor: '#ff0000',
                    // color: '#ffffff',
                    // textAlign: 'center',
                    // fontSize: 16,
                    // borderRadius: 4
                }
            })
            button.onTap((res) => {
                console.log(res)
                Util.loadRemoteImg(self.avatar.getComponent(cc.Sprite), res.userInfo.avatarUrl);
            })
            //     } else {
            //         window['wx'].authorize({
            //             scope: 'scope.userInfo',
            //             success() {

            //             }
            //         })
            //     }
            // }
            // })

            // window['wx'].login({
            //     success(res) {
            //         if (res.code) {
            //             //发起网络请求
            //             window['wx'].request({
            //                 url: 'https://test.com/onLogin',
            //                 data: {
            //                     code: res.code
            //                 }
            //             })




            //         } else {
            //             console.log('登录失败！' + res.errMsg)
            //         }
            //     }
            // })
        }

    }

    addEvent() {
        EventDispatcher.getInstance().addEventListener(Events.EVT_WS_OPEN, function () {
            NetWorkManager.getInstance().send('helloLucy');
        }.bind(this), this);

        // this.btnLogin.on('click', function () {
        //     NetWorkManager.getInstance().send('helloLucy');
        // }.bind(this));
    }

}
export = LoginScene; 