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
    ///<reference path="../dts/pixi.js.d.ts"/>
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Texture = PIXI.Texture;
    var Chip = (function (_super) {
        __extends(Chip, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Chip(index, isWhite) {
            var _this = _super.call(this) || this;
            _this.chipSprite = new Sprite(PIXI.Texture.WHITE);
            _this.black_chip = Texture.fromImage('assets/black.png');
            _this.white_chip = Texture.fromImage('assets/white.png');
            _this.black_active_chip = Texture.fromImage('assets/black_active.png');
            _this.white_active_chip = Texture.fromImage('assets/white_active.png');
            _this.index = index;
            _this.isWhite = isWhite;
            _this.configure();
            return _this;
        }
        Chip.prototype.configure = function () {
            this.chipSprite.anchor.set(0.5);
            this.chipSprite.width = 64;
            this.chipSprite.height = 64;
            this.chipSprite.interactive = true;
            this.chipSprite.buttonMode = true;
            if (!this.isWhite) {
                this.chipSprite.texture = this.black_chip;
            }
            else {
                this.chipSprite.texture = this.white_chip;
            }
            this.chipSprite
                .on('pointerdown', function (event) {
                this.data = event.data;
                this.isDragging = true;
                this.parent.changeTexture(true);
            })
                .on('pointerup', function () {
                this.data = null;
                this.isDragging = false;
                this.parent.changeTexture(false);
            })
                .on('pointerupoutside', function () {
                this.data = null;
                this.isDragging = false;
                this.parent.changeTexture(false);
            })
                .on('pointermove', function () {
                if (this.isDragging) {
                    var newPos = this.data.getLocalPosition(this.parent);
                    this.position.x = newPos.x;
                    this.position.y = newPos.y;
                }
            });
            this.addChild(this.chipSprite);
        };
        Chip.prototype.changeTexture = function (active) {
            if (active) {
                if (!this.isWhite)
                    this.chipSprite.texture = this.black_active_chip;
                else
                    this.chipSprite.texture = this.white_active_chip;
            }
            else {
                if (!this.isWhite)
                    this.chipSprite.texture = this.black_chip;
                else
                    this.chipSprite.texture = this.white_chip;
            }
        };
        return Chip;
    }(Container));
    exports.Chip = Chip;
});
//# sourceMappingURL=Chip.js.map