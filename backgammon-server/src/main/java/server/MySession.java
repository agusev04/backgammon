package server;

import javax.websocket.Session;

public class MySession {
    Hub hub;
    Session session;
    int number;

    public MySession(Hub hub, Session session, int number) {
        this.hub = hub;
        this.session = session;
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
