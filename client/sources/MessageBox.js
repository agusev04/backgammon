"use strict";
///<reference path="../dts/pixi.js.d.ts"/>
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
var Game_1 = require("./Game");
var Texture = PIXI.Texture;
var MessageBox = (function (_super) {
    __extends(MessageBox, _super);
    function MessageBox() {
        var _this = _super.call(this) || this;
        _this.configure();
        return _this;
    }
    MessageBox.prototype.configure = function () {
        var msgList = [
            Texture.fromImage('assets/messages/1.png'),
            Texture.fromImage('assets/messages/2.png'),
        ];
        var image = new Sprite();
        image.anchor.set(0.5);
        image.scale.set(1.5);
        image.x = Game_1.Game.WIDTH / 2;
        image.y = Game_1.Game.HEIGHT / 2;
        this.addChild(image);
        TweenLite.set(image, { alpha: 0 });
        this.on('popUp', function () {
            image.texture = msgList[arguments[0]];
            TweenLite.set(image, { x: Game_1.Game.WIDTH / 2, alpha: 0 });
            TweenLite.to(image, 1, { alpha: 1 });
        })
            .on('popOut', function () {
            console.log('popOut');
            TweenLite.to(image, 1, { x: 2 * Game_1.Game.WIDTH });
        });
    };
    MessageBox.prototype.show = function (message) {
    };
    return MessageBox;
}(Container));
exports.MessageBox = MessageBox;
