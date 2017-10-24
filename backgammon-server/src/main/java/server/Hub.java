package server;

import game.logics.Game;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;

class Hub {
    public int getIter() {
        return iter;
    }

    Game game = new Game();
    private int turn = 0;
    private int iter = 0;
    private MySession[] sessions = new MySession[2];

    public void setSession(MySession session){
        boolean result = false;
        if(iter<2){
            session.getPlayer().setGame(game);
            sessions[iter] = session;
            iter++;
            result = true;
        }
        if(iter == 1){
            sendGameStart();
        }
    }

    public MySession getSecondSessions(int iter) {
        MySession mySession = null;
        if(iter == 0){
            mySession = sessions[1];
        }if(iter == 1){
            mySession = sessions[2];
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

    public void sendGameStart(){
        GameStart gameStart = new GameStart();
        gameStart.setEnemyUserName(sessions[1].getPlayer().getName());
        try {
            sessions[0].getSession().getBasicRemote().sendObject(gameStart);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
        gameStart.setEnemyUserName(sessions[0].getPlayer().getName());
        try {
            sessions[1].getSession().getBasicRemote().sendObject(gameStart);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
    }
}
