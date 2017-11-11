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
var Sectors = (function (_super) {
    __extends(Sectors, _super);
    function Sectors(ind) {
        var _this = _super.call(this) || this;
        _this.regionSprite = new Sprite(PIXI.Texture.WHITE);
        _this.greenTrianglSprite = new Sprite(PIXI.Texture.WHITE);
        _this.yellowTrianglSprite = new Sprite(PIXI.Texture.WHITE);
        _this.regionSprite_skin = Texture.fromImage('assets/zone.png');
        _this.greenTrianglSprite_skin = Texture.fromImage('assets/ActTriangl_green.png');
        _this.yellowTrianglSprite_skin = Texture.fromImage('assets/ActTriangl_yell.png');
        _this.index = ind;
        _this.regionSprite.alpha = 0;
        _this.regionSprite.interactive = true;
        _this.regionSprite.buttonMode = true;
        _this.regionSprite.anchor.set(0.5, 0);
        _this.regionSprite.width = 50;
        _this.regionSprite.texture = _this.regionSprite_skin;
        _this.yellowTrianglSprite.anchor.set(0.5, 0);
        _this.yellowTrianglSprite.width = 50;
        _this.yellowTrianglSprite.texture = _this.yellowTrianglSprite_skin;
        _this.yellowTrianglSprite.visible = false;
        _this.greenTrianglSprite.anchor.set(0.5, 0);
        _this.greenTrianglSprite.width = 50;
        _this.greenTrianglSprite.visible = false;
        _this.greenTrianglSprite.texture = _this.greenTrianglSprite_skin;
        _this.addChild(_this.regionSprite);
        _this.addChild(_this.greenTrianglSprite);
        _this.addChild(_this.yellowTrianglSprite);
        return _this;
    }
    return Sectors;
}(Container));
exports.Sectors = Sectors;
