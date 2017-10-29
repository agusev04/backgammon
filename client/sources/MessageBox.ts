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

        this.on('popUp', function ()
        {
            TweenLite.set(this, {x: 0, y: 0});
            TweenLite.to(this, 1, {alpha: 1})
        });
        this.on('popOut', function ()
        {
            console.log('popOut');
            TweenLite.to(this, 1, {x: 2 * Game.WIDTH});
        });
    }

    public show(message:string, duration:number, styleMsg:TextStyle):void
    {
        let textMsg = new PIXI.Text(message);
        textMsg.style = styleMsg;
        textMsg.anchor.set(0.5);
        textMsg.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        this.addChild(textMsg);
        this.emit('popUp', this);
        setTimeout(function () {
            setTimeout(function () {
                this.removeChild(textMsg);
            }.bind(this),1000);
            this.emit('popOut', this);
        }.bind(this), duration);
        // Знаю что можно было textMsg сделать как постоянное поле объекта. Я тут просто тестировал знания передачи контекста.
    }
}