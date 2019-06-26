import RubbishType = require("./RubbishType");
import EventDispatcher = require('../../common/event/EventDispatcher');
import Events = require('../../common/event/Events');
const { ccclass, property } = cc._decorator;

@ccclass
class Rubbish extends cc.Component {
    type: RubbishType = null;
    touchStartPos = null;
    @property(cc.SpriteFrame)
    rubbishFrames: cc.SpriteFrame[] = [];
    speed: number = 200;

    onLoad() {

        this.addEvent();
    }

    addEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.rubbishTouchStart.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.rubbishTouchMove.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.rubbishTouchEnd.bind(this));
    }

    rubbishTouchStart(event: cc.Event.EventTouch) {
        this.touchStartPos = this.node.position;
    }


    rubbishTouchMove(event: cc.Event.EventTouch) {
        let worldPos = event.getLocation();
        this.node.position = this.node.parent.convertToNodeSpaceAR(worldPos);
    }

    rubbishTouchEnd(event: cc.Event.EventTouch) {
        let worldPos = event.getLocation();
        EventDispatcher.getInstance().dispatch(Events.EVT_TouchEnd_RUBBISH, { type: this.type, pos: worldPos, node: this.node });
    }

    start() {

    }

    init(data) {
        this.node.getComponent(cc.Sprite).spriteFrame = this.rubbishFrames[data.imgIndex];
        this.type = data.type;
    }

    update(dt) {
        let dis = this.speed * dt;
        this.node.x += dis;
        if (this.node.x > cc.winSize.width / 2 + this.node.width / 2) {
            this.node.destroy();
        }
    }
}

export = Rubbish;
