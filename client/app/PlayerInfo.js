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
define(["require", "exports", "./Game"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Texture = PIXI.Texture;
    var PlayerInfo = (function (_super) {
        __extends(PlayerInfo, _super);
        function PlayerInfo(isWhite) {
            var _this = _super.call(this) || this;
            _this.configure(isWhite);
            return _this;
        }
        PlayerInfo.prototype.configure = function (isWhite) {
            var info_bg = Sprite.fromImage('assets/info.png');
            var info_chip = new Sprite();
            var my_icon = new Sprite();
            var opponent_icon = new Sprite();
            info_bg.anchor.set(0, 0.5);
            info_bg.position.set(0, Game_1.Game.HEIGHT / 2);
            my_icon.anchor.set(0, 0);
            my_icon.position.set(0, Game_1.Game.HEIGHT / 2);
            opponent_icon.anchor.set(0, 1);
            opponent_icon.position.set(0, Game_1.Game.HEIGHT / 2);
            info_chip.anchor.set(0, 0.5);
            info_chip.scale.set(0.8);
            info_chip.position.set(4, Game_1.Game.HEIGHT / 2);
            if (!isWhite) {
                info_chip.texture = Texture.fromImage('assets/chip_info.png');
            }
            else {
                info_chip.texture = Texture.fromImage('assets/chip_info_1.png');
            }
            this.addChild(info_bg);
            this.addChild(info_chip);
            this.addChild(my_icon);
            this.addChild(opponent_icon);
        };
        return PlayerInfo;
    }(Container));
    exports.PlayerInfo = PlayerInfo;
});
//# sourceMappingURL=PlayerInfo.js.map