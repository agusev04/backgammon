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
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Network() {
            var _this = _super.call(this) || this;
            _this._queue = [];
            // Debug Params >>------------------------------------------------------------<<<<
            _this._emulating = false;
            _this._debug = false;
            _this._opponentEmulationIndex = 0;
            _this.on(Network.EVENT_GAME_IS_WAITING, _this.popData);
            _this.on(Network.EVENT_GAME_IS_BUSY, _this.storeData);
            return _this;
        }
        // Base >>--------------------------------------------------------------<<<<
        Network.prototype.getSocket = function () {
            return this._socket;
        };
        Network.prototype.openConnection = function (url) {
            // подключение
            this._socket = new WebSocket(url);
            this._socket.addEventListener('close', this.onClose.bind(this));
            this._socket.addEventListener('message', this.onMessage.bind(this));
            this._socket.addEventListener('error', this.onError.bind(this));
            this._socket.addEventListener('open', this.onOpen.bind(this));
        };
        Network.prototype.send = function (data) {
            console.log(JSON.stringify(data));
            this._socket.send(JSON.stringify(data));
            if (this._emulating) {
                switch (data.CLASS_NAME) {
                    case 'Enter':
                        this.emit(Network.EVENT_DATA, {
                            CLASS_NAME: 'GameState',
                            color: 0,
                            turn: 'Jp',
                            tableName: "Bill's table"
                        });
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'GameStart',
                                enemyUserName: 'Ivan'
                            });
                        }.bind(this), 10);
                        break;
                    case 'ThrowCube':
                        this.emit(Network.EVENT_DATA, {
                            CLASS_NAME: 'CubeValue',
                            // cubeValues: 25
                            cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
                        });
                        break;
                    case 'ShowPossiblePositions':
                        this.emit(Network.EVENT_DATA, {
                            CLASS_NAME: 'PossiblePositions',
                            positionQuantity: 4,
                            possiblePositions: [504, 407, 609, 2023]
                        });
                        break;
                    case 'MoveChip':
                        this.emit(Network.EVENT_DATA, {
                            CLASS_NAME: 'ChangeTable',
                            from: data.from,
                            to: data.to
                        });
                        break;
                    case 'EndOfTurn':
                        if (this._debug) {
                            if (data.color == 0) {
                                this.emit(Network.EVENT_DATA, {
                                    CLASS_NAME: 'GameState',
                                    color: 1,
                                    turn: 'Jp',
                                    tableName: "Bill's table"
                                });
                                console.log('Сообщение из эмулятора: ходят черные.');
                            }
                            else {
                                this.emit(Network.EVENT_DATA, {
                                    CLASS_NAME: 'GameState',
                                    color: 0,
                                    turn: 'Jp',
                                    tableName: "Bill's table"
                                });
                                console.log('Сообщение из эмулятора: ходят белые.');
                            }
                        }
                        else {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'GameState',
                                color: 0,
                                turn: 'Ivan',
                                tableName: "Bill's table"
                            });
                            switch (this._opponentEmulationIndex) {
                                case 0:
                                    setTimeout(function () {
                                        this.emit(Network.EVENT_DATA, {
                                            CLASS_NAME: 'CubeValue',
                                            // cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
                                            cubeValues: 52
                                        });
                                    }.bind(this), 3000);
                                    setTimeout(function () {
                                        this.emit(Network.EVENT_DATA, {
                                            CLASS_NAME: 'ChangeTable',
                                            from: 12,
                                            to: 7
                                        });
                                    }.bind(this), 7500);
                                    setTimeout(function () {
                                        this.emit(Network.EVENT_DATA, {
                                            CLASS_NAME: 'ChangeTable',
                                            from: 7,
                                            to: 5
                                        });
                                    }.bind(this), 9000);
                                    setTimeout(function () {
                                        this.emit(Network.EVENT_DATA, {
                                            CLASS_NAME: 'GameState',
                                            color: 0,
                                            turn: 'Jp',
                                            tableName: "Bill's table"
                                        });
                                    }.bind(this), 9500);
                                    this._opponentEmulationIndex += 1;
                                    break;
                                case 1:
                                    setTimeout(function () {
                                        this.emit(Network.EVENT_DATA, {
                                            CLASS_NAME: 'CubeValue',
                                            // cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
                                            cubeValues: 11
                                        });
                                    }.bind(this), 3000);
                                    setTimeout(function () {
                                        this.emit(Network.EVENT_DATA, {
                                            CLASS_NAME: 'ChangeTable',
                                            from: 5,
                                            to: 3
                                        });
                                    }.bind(this), 7500);
                                    setTimeout(function () {
                                        this.emit(Network.EVENT_DATA, {
                                            CLASS_NAME: 'ChangeTable',
                                            from: 5,
                                            to: 3
                                        });
                                    }.bind(this), 9000);
                                    setTimeout(function () {
                                        this.emit(Network.EVENT_DATA, {
                                            CLASS_NAME: 'GameState',
                                            color: 0,
                                            turn: 'Jp',
                                            tableName: "Bill's table"
                                        });
                                    }.bind(this), 9500);
                                    this._opponentEmulationIndex += 1;
                                    break;
                            }
                        }
                        break;
                }
            }
        };
        Network.prototype.disconnect = function () {
            this._socket.close();
        };
        // Events >>------------------------------------------------------------<<<<
        Network.prototype.onError = function (event) {
            this.emit(Network.EVENT_ERROR);
            this.disconnect();
        };
        Network.prototype.onOpen = function () {
            console.log('Connection succeed.');
            this.emit(Network.EVENT_CONNECTED);
        };
        Network.prototype.onClose = function (event) {
            if (event.wasClean) {
                // console.log('Соединение закрыто чисто');
                this.emit(Network.EVENT_DISCONNECTED, {
                    status: 'wasClean'
                });
            }
            else {
                // console.log('Обрыв соединения сообщение из класса Network');
                this.emit(Network.EVENT_DISCONNECTED, {
                    status: 'disconnection'
                });
            }
            // console.log('Код: ' + event.code + ' причина: ' + event.reason);
        };
        Network.prototype.onMessage = function (event) {
            var data = JSON.parse(event.data);
            if (this._gameIsBusy) {
                this._queue.push(data);
                console.log(this._queue);
            }
            else {
                this.emit(Network.EVENT_DATA, data);
                console.log(data);
            }
        };
        Network.prototype.storeData = function () {
            this._gameIsBusy = true;
        };
        Network.prototype.popData = function () {
            this._gameIsBusy = false;
            this.emit(Network.EVENT_DATA, this._queue.shift());
        };
        // Params >>------------------------------------------------------------<<<<
        Network.EVENT_CONNECTED = 'Connected';
        Network.EVENT_DISCONNECTED = 'Disconnected';
        Network.EVENT_DATA = 'Data';
        Network.EVENT_ERROR = 'Error';
        Network.EVENT_GAME_IS_WAITING = 'GameIsWaiting';
        Network.EVENT_GAME_IS_BUSY = 'GameIsBusy';
        return Network;
    }(EventEmitter));
    exports.Network = Network;
});
//# sourceMappingURL=Network.js.map