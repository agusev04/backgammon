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
import {UserBar} from "./components/UserBar";

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
    private _board:Board;
    private _network:Network;
    private _userBar: UserBar;
    private _myColor:string;
    private _whaitingForServer: boolean;

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
        this._throwBtn = new Button('DiceRoll', 'DiceRoll', 2000);
        this._throwBtn.on('DiceRoll', this.requestCubes, this);
        this._dices = new Dices();
        this._throwBtn.scale.set(1);
        this._throwBtn.position.set(Game.WIDTH/2, Game.HEIGHT/2 + 15);
        this._dices.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        this._board = new Board();
        this._msgBox = new MessageBox();
        this._network = new Network();
        this._userBar = new UserBar();
        this._network.on(Network.EVENT_CONNECTED, this.eventConnected, this);
        this._network.on(Network.EVENT_DISCONNECTED, this.eventDisconnected, this);
        this._network.on(Network.EVENT_DATA, this.eventData, this);
        this._board.on(Board.EVENT_END_OF_TURN, this.endTurn, this);
        this._board.on(Board.EVENT_MOVE_CHIP, this.moveAction, this);
        // this._board.on(Board.EVENT_MOVE_CHIP_JAIL, this.moveAction, this);

        // this.addChild(this._board);
        this.addChild(this._msgBox);
    }

    // Base >>--------------------------------------------------------------<<<<
    protected set_logo():void
    {
        let bg:Sprite = Sprite.fromImage('assets/start.png');
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
        this._startBtn = new Button('GameStart', 'Start', 5000);
        this._startBtn.on('GameStart', this.openConnection, this);
        this._startBtn.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        this.addChild(this._startBtn);
    }

    protected loadGame():void
    {
        this.removeChild(this._startBtn);
        // this._board.show();
        this.addChild(this._board);
        // this.showMessage('Waiting for\n opponent..', 0, 0);
        this.addChild(this._dices);
        this.addChild(this._throwBtn);
        this._throwBtn.hide();
        this._dices.hide();
        this.addChild(this._userBar);
        this._userBar.setActiveStatus('Waiting for opponent..');
        this._userBar.showNotification('Welcome to our game !');
    }

    protected endOfGame(winner: string)
    {
        if (winner == this._myColor)
            this._userBar.setActiveStatus('You win !');
        else
        {
            this._userBar.setActiveStatus('You lose !');
        }
        if (this._myTurn)
        {
            this._myTurn = false;
            this._board.blockOfTurn();
        }

        this._myTurn = null;
        this._myName = null;
        this._myColor = null;
        this._opponent = null;
        this._board.interactive = false;
        this._throwBtn.hide();
        this._dices.hide();
        this.removeChild(this._dices);
        this.removeChild(this._throwBtn);
        this._network.disconnect();
        this._userBar.setUserBar(this._myColor, this._opponent);
        let _restartBtn = new Button('GameRestart', 'Restart', 5000);
        _restartBtn.on('GameRestart', this.gameRestart, this);
        _restartBtn.position.set(Game.WIDTH/2, Game.HEIGHT/2);
        this.addChild(_restartBtn);

    }

    protected gameRestart():void
    {
        location.reload();
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

    // Events >>------------------------------------------------------------<<<<

    protected eventConnected():void
    {
        console.log('Сообщение из гейма: Sending enter request...');
        this._network.send({
            CLASS_NAME: 'Enter'
            // , myUserName: 'root'
        });
        this.loadGame();
    }

    protected eventDisconnected():void
    {
        console.log('Сообщение из гейма: Disconnected from server.');
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
            if (this._myColor == 'w')
                this._board.startTurn(data.first, data.second, 0);
            else
                this._board.startTurn(data.first, data.second, 1);

            if (data.first == data.second)
            {
                this._userBar.showNotification('Lucky one!');
            }
        }
        else
        {
            if (data.first == data.second)
            {
                this._userBar.showNotification('He\'s lucky!');
            }
        }
    }

    // Data (server)  >>------------------------------------------------------------<<<<
    protected dataOnMessage(data:any):void
    {
        if (data.gameState)
        {
            console.log('Msg: GameState. Color: ' + data.gameState.color);
            this._myName = data.gameState.myName;
            this._myTurn = data.gameState.stateChange.activePlayerColor == this._myColor;
            this._myColor = data.gameState.color;
            this._userBar.setUserBar(this._myColor, this._opponent);

            let arrayChips: any[] = [
                [],
                [0,0]
                ,[], [], [], [],
                [1,1,1,1,1],
                [],
                [1,1,1],
                [], [], [],
                [0,0,0,0,0],
                [1,1,1,1,1],
                [], [], [],
                [0,0,0],
                [],
                [0,0,0,0,0],
                [], [], [], [],
                [1,1],
                [],[],[]
            ];
            this._board.setState(arrayChips);
            this._board.drawState();

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

            for (let i = 0; i < data.changeArrayList.length; i++)
            {
                if (data.changeArrayList[i].CLASS_NAME == 'GameStart')
                {
                    this._opponent = data.changeArrayList[i].enemyUserName;
                    if (this._myTurn)
                    {
                        this._userBar.setActiveStatus('Your turn');
                        this.startOfTurn();
                    }
                    else
                    {
                        this._userBar.setActiveStatus('Opponent\'s turn');
                    }

                    console.log('Opponent is: ' + this._opponent);
                }
                else if (data.changeArrayList[i].CLASS_NAME == "CubeValue")
                {
                    let first = (data.changeArrayList[i].cubeValues - data.changeArrayList[i].cubeValues % 10)/10;
                    let second = data.changeArrayList[i].cubeValues % 10;
                    console.log('Сообщение из гейма: Values from server: ', first + ', ', second);
                    this.throwCubes(first, second);
                    if (data.changeArrayList[i + 1].CLASS_NAME == 'StateChange')
                    {
                        this.dataChangeTurn(data.changeArrayList[i+1]);
                    }
                }
                else if (data.changeArrayList[i].CLASS_NAME == 'Move')
                {
                    if (this._myTurn)
                    {
                        console.log('Сообщение из гейма: Move  {from: ' + data.changeArrayList[i].from + ',to: ' + data.changeArrayList[i].from + '}.');
                        this._board.moveChip(data.changeArrayList[i].from, data.changeArrayList[i].to);
                    }
                    else
                    {
                        console.log('Сообщение из гейма: Move  {from: ' + data.changeArrayList[i].from + ',to: ' + data.changeArrayList[i].to + '}.');
                        this._board.moveOpponentChip(data.changeArrayList[i].from, data.changeArrayList[i].to);
                    }

                    if (data.changeArrayList[i + 1].CLASS_NAME == 'StateChange')
                    {
                        this.dataChangeTurn(data.changeArrayList[i + 1]);
                    }

                    if (this._whaitingForServer)
                    {
                        this._whaitingForServer = false;
                    }
                }
                else if (data.changeArrayList[i].CLASS_NAME == 'StateChange')
                {
                    this.dataChangeTurn(data.changeArrayList[i]);
                }
                else if (data.changeArrayList[i].CLASS_NAME == 'MoveBar')
                {
                    if (this._myTurn && this._myColor == 'w')
                        this._board.moveOpponentChip(data.changeArrayList[i].from, 25);

                    else if (!this._myTurn && this._myColor == 'w')
                        this._board.moveOpponentChip(data.changeArrayList[i].from, 0);

                    else if (this._myTurn && this._myColor == 'b')
                        this._board.moveOpponentChip(data.changeArrayList[i].from, 0);

                    else
                        this._board.moveOpponentChip(data.changeArrayList[i].from, 25);

                    if (data.changeArrayList[i + 1].CLASS_NAME == 'StateChange')
                    {
                        this.dataChangeTurn(data.changeArrayList[i+1]);
                    }
                    if (this._whaitingForServer)
                    {
                        this._whaitingForServer = false;
                    }
                }
                else if (data.changeArrayList[i].CLASS_NAME == 'Final')
                {
                    console.log('Игра закончилась ! Победил: ' + data.changeArrayList[i].color);
                    setTimeout(this.endOfGame.bind(this), 50, data.changeArrayList[i].color);
                }
            }
        }
    }

    protected dataChangeTurn(data:any)
    {
        if (data.turnSkipped)
        {
            this._userBar.showNotification('Blocked dice!');
            this._board.blockOfTurn();
        }
        if (this._myTurn != (data.activePlayerColor == this._myColor))
        {
            this._myTurn = data.activePlayerColor == this._myColor;
            if (this._myTurn)
            {
                this._userBar.setActiveStatus('Your turn');
                this.startOfTurn();
            }
            else
            {
                this._userBar.setActiveStatus('Opponent\'s turn');
                this.endTurn();
            }
            this.moveDice(this._myTurn);
        }
        this._userBar.setUserBar(this._myColor, this._opponent);
        this._userBar.setActivePlayer(this._myTurn, this._myColor);
    }

    protected dataOnError(data:any):void
    {
        this._userBar.showNotification(data.message);
        if (data.message == 'Your opponent came out')
        {
            this.endOfGame(this._myColor);
        }
    }

    // Data (emulating) >>------------------------------------------------------------<<<<
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

    // Game cycle >>------------------------------------------------------------<<<<
    protected requestCubes():void
    {
        console.log('Сообщение из гейма: Requesting values from server...');
        this._network.send({
            CLASS_NAME: 'ThrowCube'
        });
    }

    protected moveDice(myTurn:boolean)
    {
        if (myTurn)
            this._dices.position.set(Game.WIDTH/2 + 185, Game.HEIGHT/2 + 15);
        else
            this._dices.position.set(Game.WIDTH/2 - 170, Game.HEIGHT/2 + 15);
    }

    protected startOfTurn():void
    {
        console.log('Сообщение из гейма: Текущий цвет на начало хода - ', this._myColor);
        this._dices.hide();
        this._throwBtn.show();
    }

    protected throwCubes(first:number, second:number):void
    {
        this._throwBtn.hide();
        this._dices.show();
        this._dices.throwDice(first, second);
        this._dices.on('SuccessfulThrow', this.eventSuccessfulThrow, this);
    }

    protected moveAction(data:any):void
    {
        if (!this._whaitingForServer)
        {
            console.log('Посылаем мув');
            this._whaitingForServer = true;
            this._network.send({
                CLASS_NAME: 'MoveAction',
                from: data.from,
                cubeValue: data.cubeValues
            });
        }
    }

    protected endTurn():void
    {
        console.log('Сообщение из гейма: EndOfTurn пришел.');
        this._dices.hide();
        this.moveDice(this._myTurn);
    }
}