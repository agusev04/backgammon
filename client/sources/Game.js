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
///<reference path="Board.ts"/>
/**
 * @author Вячеслав И.Э.
 * @version 1.0
 * @since 08 Октябрь 2017
 */
var Container = PIXI.Container;
var Sprite = PIXI.Sprite;
var Board_1 = require("./Board");
var Cell_1 = require("./Cell");
var Game = (function (_super) {
    __extends(Game, _super);
    // Init >>--------------------------------------------------------------<<<<
    /**
     * @private
     */
    function Game() {
        var _this = _super.call(this) || this;
        // public static Chips: Chip[]= [
        //     new Chip(0, true),
        //     new Chip(0, false),
        //     new Chip(1, true),
        //     new Chip(1, false),
        //     new Chip(2, true),
        //     new Chip(2, false),
        //     new Chip(3, true),
        //     new Chip(3, false),
        //     new Chip(4, true),
        //     new Chip(4, false),
        //     new Chip(5, true),
        //     new Chip(5, false),
        //     new Chip(6, true),
        //     new Chip(6, false),
        //     new Chip(7, true),
        //     new Chip(7, false),
        //     new Chip(8, true),
        //     new Chip(8, false),
        //     new Chip(9, true),
        //     new Chip(9, false),
        //     new Chip(10, true),
        //     new Chip(10, false),
        //     new Chip(11, true),
        //     new Chip(11, false),
        //     new Chip(12, true),
        //     new Chip(12, false),
        //     new Chip(13, true),
        //     new Chip(13, false),
        //     new Chip(14, true),
        //     new Chip(14, false),
        // ];
        _this.on_cell = new Cell_1.Cell(2, true, 155, 60);
        _this.second_cell = new Cell_1.Cell(3, false, 210, 60);
        _this.configurate();
        return _this;
    }
    Game.prototype.configurate = function () {
        var bg = new Sprite(PIXI.Texture.WHITE);
        var board = new Board_1.Board;
        bg.width = Game.WIDTH;
        bg.height = Game.HEIGHT;
        var logo = Sprite.fromImage('assets/logo.jpg');
        this.addChild(bg);
        this.addChild(logo);
        this.addChild(board);
        //this.draw_chips();
        this.addChild(this.on_cell);
        this.addChild(this.second_cell);
        setTimeout(function () {
            board.bg.visible = true;
            // for (let i = 0; i < Game.Chips.length; i ++){
            //     Game.Chips[i].visible = true;
            // }
        }, 3000);
        logo.anchor.set(0.5);
        logo.x = Game.WIDTH / 2;
        logo.y = Game.HEIGHT / 2;
    };
    // Params >>------------------------------------------------------------<<<<
    Game.WIDTH = 1024;
    Game.HEIGHT = 768;
    return Game;
}(Container));
exports.Game = Game;
