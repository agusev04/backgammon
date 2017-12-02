import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import BaseTexture = PIXI.BaseTexture;
declare let TweenLite: any;

export class Dices extends Container
{
    private _val1:number;
    private _val2:number;
    private _dice1: Sprite;
    private _dice2: Sprite;
    private _animation: any;
    private _baseTexture: BaseTexture;
    private _diceFinal: Texture[][];
    constructor()
    {
        super();
        this._dice1 = new Sprite();
        this._dice2 = new Sprite();
        this.configure();
    }

    protected configure()
    {
        this._diceFinal = [[
            new Texture(BaseTexture.fromImage('assets/Dice/1 - 1.png')),
            new Texture(BaseTexture.fromImage('assets/Dice/2 - 1.png')),
            new Texture(BaseTexture.fromImage('assets/Dice/3 - 1.png')),
            new Texture(BaseTexture.fromImage('assets/Dice/4 - 1.png')),
            new Texture(BaseTexture.fromImage('assets/Dice/5 - 1.png')),
            new Texture(BaseTexture.fromImage('assets/Dice/6 - 1.png')),
        ],[
            new Texture(BaseTexture.fromImage('assets/Dice/1 - 2.png')),
            new Texture(BaseTexture.fromImage('assets/Dice/2 - 2.png')),
            new Texture(BaseTexture.fromImage('assets/Dice/3 - 2.png')),
            new Texture(BaseTexture.fromImage('assets/Dice/4 - 2.png')),
            new Texture(BaseTexture.fromImage('assets/Dice/5 - 2.png')),
            new Texture(BaseTexture.fromImage('assets/Dice/6 - 2.png')),
        ]];

        this._animation = [[],[]];
        for (let i=0; i < 6;i++)
        {
            this._animation[1].push(new PIXI.Rectangle(64 * i,0,64,60));
        }
        for (let i=0; i < 6;i++)
        {
            this._animation[0].push(new PIXI.Rectangle(64 * i,60,64,60));
        }


        this._baseTexture = BaseTexture.fromImage('assets/newDice.png');
        this._dice1.visible = false;
        this._dice2.visible = false;
        this._dice1.texture = new Texture(this._baseTexture);
        this._dice2.texture = new Texture(this._baseTexture);

        this._dice1.anchor.set(0.5);
        this._dice2.anchor.set(0.5);
        this._dice1.scale.set(0.7);
        this._dice2.scale.set(0.7);
        this._dice1.position.set(- 30, -15);
        this._dice2.position.set(30, 15);
        this.addChild(this._dice1);
        this.addChild(this._dice2);
    }

    protected animate(val1:number, val2:number)
    {
        //
        // this._dice1.texture = new Texture(this._baseTexture);
        // this._dice2.texture = new Texture(this._baseTexture);
        // this._dice1.visible = true;
        // this._dice2.visible = true;
        // for (let i=0; i < 6;i++)
        // {
        //     setTimeout(function () {
        //         this._dice1.texture.frame = this._animation[0][i];
        //         this._dice2.texture.frame = this._animation[1][i];
        //     }.bind(this), i * 100);
        // }
        // setTimeout(function () {
        //     this._dice1.texture.frame = new PIXI.Rectangle(0,0,77,72);
        //     this._dice2.texture.frame = new PIXI.Rectangle(0,0,71,70);
        //     this._dice1.texture = this._diceFinal[0][val1-1];
        //     this._dice2.texture = this._diceFinal[1][val2-1];
        // }.bind(this), 600);

        this._dice1.visible = true;
        this._dice2.visible = true;

        this._dice1.texture = this._diceFinal[0][val1-1];
        this._dice2.texture = this._diceFinal[1][val2-1];
        setTimeout(function () {
            this.emit('SuccessfulThrow', {first: val1, second: val2});
        }.bind(this), 100);
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