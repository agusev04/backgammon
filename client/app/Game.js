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
define(["require", "exports", "./Button", "./Board", "./MessageBox"], function (require, exports, Button_1, Board_1, MessageBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author Вячеслав И.Э.
     * @version 1.0
     * @since 08 Октябрь 2017
     */
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var EventEmitter = PIXI.utils.EventEmitter;
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
            var startBtn = new Button_1.Button('GameStart');
            startBtn.on('GameStart', this.GameStart.bind(this, startBtn));
            this.addChild(startBtn);
            startBtn.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
        };
        // Events >>------------------------------------------------------------<<<<
        Game.prototype.GameStart = function (startBtn) {
            console.log(this, 'TestLog');
            this.removeChild(startBtn);
            // let chip = new Chip(0, false);
            // this.addChild(chip);
            var GameBoard = new Board_1.Board();
            var MsgBox = new MessageBox_1.MessageBox();
            this.addChild(GameBoard);
            this.addChild(MsgBox);
            var redStyle = new TextStyle({ fill: '#ff0000', fontSize: 42, fontWeight: '800', dropShadow: true, align: 'center' });
            setTimeout(MsgBox.show.bind(MsgBox, 'Hello', 2000, redStyle), 1000);
            setTimeout(MsgBox.show.bind(MsgBox, 'It is a test\n message box', 5000, redStyle), 6000);
        };
        // Params >>------------------------------------------------------------<<<<
        Game.WIDTH = 1024;
        Game.HEIGHT = 768;
        Game.EVENTS = new EventEmitter();
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map