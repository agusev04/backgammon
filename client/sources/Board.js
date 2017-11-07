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
var Board = (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super.call(this) || this;
        _this.bg_skin = Texture.fromImage('assets/bg.png');
        _this.bg = new Sprite(PIXI.Texture.WHITE);
        _this.setup();
        return _this;
    }
    Board.prototype.setup = function () {
        this.bg.texture = this.bg_skin;
        this.bg.visible = false;
        this.addChild(this.bg);
    };
    return Board;
}(Container));
exports.Board = Board;
