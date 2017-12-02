import Texture = PIXI.Texture;
import Sprite2d = PIXI.projection.Sprite2d;


export class Sector extends Sprite2d
{
    private static TEXTURE_SECTOR_RED:Texture = PIXI.Texture.fromImage('assets/Triangle.png');
    private static TEXTURE_EXIT_GREEN:Texture = PIXI.Texture.fromImage('assets/exit.png');


    constructor(){
        super(Sector.TEXTURE_SECTOR_RED);
        this.alpha = 0;
        this.visible = true;
        this.interactive = true;
        this.interactiveChildren = true;
        this.anchor.set(0.5);
        this.scale.set( 0.75);
    }

    public highlightMove():void{
        this.alpha = 0.8;
        this.interactiveOn();
    }

    // public highlightAttack(){
    //     this.yellowTrianglSprite.visible = true;
    //     this.interactiveOn();
    // }
    public highlightMoveExit():void{
        this.alpha = 0.5;
        this.texture = Sector.TEXTURE_EXIT_GREEN;
        this.interactiveOn();
    }

    public interactiveOn():void{
        this.interactive = true;
        this.interactiveChildren = true
    }

    public interactiveOff():void{
        this.interactive = false;
        this.interactiveChildren = false;
    }

}