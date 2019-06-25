const { ccclass, property } = cc._decorator;
import EventDispatcher = require('../event/EventDispatcher');
import Events = require('../event/Events');
@ccclass
class NetWorkManager {
    private static _instance = null;
    private _ws = null;
    private _ip: string = "ws://192.168.1.185";
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

        this._ws.onopen = this._handleOpen;
        this._ws.onmessage = this._handleMessage;
        this._ws.onerror = this._handleError;
        this._ws.onclose = this._handleClose;
    }

    private _handleOpen(event) {
        console.log("Send Text WS was opened.");
        EventDispatcher.getInstance().dispatch(Events.EVT_WS_OPEN);
    }

    private _handleMessage(event) {
        console.log("response text msg: " + event.data);
    }

    private _handleError(event) {
        console.log("Send Text fired an error");
    }

    private _handleClose(event) {
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
