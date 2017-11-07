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
    function Chip(chip_i, color_black, position_x, position_y) {
        var _this = _super.call(this) || this;
        _this.chip_sprite = new Sprite(PIXI.Texture.WHITE);
        _this.chip_skin_white = Texture.fromImage('assets/white.png');
        _this.chip_skin_black = Texture.fromImage('assets/black.png');
        _this.chip_skin_white_active = Texture.fromImage('assets/white_active.png');
        _this.chip_skin_black_active = Texture.fromImage('assets/black_active.png');
        _this.chip_color_black = color_black;
        _this.chip_index = chip_i;
        _this.chip_sprite.texture = _this.chip_skin_white;
        _this.chip_sprite.visible = true;
        _this.chip_sprite.position.x = position_x;
        _this.chip_sprite.position.y = position_y;
        _this.setup();
        return _this;
    }
    ;
    Chip.prototype.setup = function () {
        if (this.chip_color_black) {
            this.chip_sprite.texture = this.chip_skin_black;
        }
        else {
            this.chip_sprite.texture = this.chip_skin_white;
        }
        this.chip_sprite.anchor.set(0.5);
        this.chip_sprite.width = 64; //Game.WIDTH/15;
        this.chip_sprite.height = 64; //Game.HEIGHT/15;
        this.chip_sprite.interactive = true;
        this.chip_sprite.buttonMode = true;
        this.chip_sprite
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);
        function onDragStart(event) {
            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;
        }
        function onDragEnd() {
            this.alpha = 1;
            this.dragging = false;
            this.data = null;
        }
        function onDragMove() {
            if (this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);
                this.x = newPosition.x;
                this.y = newPosition.y;
            }
        }
        this.addChild(this.chip_sprite);
    };
    ;
    return Chip;
}(Container));
exports.Chip = Chip;
