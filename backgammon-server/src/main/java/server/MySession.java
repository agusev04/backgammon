package server;

import game.logics.Player;

import javax.websocket.Session;

public class MySession {
    Hub hub;
    Session session;
    int number;
    Player player;

    public MySession(Hub hub, Session session, int number) {
        this.hub = hub;
        this.session = session;
    }

    public void setPlayer(String name, char color){
        player = new Player(name, color);
    }

    public Player getPlayer() {
        return player;
    }

    public Hub getHub() {
        return hub;
    }

    public int getNumber() {
        return number;
    }

    public Session getSession() {
        return session;
    }
}
