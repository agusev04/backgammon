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
    private _myTurn:boolean = true;
    private _myName:string;
    private _startBtn:Button;
    private _throwBtn:Button;
    private _dices:Dices;
    private _msgBox:MessageBox;
    private _board:Board;
    private _network:Network;
    private _myColor:number;
    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor()
    {
        super();
        this._myName = 'Jp';
        this.configure();
    }

    protected configure():void
    {
        // Splash screen >>-------------------------------------------------<<<<
        this.set_logo();
        // Menu screen >>---------------------------------------------------<<<<
        this.set_menu();
        this._throwBtn = new Button('DiceRoll', 'throw', 2000);
        this._throwBtn.on('DiceRoll', this.requestCubes, this);
        this._dices = new Dices();
        this._dices.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        this._board = new Board();
        this._msgBox = new MessageBox();
        this._network = new Network();
        this._network.on(Network.EVENT_CONNECTED, this.eventConnected, this);
        this._network.on(Network.EVENT_DISCONNECTED, this.eventDisconnected, this);
        this._network.on(Network.EVENT_DATA, this.eventData, this);
        this._board.on(Board.EVENT_END_OF_TURN, this.endTurn, this);
        this._board.on(Board.EVENT_MOVE_CHIP, this.moveChip, this);

        // this.addChild(this._board);
        this.addChild(this._msgBox);
    }

    protected eventData(data:any):void
    {
        switch (data.CLASS_NAME)
        {
            // TODO Сделать отдельные функции
            case 'GameState':
                console.log('Сообщение из гейма: GameState пришел.');
                if (!this._myTurn && data.turn == this._myName)
                {
                    this._myColor = data.color;
                    this._myTurn = data.turn == this._myName;
                    this.startOfTurn();
                }
                else
                {
                    this._myColor = data.color;
                }
                break;
            case 'GameStart':
                console.log('Сообщение из гейма: Your opponent is: ' + data.enemyUserName);
                this.gameStart();
                break;
            case 'CubeValue':
                let first = (data.cubeValues - data.cubeValues % 10)/10;
                let second = data.cubeValues % 10;
                console.log('Сообщение из гейма: Values from server: ', first + ', ', second);
                this.throwCubes(first, second);
                break;
            case 'PossiblePositions':
                console.log('Сообщение из гейма: Possible positions: ' + data.possiblePositions);
                break;
            case 'ChangeTable':
                console.log('Сообщение из гейма: Move accepted.');
                this._board.moveChip(data.from, data.to);
                break;
        }
    }

    protected startOfTurn():void
    {
        console.log('Сообщение из гейма: Текущий цвет на начало хода - ', this._myColor);
        this._dices.hide();
        if (this._myTurn)
        {
            if (this._myColor == 0)
            {
                this._throwBtn.position.set(Game.WIDTH/2 + 225, Game.HEIGHT/2);
                this._dices.position.set(Game.WIDTH/2 + 225, Game.HEIGHT/2);
            }
            else
            {
                this._throwBtn.position.set(Game.WIDTH/2 - 225, Game.HEIGHT/2);
                this._dices.position.set(Game.WIDTH/2 - 225, Game.HEIGHT/2);
            }
            this._throwBtn.show();
        }
        else
        {
            this._throwBtn.position.set(Game.WIDTH/2 - 225, Game.HEIGHT/2);
            this._dices.position.set(Game.WIDTH/2 - 225, Game.HEIGHT/2);
        }
    }

    protected moveChip(data:any)
    {
        console.log('Сообщение из гейма: MoveChip пришел {from: ' + data.from + ',to: ' + data.to + '}.');
        this._network.send(data);
    }

    protected endTurn()
    {
        console.log('Сообщение из гейма: EndOfTurn пришел.');
        this._dices.hide();
        this._myTurn = false;
        this._network.send({
            CLASS_NAME: 'EndOfTurn',
            color: this._myColor
        });
    }

    protected eventDisconnected():void
    {
        console.log('Сообщение из гейма: Disconnected from server.');
    }

    protected eventConnected():void
    {
        console.log('Сообщение из гейма: Sending enter request...');
        this._network.enter();
        this.loadGame();
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
        // this.addChild(logo);
        //
        // logo.anchor.set(0.5);
        // logo.x = Game.WIDTH / 2;
        // logo.y = Game.HEIGHT / 2;
        // TweenLite.fromTo(logo, 3, {alpha: 1}, {alpha: 0});
        // TweenLite.fromTo(logo, 3, {alpha: 1}, {alpha: 0});
    }

    protected set_menu()
    {
        this._startBtn = new Button('GameStart', 'test', 5000);
        this._startBtn.on('GameStart', this.openConnection, this);
        this._startBtn.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        this.addChild(this._startBtn);
    }

    protected openConnection()
    {
        console.log('Сообщение из гейма: Connecting to server...');
        this._network.openConnection('ws://localhost:8888/ws');
    }

    protected requestCubes()
    {
        console.log('Сообщение из гейма: Requesting values from server...');
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
        // this.showMessage('Waiting for\n opponent..', 100, 0);
        this.addChild(this._dices);
        this.addChild(this._throwBtn);
        this._throwBtn.hide();
        this._dices.hide();
    }

    protected showMessage(text:string, duration:number, timeout:number)
    {
        let redStyle = new TextStyle({fill: '#ff0000', fontSize: 42, fontWeight: '800', dropShadow: true, align: 'center'});
        this.addChild(this._msgBox);
        setTimeout(this._msgBox.show.bind(this._msgBox, text, duration, redStyle),timeout);
    }

    protected gameStart()
    {
        this.startOfTurn();
    }

    protected throwCubes(first:number, second:number)
    {
        this._throwBtn.hide();
        this._dices.show();
        this._dices.throwDice(first, second);
        this._dices.on('SuccessfulThrow', this.eventSuccessfulThrow, this);
    }

    protected eventSuccessfulThrow(data:any)
    {
        if (this._myTurn)
        {
            this._board.startTurn(data.first, data.second, this._myColor);
        }
    }
    // Private >>-----------------------------------------------------------<<<<
}