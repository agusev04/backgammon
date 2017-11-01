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
var Dices = (function (_super) {
    __extends(Dices, _super);
    function Dices() {
        var _this = _super.call(this) || this;
        _this.configure();
        return _this;
    }
    Dices.prototype.configure = function () {
        var DiceSprite = Sprite.fromImage('assets/dice.png');
        this.addChild(DiceSprite);
        TweenLite.to(DiceSprite, 2, { x: 0, ease: TweenLite.SteppedEase.config(5) });
        //or create an instance directly
        var steppedEase = new TweenLite.SteppedEase(5);
        TweenLite.to(DiceSprite, 3, { y: 3900, ease: steppedEase });
    };
    return Dices;
}(Container));
exports.Dices = Dices;
