import any = PIXI.utils.isMobile.any;
import Container = PIXI.Container;
import {Game} from "./Game";


export class Network extends Container{

    public static EVENT_CONNECTED:string;
    public static EVENT_DATA:string;
    private socket:WebSocket;


    constructor(url:string){
        super();
        this.setSocket(url) ;
        this.connect();

    }

    public setSocket(url:string){
        this.socket = new WebSocket(url);
    }

    public getSoket(){
        return this.socket;
    }

    public connect() {
        this.socket.onclose = (event) => this.onClose(event) ;
        this.socket.onmessage = (event) => this.onMessage(event);
    }

    public onMessage(event:any){
        console.log("говорю из класса нетворк что сервер мне сказал--->>>", event.data);
        console.log(typeof event.data);
        this.emit(Network.EVENT_DATA,{
            status:'message',
            data:event.data
        })
    }

    public onClose(event:any){
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
            this.emit(Network.EVENT_CONNECTED,{
                status:'wasClean'
            })

        } else {
            console.log('Обрыв соединения сообщение из класса Network');
            this.emit(Network.EVENT_CONNECTED,{
                status: 'disconnection'
            })
        }
        console.log('Код: ' + event.code + ' причина: ' + event.reason);
    }

    public disconnect(){
        this.socket.close();
        this.emit(Network.EVENT_CONNECTED,{
            status:'close'
        })
    };

    public send(mess:any){
        this.socket.send(JSON.stringify(mess));
        this.emit(Network.EVENT_DATA,{
            status:'send',
            data:mess
        })
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