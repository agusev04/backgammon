package game.logics;


import org.apache.log4j.Logger;
import server.transport.AbstractMessage;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;

public class Player {  //класс игрока
    String name;
    char color; // 'w' or 'b'
    GameMatch gameMatch;
    Session session;
    //TODO (Michael) зачем это поле? если не нужно - убрать !!!!

    public final Logger logger = Logger.getLogger(this.getClass());
    public Player(String name, char color) { //конструктор по умолчанию для игрока
    }

    public Player() {
    }

    public Player(GameMatch gameMatch, Session session, int number) {
        this.gameMatch = gameMatch;
        this.session = session;
    }

    public String getName() {
        return name;
    }

    public void setName(String name, String id) throws GameError {
        if (name == null || name.equals("")) {
            name = "user" + id;
        }
        this.name = name;
    }

    public GameMatch getGameMatch() {
        return gameMatch;
    }

    public void setGameMatch(GameMatch gameMatch) {
        this.gameMatch = gameMatch;

    }

    @Deprecated
    public void changeParam(String name, char color) {
        this.name = name;
        this.color = color;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public char getColor() {
        return color;
    }

    public void setColor(char color) {
        this.color = color;
    }

    public void sendMessage(AbstractMessage abstractMessage) {
        logger.info("TO INACTIVE PLAYER  " + getName() + ": " + abstractMessage);
        try {
            session.getBasicRemote().sendObject(abstractMessage);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
    }
}
