///<reference path="../dts/pixi.js.d.ts"/>

import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {Game} from "./Game";
import Texture = PIXI.Texture;
import {Button} from "./Button";
declare let TweenLite: any;

export class Dices extends Container
{
    constructor()
    {
        super();
        this.configure();
    }

    protected configure()
    {
        let roll = new Button('DiceRoll', 'test', 2500);
        this.addChild(roll);
        roll.position.set(0, 70);
        let animation: any  = [];
        for (let i=0; i < 30;i++)
        {
            animation.push(new PIXI.Rectangle(100 * i,0,100,100));
        }
        let Dice_1 = new Sprite();
        let Dice_2 = new Sprite();
        Dice_1.visible = false;
        Dice_2.visible = false;
        Dice_1.texture = Texture.fromImage('assets/dice.png');
        Dice_2.texture = Texture.fromImage('assets/dice_1.png');
        Dice_1.anchor.set(0.5);
        Dice_2.anchor.set(0.5);
        Dice_1.position.set(- 50, 0);
        Dice_2.position.set(50, 0);
        this.addChild(Dice_1);
        this.addChild(Dice_2);
        // this.animate(Dice_1, animation);
        // this.animate(Dice_2, animation);
        roll.on('DiceRoll', this.animate.bind(this, Dice_1, animation));
        roll.on('DiceRoll', this.animate.bind(this, Dice_2, animation));
    }

    protected animate(sprite: Sprite, animation: any)
    {
        sprite.visible = true;
        for (let i=0; i < 24;i++)
        {
            setTimeout(function () {
                sprite.texture.frame = animation[i];
            }.bind(this), i * 100);
        }
        let side = Math.floor(Math.random() * (6)) + 24;
        setTimeout(function () {
            sprite.texture.frame = animation[side];
        }, 2400)
    }

}