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
define(["require", "exports", "./components/Button", "./game/Board", "./components/MessageBox", "./game/Dices", "./core/Network", "./components/NotificationBox"], function (require, exports, Button_1, Board_1, MessageBox_1, Dices_1, Network_1, NotificationBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author Вячеслав И.Э.
     * @version 1.0
     * @since 08 Октябрь 2017
     */
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var TextStyle = PIXI.TextStyle;
    var Game = (function (_super) {
        __extends(Game, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Game() {
            var _this = _super.call(this) || this;
            _this._myTurn = true;
            _this._myName = 'id' + Math.floor(Math.random() * (10000000000000));
            _this.configure();
            return _this;
        }
        Game.prototype.configure = function () {
            // Splash screen >>-------------------------------------------------<<<<
            this.set_logo();
            // Menu screen >>---------------------------------------------------<<<<
            this.set_menu();
            this._throwBtn = new Button_1.Button('DiceRoll', 'diceRoll', 2000);
            this._throwBtn.on('DiceRoll', this.requestCubes, this);
            this._dices = new Dices_1.Dices();
            this._throwBtn.scale.set(0.8);
            this._dices.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
            this._board = new Board_1.Board();
            this._msgBox = new MessageBox_1.MessageBox();
            this._ntfBox = new NotificationBox_1.NotificationBox();
            this._network = new Network_1.Network();
            this._network.on(Network_1.Network.EVENT_CONNECTED, this.eventConnected, this);
            this._network.on(Network_1.Network.EVENT_DISCONNECTED, this.eventDisconnected, this);
            this._network.on(Network_1.Network.EVENT_DATA, this.eventData, this);
            this._board.on(Board_1.Board.EVENT_END_OF_TURN, this.endTurn, this);
            this._board.on(Board_1.Board.EVENT_MOVE_CHIP, this.moveAction, this);
            // this._board.on(Board.EVENT_MOVE_CHIP_JAIL, this.moveAction, this);
            // this.addChild(this._board);
            this.addChild(this._msgBox);
            this.addChild(this._ntfBox);
        };
        // Base >>--------------------------------------------------------------<<<<
        Game.prototype.set_logo = function () {
            var bg = Sprite.fromImage('assets/start.png');
            bg.width = Game.WIDTH;
            bg.height = Game.HEIGHT;
            bg.alpha = 0.5;
            this.addChild(bg);
            // let logo:Sprite = Sprite.fromImage('assets/logo.png');
            // this.addChild(logo);
            //
            // logo.anchor.set(0.5);
            // logo.x = Game.WIDTH / 2;
            // logo.y = Game.HEIGHT / 2;
            // TweenLite.fromTo(logo, 3, {alpha: 1}, {alpha: 0});
            // TweenLite.fromTo(logo, 3, {alpha: 1}, {alpha: 0});
        };
        Game.prototype.set_menu = function () {
            this._startBtn = new Button_1.Button('GameStart', 'test', 5000);
            this._startBtn.on('GameStart', this.openConnection, this);
            this._startBtn.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
            this.addChild(this._startBtn);
        };
        Game.prototype.loadGame = function () {
            this.removeChild(this._startBtn);
            // this._board.show();
            this.addChild(this._board);
            this.showMessage('Waiting for\n opponent..', 0, 0);
            this.addChild(this._dices);
            this.addChild(this._throwBtn);
            this._throwBtn.hide();
            this._dices.hide();
        };
        Game.prototype.gameStart = function () {
            this.startOfTurn();
        };
        Game.prototype.openConnection = function () {
            console.log('Сообщение из гейма: Connecting to server...');
            this._network.openConnection('ws://backgammon.connectivegames.com:8888/ws');
        };
        Game.prototype.showNotification = function (text) {
            var style = new TextStyle({ fill: '#ffffff', fontSize: 28, fontWeight: '800', dropShadow: true, align: 'center' });
            this.addChild(this._ntfBox);
            this._ntfBox.show(text, 2000, style);
        };
        Game.prototype.showMessage = function (text, duration, timeout) {
            var redStyle = new TextStyle({ fill: '#ff0000', fontSize: 42, fontWeight: '800', dropShadow: true, align: 'center' });
            this.addChild(this._msgBox);
            setTimeout(this._msgBox.show.bind(this._msgBox, text, duration, redStyle), timeout);
        };
        // Events >>------------------------------------------------------------<<<<
        Game.prototype.eventConnected = function () {
            console.log('Сообщение из гейма: Sending enter request...');
            this._network.send({
                CLASS_NAME: 'Enter'
            });
            this.loadGame();
        };
        Game.prototype.eventDisconnected = function () {
            console.log('Сообщение из гейма: Disconnected from server.');
        };
        Game.prototype.eventData = function (data) {
            // TODO сделать map
            switch (data.CLASS_NAME) {
                case 'GameState':
                    this.dataOnGameState(data);
                    break;
                case 'GameStart':
                    this.dataOnGameStart(data);
                    break;
                case 'CubeValue':
                    this.dataOnCubeValue(data);
                    break;
                case 'ChangeTable':
                    this.dataOnChangeTable(data);
                    break;
                case 'ErrorMessage':
                    this.dataOnError(data);
                    break;
                case 'PackageMessage':
                    this.dataOnMessage(data);
            }
        };
        Game.prototype.eventSuccessfulThrow = function (data) {
            if (this._myTurn) {
                if (data.first == data.second)
                    this.showNotification('OMG !');
                if (this._myColor == 'w')
                    this._board.startTurn(data.first, data.second, 0);
                else
                    this._board.startTurn(data.first, data.second, 1);
            }
        };
        // Data (server)  >>------------------------------------------------------------<<<<
        Game.prototype.dataOnMessage = function (data) {
            if (data.gameState) {
                console.log('Msg: GameState. Color: ' + data.gameState.color);
                this._myName = data.gameState.myName;
                this._myTurn = data.gameState.stateChange.activePlayerName == this._myName;
                this._myColor = data.gameState.color;
                var arrayChips = [
                    [],
                    [0, 0],
                    [], [], [], [],
                    [1, 1, 1, 1, 1],
                    [],
                    [1, 1, 1],
                    [], [], [],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1],
                    [], [], [],
                    [0, 0, 0],
                    [],
                    [0, 0, 0, 0, 0],
                    [], [], [], [],
                    [1, 1],
                    [], [], []
                ];
                this._board.setState(arrayChips);
                this._board.drawState();
                if (this._myTurn) {
                    if (this._opponent) {
                        this.startOfTurn();
                    }
                    console.log('MyTurn, color: ' + this._myColor);
                }
                else {
                    console.log('NotMyTurn, color: ' + this._myColor);
                }
                this.moveDice(this._myTurn);
            }
            if (data.changeArrayList) {
                console.log('Msg: ChangeArrayList.');
                for (var i = 0; i < data.changeArrayList.length; i++) {
                    if (data.changeArrayList[i].CLASS_NAME == 'GameStart') {
                        this._opponent = data.changeArrayList[i].enemyUserName;
                        if (this._myTurn) {
                            this.startOfTurn();
                        }
                        console.log('Opponent is: ' + this._opponent);
                    }
                    else if (data.changeArrayList[i].CLASS_NAME == "CubeValue") {
                        var first = (data.changeArrayList[i].cubeValues - data.changeArrayList[i].cubeValues % 10) / 10;
                        var second = data.changeArrayList[i].cubeValues % 10;
                        console.log('Сообщение из гейма: Values from server: ', first + ', ', second);
                        this.throwCubes(first, second);
                    }
                    else if (data.changeArrayList[i].CLASS_NAME == 'PossibleMoves' && data.changeArrayList.length < 3) {
                        console.log('Сообщение из гейма: Move  {from: ' + this._lastMove[0] + ',to: ' + this._lastMove[1] + '}.');
                        this._board.moveChip(this._lastMove[0], this._lastMove[1]);
                        this._lastMove[0] = null;
                        this._lastMove[1] = null;
                    }
                    else if (data.changeArrayList[i].CLASS_NAME == 'Move') {
                        console.log('Сообщение из гейма: Move  {from: ' + data.changeArrayList[i].from + ',to: ' + data.changeArrayList[i].to + '}.');
                        this._board.moveOpponentChip(data.changeArrayList[i].from, data.changeArrayList[i].to);
                        if (data.changeArrayList[i + 1].CLASS_NAME == 'StateChange') {
                            this._myTurn = data.changeArrayList[1].activePlayerName == this._myName;
                            if (this._myTurn) {
                                this.startOfTurn();
                            }
                            this.moveDice(this._myTurn);
                        }
                    }
                    else if (data.changeArrayList.length == 1 && data.changeArrayList[0].CLASS_NAME == 'StateChange') {
                        if (this._lastMove[0]) {
                            console.log('Сообщение из гейма: Move  {from: ' + this._lastMove[0] + ',to: ' + this._lastMove[1] + '}.');
                            this._board.moveChip(this._lastMove[0], this._lastMove[1]);
                        }
                    }
                }
            }
        };
        Game.prototype.dataOnError = function (data) {
            this.showNotification(data.message);
        };
        // Data (emulating) >>------------------------------------------------------------<<<<
        Game.prototype.dataOnGameState = function (data) {
            console.log('Сообщение из гейма: GameState пришел.');
            if (!this._myTurn && data.turn == this._myName) {
                this._myColor = data.color;
                this._myTurn = data.turn == this._myName;
                this.startOfTurn();
            }
            else {
                this._myColor = data.color;
            }
        };
        Game.prototype.dataOnGameStart = function (data) {
            console.log('Сообщение из гейма: Your opponent is: ' + data.enemyUserName);
            this.gameStart();
        };
        Game.prototype.dataOnCubeValue = function (data) {
            var first = (data.cubeValues - data.cubeValues % 10) / 10;
            var second = data.cubeValues % 10;
            console.log('Сообщение из гейма: Values from server: ', first + ', ', second);
            this.throwCubes(first, second);
        };
        Game.prototype.dataOnChangeTable = function (data) {
            console.log('Сообщение из гейма: Move accepted.');
            if (this._myTurn)
                this._board.moveChip(data.from, data.to);
            else
                this._board.moveOpponentChip(data.from, data.to);
        };
        // Game cycle >>------------------------------------------------------------<<<<
        Game.prototype.requestCubes = function () {
            console.log('Сообщение из гейма: Requesting values from server...');
            this._network.send({
                CLASS_NAME: 'ThrowCube'
            });
        };
        Game.prototype.moveDice = function (myTurn) {
            if (myTurn) {
                this._dices.position.set(Game.WIDTH / 2 + 185, Game.HEIGHT / 2 + 15);
                this._throwBtn.position.set(Game.WIDTH - 70, Game.HEIGHT / 2);
                // this.showNotification('White\'s turn');
            }
            else {
                this._dices.position.set(Game.WIDTH / 2 - 170, Game.HEIGHT / 2 + 15);
                this._throwBtn.position.set(75, Game.HEIGHT / 2);
                // this.showNotification('Black\'s turn');
            }
        };
        Game.prototype.startOfTurn = function () {
            console.log('Сообщение из гейма: Текущий цвет на начало хода - ', this._myColor);
            this._dices.hide();
            this._throwBtn.show();
        };
        Game.prototype.throwCubes = function (first, second) {
            this._throwBtn.hide();
            this._dices.show();
            this._dices.throwDice(first, second);
            this._dices.on('SuccessfulThrow', this.eventSuccessfulThrow, this);
        };
        Game.prototype.moveAction = function (data) {
            this._network.send({
                CLASS_NAME: 'MoveAction',
                from: data.from,
                to: data.to,
                cantMove: false,
                cubeValue: Math.abs(data.from - data.to)
            });
            this._lastMove = [data.from, data.to];
        };
        Game.prototype.moveJailAction = function (data) {
            this._network.send({
                CLASS_NAME: 'MoveAction',
                from: data.from,
                to: data.to,
                cantMove: false,
                cubeValue: Math.abs(data.from - data.to)
            });
            this._lastMove = [data.from, data.to];
        };
        Game.prototype.endTurn = function () {
            console.log('Сообщение из гейма: EndOfTurn пришел.');
            this._dices.hide();
            this._myTurn = false;
            this.moveDice(this._myTurn);
        };
        // Params >>------------------------------------------------------------<<<<
        Game.WIDTH = 1024;
        Game.HEIGHT = 768;
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map