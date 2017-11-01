///<reference path="../dts/pixi.js.d.ts"/>

import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {Game} from "./Game";
import TextStyle = PIXI.TextStyle;
declare let TweenLite: any;

export class MessageBox extends Container
{
    constructor()
    {
        super();
        this.configure();
    }

    protected configure()
    {
        let image: Sprite = Sprite.fromImage('assets/msg.png');
        image.anchor.set(0.5);
        image.scale.set(1);
        image.x = Game.WIDTH/2;
        image.y = Game.HEIGHT/2;
        this.addChild(image);
        TweenLite.set(this, {alpha :0});
    }

    public show(message:string, duration:number, styleMsg:TextStyle):void
    {
        let textMsg = new PIXI.Text(message);
        textMsg.style = styleMsg;
        textMsg.anchor.set(0.5);
        textMsg.position.set(Game.WIDTH/2, Game.HEIGHT/2);
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
        TweenLite.set(this, {x: 0, y: 0});
        TweenLite.to(this, 1, {alpha: 1})
    }

    protected popOut()
    {
        console.log('popOut');
        TweenLite.to(this, 1, {x: 2 * Game.WIDTH});
    }
}