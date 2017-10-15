package server;


import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

/**
 * Oleg O. Plotnikov
 * Date: 10/10/17
 * Copyright 2017 Connective Games LLC. All rights reserved.
 */
@ServerEndpoint(value = "/ws", encoders = {PackageEncoder.class}, decoders = {PackageDecoder.class})
public class WsServer {
//GameLogic для каждых двух сессий (два человека-оппонента)
    GameLogic logic = new GameLogic();


    @OnOpen
    public void onOpen(Session session){
        System.out.println("Open Connection ...");
    }

    @OnClose
    public void onClose(Session session){
        System.out.println("Close Connection ...");
    }

    @OnMessage
    public String onMessage(AbstractPackage pack, Session session){
        //получить GameLogic относящийся к данной сессии
        pack.apply(logic);
        //отправить изменения пользоватеЛЯМ

        try {
            ((EnterPackage)pack).Name = "Alex";
            session.getAsyncRemote().sendText("Alex is coming"); //отправления сообщения
            session.getBasicRemote().sendObject(pack); //отправление объекта
            //session.getAsyncRemote().sendText ("Alex has came") нельзя!!!!, но можно отправить еще объекты
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
        String echoMsg = "Alex has came";
//TODO test return package?????
        return echoMsg;
    }

    @OnError
    public void onError(Throwable e){
        System.out.println("ERROR");
        e.printStackTrace();
    }
}
