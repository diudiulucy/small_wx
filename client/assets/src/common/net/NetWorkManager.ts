const { ccclass, property } = cc._decorator;

@ccclass
class NetWorkManager {
    private static _instance = null;
    private _ws = null;
    private _ip: string = "ws://192.168.0.239";
    private _port = 3000;

    public static getInstance() {
        if (!this._instance) {
            this._instance = new NetWorkManager();
        }
        return this._instance;
    }

    public connectServer() {
        if (!this._ws) {
            this._ws = new WebSocket(this._ip + ":" + this._port);
        }

        this._ws.onopen = this._onOpen;
        this._ws.onmessage = this._onMessage;
        this._ws.onerror = this._onError;
        this._ws.onclose = this._onClose;
    }

    private _onOpen(event) {
        console.log("Send Text WS was opened.");
    }

    private _onMessage(event) {
        console.log("response text msg: " + event.data);
    }

    private _onError(event) {
        console.log("Send Text fired an error");
    }

    private _onClose(event) {
        console.log("WebSocket instance closed.");
    }

    public send(data) {
        if (this._ws.readyState === WebSocket.OPEN) {
            this._ws.send(data);
        } else {
            console.log('socket is not opened');
        }

    }
}

export = NetWorkManager;
