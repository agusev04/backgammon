package server;


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
//GameLogic для каждых двух сессий (два человека-оппонента)
    GameLogic logic = new GameLogic();
    HashMap<Integer, MySession> sessions = new HashMap<>();
    Hub currentHub = new Hub();

    @OnOpen
    public void onOpen(Session session){
        System.out.println("Open Connection ...");
    }

    @OnClose
    public void onClose(Session session){
        System.out.println("Close Connection ...");
    }

    @OnMessage
    public AbstractMessage onMessage(AbstractMessage pack, Session session){
        MySession thisSession = null;
        if(!sessions.containsKey(session.hashCode())){
            MySession mySession;
            if(currentHub.getIter()<2){
                thisSession = new MySession(currentHub, session, 1); //created
            }else{
                currentHub = new Hub();
                thisSession = new MySession(currentHub, session, 0); //created
            }
            currentHub.setSession(thisSession);
            sessions.put(session.hashCode(), thisSession);
        }else{
            for (Map.Entry<Integer, MySession> entry: sessions.entrySet()) {
                if(entry.getKey()==session.hashCode()){
                    thisSession = entry.getValue(); //cought
                    break;
                }
            }
        }

        Hub hub = thisSession.getHub();
        if(hub.getIter()==2){
            MySession secondMySession = hub.getSecondSessions(thisSession.getNumber());
            Session secondSession = secondMySession.getSession();
        }

        AbstractMessage message = null;
        //получить GameLogic относящийся к данной сессии
        message     = pack.apply(logic);
   //     message = new GameState();
        message.getValues(logic);
       // session.getBasicRemote()
        //отправить изменения пользоватеЛЯМ

        return message;
    }

    @OnError
    public void onError(Throwable e){
        System.out.println("ERROR");
        e.printStackTrace();
    }
}
