const { ccclass, property } = cc._decorator;
import Util = require('../common/Util');
import NetWorkManager = require('../../common/net/NetWorkManager');
@ccclass
class LoginScene extends cc.Component {

    @property(cc.Node)
    avatar: cc.Node = null;
    // avatarUrl: string = null;
    @property(cc.Node)
    btnLogin: cc.Node = null;

    onLoad() {

        NetWorkManager.getInstance().connectServer();
        this.addEvent();
        // Util.loadRemoteImg(this.avatar.getComponent(cc.Sprite), " https://wx.qlogo.cn/mmopen/vi_32/K8Xo1DPvO6gxqlPBXjqBdO7dAlpsYWhQ7fhfvniagvR78lGW1uTXKfXg2ZFUUVH0p7d9gojbUVBNbK64kQb4n1A/132");
        // if (Util.isWXGame()) {
        //     wx.login({
        //         success(res) {
        //             if (res.code) {
        //                 //发起网络请求
        //                 wx.request({
        //                     url: 'https://test.com/onLogin',
        //                     data: {
        //                         code: res.code
        //                     }
        //                 })

        //                 // let button = wx.createUserInfoButton({
        //                 //     type: 'text',
        //                 //     text: '获取用户信息',
        //                 //     style: {
        //                 //       left: 10,
        //                 //       top: 76,
        //                 //       width: 200,
        //                 //       height: 40,
        //                 //       lineHeight: 40,
        //                 //       backgroundColor: '#ff0000',
        //                 //       color: '#ffffff',
        //                 //       textAlign: 'center',
        //                 //       fontSize: 16,
        //                 //       borderRadius: 4
        //                 //     }
        //                 //   })
        //                 //   button.onTap((res) => {
        //                 //     console.log(res)
        //                 //   })
        //                 wx.getSetting({
        //                     success(res) {
        //                         if (res.authSetting['scope.userInfo']) {
        //                             // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        //                             wx.getUserInfo({
        //                                 success: function (res) {

        //                                     console.log(res.userInfo);
        //                                 }.bind(this);
        //                             })
        //                         } else {
        //                             wx.authorize({
        //                                 scope: 'scope.userInfo',
        //                                 success() {

        //                                 }
        //                             })
        //                         }
        //                     }
        //                 })

        //             } else {
        //                 console.log('登录失败！' + res.errMsg)
        //             }
        //         }
        //     })
        // }

    }

    addEvent() {
        this.btnLogin.on('click', function () {
            NetWorkManager.getInstance().send('helloLucy');
        }.bind(this));
    }

}
export = LoginScene; 