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
            _this.configure();
            return _this;
        }
        Game.prototype.configure = function () {
            // Splash screen >>-------------------------------------------------<<<<
            this.set_logo();
            // Menu screen >>---------------------------------------------------<<<<
            setTimeout(this.set_menu.bind(this), 3000);
            this._startBtn = new Button_1.Button('GameStart', 'test', 5000);
            this._board = new Board_1.Board();
            this._msgBox = new MessageBox_1.MessageBox();
            this._dices = new Dices_1.Dices();
            this._network = new Network_1.Network();
            this._network.on(Network_1.Network.EVENT_CONNECTED, this.eventConnected, this);
            this._network.on(Network_1.Network.EVENT_DATA, this.eventData, this);
            this.addChild(this._board);
            this.addChild(this._msgBox);
        };
        Game.prototype.eventConnected = function () {
            console.log('Sending enter request...');
            this._network.enter();
        };
        Game.prototype.eventData = function (data) {
            switch (data.CLASS_NAME) {
                case 'GameState':
                    console.log('GameState reached from server. Waiting for opponent...');
                    this._board.drawState(data);
                    this.LoadGame();
                    break;
                case 'GameStart':
                    console.log('Your opponent is: ' + data.enemyUserName);
                    this.GameStart();
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
        Game.prototype.openConnection = function () {
            console.log('Connecting to server...');
            this._network.open();
        };
        // Events >>------------------------------------------------------------<<<<
        Game.prototype.LoadGame = function () {
            this.removeChild(this._startBtn);
            this._board.show();
            var redStyle = new TextStyle({ fill: '#ff0000', fontSize: 42, fontWeight: '800', dropShadow: true, align: 'center' });
            this.addChild(this._msgBox);
            setTimeout(this._msgBox.show.bind(this._msgBox, 'Hello', 2000, redStyle), 1000);
            setTimeout(this._msgBox.show.bind(this._msgBox, 'Roll a dice !', 2000, redStyle), 4000);
            this._dices.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
        };
        Game.prototype.GameStart = function () {
            this.addChild(this._dices);
        };
        // Params >>------------------------------------------------------------<<<<
        Game.WIDTH = 1024;
        Game.HEIGHT = 768;
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map