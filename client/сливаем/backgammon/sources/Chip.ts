



import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import {Board} from "./Board";



export class Chip extends Container{

    public chipSprite: Sprite = new Sprite(PIXI.Texture.WHITE);
    public chipSkinWhite: Texture = Texture.fromImage('assets/white.png');
    public chipSkinWhite_active: Texture = Texture.fromImage('assets/white_active.png');
    public chipSkinBlack: Texture = Texture.fromImage('assets/black.png');
    public chipSkinBlack_active: Texture = Texture.fromImage('assets/black_active.png');
    public colorChipWhite:boolean;
    public selectNow:boolean;

    constructor(color_white:boolean){
        super();
        this.colorChipWhite = color_white;
        this.blackOrWhite();
        this.chipSprite.anchor.set(0.5);
        this.chipSprite.width = 60;//Game.WIDTH/15;
        this.chipSprite.height = 60;//Game.HEIGHT/15;
        this.selectNow = false;
        this.addChild(this.chipSprite);

    }

    public blackOrWhite(){
        if(this.colorChipWhite){
            this.chipSprite.texture = this.chipSkinWhite;
        }
        else
            this.chipSprite.texture = this.chipSkinBlack;
    }

}