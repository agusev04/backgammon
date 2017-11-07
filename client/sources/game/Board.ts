///<reference path="../../dts/pixi.js.d.ts"/>
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {Game} from "../Game";



export class Board extends Container
{

    private bg:Sprite;
    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor()
    {
        super();
        this.configure();
    }

    protected configure():void
    {
        this.bg = Sprite.fromImage('assets/board.png');
        this.bg.width = Game.WIDTH;
        this.bg.height = Game.HEIGHT;
        TweenLite.set(this.bg, {alpha :1, x: Game.WIDTH });
        this.addChild(this.bg);
    }

    public show()
    {
        TweenLite.to(this.bg, 1, {alpha: 1, x: 0});
    }

    public drawState(state:any)
    {

    }

    // Предаём все ходы. (например [6,6,6,6])
    public moveChips(moves:number[])
    {

    }

}