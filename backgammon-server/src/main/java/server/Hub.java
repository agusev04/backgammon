package server;

import game.logics.Game;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;

class Hub {
    public int getIter() {
        return iter;
    }
    private String hubName;
    Game game = new Game();
    private int turn = 0;
    private int iter = 0;
    private MySession[] sessions = new MySession[2];

    public Hub(){
        System.out.print("hub created");
    }
    public void setSession(MySession session){
        boolean result = false;
        if(iter<2){
            session.getPlayer().setGame(game);
            sessions[iter] = session;
            iter++;
            result = true;
        }

    }

    public MySession getSecondSessions(int iter) {
        MySession mySession = null;
        if(iter == 0){
            //TODO do string with time when first enter.
            mySession = sessions[1];
        }if(iter == 1){
            mySession = sessions[0];
        }
        return mySession;
    }
    public void nextTurn(){
        turn++;
        turn%=2;
    }

    public String getTurn(){
        return sessions[turn].getPlayer().getName();
    }

    public String getHubName() {
        return hubName;
    }

    public void setHubName(String hubName) {
        this.hubName = hubName;
    }



    public MySession[] getSessions() {
        return sessions;
    }

    public Game getGame() {
        return game;
    }
}
