///<reference path="../../dts/pixi.js.d.ts"/>

import EventEmitter = PIXI.utils.EventEmitter;

export class Network extends EventEmitter
{
    public static EVENT_CONNECTED:string = 'Connected';
    public static EVENT_DISCONNECTED:string = 'Disconnected';
    public static EVENT_DATA:string = 'Data';
    public static EVENT_ERROR:string = 'Error';
    private _socket:WebSocket;

    constructor()
    {
        super();

    }

    public getSoket(){
        return this._socket;
    }

    public connect() {
        // this._socket.onclose = (event) => this.onClose(event) ;
        // this._socket.onmessage = (event) => this.onMessage(event);
    }

    // TODO Объеденить проекты
    // Работать с сервером
    // TODO достать протокол, сделать емиты по нему
    // TODO Сделать очередь
    // Занятость игры
    // Если игра занята сеть добавляет ответы сервера в массив (очередь)
    // По мере того как игра освобождается она говорит об этом сети и сеть отдает ответ сервера из очереди
    // TODO Налаживать последовательность игры
    public send(data:any):void
    {
        // this._socket.send(JSON.stringify(data));
        switch (data.CLASS_NAME)
        {
            case 'Enter':
                this.emit(Network.EVENT_DATA, {
                    CLASS_NAME: 'GameState',
                    whitePositions: [ 103, 305, 2404, 2103 ],
                    blackPositions:[ 403, 905, 1803, 1604 ],
                    cubeValues: 0,
                    color: 0,
                    turn: 'Jp',
                    tableName:"Bill's table"
                });
                setTimeout(function () {
                    this.emit(Network.EVENT_DATA, {
                        CLASS_NAME: 'GameStart',
                        enemyUserName: 'Ivan'
                    });
                }.bind(this), 8000);
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
                    Positions: 306
                });
                break;
        }
    }

    public enter():void
    {
        // Посылаем Enter, на него приходит ГС.
        this.send({
            CLASS_NAME: 'Enter'
        });
    }

    public openConnection(url:any):void {
        // подключение
        this._socket = new WebSocket(url);
        this._socket.addEventListener('close', this.onClose.bind(this));
        this._socket.addEventListener('message', this.onMessage.bind(this));
        this._socket.addEventListener('error', this.onError.bind(this));
        this._socket.addEventListener('open', this.onOpen.bind(this));
        this.emit(Network.EVENT_CONNECTED);
    }
    // public moveChips():void
    // {
    //     // запрашиваем разрешение на сдвиг фишки.
    //     this.send({
    //         CLASS_NAME: 'MoveChip',
    //         Positions: 306
    //     })
    // }

    private onError(event:any)
    {
        this.emit(Network.EVENT_ERROR);
        // console.log(event.target.readyState);
    }

    private onOpen()
    {
        console.log('Connection succeed.');
        // this.emit(Network.EVENT_CONNECTED);
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
        console.log("говорю из класса нетворк что сервер мне сказал--->>>", event.data);
        console.log(typeof event.data);
        this.emit(Network.EVENT_DATA,{
            status:'message',
            data:event.data
        })
    }

    private disconnect()
    {
        this._socket.close();
        this.emit(Network.EVENT_DISCONNECTED);
    }

    // public throwDices():void
    // {
    //     // Запрос на бросок кубика.
    //     this.send({
    //         CLASS_NAME: 'ThrowCube'
    //     })
    //     // this.emit(Network.EVENT_DATA, {
    //     //     CLASS_NAME: 'CubeValue',
    //     //     cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
    //     // });
    //     // setTimeout(function () {
    //     //     this.emit(Network.EVENT_DATA, {
    //     //         CLASS_NAME: 'PossiblePositions',
    //     //         positionQuantity: 4,
    //     //         possiblePositions: [ 504,407,609, 2023 ]
    //     //     });
    //     // }.bind(this), 2000)
    // }
}