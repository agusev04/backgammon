import EventEmitter = PIXI.utils.EventEmitter;
export class Network extends EventEmitter
{

    // Params >>------------------------------------------------------------<<<<
    public static EVENT_CONNECTED:string = 'Connected';
    public static EVENT_DISCONNECTED:string = 'Disconnected';
    public static EVENT_DATA:string = 'Data';
    public static EVENT_ERROR:string = 'Error';
    public static EVENT_GAME_IS_WAITING:string = 'GameIsWaiting';
    public static EVENT_GAME_IS_BUSY:string = 'GameIsBusy';
    private _socket:WebSocket;
    private _gameIsBusy:boolean;
    private _queue:any[] = [];

    // Debug Params >>------------------------------------------------------------<<<<
    private _emulating:boolean = false;
    private _debug:boolean = false;
    private _opponentEmulationIndex:number = 0;

    // Init >>--------------------------------------------------------------<<<<
    /**
     * @private
     */
    constructor()
    {
        super();
        this.on(Network.EVENT_GAME_IS_WAITING, this.popData);
        this.on(Network.EVENT_GAME_IS_BUSY, this.storeData);
    }

    // Base >>--------------------------------------------------------------<<<<

    public getSocket():WebSocket
    {
        return this._socket;
    }

    public openConnection(url:any):void
    {
        // подключение
        this._socket = new WebSocket(url);
        this._socket.addEventListener('close', this.onClose.bind(this));
        this._socket.addEventListener('message', this.onMessage.bind(this));
        this._socket.addEventListener('error', this.onError.bind(this));
        this._socket.addEventListener('open', this.onOpen.bind(this));
    }

    public send(data:any):void
    {
        console.log(JSON.stringify(data));
        this._socket.send(JSON.stringify(data));
        if (this._emulating)
        {
            switch (data.CLASS_NAME)
            {
                case 'Enter':
                    this.emit(Network.EVENT_DATA, {
                        CLASS_NAME: 'GameState',
                        color: 0,
                        turn: 'Jp',
                        tableName:"Bill's table"
                    });

                    setTimeout(function () {
                        this.emit(Network.EVENT_DATA, {
                            CLASS_NAME: 'GameStart',
                            enemyUserName: 'Ivan'
                        });
                    }.bind(this), 10);
                    break;
                case 'ThrowCube':
                    this.emit(Network.EVENT_DATA, {
                        CLASS_NAME: 'CubeValue',
                        // cubeValues: 25
                        cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
                    });
                    break;
                case 'ShowPossiblePositions':
                    this.emit(Network.EVENT_DATA, {
                        CLASS_NAME: 'PossiblePositions',
                        positionQuantity: 4,
                        possiblePositions: [ 504,407,609, 2023 ]
                    });
                    break;
                case 'MoveChip':
                    this.emit(Network.EVENT_DATA, {
                        CLASS_NAME:'ChangeTable',
                        from: data.from,
                        to: data.to
                    });
                    break;
                case 'EndOfTurn':
                    if (this._debug)
                    {
                        if (data.color == 0)
                        {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'GameState',
                                color: 1,
                                turn: 'Jp',
                                tableName:"Bill's table"
                            });
                            console.log('Сообщение из эмулятора: ходят черные.')
                        }
                        else
                        {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'GameState',
                                color: 0,
                                turn: 'Jp',
                                tableName:"Bill's table"
                            });
                            console.log('Сообщение из эмулятора: ходят белые.')
                        }
                    }
                    else
                    {
                        this.emit(Network.EVENT_DATA, {
                            CLASS_NAME: 'GameState',
                            color: 0,
                            turn: 'Ivan',
                            tableName:"Bill's table"
                        });
                        switch (this._opponentEmulationIndex)
                        {
                            case 0:
                                setTimeout(function () {
                                    this.emit(Network.EVENT_DATA, {
                                        CLASS_NAME: 'CubeValue',
                                        // cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
                                        cubeValues: 52
                                    });
                                }.bind(this), 3000);
                                setTimeout(function () {
                                    this.emit(Network.EVENT_DATA, {
                                        CLASS_NAME:'ChangeTable',
                                        from: 12,
                                        to: 7
                                    });
                                }.bind(this), 7500);
                                setTimeout(function () {
                                    this.emit(Network.EVENT_DATA, {
                                        CLASS_NAME:'ChangeTable',
                                        from: 7,
                                        to: 5
                                    });
                                }.bind(this), 9000);
                                setTimeout(function () {
                                    this.emit(Network.EVENT_DATA, {
                                        CLASS_NAME: 'GameState',
                                        color: 0,
                                        turn: 'Jp',
                                        tableName:"Bill's table"
                                    });
                                }.bind(this), 9500);
                                this._opponentEmulationIndex += 1;
                                break;
                            case 1:
                                setTimeout(function () {
                                    this.emit(Network.EVENT_DATA, {
                                        CLASS_NAME: 'CubeValue',
                                        // cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
                                        cubeValues: 11
                                    });
                                }.bind(this), 3000);
                                setTimeout(function () {
                                    this.emit(Network.EVENT_DATA, {
                                        CLASS_NAME:'ChangeTable',
                                        from: 5,
                                        to: 3
                                    });
                                }.bind(this), 7500);
                                setTimeout(function () {
                                    this.emit(Network.EVENT_DATA, {
                                        CLASS_NAME:'ChangeTable',
                                        from: 5,
                                        to: 3
                                    });
                                }.bind(this), 9000);
                                setTimeout(function () {
                                    this.emit(Network.EVENT_DATA, {
                                        CLASS_NAME: 'GameState',
                                        color: 0,
                                        turn: 'Jp',
                                        tableName:"Bill's table"
                                    });
                                }.bind(this), 9500);
                                this._opponentEmulationIndex += 1;
                                break;
                        }
                    }

                    break;
            }
        }
    }

    public disconnect():void
    {
        this._socket.close();
    }

    // Events >>------------------------------------------------------------<<<<
    private onError(event:any)
    {
        this.emit(Network.EVENT_ERROR);
        this.disconnect();
    }

    private onOpen():void
    {
        console.log('Connection succeed.');
        this.emit(Network.EVENT_CONNECTED);
    }

    private onClose(event:any):void
    {
        if (event.wasClean) {
            // console.log('Соединение закрыто чисто');
            this.emit(Network.EVENT_DISCONNECTED,{
                status:'wasClean'
            })

        } else {
            // console.log('Обрыв соединения сообщение из класса Network');
            this.emit(Network.EVENT_DISCONNECTED,{
                status: 'disconnection'
            })
        }
        // console.log('Код: ' + event.code + ' причина: ' + event.reason);
    }

    private onMessage(event:any):void
    {
        let data = JSON.parse(event.data);

        if (this._gameIsBusy)
        {
            this._queue.push(data);
            console.log(this._queue);
        }
        else
        {
            this.emit(Network.EVENT_DATA,data);
            console.log(data);
        }
    }

    private storeData():void
    {
        this._gameIsBusy = true;
    }

    private popData():void
    {
        this._gameIsBusy = false;
        this.emit(Network.EVENT_DATA, this._queue.shift());
    }
}