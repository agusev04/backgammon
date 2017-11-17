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
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Texture = PIXI.Texture;
    var BaseTexture = PIXI.BaseTexture;
    var Dices = (function (_super) {
        __extends(Dices, _super);
        function Dices() {
            var _this = _super.call(this) || this;
            _this._dice1 = new Sprite();
            _this._dice2 = new Sprite();
            _this.configure();
            return _this;
        }
        Dices.prototype.configure = function () {
            this._animation = [];
            for (var i = 0; i < 30; i++) {
                this._animation.push(new PIXI.Rectangle(100 * i, 0, 100, 100));
            }
            var base = BaseTexture.fromImage('assets/dice.png');
            this._dice1.visible = false;
            this._dice2.visible = false;
            this._dice1.texture = new Texture(base);
            this._dice2.texture = new Texture(base);
            this._dice1.anchor.set(0.5);
            this._dice2.anchor.set(0.5);
            this._dice1.position.set(-50, 0);
            this._dice2.position.set(50, 0);
            this.addChild(this._dice1);
            this.addChild(this._dice2);
        };
        Dices.prototype.animate = function (val1, val2) {
            this._dice1.visible = true;
            this._dice2.visible = true;
            var _loop_1 = function (i) {
                setTimeout(function () {
                    this._dice1.texture.frame = this._animation[i];
                    this._dice2.texture.frame = this._animation[i];
                }.bind(this_1), i * 80);
            };
            var this_1 = this;
            for (var i = 0; i < 24; i++) {
                _loop_1(i);
            }
            setTimeout(function () {
                this._dice1.texture.frame = this._animation[23 + val1];
                this._dice2.texture.frame = this._animation[23 + val2];
            }.bind(this), 1920);
            setTimeout(function () {
                this.emit('SuccessfulThrow', { first: val1, second: val2 });
            }.bind(this), 2100);
        };
        Dices.prototype.throwDice = function (val1, val2) {
            this._val1 = val1;
            this._val2 = val2;
            this.animate(this._val1, this._val2);
        };
        Dices.prototype.show = function () {
            this.visible = true;
        };
        Dices.prototype.hide = function () {
            this.visible = false;
        };
        return Dices;
    }(Container));
    exports.Dices = Dices;
});
//# sourceMappingURL=Dices.js.map