///<reference path="../../dts/pixi.js.d.ts"/>

import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {Game} from "../Game";
import TextStyle = PIXI.TextStyle;
declare let TweenLite: any;

export class NotificationBox extends Container
{
    constructor()
    {
        super();
        this.configure();
    }

    protected configure()
    {
        let image: Sprite = Sprite.fromImage('assets/ntf.png');
        image.anchor.set(0.5, 0);
        image.scale.set(0.8);
        image.x = 0;
        image.y = 0;
        this.addChild(image);
        TweenLite.set(this, {x: 2 * Game.WIDTH});
    }

    public show(message:string, duration:number, styleMsg:TextStyle):void
    {
        let textMsg = new PIXI.Text(message);
        textMsg.style = styleMsg;
        textMsg.anchor.set(0.5, 0.5);
        textMsg.position.set(0, 62);
        this.addChild(textMsg);
        this.popUp();
        setTimeout(function () {
            setTimeout(function () {
                this.removeChild(textMsg);
            }.bind(this),1000);
            this.popOut();
        }.bind(this), duration);
    }

    protected popUp()
    {
        TweenLite.set(this, {x: Game.WIDTH/2, y: 0});
    }

    protected popOut()
    {
        TweenLite.to(this, 1, {y: -300});
    }
}