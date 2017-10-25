package server;


import game.logics.Game;
import game.logics.Player;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.HashMap;
import java.util.Map;

/**
 * Oleg O. Plotnikov
 * Date: 10/10/17
 * Copyright 2017 Connective Games LLC. All rights reserved.
 */
@ServerEndpoint(value = "/ws", encoders = {MessageEncoder.class}, decoders = {MessageDecoder.class})
public class WsServer {
    RequestHandler requestHandler;

    public WsServer(){
        System.out.println("wsServer sreated");
    }

    @OnOpen
    public void onOpen(Session session){
        System.out.println("Open Connection ..." + session.getId());
        requestHandler = RequestHandler.getInstance();
    }

    @OnClose
    public void onClose(Session session){
        System.out.println("Close Connection ...");
    }
    AbstractMessage message;
    @OnMessage
    public AbstractMessage onMessage(AbstractMessage pack, Session session){
        //TODO medness!
        new Thread(new Runnable() {
            @Override
            public void run() {
                message = requestHandler.request(pack, session);
            }
        });
        message = requestHandler.request(pack, session);
        return message;
    }

    @OnError
    public void onError(Throwable e){
        System.out.println("ERROR");
        e.printStackTrace();
    }
}
