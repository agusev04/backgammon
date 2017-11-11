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
define(["require", "exports", "./components/Button"], function (require, exports, Button_1) {
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
            _this.configure();
            return _this;
        }
        Dices.prototype.configure = function () {
            var roll = new Button_1.Button('DiceRoll', 'test', 2000);
            this.addChild(roll);
            roll.position.set(0, 70);
            var animation = [];
            for (var i = 0; i < 30; i++) {
                animation.push(new PIXI.Rectangle(100 * i, 0, 100, 100));
            }
            var Dice_1 = new Sprite();
            var Dice_2 = new Sprite();
            var base = BaseTexture.fromImage('assets/dice.png');
            Dice_1.visible = false;
            Dice_2.visible = false;
            Dice_1.texture = new Texture(base);
            Dice_2.texture = new Texture(base);
            Dice_1.anchor.set(0.5);
            Dice_2.anchor.set(0.5);
            Dice_1.position.set(-50, 0);
            Dice_2.position.set(50, 0);
            this.addChild(Dice_1);
            this.addChild(Dice_2);
            // this.animate(Dice_1, animation);
            // this.animate(Dice_2, animation);
            roll.on('DiceRoll', this.animate.bind(this, Dice_1, animation, this._val_1));
            roll.on('DiceRoll', this.animate.bind(this, Dice_2, animation, this._val_2));
        };
        Dices.prototype.animate = function (sprite, animation, value) {
            sprite.visible = true;
            var _loop_1 = function (i) {
                setTimeout(function () {
                    sprite.texture.frame = animation[i];
                }.bind(this_1), i * 80);
            };
            var this_1 = this;
            for (var i = 0; i < 24; i++) {
                _loop_1(i);
            }
            var side = Math.floor(Math.random() * (6)) + 24;
            setTimeout(function () {
                sprite.texture.frame = animation[side];
            }, 1920);
        };
        return Dices;
    }(Container));
    exports.Dices = Dices;
});
//# sourceMappingURL=Dices.js.map