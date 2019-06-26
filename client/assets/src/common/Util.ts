const { ccclass, property } = cc._decorator;

@ccclass
class Util {
    //动态加载图片的方法
    public static loadRemoteImg(container, remoteUrl) {
        cc.loader.load({ url: remoteUrl, type: 'png' }, function (err, texture) {
            var sprite = new cc.SpriteFrame(texture);
            container.spriteFrame = sprite;
        });
    }

    public static isWXGame() {
        return cc.sys.platform == cc.sys.WECHAT_GAME;
    }

    public static randomRange(m, n) {
        return Math.round(Math.random() * (m - n)) + n;
    }
}

export = Util;
