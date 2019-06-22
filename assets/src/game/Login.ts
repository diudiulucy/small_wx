const { ccclass, property } = cc._decorator;
import Util = require('../common/Util')
@ccclass
class Login extends cc.Component {

    @property(cc.Node)
    avatar: cc.Node = null;
    avatarUrl: string = null;
    onLoad() {
        if (Util.isWXGame()) {
            wx.login({
                success(res) {
                    if (res.code) {
                        //发起网络请求
                        wx.request({
                            url: 'https://test.com/onLogin',
                            data: {
                                code: res.code
                            }
                        })

                        // let button = wx.createUserInfoButton({
                        //     type: 'text',
                        //     text: '获取用户信息',
                        //     style: {
                        //       left: 10,
                        //       top: 76,
                        //       width: 200,
                        //       height: 40,
                        //       lineHeight: 40,
                        //       backgroundColor: '#ff0000',
                        //       color: '#ffffff',
                        //       textAlign: 'center',
                        //       fontSize: 16,
                        //       borderRadius: 4
                        //     }
                        //   })
                        //   button.onTap((res) => {
                        //     console.log(res)
                        //   })
                        wx.getSetting({
                            success(res) {
                                if (res.authSetting['scope.userInfo']) {
                                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                                    wx.getUserInfo({
                                        success: function (res) {

                                            console.log(res.userInfo);
                                        }.bind(this);
                                    })
                                } else {
                                    wx.authorize({
                                        scope: 'scope.userInfo',
                                        success() {

                                        }
                                    })
                                }
                            }
                        })

                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        }
    }

}
export = Login; 