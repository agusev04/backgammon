/**
 * @author Вячеслав И.Э.
 * @version 1.0
 * @since 08 Октябрь 2017
 */
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;

export class Game extends Container
{
    // Params >>------------------------------------------------------------<<<<

    public static WIDTH:number = 1024;
    public static HEIGHT:number = 768;

    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor()
    {
        super();
        this.configurate();
    }

    protected configurate():void
    {
        let bg:Sprite = new Sprite(PIXI.Texture.WHITE);
        bg.width = Game.WIDTH;
        bg.height = Game.HEIGHT;
        let logo:Sprite = Sprite.fromImage('assets/logo.jpg');

        this.addChild(bg);
        this.addChild(logo);
        
        logo.x = Game.WIDTH / 2 - 425;
        logo.y = Game.HEIGHT / 2 - 192;
    }

    // Base >>--------------------------------------------------------------<<<<

    // Events >>------------------------------------------------------------<<<<

    // Private >>-----------------------------------------------------------<<<<
}