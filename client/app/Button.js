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
    ///<reference path="../dts/pixi.js.d.ts"/>
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(event) {
            var _this = _super.call(this) || this;
            _this._event = event;
            _this.configure();
            return _this;
        }
        Button.prototype.configure = function () {
            var icon = Sprite.fromImage('assets/buttons/test.png');
            icon.interactive = true;
            icon.buttonMode = true;
            icon.anchor.set(0.5);
            icon.on('pointerup', function () {
                // Game.EVENTS.emit(this._event, this);
                this.emit(this._event);
            }, this);
            this.addChild(icon);
        };
        return Button;
    }(Container));
    exports.Button = Button;
});
//# sourceMappingURL=Button.js.map