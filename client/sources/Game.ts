/**
 * @author Вячеслав И.Э.
 * @version 1.0
 * @since 08 Октябрь 2017
 */
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import {Button} from "./components/Button";
import {Board} from "./game/Board";
import {MessageBox} from "./components/MessageBox";
import TextStyle = PIXI.TextStyle;
import {Dices} from "./game/Dices";
import {Network} from "./core/Network";

export class Game extends Container
{
    // Params >>------------------------------------------------------------<<<<

    public static WIDTH:number = 1024;
    public static HEIGHT:number = 768;
    private _startBtn:Button;
    private _throwBtn:Button;
    private _dices:Dices;
    private _msgBox:MessageBox;
    private _board:Board;
    private _network:Network;

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
        this._startBtn = new Button('GameStart', 'test', 5000);
        this._throwBtn = new Button('DiceRoll', 'test', 2000);
        this._board = new Board();
        this._msgBox = new MessageBox();
        this._dices = new Dices();
        this._network = new Network();
        this._network.on(Network.EVENT_CONNECTED, this.eventConnected, this);
        this._network.on(Network.EVENT_DISCONNECTED, this.eventDisconnected, this);
        this._network.on(Network.EVENT_DATA, this.eventData, this);

        // this.addChild(this._board);
        this.addChild(this._msgBox);
    }

    protected eventDisconnected():void
    {
        console.log('Disconnected from server.');

    }

    protected eventConnected():void
    {
        console.log('Sending enter request...');
        this._network.enter();
    }

    protected eventData(data:any):void
    {
        switch (data.CLASS_NAME)
        {
            // TODO Сделать отдельные функции
            case 'GameState':
                console.log('GameState reached from server. Waiting for opponent...');
                // this._board.drawState();
                this.loadGame();
                break;
            case 'GameStart':
                console.log('Your opponent is: ' + data.enemyUserName);
                this.gameStart();
                break;
            case 'CubeValue':
                let first = (data.cubeValues - data.cubeValues % 10)/10;
                let second = data.cubeValues % 10;
                console.log('Values from server: ' + first + ', ' + second);
                this.throwCubes(first, second);
                this._board.setDice(first, second);
                // Передать данные кубика
                break;
            case 'PossiblePositions':
                console.log('Possible positions: ' + data.possiblePositions);
                this.moveChip(data.possiblePositions);
                break;
            case 'ChangeTable':
                console.log('Chip moved');
                break;
        }
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
        this._startBtn.on('GameStart', this.openConnection, this);
        this._startBtn.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        this.addChild(this._startBtn);
    }

    protected set_cube()
    {
        this._throwBtn.on('DiceRoll', this.requestCubes, this);
        this._throwBtn.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        this._dices.position.set(Game.WIDTH/2, Game.HEIGHT/2 - 150);
        this.addChild(this._throwBtn);
        this.addChild(this._dices);
    }

    protected openConnection()
    {
        console.log('Connecting to server...');
        this._network.openConnection('ws://localhost:8888/ws');
    }

    protected requestCubes()
    {
        console.log('Requesting values from server...');
        this._network.send({
            CLASS_NAME: 'ThrowCube'
        });
    }

    protected requestPossiblePositions()
    {
        this._network.send({
            CLASS_NAME: 'ShowPossiblePositions'
        });
    }

    // Events >>------------------------------------------------------------<<<<
    protected loadGame()
    {
        this.removeChild(this._startBtn);
        // this._board.show();
        this.addChild(this._board);
        let redStyle = new TextStyle({fill: '#ff0000', fontSize: 42, fontWeight: '800', dropShadow: true, align: 'center'});
        this.addChild(this._msgBox);
        setTimeout(this._msgBox.show.bind(this._msgBox, 'Hello', 2000, redStyle),1000);
        setTimeout(this._msgBox.show.bind(this._msgBox, 'Roll a dice !', 2000, redStyle),4000);
    }

    protected gameStart()
    {
        this.set_cube();
    }

    protected throwCubes(first:number, second:number)
    {
        this._dices.throwDice(first, second);
        this._dices.on('SuccessfulThrow', this.requestPossiblePositions, this);
    }

    protected moveChip(positions:number[])
    {
        console.log('Requesting move: 504');
        this._network.send({
            CLASS_NAME: 'MoveChip',
            Positions: positions[0]
        });
    }
    // Private >>-----------------------------------------------------------<<<<
}