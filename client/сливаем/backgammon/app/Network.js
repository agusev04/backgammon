var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Network = (function (_super) {
        __extends(Network, _super);
        function Network(url) {
            var _this = _super.call(this) || this;
            _this.setSocket(url);
            _this.connect();
            return _this;
        }
        Network.prototype.setSocket = function (url) {
            this.socket = new WebSocket(url);
        };
        Network.prototype.getSoket = function () {
            return this.socket;
        };
        Network.prototype.connect = function () {
            var _this = this;
            this.socket.onclose = function (event) { return _this.onClose(event); };
            this.socket.onmessage = function (event) { return _this.onMessage(event); };
        };
        Network.prototype.onMessage = function (event) {
            console.log("говорю из класса нетворк что сервер мне сказал--->>>", event.data);
            console.log(typeof event.data);
            this.emit(Network.EVENT_DATA, {
                status: 'message',
                data: event.data
            });
        };
        Network.prototype.onClose = function (event) {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
                this.emit(Network.EVENT_CONNECTED, {
                    status: 'wasClean'
                });
            }
            else {
                console.log('Обрыв соединения сообщение из класса Network');
                this.emit(Network.EVENT_CONNECTED, {
                    status: 'disconnection'
                });
            }
            console.log('Код: ' + event.code + ' причина: ' + event.reason);
        };
        Network.prototype.disconnect = function () {
            this.socket.close();
            this.emit(Network.EVENT_CONNECTED, {
                status: 'close'
            });
        };
        ;
        Network.prototype.send = function (mess) {
            this.socket.send(JSON.stringify(mess));
            this.emit(Network.EVENT_DATA, {
                status: 'send',
                data: mess
            });
        };
        return Network;
    }(Container));
    exports.Network = Network;
});
// switch (this.socket.readyState){
//     case 0:
//     case 2:
//     case 3:
//         Game.EVENT.emit('wait');
//         break;
//     case 1:
//         Game.EVENT.emit('conect');
//         break;
//
// }
// if((this.socket.CONNECTING)==0 || (this.socket.CLOSING)==2 || (this.socket.CLOSED)==3)
// {
//     Game.EVENT.emit('wait');
// }else
// this.socket.onopen=(function () {
//     Game.EVENT.emit('conect');
//     console.log(this.readyState.toString());
// }); 
//# sourceMappingURL=Network.js.map