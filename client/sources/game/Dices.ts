///<reference path="../../dts/pixi.js.d.ts"/>

import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import {Button} from "../components/Button";
import BaseTexture = PIXI.BaseTexture;
declare let TweenLite: any;

export class Dices extends Container
{
    private _val_1:number;
    private _val_2:number;
    constructor()
    {
        super();
        this.configure();
    }

    protected configure()
    {
        let roll = new Button('DiceRoll', 'test', 2000);
        this.addChild(roll);
        roll.position.set(0, 70);
        let animation: any  = [];
        for (let i=0; i < 30;i++)
        {
            animation.push(new PIXI.Rectangle(100 * i,0,100,100));
        }
        let Dice_1 = new Sprite();
        let Dice_2 = new Sprite();
        let base:BaseTexture = BaseTexture.fromImage('assets/dice.png');
        Dice_1.visible = false;
        Dice_2.visible = false;
        Dice_1.texture = new Texture(base);
        Dice_2.texture = new Texture(base);

        Dice_1.anchor.set(0.5);
        Dice_2.anchor.set(0.5);
        Dice_1.position.set(- 50, 0);
        Dice_2.position.set(50, 0);
        this.addChild(Dice_1);
        this.addChild(Dice_2);
        // this.animate(Dice_1, animation);
        // this.animate(Dice_2, animation);
        roll.on('DiceRoll', this.animate.bind(this, Dice_1, animation, this._val_1));
        roll.on('DiceRoll', this.animate.bind(this, Dice_2, animation, this._val_2));
    }

    protected animate(sprite: Sprite, animation: any, value:number)
    {
        sprite.visible = true;
        for (let i=0; i < 24;i++)
        {
            setTimeout(function () {
                sprite.texture.frame = animation[i];
            }.bind(this), i * 80);
        }
        let side = Math.floor(Math.random() * (6)) + 24;
        setTimeout(function () {
            sprite.texture.frame = animation[side];
        }, 1920)
    }

    // public setValue(val_1:number, val_2:number)
    // {
    //     this._val_1 = val_1;
    //     this._val_2 = val_2;
    // }

    // TODO С анимацией и без. Вернуть какой-то результат, что кубики выброшены.
    // TODO Сделать msgBox еще один.
    // TODO Кубики на половине доски игрока.

}