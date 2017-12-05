import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {Game} from "../Game";
import TextStyle = PIXI.TextStyle;

export class UserBar extends Container
{
    private _textStyle: TextStyle = new TextStyle({fill: '#ffffff', fontSize: 28, fontWeight: '600', dropShadow: true, align: 'center'});
    private _whiteIcon: Sprite;
    private _blackIcon: Sprite;
    private _whiteName: PIXI.Text;
    private _blackName: PIXI.Text;

    constructor()
    {
        super();
        this.configure();
    }

    protected configure()
    {
        this._blackIcon = Sprite.fromImage('assets/UI/black.png');
        this._whiteIcon = Sprite.fromImage('assets/UI/white.png');

        this._whiteIcon.anchor.set(0,0);
        this._whiteIcon.position.set(15,50);
        this._whiteIcon.scale.set(0.85);

        this._blackIcon.anchor.set(1,0);
        this._blackIcon.position.set(Game.WIDTH-10,50);
        this._blackIcon.scale.set(0.85);

        this._whiteName = new PIXI.Text('loading...');
        this._whiteName.style = this._textStyle;
        this._whiteName.anchor.set(0, 0.5);
        this._whiteName.position.set(115, 97);

        this._blackName = new PIXI.Text('loading...');
        this._blackName.style = this._textStyle;
        this._blackName.anchor.set(1, 0.5);
        this._blackName.position.set(Game.WIDTH - 115, 97);

        this.addChild(this._blackIcon);
        this.addChild(this._whiteIcon);
        this.addChild(this._whiteName);
        this.addChild(this._blackName);
    }

    public setUserBar(color: string, opponent: string)
    {
        console.log('User Bar updated');
        if (color == 'w')
        {
            this._whiteName.text = 'You';
            if (opponent)
                this._blackName.text = 'Opponent';
            else
                this._blackName.text = 'Waiting...'
        }
        else
        {
            this._whiteName.text = 'Opponent';
            this._blackName.text = 'You';
        }
    }

    public setActivePlayer(myTurn: boolean, color: string)
    {
        if (myTurn && color == 'w' || !myTurn && color == 'b')
        {
            this._whiteName.alpha = 1;
            this._whiteIcon.alpha = 1;
            this._blackName.alpha = 0.3;
            this._blackIcon.alpha = 0.3;
        }
        else if (myTurn && color == 'b' || !myTurn && color == 'w')
        {
            this._whiteName.alpha = 0.3;
            this._whiteIcon.alpha = 0.3;
            this._blackName.alpha = 1;
            this._blackIcon.alpha = 1;
        }
    }
}