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
    var Sector = (function (_super) {
        __extends(Sector, _super);
        function Sector(ind) {
            var _this = _super.call(this) || this;
            _this.sectorSprite = new Sprite(PIXI.Texture.WHITE);
            _this.greenTrianglSprite = new Sprite(PIXI.Texture.WHITE);
            _this.yellowTrianglSprite = new Sprite(PIXI.Texture.WHITE);
            _this.sectorSprite_skin = Texture.fromImage('assets/zone.png');
            _this.greenTrianglSprite_skin = Texture.fromImage('assets/ActTriangl_green.png');
            _this.yellowTrianglSprite_skin = Texture.fromImage('assets/ActTriangl_yell.png');
            _this.index = ind;
            _this.sectorSprite.alpha = 0;
            // this.sectorSprite.interactive = true;
            // this.sectorSprite.buttonMode = true;
            _this.interactive = true;
            _this.interactiveChildren = true;
            _this.sectorSprite.anchor.set(0.5, 0);
            _this.sectorSprite.width = 50;
            _this.sectorSprite.texture = _this.sectorSprite_skin;
            _this.yellowTrianglSprite.anchor.set(0.5, 0);
            _this.yellowTrianglSprite.width = 50;
            _this.yellowTrianglSprite.texture = _this.yellowTrianglSprite_skin;
            _this.yellowTrianglSprite.visible = false;
            _this.greenTrianglSprite.anchor.set(0.5, 0);
            _this.greenTrianglSprite.width = 50;
            _this.greenTrianglSprite.visible = false;
            _this.greenTrianglSprite.texture = _this.greenTrianglSprite_skin;
            _this.addChild(_this.sectorSprite);
            _this.addChild(_this.greenTrianglSprite);
            _this.addChild(_this.yellowTrianglSprite);
            return _this;
        }
        Sector.prototype.highlightMove = function () {
            this.greenTrianglSprite.visible = true;
            this.interactiveOn();
        };
        Sector.prototype.highlightAttack = function () {
            this.yellowTrianglSprite.visible = true;
            this.interactiveOff();
        };
        Sector.prototype.interactiveOn = function () {
            this.interactive = true;
            this.interactiveChildren = true;
        };
        Sector.prototype.interactiveOff = function () {
            this.interactive = false;
            this.interactiveChildren = false;
        };
        return Sector;
    }(Container));
    exports.Sector = Sector;
});
//# sourceMappingURL=Sector.js.map