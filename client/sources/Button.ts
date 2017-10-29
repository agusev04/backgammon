///<reference path="../dts/pixi.js.d.ts"/>
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {Game} from "./Game";

export class Button extends Container
{

    private _event:String;
    constructor(event:String)
    {
        super();
        this._event = event;
        this.configure();
    }

    protected configure():void
    {
        let icon:Sprite = Sprite.fromImage('assets/buttons/test.png');
        icon.interactive = true;
        icon.buttonMode = true;
        icon.anchor.set(0.5);
        icon.on('pointerup', function ()
        {
            // Game.EVENTS.emit(this._event, this);
            this.emit(this._event);
        }, this);
        this.addChild(icon);
    }
}