package server;

import game.logics.GameError;
import org.apache.log4j.Logger;
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
public class WsServer {
    private final Logger logger = Logger.getLogger(this.getClass());
    private static final RequestHandler REQUEST_HANDLER = new RequestHandler();

    public WsServer() {

    }

    @OnOpen
    public void onOpen(Session session) {
        logger.info("Open Connection " + session.getId());
    }

    @OnClose
    public void onClose(Session session) {
        logger.info("Close Connection " + session.getId());
        REQUEST_HANDLER.deletePlayer(session);
    }

    @OnMessage
    public AbstractMessage onMessage(Action pack, Session session) {
        logger.info(pack.toString());
        return REQUEST_HANDLER.request(pack, session);
    }

    @OnError
    public void onError(Throwable e, Session session) {
    //    logger.error(e);
        ErrorMessage errorMessage = new ErrorMessage(GameError.UNKNOWN_REQUEST);

        try {
            session.getBasicRemote().sendObject(errorMessage);
        } catch (EncodeException | IOException e1) {
 //           logger.error(e1);
            e1.printStackTrace();
        }
    }
}
