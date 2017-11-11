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
define(["require", "exports", "./Game", "./Button"], function (require, exports, Game_1, Button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<reference path="../dts/pixi.js.d.ts"/>
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Menu(board) {
            var _this = _super.call(this) || this;
            _this.board = board;
            _this.configure();
            return _this;
        }
        Menu.prototype.configure = function () {
            var bg = Sprite.fromImage('assets/menu.jpg');
            bg.width = Game_1.Game.WIDTH;
            bg.height = Game_1.Game.HEIGHT;
            var logo = Sprite.fromImage('assets/backgammon.png');
            logo.anchor.set(0.5, 1);
            logo.x = Game_1.Game.WIDTH / 2;
            logo.y = Game_1.Game.HEIGHT / 2;
            this.addChild(bg);
            this.addChild(logo);
            Game_1.Game.EVENTS.on('TestMessage', this.testFunction);
            var testBtn = new Button_1.Button('TestMessage');
            testBtn.x = Game_1.Game.WIDTH / 2;
            testBtn.y = Game_1.Game.HEIGHT / 1.5;
            this.addChild(testBtn);
        };
        Menu.prototype.testFunction = function () {
            console.log('Okay from Menu');
        };
        return Menu;
    }(Container));
    exports.Menu = Menu;
});
//# sourceMappingURL=Menu.js.map