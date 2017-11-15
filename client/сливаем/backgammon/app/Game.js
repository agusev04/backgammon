var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Board", "./Network"], function (require, exports, Board_1, Network_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<reference path="Board.ts"/>
    /**
     * @author Вячеслав И.Э.
     * @version 1.0
     * @since 08 Октябрь 2017
     */
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Game = (function (_super) {
        __extends(Game, _super);
        // Init >>--------------------------------------------------------------<<<<
        /**
         * @private
         */
        function Game() {
            var _this = _super.call(this) || this;
            _this.configurate();
            return _this;
        }
        Game.prototype.configurate = function () {
            var bg = new Sprite(PIXI.Texture.WHITE);
            bg.width = Game.WIDTH;
            bg.height = Game.HEIGHT;
            var logo = Sprite.fromImage('assets/logo.jpg');
            this.server = new Network_1.Network('ws://localhost:8888/ws');
            this.server.addListener(Network_1.Network.EVENT_CONNECTED, this.eventConnected, this);
            this.server.addListener(Network_1.Network.EVENT_DATA, this.eventData, this);
            logo.anchor.set(0.5);
            logo.x = Game.WIDTH / 2;
            logo.y = Game.HEIGHT / 2;
            this.board = new Board_1.Board;
            this.addChild(bg);
            this.addChild(logo);
            this.addChild(this.board);
            setTimeout(this.disconect.bind(this), 12000);
            setTimeout(this.sendMessage.bind(this), 6000);
        };
        // Base >>--------------------------------------------------------------<<<<
        // Events >>------------------------------------------------------------<<<<
        Game.prototype.eventData = function (event) {
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
        };
        Game.prototype.eventConnected = function (connectData) {
            switch (connectData.status) {
                case 'close':
                    console.log('соединение закрыто через метод close');
                    break;
                case 'wasClean':
                    console.log('Соединение закрыто чисто. это сообщение из класса Гейм');
                    break;
                case 'disconnection':
                    console.log('Обрыв соединения');
                    break;
            }
        };
        Game.prototype.disconect = function () {
            this.server.disconnect();
        };
        Game.prototype.sendMessage = function () {
            var JsonHello = {
                "CLASS_NAME": "EnterPackage",
                "Name": "HelloMyServer"
            };
            console.log('Класс гейм говорит что из метода SendMessage отправили сообщение серверу JsonHello');
            this.server.send(JsonHello);
        };
        // Params >>------------------------------------------------------------<<<<
        Game.WIDTH = 1024;
        Game.HEIGHT = 768;
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=Game.js.map