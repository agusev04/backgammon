package game.logics;


import server.transport.AbstractMessage;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;

public class Player {  //класс игрока
    String name;
    char color; // 'w' or 'b'

    GameMatch gameMatch;
    // Alexandr начал добавлять
    Session session;
    int number; //это номер в массиве в классе GameMatch
    // закончил добавлять
    //TODO (Michael) исправить, как было в задаче с изменением связанного кода

    public Player(String name, char color) { //конструктор по умолчанию для игрока
    }

    public Player() {
    }

    public Player(GameMatch gameMatch, Session session, int number) {
        this.gameMatch = gameMatch;
        this.session = session;
        this.number = number;
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

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public char getColor() {
        return color;
    }

    public void setColor(char color) {
        this.color = color;
    }

    public void sendMessage(AbstractMessage abstractMessage) {
        System.out.println("Player sendMessage: TO PLAYER " + getName() + ": " + abstractMessage);
        try {
            session.getBasicRemote().sendObject(abstractMessage);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
    }
}
