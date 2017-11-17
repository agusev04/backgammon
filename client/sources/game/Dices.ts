///<reference path="../../dts/pixi.js.d.ts"/>

import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import {Button} from "../components/Button";
import BaseTexture = PIXI.BaseTexture;
declare let TweenLite: any;

export class Dices extends Container
{
    private _val1:number;
    private _val2:number;
    private _dice1: Sprite;
    private _dice2: Sprite;
    private _animation: any;
    constructor()
    {
        super();
        this._dice1 = new Sprite();
        this._dice2 = new Sprite();
        this.configure();
    }

    protected configure()
    {
        this._animation = [];
        for (let i=0; i < 30;i++)
        {
            this._animation.push(new PIXI.Rectangle(100 * i,0,100,100));
        }
        let base:BaseTexture = BaseTexture.fromImage('assets/dice.png');
        this._dice1.visible = false;
        this._dice2.visible = false;
        this._dice1.texture = new Texture(base);
        this._dice2.texture = new Texture(base);

        this._dice1.anchor.set(0.5);
        this._dice2.anchor.set(0.5);
        this._dice1.position.set(- 50, 0);
        this._dice2.position.set(50, 0);
        this.addChild(this._dice1);
        this.addChild(this._dice2);
    }

    protected animate(val1:number, val2:number)
    {
        this._dice1.visible = true;
        this._dice2.visible = true;
        for (let i=0; i < 24;i++)
        {
            setTimeout(function () {
                this._dice1.texture.frame = this._animation[i];
                this._dice2.texture.frame = this._animation[i];
            }.bind(this), i * 80);
        }
        setTimeout(function () {
            this._dice1.texture.frame = this._animation[23 + val1];
            this._dice2.texture.frame = this._animation[23 + val2];
        }.bind(this), 1920);
        setTimeout(function () {
            this.emit('SuccessfulThrow', {first: val1, second: val2});
        }.bind(this), 2100);
    }

    public throwDice(val1:number, val2:number):void
    {
        this._val1 = val1;
        this._val2 = val2;
        this.animate(this._val1, this._val2);
    }

    public show()
    {
        this.visible = true;
    }

    public hide()
    {
        this.visible = false;
    }

    // TODO С анимацией и без.
    // TODO Сделать msgBox еще один.

}