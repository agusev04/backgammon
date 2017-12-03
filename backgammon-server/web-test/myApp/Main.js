define(["require", "exports", "./Game"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Application = PIXI.Application;
    var application = new Application({ backgroundColor: 0x000000 });
    document.body.appendChild(application.view);
    var game = new Game_1.Game();
    application.stage.addChild(game);
    function eventListenerResize() {
        application.renderer.resize(window.innerWidth, window.innerHeight);
        var scale = Math.min(window.innerWidth / Game_1.Game.WIDTH, window.innerHeight / Game_1.Game.HEIGHT);
        application.stage.x = (window.innerWidth - Game_1.Game.WIDTH * scale) / 2;
        application.stage.y = (window.innerHeight - Game_1.Game.HEIGHT * scale) / 2;
        application.stage.scale.x = scale;
        application.stage.scale.y = scale;
        application.render();
    }
    eventListenerResize();
    window.onresize = eventListenerResize;
    window.onorientationchange = eventListenerResize;
});
//# sourceMappingURL=Main.js.map