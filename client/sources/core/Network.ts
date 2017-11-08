///<reference path="../../dts/pixi.js.d.ts"/>

import EventEmitter = PIXI.utils.EventEmitter;

export class Network extends EventEmitter
{
    public static EVENT_CONNECTED:string = 'Connected';
    public static EVENT_DATA:string = 'Data';

    constructor()
    {
        super();

    }
    // TODO достать протокол, сделать емиты по нему
    public send(data:string):void
    {
        switch (data)
        {
            case 'ThrowDices':
                setTimeout(function () {
                    this.emit(Network.EVENT_DATA, {
                        name: 'MoveDices',
                        dices: [5,4]
                    });
                }.bind(this), 1000);
                break;
        }
    }

    public enter():void
    {
        // Посылаем Enter, на него приходит ГС.
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
        }.bind(this), 8000)
    }

    public open():void
    {
        // подключение
        setTimeout(function () {
            console.log('Connection succeed.');
            this.emit(Network.EVENT_CONNECTED);
        }.bind(this), 1000);

    }

    public close():void
    {

    }

    public throwDices():void
    {
        // Запрос на бросок кубика.
        this.emit(Network.EVENT_DATA, {
            CLASS_NAME: 'CubeValue',
            cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
        })
    }
}