package server;


import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

/**
 * Oleg O. Plotnikov
 * Date: 10/10/17
 * Copyright 2017 Connective Games LLC. All rights reserved.
 */
@ServerEndpoint(value = "/ws", encoders = {MessageEncoder.class}, decoders = {MessageDecoder.class})
public class WsServer {
    private static final RequestHandler REQUEST_HANDLER = new RequestHandler();

    public WsServer(){
        System.out.println("wsServer sreated");
    }

    @OnOpen
    public void onOpen(Session session){
        System.out.println("Open Connection ..." + session.getId());
    }

    @OnClose
    public void onClose(Session session){
        System.out.println("Close Connection ...");
    }

    @OnMessage
    public AbstractMessage onMessage(AbstractMessage pack, Session session){
        return REQUEST_HANDLER.request(pack, session);
    }

    @OnError
    public void onError(Throwable e){
        //TODO (IvchenkoAlexandr) Зачем System.out.println("ERROR"); ? e.printStackTrace() и так выведет ошибку в консоль,
        // в том числе и слово Error или Exception
        System.out.println("ERROR");
        e.printStackTrace();
    }
}
