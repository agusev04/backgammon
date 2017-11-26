/**
 * @author Вячеслав И.Э.
 * @version 1.0
 * @since 08 Октябрь 2017
 */
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import TextStyle = PIXI.TextStyle;
import {Button} from "./components/Button";
import {Board} from "./game/Board";
import {MessageBox} from "./components/MessageBox";
import {Dices} from "./game/Dices";
import {Network} from "./core/Network";
import {NotificationBox} from "./components/NotificationBox";

export class Game extends Container
{
    // Params >>------------------------------------------------------------<<<<
    public static WIDTH:number = 1024;
    public static HEIGHT:number = 768;
    private _myTurn:boolean = true;
    private _myName:string;
    private _opponent:string;
    private _startBtn:Button;
    private _throwBtn:Button;
    private _dices:Dices;
    private _msgBox:MessageBox;
    private _ntfBox:NotificationBox;
    private _board:Board;
    private _network:Network;
    private _myColor:string;
    private _lastMove:number[];

    // Init >>--------------------------------------------------------------<<<<
    /**
     * @private
     */
    constructor()
    {
        super();
        this._myName = 'id' + Math.floor(Math.random() * (10000000000000));
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
        this._ntfBox = new NotificationBox();
        this._network = new Network();
        this._network.on(Network.EVENT_CONNECTED, this.eventConnected, this);
        this._network.on(Network.EVENT_DISCONNECTED, this.eventDisconnected, this);
        this._network.on(Network.EVENT_DATA, this.eventData, this);
        this._board.on(Board.EVENT_END_OF_TURN, this.endTurn, this);
        this._board.on(Board.EVENT_MOVE_CHIP, this.moveAction, this);

        // this.addChild(this._board);
        this.addChild(this._msgBox);
        this.addChild(this._ntfBox);
    }

    // Base >>--------------------------------------------------------------<<<<
    protected set_logo():void
    {
        let bg:Sprite = Sprite.fromImage('assets/bg.jpg');
        bg.width = Game.WIDTH;
        bg.height = Game.HEIGHT;
        bg.alpha = 0.5;
        this.addChild(bg);

        // let logo:Sprite = Sprite.fromImage('assets/logo.png');
        // this.addChild(logo);
        //
        // logo.anchor.set(0.5);
        // logo.x = Game.WIDTH / 2;
        // logo.y = Game.HEIGHT / 2;
        // TweenLite.fromTo(logo, 3, {alpha: 1}, {alpha: 0});
        // TweenLite.fromTo(logo, 3, {alpha: 1}, {alpha: 0});
    }

    protected set_menu():void
    {
        this._startBtn = new Button('GameStart', 'test', 5000);
        this._startBtn.on('GameStart', this.openConnection, this);
        this._startBtn.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        this.addChild(this._startBtn);
    }

    protected loadGame():void
    {
        this.removeChild(this._startBtn);
        // this._board.show();
        this.addChild(this._board);
        this.showMessage('Waiting for\n opponent..', 0, 0);
        this.addChild(this._dices);
        this.addChild(this._throwBtn);
        this._throwBtn.hide();
        this._dices.hide();
    }

    protected gameStart():void
    {
        this.startOfTurn();
    }

    protected openConnection():void
    {
        console.log('Сообщение из гейма: Connecting to server...');
        this._network.openConnection('ws://backgammon.connectivegames.com:8888/ws');
    }

    protected showNotification(text:string):void
    {
        let style = new TextStyle({fill: '#ffffff', fontSize: 28, fontWeight: '800', dropShadow: true, align: 'center'});
        this.addChild(this._ntfBox);
        this._ntfBox.show(text, 2000, style);
    }

    protected showMessage(text:string, duration:number, timeout:number):void
    {
        let redStyle = new TextStyle({fill: '#ff0000', fontSize: 42, fontWeight: '800', dropShadow: true, align: 'center'});
        this.addChild(this._msgBox);
        setTimeout(this._msgBox.show.bind(this._msgBox, text, duration, redStyle),timeout);
    }

    // Events >>------------------------------------------------------------<<<<

    protected eventConnected():void
    {
        console.log('Сообщение из гейма: Sending enter request...');
        this._network.send({
            CLASS_NAME: 'Enter'
        });
        this.loadGame();
    }

    protected eventDisconnected():void
    {
        console.log('Сообщение из гейма: Disconnected from server.');
        this.showNotification('Con-n er-r');
    }

    protected eventData(data:any):void
    {
        // TODO сделать map
        switch (data.CLASS_NAME)
        {
            case 'GameState':
                this.dataOnGameState(data);
                break;
            case 'GameStart':
                this.dataOnGameStart(data);
                break;
            case 'CubeValue':
                this.dataOnCubeValue(data);
                break;
            case 'ChangeTable':
                this.dataOnChangeTable(data);
                break;
            case 'ErrorMessage':
                this.dataOnError(data);
                break;
            case 'PackageMessage':
                this.dataOnMessage(data);
        }
    }

    protected eventSuccessfulThrow(data:any):void
    {
        if (this._myTurn)
        {
            if (data.first == data.second)
                this.showNotification('OMG !');
            if (this._myColor == 'w')
                this._board.startTurn(data.first, data.second, 0);
            else
                this._board.startTurn(data.first, data.second, 1);
        }
    }

    // Data  >>------------------------------------------------------------<<<<

    protected dataOnMessage(data:any):void
    {
        if (data.gameState)
        {
            console.log('Msg: GameState. Color: ' + data.gameState.color);
            this._myName = data.gameState.myName;
            this._myTurn = data.gameState.stateChange.activePlayerName == this._myName;
            this._myColor = data.gameState.color;

            if (this._myTurn)
            {
                if(this._opponent)
                {
                    this.startOfTurn();
                }
                console.log('MyTurn, color: ' + this._myColor);
            }
            else
            {
                console.log('NotMyTurn, color: ' + this._myColor);
            }

            this.moveDice(this._myTurn);
        }
        if (data.changeArrayList)
        {
            console.log('Msg: ChangeArrayList.');

            if (data.changeArrayList.length == 2 && data.changeArrayList[1].CLASS_NAME == 'PossibleMoves')
            {
                this._board.moveChip(this._lastMove[0], this._lastMove[1]);
                if (data.changeArrayList[0])
                {
                    if (data.changeArrayList[0].CLASS_NAME == 'StateChange')
                    {
                        this._myTurn = data.changeArrayList[0].activePlayerName == this._myName;
                        if (this._myTurn)
                        {
                            this.startOfTurn();
                        }
                        this.moveDice(this._myTurn);
                    }
                }
            }
            else if (data.changeArrayList.length == 2 && data.changeArrayList[1].CLASS_NAME == 'Move')
            {
                this._board.moveOpponentChip(data.changeArrayList[1].from, data.changeArrayList[1].to);

                if (data.changeArrayList[0])
                {
                    if (data.changeArrayList[0].CLASS_NAME == 'StateChange') {
                        this._myTurn = data.changeArrayList[0].activePlayerName == this._myName;
                        if (this._myTurn) {
                            this.startOfTurn();
                        }
                        this.moveDice(this._myTurn);
                    }
                }
            }

            else if (data.changeArrayList[0])
            {
                if (data.changeArrayList[0].CLASS_NAME == "CubeValue")
                {
                    let first = (data.changeArrayList[0].cubeValues - data.changeArrayList[0].cubeValues % 10)/10;
                    let second = data.changeArrayList[0].cubeValues % 10;
                    console.log('Сообщение из гейма: Values from server: ', first + ', ', second);
                    this.throwCubes(first, second);
                }
                else if (data.changeArrayList[0].CLASS_NAME == 'GameStart')
                {
                    this._opponent = data.changeArrayList[0].enemyUserName;
                    if (this._myTurn)
                    {
                        this.startOfTurn();
                    }

                    console.log('Opponent is: ' + this._opponent);
                }
            }
        }
    }

    protected dataOnGameState(data:any):void
    {
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
    }

    protected dataOnGameStart(data:any):void
    {
        console.log('Сообщение из гейма: Your opponent is: ' + data.enemyUserName);
        this.gameStart();
    }

    protected dataOnCubeValue(data:any):void
    {
        let first = (data.cubeValues - data.cubeValues % 10)/10;
        let second = data.cubeValues % 10;
        console.log('Сообщение из гейма: Values from server: ', first + ', ', second);
        this.throwCubes(first, second);
    }

    protected dataOnChangeTable(data:any):void
    {
        console.log('Сообщение из гейма: Move accepted.');
        if (this._myTurn)
            this._board.moveChip(data.from, data.to);
        else
            this._board.moveOpponentChip(data.from, data.to);
    }

    protected dataOnError(data:any):void
    {
        this.showNotification(data.message);
    }

    // Game cycle >>------------------------------------------------------------<<<<
    protected requestCubes():void
    {
        console.log('Сообщение из гейма: Requesting values from server...');
        this._network.send({
            CLASS_NAME: 'ThrowCube'
        });
    }

    protected throwCubes(first:number, second:number):void
    {
        this._throwBtn.hide();
        this._dices.show();
        this._dices.throwDice(first, second);
        this._dices.on('SuccessfulThrow', this.eventSuccessfulThrow, this);
    }

    protected startOfTurn():void
    {
        console.log('Сообщение из гейма: Текущий цвет на начало хода - ', this._myColor);
        this._dices.hide();
        this._throwBtn.show();
    }

    protected moveDice(myTurn:boolean)
    {
        if (myTurn)
        {
            this._throwBtn.position.set(Game.WIDTH/2 + 225, Game.HEIGHT/2);
            this._dices.position.set(Game.WIDTH/2 + 225, Game.HEIGHT/2);
        }
        else
        {
            this._throwBtn.position.set(Game.WIDTH/2 - 225, Game.HEIGHT/2);
            this._dices.position.set(Game.WIDTH/2 - 225, Game.HEIGHT/2);
        }
    }

    protected moveAction(data:any):void
    {
        console.log('Сообщение из гейма: MoveAction пришел {from: ' + data.from + ',to: ' + data.to + '}.');
        this._network.send({
            CLASS_NAME: 'MoveAction',
            from: data.from + 1,
            to: data.to + 1,
            cantMove: false,
            cubeValue: Math.abs(data.from - data.to)
        });
        this._lastMove = [data.from + 1, data.to + 1];

    }

    protected endTurn():void
    {
        console.log('Сообщение из гейма: EndOfTurn пришел.');
        this._dices.hide();
        this._myTurn = false;
        this._throwBtn.position.set(Game.WIDTH/2 - 225, Game.HEIGHT/2);
        this._dices.position.set(Game.WIDTH/2 - 225, Game.HEIGHT/2);
    }
}