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
define(["require", "exports"], function (require, exports) {
    "use strict";
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
            // Посылаем Enter, на него приходит ГС.
            this.emit(Network.EVENT_DATA, {
                CLASS_NAME: 'GameState',
                whitePositions: [103, 305, 2404, 2103],
                blackPositions: [403, 905, 1803, 1604],
                cubeValues: 0,
                color: 0,
                turn: 'Jp',
                tableName: "Bill's table"
            });
            setTimeout(function () {
                this.emit(Network.EVENT_DATA, {
                    CLASS_NAME: 'GameStart',
                    enemyUserName: 'Ivan'
                });
            }.bind(this), 8000);
        };
        Network.prototype.open = function () {
            // подключение
            setTimeout(function () {
                console.log('Connection succeed.');
                this.emit(Network.EVENT_CONNECTED);
            }.bind(this), 1000);
        };
        Network.prototype.close = function () {
        };
        Network.prototype.throwDices = function () {
            // Запрос на бросок кубика.
            this.emit(Network.EVENT_DATA, {
                CLASS_NAME: 'CubeValue',
                cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
            });
        };
        Network.EVENT_CONNECTED = 'Connected';
        Network.EVENT_DATA = 'Data';
        return Network;
    }(EventEmitter));
    exports.Network = Network;
});
//# sourceMappingURL=Network.js.map