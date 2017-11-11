///<reference path="../dts/pixi.js.d.ts"/>
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
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var MessageBox = (function (_super) {
        __extends(MessageBox, _super);
        function MessageBox() {
            var _this = _super.call(this) || this;
            _this.configure();
            return _this;
        }
        MessageBox.prototype.configure = function () {
            var image = Sprite.fromImage('assets/msg.png');
            image.anchor.set(0.5);
            image.scale.set(1);
            image.x = Game_1.Game.WIDTH / 2;
            image.y = Game_1.Game.HEIGHT / 2;
            this.addChild(image);
            TweenLite.set(this, { alpha: 0 });
        };
        MessageBox.prototype.show = function (message, duration, styleMsg) {
            var textMsg = new PIXI.Text(message);
            textMsg.style = styleMsg;
            textMsg.anchor.set(0.5);
            textMsg.position.set(Game_1.Game.WIDTH / 2, Game_1.Game.HEIGHT / 2);
            this.addChild(textMsg);
            this.popUp();
            setTimeout(function () {
                setTimeout(function () {
                    this.removeChild(textMsg);
                }.bind(this), 1000);
                this.popOut();
            }.bind(this), duration);
        };
        MessageBox.prototype.popUp = function () {
            TweenLite.set(this, { x: 0, y: 0 });
            TweenLite.to(this, 1, { alpha: 1 });
        };
        MessageBox.prototype.popOut = function () {
            TweenLite.to(this, 1, { x: 2 * Game_1.Game.WIDTH });
        };
        return MessageBox;
    }(Container));
    exports.MessageBox = MessageBox;
});
//# sourceMappingURL=MessageBox.js.map