"use strict";
///<reference path="../../dts/pixi.js.d.ts"/>
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
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = PIXI.utils.EventEmitter;
var Network = (function (_super) {
    __extends(Network, _super);
    function Network() {
        return _super.call(this) || this;
    }
    // TODO достать протокол, сделать емиты по нему
    Network.prototype.send = function (data) {
        switch (data) {
            case 'ThrowDices':
                setTimeout(function () {
                    this.emit(Network.EVENT_DATA, {
                        name: 'MoveDices',
                        dices: [5, 4]
                    });
                }.bind(this), 1000);
                break;
        }
    };
    Network.prototype.enter = function () {
        // получил ГС
        this.emit(Network.EVENT_DATA, {
            name: 'GameState'
        });
        setTimeout(function () {
            this.emit(Network.EVENT_DATA, {
                name: 'MakeMove'
            });
        }.bind(this), 5000);
    };
    Network.prototype.open = function () {
        // подключение
        this.emit(Network.EVENT_CONNECTED);
    };
    Network.prototype.close = function () {
    };
    Network.EVENT_CONNECTED = 'Connected';
    Network.EVENT_DATA = 'Data';
    return Network;
}(EventEmitter));
exports.Network = Network;
