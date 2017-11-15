import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;

export class Sector extends Container
{
    public sectorSprite:Sprite = new Sprite(PIXI.Texture.WHITE);
    public greenTrianglSprite:Sprite = new Sprite(PIXI.Texture.WHITE);
    public yellowTrianglSprite:Sprite = new Sprite(PIXI.Texture.WHITE);

    public sectorSprite_skin: Texture= Texture.fromImage('assets/zone.png');
    public greenTrianglSprite_skin: Texture = Texture.fromImage('assets/ActTriangl_green.png');
    public yellowTrianglSprite_skin: Texture = Texture.fromImage('assets/ActTriangl_yell.png');

    public index:number;

    constructor(ind:number){
        super();
        this.index = ind;

        this.sectorSprite.alpha = 0;
        // this.sectorSprite.interactive = true;
        // this.sectorSprite.buttonMode = true;

        this.interactive = true;
        this.interactiveChildren = true;


        this.sectorSprite.anchor.set(0.5,0);
        this.sectorSprite.width = 50;
        this.sectorSprite.texture = this.sectorSprite_skin;

        this.yellowTrianglSprite.anchor.set(0.5,0);
        this.yellowTrianglSprite.width = 50;
        this.yellowTrianglSprite.texture = this.yellowTrianglSprite_skin;
        this.yellowTrianglSprite.visible = false;

        this.greenTrianglSprite.anchor.set(0.5,0);
        this.greenTrianglSprite.width = 50;
        this.greenTrianglSprite.visible = false;
        this.greenTrianglSprite.texture = this.greenTrianglSprite_skin;

        this.addChild(this.sectorSprite);
        this.addChild(this.greenTrianglSprite);
        this.addChild(this.yellowTrianglSprite);
    }

    public highlightMove(){
        this.greenTrianglSprite.visible = true;
        this.interactiveOn();
    }

    public highlightAttack(){
        this.yellowTrianglSprite.visible = true;
        this.interactiveOff();
    }

    public interactiveOn(){
        this.interactive = true;
        this.interactiveChildren = true
    }

    public interactiveOff(){
        this.interactive = false;
        this.interactiveChildren = false;
    }

}