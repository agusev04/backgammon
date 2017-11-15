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
define(["require", "exports", "./components/Button", "./game/Board", "./components/MessageBox", "./game/Dices", "./core/Network"], function (require, exports, Button_1, Board_1, MessageBox_1, Dices_1, Network_1) {
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
            _this._myName = 'Jp';
            _this.configure();
            return _this;
        }
        Game.prototype.configure = function () {
            // Splash screen >>-------------------------------------------------<<<<
            this.set_logo();
            // Menu screen >>---------------------------------------------------<<<<
            setTimeout(this.set_menu.bind(this), 3000);
            this._startBtn = new Button_1.Button('GameStart', 'test', 5000);
            this._throwBtn = new Button_1.Button('DiceRoll', 'test', 2000);
            this._board = new Board_1.Board();
            this._msgBox = new MessageBox_1.MessageBox();
            this._dices = new Dices_1.Dices();
            this._network = new Network_1.Network();
            this._network.on(Network_1.Network.EVENT_CONNECTED, this.eventConnected, this);
            this._network.on(Network_1.Network.EVENT_DISCONNECTED, this.eventDisconnected, this);
            this._network.on(Network_1.Network.EVENT_DATA, this.eventData, this);
            this._board.on(Board_1.Board.EVENT_ENDOFTURN, this.endTurn, this);
            // this.addChild(this._board);
            this.addChild(this._msgBox);
        };
        Game.prototype.endTurn = function () {
            this._throwBtn.show();
            this._dices.hide();
        };
        Game.prototype.eventDisconnected = function () {
            console.log('Disconnected from server.');
        };
        Game.prototype.eventConnected = function () {
            console.log('Sending enter request...');
            this._network.enter();
        };
        Game.prototype.eventData = function (data) {
            switch (data.CLASS_NAME) {
                // TODO Сделать отдельные функции
                case 'GameState':
                    console.log('GameState reached from server. Waiting for opponent...');
                    this._myTurn = data.turn == this._myName;
                    // this._board.drawState();
                    this.loadGame();
                    break;
                case 'GameStart':
                    console.log('Your opponent is: ' + data.enemyUserName);
                    this.gameStart();
                    break;
                case 'CubeValue':
                    var first = (data.cubeValues - data.cubeValues % 10) / 10;
                    var second = data.cubeValues % 10;
                    console.log('Values from server: ', first + ', ', second);
                    this.throwCubes(first, second);
                    this._board.setDice(first, second);
                    // Передать данные кубика
                    break;
                case 'PossiblePositions':
                    console.log('Possible positions: ' + data.possiblePositions);
                    this.moveChip(data.possiblePositions);
                    break;
                case 'ChangeTable':
                    console.log('Chip moved');
                    break;
            }
        };
        // Base >>--------------------------------------------------------------<<<<
        Game.prototype.set_logo = function () {
            var bg = Sprite.fromImage('assets/bg.jpg');
            bg.width = Game.WIDTH;
            bg.height = Game.HEIGHT;
            bg.alpha = 0.5;
            var logo = Sprite.fromImage('assets/logo.png');
            this.addChild(bg);
            this.addChild(logo);
            logo.anchor.set(0.5);
            logo.x = Game.WIDTH / 2;
            logo.y = Game.HEIGHT / 2;
            TweenLite.fromTo(logo, 3, { alpha: 1 }, { alpha: 0 });
            TweenLite.fromTo(logo, 3, { alpha: 1 }, { alpha: 0 });
        };
        Game.prototype.set_menu = function () {
            this._startBtn.on('GameStart', this.openConnection, this);
            this._startBtn.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
            this.addChild(this._startBtn);
        };
        Game.prototype.set_cube = function () {
            this._throwBtn.on('DiceRoll', this.requestCubes, this);
            this._throwBtn.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
            this._dices.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
            this.addChild(this._throwBtn);
            this.addChild(this._dices);
            this._dices.hide();
        };
        Game.prototype.openConnection = function () {
            console.log('Connecting to server...');
            this._network.openConnection('ws://localhost:8888/ws');
        };
        Game.prototype.requestCubes = function () {
            console.log('Requesting values from server...');
            this._network.send({
                CLASS_NAME: 'ThrowCube'
            });
        };
        Game.prototype.requestPossiblePositions = function () {
            this._network.send({
                CLASS_NAME: 'ShowPossiblePositions'
            });
        };
        // Events >>------------------------------------------------------------<<<<
        Game.prototype.loadGame = function () {
            this.removeChild(this._startBtn);
            // this._board.show();
            this.addChild(this._board);
            var redStyle = new TextStyle({ fill: '#ff0000', fontSize: 42, fontWeight: '800', dropShadow: true, align: 'center' });
            this.addChild(this._msgBox);
            setTimeout(this._msgBox.show.bind(this._msgBox, 'Hello', 2000, redStyle), 1000);
            setTimeout(this._msgBox.show.bind(this._msgBox, 'Roll a dice !', 2000, redStyle), 4000);
        };
        Game.prototype.gameStart = function () {
            this.set_cube();
        };
        Game.prototype.throwCubes = function (first, second) {
            this._throwBtn.hide();
            this._dices.show();
            this._dices.throwDice(first, second);
            // this._dices.on('SuccessfulThrow', this.requestPossiblePositions, this);
        };
        Game.prototype.moveChip = function (positions) {
            console.log('Requesting move: 504');
            this._network.send({
                CLASS_NAME: 'MoveChip',
                Positions: positions[0]
            });
        };
        // Params >>------------------------------------------------------------<<<<
        Game.WIDTH = 1024;
        Game.HEIGHT = 768;
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map