import any = PIXI.utils.isMobile.any;
import Container = PIXI.Container;
import {Game} from "./Game";


export class Network extends Container{

    private socket:WebSocket;


    constructor(url:string){
        super();
        this._socket = url;
        this.connect();
    }

    set _socket(url:string){
        this.socket = new WebSocket(url);
    }

    get _soket(){
        return this.socket;
    }

    protected connect(){
        // console.log(this.socket.readyState.toString());
        // this.socket.onopen;
        this.socket.onclose = function(event) {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');

            }
            console.log('Код: ' + event.code + ' причина: ' + event.reason);
        };
        this.socket.onmessage = function (event) {
            console.log ("Message from server:", event.data);
        };
    }

    public disconnect(){
        this.socket.close();

        };

    public send(mess:any){
        this.socket.send(JSON.stringify(mess));
    }

}






// switch (this.socket.readyState){
//     case 0:
//     case 2:
//     case 3:
//         Game.EVENT.emit('wait');
//         break;
//     case 1:
//         Game.EVENT.emit('conect');
//         break;
//
// }
// if((this.socket.CONNECTING)==0 || (this.socket.CLOSING)==2 || (this.socket.CLOSED)==3)
// {
//     Game.EVENT.emit('wait');
// }else
// this.socket.onopen=(function () {
//     Game.EVENT.emit('conect');
//     console.log(this.readyState.toString());
// });