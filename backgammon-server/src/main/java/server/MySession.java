package server;

import game.logics.Player;

import javax.websocket.Session;

public class MySession {
    Hub hub;
    Session session;
    int number;
    Player player;

    //TODO (IvchenkoAlexandr) Как и обсудили, от класса избавляемся. Сессия идет в игрока. Хаб тоже удаляем
    // (функции его уходят в Game).
    //очередность хода будет реализована в игре Michael

    public MySession(Hub hub, Session session, int number) {
        this.hub = hub;
        this.session = session;
        this.number = number;
    }

    public void setPlayer(Player player){
        this.player = player;
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
