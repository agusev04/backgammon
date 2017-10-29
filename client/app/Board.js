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
define(["require", "exports", "./Game"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<reference path="../dts/pixi.js.d.ts"/>
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Board = (function (_super) {
        __extends(Board, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Board() {
            var _this = _super.call(this) || this;
            _this.configure();
            return _this;
        }
        Board.prototype.configure = function () {
            this.bg = Sprite.fromImage('assets/board.png');
            this.bg.width = Game_1.Game.WIDTH;
            this.bg.height = Game_1.Game.HEIGHT;
            TweenLite.set(this.bg, { alpha: 1, x: Game_1.Game.WIDTH });
            TweenLite.to(this.bg, 1, { alpha: 1, x: 0 });
            this.addChild(this.bg);
        };
        return Board;
    }(Container));
    exports.Board = Board;
});
//# sourceMappingURL=Board.js.map