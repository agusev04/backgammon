"use strict";
///<reference path="../../dts/pixi.js.d.ts"/>
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
var Game_1 = require("../Game");
var NotificationBox = (function (_super) {
    __extends(NotificationBox, _super);
    function NotificationBox() {
        var _this = _super.call(this) || this;
        _this.configure();
        return _this;
    }
    NotificationBox.prototype.configure = function () {
        var image = Sprite.fromImage('assets/ntf.png');
        image.anchor.set(0.5, 0);
        image.scale.set(0.8);
        image.x = 0;
        image.y = 0;
        this.addChild(image);
        TweenLite.set(this, { x: 2 * Game_1.Game.WIDTH });
    };
    NotificationBox.prototype.show = function (message, duration, styleMsg) {
        var textMsg = new PIXI.Text(message);
        textMsg.style = styleMsg;
        textMsg.anchor.set(0.5, 0.5);
        textMsg.position.set(0, 62);
        this.addChild(textMsg);
        this.popUp();
        setTimeout(function () {
            setTimeout(function () {
                this.removeChild(textMsg);
            }.bind(this), 1000);
            this.popOut();
        }.bind(this), duration);
    };
    NotificationBox.prototype.popUp = function () {
        TweenLite.set(this, { x: Game_1.Game.WIDTH / 2, y: 0 });
    };
    NotificationBox.prototype.popOut = function () {
        TweenLite.to(this, 1, { y: -300 });
    };
    return NotificationBox;
}(Container));
exports.NotificationBox = NotificationBox;
