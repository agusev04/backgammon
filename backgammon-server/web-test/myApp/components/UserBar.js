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
define(["require", "exports", "../Game"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var TextStyle = PIXI.TextStyle;
    var UserBar = (function (_super) {
        __extends(UserBar, _super);
        function UserBar() {
            var _this = _super.call(this) || this;
            _this._textStyle = new TextStyle({ fill: '#ffffff', fontSize: 28, fontWeight: '600', dropShadow: true, align: 'center' });
            _this.configure();
            return _this;
        }
        UserBar.prototype.configure = function () {
            this._blackIcon = Sprite.fromImage('assets/UI/black.png');
            this._whiteIcon = Sprite.fromImage('assets/UI/white.png');
            this._whiteIcon.anchor.set(0, 0);
            this._whiteIcon.position.set(15, 50);
            this._whiteIcon.scale.set(0.85);
            this._blackIcon.anchor.set(1, 0);
            this._blackIcon.position.set(Game_1.Game.WIDTH - 10, 50);
            this._blackIcon.scale.set(0.85);
            this._whiteName = new PIXI.Text('loading...');
            this._whiteName.style = this._textStyle;
            this._whiteName.anchor.set(0, 0.5);
            this._whiteName.position.set(115, 97);
            this._blackName = new PIXI.Text('loading...');
            this._blackName.style = this._textStyle;
            this._blackName.anchor.set(1, 0.5);
            this._blackName.position.set(Game_1.Game.WIDTH - 115, 97);
            this.addChild(this._blackIcon);
            this.addChild(this._whiteIcon);
            this.addChild(this._whiteName);
            this.addChild(this._blackName);
        };
        UserBar.prototype.setUserBar = function (color, opponent) {
            if (color == 'w') {
                this._whiteName.text = 'You';
                if (opponent)
                    this._blackName.text = 'Opponent';
                else
                    this._blackName.text = 'Waiting...';
            }
            else {
                this._whiteName.text = 'Opponent';
                this._blackName.text = 'You';
            }
        };
        UserBar.prototype.setActivePlayer = function (myTurn, color) {
            if (myTurn && color == 'w' || !myTurn && color == 'b') {
                this._whiteName.alpha = 1;
                this._whiteIcon.alpha = 1;
                this._blackName.alpha = 0.3;
                this._blackIcon.alpha = 0.3;
            }
            else if (myTurn && color == 'b' || !myTurn && color == 'w') {
                this._whiteName.alpha = 0.3;
                this._whiteIcon.alpha = 0.3;
                this._blackName.alpha = 1;
                this._blackIcon.alpha = 1;
            }
        };
        return UserBar;
    }(Container));
    exports.UserBar = UserBar;
});
//# sourceMappingURL=UserBar.js.map