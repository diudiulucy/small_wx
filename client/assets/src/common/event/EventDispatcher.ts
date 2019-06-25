const { ccclass, property } = cc._decorator;

@ccclass
class EventDispatcher {
    private static _instance: EventDispatcher = null;
    private _listenerMap: Object = new Object();

    public static getInstance() {
        if (!this._instance) {
            this._instance = new EventDispatcher();
        }
        return this._instance;
    }

    public addEventListener(event: string, callback: Function, target: any) {
        if (!event || !callback || !target) {
            return;
        }

        if (!(event in this._listenerMap)) {
            this._listenerMap[event] = new Array();
        }

        for (var i = 0; i < this._listenerMap[event].length; i++) {
            if (this._listenerMap[event][i].callback == callback && this._listenerMap[event][i].target == target) {
                return;
            }
        }

        let eventInfo = new Array();
        eventInfo['callback'] = callback;
        eventInfo['target'] = target;

        this._listenerMap[event].push(eventInfo);
    }

    public removeEventLister(event: string, target: any) {
        if (!event || !target) {
            return;
        }

        var listenerList = this._listenerMap[event];
        for (var i = listenerList.length - 1; i >= 0; i--) {
            if (listenerList[i].target == target) {
                listenerList.splice(i, 1);
            }
        }
    }

    public dispatch(event, data = null) {
        if (this._listenerMap[event]) {
            var listeners = this._listenerMap[event].slice();
            for (var i = 0; i < listeners.length; i++) {
                var callback = listeners[i].callback;
                callback(data);
            }
        }
    }

}

export = EventDispatcher;