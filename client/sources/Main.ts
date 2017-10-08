import Application = PIXI.Application;
import {Game} from "./Game";

let application:Application = new Application({backgroundColor: 0x000000 });
document.body.appendChild(application.view);

let game:Game = new Game();
application.stage.addChild(game);

function eventListenerResize():void
{
    application.renderer.resize(window.innerWidth, window.innerHeight);
    let scale:number = Math.min(window.innerWidth / Game.WIDTH, window.innerHeight / Game.HEIGHT);
    application.stage.x = (window.innerWidth - Game.WIDTH * scale) / 2;
    application.stage.y = (window.innerHeight - Game.HEIGHT * scale) / 2;
    application.stage.scale.x = scale;
    application.stage.scale.y = scale;

    application.render();
}

eventListenerResize();
window.onresize = eventListenerResize;
window.onorientationchange = eventListenerResize;