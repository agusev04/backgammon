package server;

import game.logics.GameError;
import server.transport.AbstractMessage;
import server.transport.Action;
import server.transport.ErrorMessage;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

/**
 * Oleg O. Plotnikov
 * Date: 10/10/17
 * Copyright 2017 Connective Games LLC. All rights reserved.
 */
@ServerEndpoint(value = "/ws", encoders = {MessageEncoder.class}, decoders = {MessageDecoder.class})
public class WsServer  {
    private static final RequestHandler REQUEST_HANDLER = new RequestHandler();

    public WsServer() {

    }

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("WsServer: Open Connection " + session.getId());
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("WsServer: Close Connection " + session.getId());
        REQUEST_HANDLER.deletePlayer(session);
    }

    @OnMessage
    public AbstractMessage onMessage(Action pack, Session session) {
        return REQUEST_HANDLER.request(pack, session);
    }

    @OnError
    public void onError(Throwable e, Session session)  {
        System.out.println("WsServer: .......");
        e.printStackTrace();
        ErrorMessage errorMessage = new ErrorMessage(GameError.UNKNOWN_REQUEST);

        try {
            session.getBasicRemote().sendObject(errorMessage);
        } catch (EncodeException | IOException e1) {
            e1.printStackTrace();
        }
    }
}
