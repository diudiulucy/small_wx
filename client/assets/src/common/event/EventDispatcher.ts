const { ccclass, property } = cc._decorator;

@ccclass
class EventDispatcher {
    private static _instance = null;

    public static getInstance() {
        if (!this._instance) {
            this._instance = new EventDispatcher();
        }
        return this._instance;
    }


    public dispatch() {

    }

    public addEventLister() {

    }

    public removeEventLister() {

    }

}

export = EventDispatcher;