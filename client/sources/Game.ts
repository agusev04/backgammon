/**
 * @author Вячеслав И.Э.
 * @version 1.0
 * @since 08 Октябрь 2017
 */
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {Chip} from "./Chip";
import EventEmitter = PIXI.utils.EventEmitter;
import {Button} from "./Button";
import {Board} from "./Board";
import {MessageBox} from "./MessageBox";
import TextStyle = PIXI.TextStyle;
import {Dices} from "./Dices";

export class Game extends Container
{
    // Params >>------------------------------------------------------------<<<<

    public static WIDTH:number = 1024;
    public static HEIGHT:number = 768;
    public static EVENTS = new EventEmitter();

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
        // Splash screen >>-------------------------------------------------<<<<
        this.set_logo();
        // Menu screen >>---------------------------------------------------<<<<
        setTimeout(this.set_menu.bind(this), 3000);


    }

    // Base >>--------------------------------------------------------------<<<<
    protected set_logo()
    {
        let bg:Sprite = Sprite.fromImage('assets/bg.jpg');
        bg.width = Game.WIDTH;
        bg.height = Game.HEIGHT;
        bg.alpha = 0.5;
        let logo:Sprite = Sprite.fromImage('assets/logo.png');
        this.addChild(bg);
        this.addChild(logo);

        logo.anchor.set(0.5);
        logo.x = Game.WIDTH / 2;
        logo.y = Game.HEIGHT / 2;
        TweenLite.fromTo(logo, 3, {alpha: 1}, {alpha: 0});
        TweenLite.fromTo(logo, 3, {alpha: 1}, {alpha: 0});
    }

    protected set_menu()
    {
        let startBtn = new Button('GameStart', 'test', 1000);
        startBtn.on('GameStart', this.GameStart.bind(this, startBtn));
        this.addChild(startBtn);
        startBtn.position.set(Game.WIDTH/2, Game.HEIGHT/2);
    }

    // Events >>------------------------------------------------------------<<<<
    protected GameStart(startBtn: Button)
    {
        console.log(this, 'TestLog');
        this.removeChild(startBtn);
        // let chip = new Chip(0, false);
        // this.addChild(chip);
        let GameBoard = new Board();
        let MsgBox = new MessageBox();
        this.addChild(GameBoard);
        this.addChild(MsgBox);
        let redStyle = new TextStyle({fill: '#ff0000', fontSize: 42, fontWeight: '800', dropShadow: true, align: 'center'});

        setTimeout(MsgBox.show.bind(MsgBox, 'Hello', 2000, redStyle),1000);

        setTimeout(MsgBox.show.bind(MsgBox, 'Roll a dice !', 2000, redStyle),4000);
        let dice = new Dices();
        dice.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        setTimeout(function () {
            this.addChild(dice);
        }.bind(this), 7000);
    }
    // Private >>-----------------------------------------------------------<<<<
}