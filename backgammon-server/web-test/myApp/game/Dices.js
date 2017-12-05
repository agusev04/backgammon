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
    var Dices = /** @class */ (function (_super) {
        __extends(Dices, _super);
        function Dices() {
            var _this = _super.call(this) || this;
            _this._dice1 = new Sprite();
            _this._dice2 = new Sprite();
            _this.configure();
            return _this;
        }
        Dices.prototype.configure = function () {
            this._diceFinal = [[
                    new Texture(BaseTexture.fromImage('assets/Dice/1 - 1.png')),
                    new Texture(BaseTexture.fromImage('assets/Dice/2 - 1.png')),
                    new Texture(BaseTexture.fromImage('assets/Dice/3 - 1.png')),
                    new Texture(BaseTexture.fromImage('assets/Dice/4 - 1.png')),
                    new Texture(BaseTexture.fromImage('assets/Dice/5 - 1.png')),
                    new Texture(BaseTexture.fromImage('assets/Dice/6 - 1.png')),
                ], [
                    new Texture(BaseTexture.fromImage('assets/Dice/1 - 2.png')),
                    new Texture(BaseTexture.fromImage('assets/Dice/2 - 2.png')),
                    new Texture(BaseTexture.fromImage('assets/Dice/3 - 2.png')),
                    new Texture(BaseTexture.fromImage('assets/Dice/4 - 2.png')),
                    new Texture(BaseTexture.fromImage('assets/Dice/5 - 2.png')),
                    new Texture(BaseTexture.fromImage('assets/Dice/6 - 2.png')),
                ]];
            this._animation = [[], []];
            for (var i = 0; i < 6; i++) {
                this._animation[1].push(new PIXI.Rectangle(64 * i, 0, 64, 60));
            }
            for (var i = 0; i < 6; i++) {
                this._animation[0].push(new PIXI.Rectangle(64 * i, 60, 64, 60));
            }
            this._baseTexture = BaseTexture.fromImage('assets/newDice.png');
            this._dice1.visible = false;
            this._dice2.visible = false;
            this._dice1.texture = new Texture(this._baseTexture);
            this._dice2.texture = new Texture(this._baseTexture);
            this._dice1.anchor.set(0.5);
            this._dice2.anchor.set(0.5);
            this._dice1.scale.set(0.7);
            this._dice2.scale.set(0.7);
            this._dice1.position.set(-30, -15);
            this._dice2.position.set(30, 15);
            this.addChild(this._dice1);
            this.addChild(this._dice2);
        };
        Dices.prototype.animate = function (val1, val2) {
            //
            // this._dice1.texture = new Texture(this._baseTexture);
            // this._dice2.texture = new Texture(this._baseTexture);
            // this._dice1.visible = true;
            // this._dice2.visible = true;
            // for (let i=0; i < 6;i++)
            // {
            //     setTimeout(function () {
            //         this._dice1.texture.frame = this._animation[0][i];
            //         this._dice2.texture.frame = this._animation[1][i];
            //     }.bind(this), i * 100);
            // }
            // setTimeout(function () {
            //     this._dice1.texture.frame = new PIXI.Rectangle(0,0,77,72);
            //     this._dice2.texture.frame = new PIXI.Rectangle(0,0,71,70);
            //     this._dice1.texture = this._diceFinal[0][val1-1];
            //     this._dice2.texture = this._diceFinal[1][val2-1];
            // }.bind(this), 600);
            this._dice1.visible = true;
            this._dice2.visible = true;
            this._dice1.texture = this._diceFinal[0][val1 - 1];
            this._dice2.texture = this._diceFinal[1][val2 - 1];
            setTimeout(function () {
                this.emit('SuccessfulThrow', { first: val1, second: val2 });
            }.bind(this), 100);
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