///<reference path="../../dts/pixi.js.d.ts"/>
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import {Game} from "../Game";

export class Chip extends Container
{
    // Params >>------------------------------------------------------------<<<<

    public index:number;
    public isWhite:boolean;
    protected isDragging: boolean;

    protected chipSprite: Sprite = new Sprite(PIXI.Texture.WHITE);

    protected black_chip: Texture = Texture.fromImage('assets/black.png');
    protected white_chip: Texture = Texture.fromImage('assets/white.png');
    protected black_active_chip: Texture = Texture.fromImage('assets/black_active.png');
    protected white_active_chip: Texture = Texture.fromImage('assets/white_active.png');

    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor(index: number, isWhite: boolean,)
    {
        super();
        this.index = index;
        this.isWhite = isWhite;
        this.configure();
    }

    protected configure():void
    {
        this.chipSprite.anchor.set(0.5);
        this.chipSprite.width = 64;
        this.chipSprite.height = 64;
        this.chipSprite.interactive = true;
        this.chipSprite.buttonMode = true;

        if (!this.isWhite)
        {
            this.chipSprite.texture = this.black_chip;
        }
        else
        {
            this.chipSprite.texture = this.white_chip;
        }

        this.chipSprite
            .on('pointerdown', function (event:any)
            {
                this.data = event.data;
                this.isDragging = true;
                this.parent.changeTexture(true);
            })
            .on('pointerup', function ()
            {
                this.data = null;
                this.isDragging = false;
                this.parent.changeTexture(false);
            })
            .on('pointerupoutside', function ()
            {
                this.data = null;
                this.isDragging = false;
                this.parent.changeTexture(false);
            })
            .on('pointermove', function ()
            {
                if (this.isDragging)
                {
                    let newPos = this.data.getLocalPosition(this.parent);
                    this.position.x = newPos.x;
                    this.position.y = newPos.y;
                }
            });
        this.addChild(this.chipSprite);
    }


    protected changeTexture(active: boolean):void
    {
        if (active)
        {
            if (!this.isWhite)
                this.chipSprite.texture = this.black_active_chip;

            else
                this.chipSprite.texture = this.white_active_chip;
        }
        else
        {
            if (!this.isWhite)
                this.chipSprite.texture = this.black_chip;

            else
                this.chipSprite.texture = this.white_chip;
        }
    }
}
