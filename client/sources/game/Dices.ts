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
        this._animation = [[],[]];
        for (let i=0; i < 6;i++)
        {
            this._animation[1].push(new PIXI.Rectangle(64 * i,0,64,60));
        }
        for (let i=0; i < 6;i++)
        {
            this._animation[0].push(new PIXI.Rectangle(64 * i,60,64,60));
        }

        let base:BaseTexture = BaseTexture.fromImage('assets/newDice.png');
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
        for (let i=0; i < 6;i++)
        {
            setTimeout(function () {
                this._dice1.texture.frame = this._animation[0][i];
                this._dice2.texture.frame = this._animation[1][i];
            }.bind(this), i * 100);
        }
        setTimeout(function () {
            switch (val1)
            {
                case 1:
                    this._dice1.texture.frame = this._animation[0][0];
                    break;
                case 2:
                    this._dice1.texture.frame = this._animation[0][1];
                    break;
                case 3:
                    this._dice1.texture.frame = this._animation[0][2];
                    break;
                case 4:
                    this._dice1.texture.frame = this._animation[0][3];
                    break;
                case 5:
                    this._dice1.texture.frame = this._animation[0][4];
                    break;
                case 6:
                    this._dice1.texture.frame = this._animation[0][5];
                    break;
            }
            switch (val2)
            {
                case 1:
                    this._dice2.texture.frame = this._animation[1][0];
                    break;
                case 2:
                    this._dice2.texture.frame = this._animation[1][1];
                    break;
                case 3:
                    this._dice2.texture.frame = this._animation[1][2];
                    break;
                case 4:
                    this._dice2.texture.frame = this._animation[1][3];
                    break;
                case 5:
                    this._dice2.texture.frame = this._animation[1][4];
                    break;
                case 6:
                    this._dice2.texture.frame = this._animation[1][5];
                    break;
            }
        }.bind(this), 600);
        setTimeout(function () {
            this.emit('SuccessfulThrow', {first: val1, second: val2});
        }.bind(this), 700);
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