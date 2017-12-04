import Container = PIXI.Container;
import Sprite = PIXI.Sprite;

export class UserBoard extends Container
{
    constructor(isWhite: boolean)
    {
        super();
        this.configure(isWhite);
    }

    protected configure(isWhite: boolean)
    {
        let info_chip: Sprite = Sprite.fromImage('assets/info.png');
        let my_icon: Sprite = Sprite.fromImage('assets/info.png');
    }
}