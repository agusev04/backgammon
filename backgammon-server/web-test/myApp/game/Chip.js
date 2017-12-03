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
    var Sprite2d = PIXI.projection.Sprite2d;
    var Chip = (function (_super) {
        __extends(Chip, _super);
        function Chip(color) {
            var _this = _super.call(this, color == Chip.COLOR_WHITE ? Chip.TEXTURE_WHITE_NORMAL : Chip.TEXTURE_BLACK_NORMAL) || this;
            _this._selected = false;
            _this._color = color;
            _this.anchor.set(0.5);
            _this.scale.set(0.6);
            _this.proj.affine = PIXI.projection.AFFINE.AXIS_X;
            return _this;
        }
        Object.defineProperty(Chip.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                if (this._color != value) {
                    this._color = value;
                    this.drawState();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chip.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                if (this._selected != value) {
                    this._selected = value;
                    this.drawState();
                }
            },
            enumerable: true,
            configurable: true
        });
        Chip.prototype.drawState = function () {
            var temp;
            switch (this._color) {
                case Chip.COLOR_BLACK:
                    temp = this._selected ? Chip.TEXTURE_BLACK_SELECTED : Chip.TEXTURE_BLACK_NORMAL;
                    break;
                case Chip.COLOR_WHITE:
                    temp = this._selected ? Chip.TEXTURE_WHITE_SELECTED : Chip.TEXTURE_WHITE_NORMAL;
                    break;
            }
            this.texture = temp;
        };
        Chip.prototype.chipExit = function () {
            var temp;
            switch (this._color) {
                case Chip.COLOR_BLACK:
                    temp = Chip.TEXTURE_EXIT_BLACK;
                    break;
                case Chip.COLOR_WHITE:
                    temp = Chip.TEXTURE_EXIT_WHITE;
                    break;
            }
            this.texture = temp;
            this.scale.set(0.6, 0.6);
            this.rotation = -3.14;
        };
        Chip.COLOR_BLACK = "black";
        Chip.COLOR_WHITE = "white";
        Chip.TEXTURE_WHITE_NORMAL = PIXI.Texture.fromImage('assets/chipWhite.png');
        Chip.TEXTURE_WHITE_SELECTED = PIXI.Texture.fromImage('assets/whiteActivChip.png');
        Chip.TEXTURE_BLACK_NORMAL = PIXI.Texture.fromImage('assets/chipBlack.png');
        Chip.TEXTURE_BLACK_SELECTED = PIXI.Texture.fromImage('assets/blackActivChip.png');
        Chip.TEXTURE_EXIT_WHITE = PIXI.Texture.fromImage('assets/exitWhite.png');
        Chip.TEXTURE_EXIT_BLACK = PIXI.Texture.fromImage('assets/exitBlack.png');
        return Chip;
    }(Sprite2d));
    exports.Chip = Chip;
});
//# sourceMappingURL=Chip.js.map