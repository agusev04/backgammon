"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Container = PIXI.Container;
var Sprite = PIXI.Sprite;
var Texture = PIXI.Texture;
var Chip = (function (_super) {
    __extends(Chip, _super);
    function Chip(color_white) {
        var _this = _super.call(this) || this;
        _this.chipSprite = new Sprite(PIXI.Texture.WHITE);
        _this.chipSkinWhite = Texture.fromImage('assets/white.png');
        _this.chipSkinWhite_active = Texture.fromImage('assets/white_active.png');
        _this.chipSkinBlack = Texture.fromImage('assets/black.png');
        _this.chipSkinBlack_active = Texture.fromImage('assets/black_active.png');
        _this.colorChipWhite = color_white;
        _this.blackOrWhite();
        _this.chipSprite.anchor.set(0.5);
        _this.chipSprite.width = 60; //Game.WIDTH/15;
        _this.chipSprite.height = 60; //Game.HEIGHT/15;
        _this.selectNow = false;
        _this.addChild(_this.chipSprite);
        return _this;
    }
    Chip.prototype.blackOrWhite = function () {
        if (this.colorChipWhite) {
            this.chipSprite.texture = this.chipSkinWhite;
        }
        else
            this.chipSprite.texture = this.chipSkinBlack;
    };
    return Chip;
}(Container));
exports.Chip = Chip;
