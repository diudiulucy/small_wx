const { ccclass, property } = cc._decorator;

@ccclass
class LoadingScene extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';



    onLoad() { 

    }

    start() {

    }

    // update (dt) {}
}


export = LoadingScene;
