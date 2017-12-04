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
    var UserBoard = (function (_super) {
        __extends(UserBoard, _super);
        function UserBoard(isWhite) {
            var _this = _super.call(this) || this;
            _this.configure(isWhite);
            return _this;
        }
        UserBoard.prototype.configure = function (isWhite) {
            var info_chip = Sprite.fromImage('assets/info.png');
            var my_icon = Sprite.fromImage('assets/info.png');
        };
        return UserBoard;
    }(Container));
    exports.UserBoard = UserBoard;
});
//# sourceMappingURL=UserBoard.js.map