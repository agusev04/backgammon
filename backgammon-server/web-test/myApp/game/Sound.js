define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sound = (function () {
        function Sound() {
            this.soundClickChip = '1';
            this.soundMoveChip = '2';
            this.loadSound();
        }
        Sound.prototype.loadSound = function () {
            createjs.Sound.registerSound("assets/sound/clickChip.mp3", this.soundClickChip);
            createjs.Sound.registerSound("assets/sound/moveChip.mp3", this.soundMoveChip);
        };
        Sound.prototype.playSoundClickChip = function () {
            createjs.Sound.play(this.soundClickChip);
        };
        Sound.prototype.playSoundMoveChip = function () {
            createjs.Sound.play(this.soundMoveChip);
        };
        return Sound;
    }());
    exports.Sound = Sound;
});
//# sourceMappingURL=Sound.js.map