import Texture = PIXI.Texture;
import Sprite2d = PIXI.projection.Sprite2d;

export class Chip extends Sprite2d
{
    public static COLOR_BLACK:string = "black";
    public static COLOR_WHITE:string = "white";



    private static TEXTURE_WHITE_NORMAL:Texture = PIXI.Texture.fromImage('assets/chipWhite.png');
    private static TEXTURE_WHITE_SELECTED:Texture = PIXI.Texture.fromImage('assets/whiteActivChip.png');
    private static TEXTURE_BLACK_NORMAL:Texture = PIXI.Texture.fromImage('assets/chipBlack.png');
    private static TEXTURE_BLACK_SELECTED:Texture = PIXI.Texture.fromImage('assets/blackActivChip.png');
    private static TEXTURE_EXIT_WHITE:Texture = PIXI.Texture.fromImage('assets/exitWhite.png');
    private static TEXTURE_EXIT_BLACK:Texture = PIXI.Texture.fromImage('assets/exitBlack.png');

    private _color:string;
    private _selected:boolean = false;

    constructor(color:string)
    {
        super(color == Chip.COLOR_WHITE ? Chip.TEXTURE_WHITE_NORMAL : Chip.TEXTURE_BLACK_NORMAL);
        this._color = color;
        this.anchor.set(0.5);
        this.scale.set(0.6);
        this.proj.affine = PIXI.projection.AFFINE.AXIS_X;
    }

    public get color():string
    {
        return this._color;
    }
    public set color(value:string)
    {
        if (this._color != value)
        {
            this._color = value;
            this.drawState();
        }
    }

    public get selected():boolean
    {
        return this._selected;
    }
    public set selected(value:boolean)
    {
        if (this._selected != value)
        {
            this._selected = value;
            this.drawState();
        }
    }

    private drawState():void
    {
        let temp:Texture;

        switch (this._color)
        {
            case Chip.COLOR_BLACK:
                temp = this._selected ? Chip.TEXTURE_BLACK_SELECTED : Chip.TEXTURE_BLACK_NORMAL;
                break;

            case Chip.COLOR_WHITE:
                temp = this._selected ? Chip.TEXTURE_WHITE_SELECTED : Chip.TEXTURE_WHITE_NORMAL;
                break;
        }

        this.texture = temp;
    }
    public chipExit():void
    {
        let temp:Texture;

        switch (this._color)
        {
            case Chip.COLOR_BLACK:
                temp = Chip.TEXTURE_EXIT_BLACK;
                break;

            case Chip.COLOR_WHITE:
                temp = Chip.TEXTURE_EXIT_WHITE;
                break;
        }
        this.texture = temp;
        this.scale.set(0.6,0.6);
        this.rotation = - 3.14;
    }
}