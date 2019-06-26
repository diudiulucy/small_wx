import RubbishType = require("./RubbishType");
import Util = require('../../common/Util');
import EventDispatcher = require("../../common/event/EventDispatcher");
import Events = require('../../common/event/Events');

const { ccclass, property } = cc._decorator;

@ccclass
class GameScene extends cc.Component {

    @property(cc.Node)
    role1: cc.Node = null;

    @property(cc.Node)
    role2: cc.Node = null;

    @property(cc.Prefab)
    rubbish: cc.Prefab = null;

    @property(cc.Node)
    dustbins: cc.Node[] = [];

    cur_bg = null;
    speed = 200;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.cur_bg = this.role1;
        this.createRubbish();

        this.addEvent();
        this.schedule(this.createRubbish.bind(this), 2.5);
    }

    start() {

    }

    addEvent() {
        EventDispatcher.getInstance().addEventListener(Events.EVT_TouchEnd_RUBBISH, this.onTouchRubbishEnd.bind(this), this);
    }


    onTouchRubbishEnd(data) {
        // console.log(data);
        let correctDustbin = null;
        let index;
        for (let i = 0; i < this.dustbins.length; i++) {
            let dustbin = this.dustbins[i];
            let rect = cc.rect(-dustbin.width / 2, -dustbin.height / 2, dustbin.width, dustbin.height);
            let localPos = dustbin.convertToNodeSpaceAR(data.pos);
            if (rect.contains(localPos)) {//进入垃圾桶
                correctDustbin = dustbin;
                index = i;
            }
        }

        let typeName = [
            '可回收',
            '厨余',
            '其他',
            '有毒',
        ];

        if (correctDustbin) {
            if (index === data.type) {
                this.createAwardLabel('perfect');
            } else {
                this.createAwardLabel('miss' + ' 正确的是:' + typeName[data.type]);
            }
            data.node.destroy();
        } else {
            data.node.position = data.node.getComponent('Rubbish').touchStartPos;
        }
    }

    createAwardLabel(txt) {
        let item = new cc.Node();
        item.color = cc.color(255, 0, 0);
        item.addComponent(cc.Label);
        item.getComponent(cc.Label).string = txt;
        this.node.addChild(item);
        item.position = cc.v2(0, -100);
        let moveTo = cc.moveTo(1, cc.v2(0, 200));
        let callback = function () {
            item.destroy();
        }.bind(this);
        item.runAction(cc.sequence(moveTo, cc.callFunc(callback)));
        return item;
    }

    createRubbish(data = null) {
        let rubbish = [
            { imgIndex: 0, type: RubbishType.Kitchen },
            { imgIndex: 1, type: RubbishType.Recycle },
            { imgIndex: 2, type: RubbishType.POISON },
            { imgIndex: 3, type: RubbishType.Other },
            { imgIndex: 4, type: RubbishType.Kitchen },
        ]

        let index = Util.randomRange(0, 4);
        let item = cc.instantiate(this.rubbish);
        item.getComponent('Rubbish').init(rubbish[index]);
        item.y = this.role1.y;
        item.x = -cc.winSize.width / 2 - item.width / 2;
        // return item;
        this.node.addChild(item);
    }

    update(dt) {
        // let s = this.speed * dt;


        // this.role1.x += s;
        // this.role2.x += s;

        // if (this.cur_bg.x >= cc.winSize.width) { // 地图切换
        //     if (this.cur_bg == this.role2) {
        //         this.role2.x = this.role1.x - cc.winSize.width;
        //         this.cur_bg = this.role1;
        //     }
        //     else {
        //         this.role1.x = this.role2.x - cc.winSize.width;
        //         this.cur_bg = this.role2;
        //     }
        // }
    }
}

export = GameScene;
