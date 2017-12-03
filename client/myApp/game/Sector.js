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
    var Sector = (function (_super) {
        __extends(Sector, _super);
        function Sector() {
            var _this = _super.call(this, Sector.TEXTURE_SECTOR_RED) || this;
            _this.alpha = 0;
            _this.visible = true;
            _this.interactive = true;
            _this.interactiveChildren = true;
            _this.anchor.set(0.5);
            _this.scale.set(0.75);
            return _this;
        }
        Sector.prototype.highlightMove = function () {
            this.alpha = 0.8;
            this.interactiveOn();
        };
        // public highlightAttack(){
        //     this.yellowTrianglSprite.visible = true;
        //     this.interactiveOn();
        // }
        Sector.prototype.highlightMoveExit = function () {
            this.alpha = 0.5;
            this.texture = Sector.TEXTURE_EXIT_GREEN;
            this.interactiveOn();
        };
        Sector.prototype.interactiveOn = function () {
            this.interactive = true;
            this.interactiveChildren = true;
        };
        Sector.prototype.interactiveOff = function () {
            this.interactive = false;
            this.interactiveChildren = false;
        };
        Sector.TEXTURE_SECTOR_RED = PIXI.Texture.fromImage('assets/Triangle.png');
        Sector.TEXTURE_EXIT_GREEN = PIXI.Texture.fromImage('assets/exit.png');
        return Sector;
    }(Sprite2d));
    exports.Sector = Sector;
});
//# sourceMappingURL=Sector.js.map