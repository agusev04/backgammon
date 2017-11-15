///<reference path="Board.ts"/>
/**
 * @author Вячеслав И.Э.
 * @version 1.0
 * @since 08 Октябрь 2017
 */
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;

import {Sound} from "./Sound";
import {Board} from "./Board";
import {Network} from "./Network";

export class Game extends Container {
    // Params >>------------------------------------------------------------<<<<

    public static WIDTH: number = 1024;
    public static HEIGHT: number = 768;
    private server: Network;
    private board: Board;

    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor() {
        super();
        this.configurate();
    }

    protected configurate(): void {
        let bg: Sprite = new Sprite(PIXI.Texture.WHITE);
        bg.width = Game.WIDTH;
        bg.height = Game.HEIGHT;
        let logo: Sprite = Sprite.fromImage('assets/logo.jpg');

        this.server = new Network('ws://localhost:8888/ws');
        this.server.addListener(Network.EVENT_CONNECTED, this.eventConnected, this);
        this.server.addListener(Network.EVENT_DATA, this.eventData, this);

        logo.anchor.set(0.5);
        logo.x = Game.WIDTH / 2;
        logo.y = Game.HEIGHT / 2;

        this.board = new Board;
        this.addChild(bg);
        this.addChild(logo);
        this.addChild(this.board);

        setTimeout(this.disconect.bind(this), 12000);
        setTimeout(this.sendMessage.bind(this), 6000);

    }

    // Base >>--------------------------------------------------------------<<<<

    // Events >>------------------------------------------------------------<<<<

    protected eventData(event: any) {
        switch (event.status) {
            case 'message':
                console.log('Класс гейм получил сообщение от сервера--->   ' + event.data);
                this.board.arrayDicaOfSrtingDice(event.data);
                break;
            case 'dice':
                console.log('Класс гейм получил кубики от сервера--->   ' + event.dice + '   и отправил их классу Боард');

                break;
            case 'send':
                console.log('Класс гейм получил информацию о том что класс нетворк отправил сообшение JSON на сервер. содеражиние сообщения: ----->>>>');
                console.log(event.data);
        }
    }

    protected eventConnected(connectData: any) {
        switch (connectData.status) {
            case  'close':
                console.log('соединение закрыто через метод close');
                break;
            case  'wasClean':
                console.log('Соединение закрыто чисто. это сообщение из класса Гейм');
                break;
            case 'disconnection':
                console.log('Обрыв соединения');
                break;
        }
    }

    public disconect() {
        this.server.disconnect();
    }

    public sendMessage() {
        let JsonHello = {
            "CLASS_NAME": "EnterPackage",
            "Name": "HelloMyServer"
        };
        console.log('Класс гейм говорит что из метода SendMessage отправили сообщение серверу JsonHello');
        this.server.send(JsonHello);
    }


    // Private >>-----------------------------------------------------------<<<<
}