package server;

import game.logics.Game;

import java.util.Random;

class Hub {
    public int getIter() {
        return iter;
    }
    private String hubName;
    Game game = new Game();

    //TODO (IvchenkoAlexandr) Логику доступности действий и переключения хода нужно перенести в игру
    //Игрок спрашивает у игры, могу ли сделать что-то и что я делать могу.
    private MySession turnSession = null;
    private MySession moveSession = null;
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
        if(iter==2){
            Random random = new Random();
            turnSession = sessions[random.nextInt(1)];
        }

    }

    public void setMoveState(MySession mySessiion){
        this.moveSession = mySessiion;
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

    public MySession getTurnSession() {
        return turnSession;
    }

    public void nextTurn(MySession mySession){
        turnSession = mySession.getHub().getSecondSessions(mySession.getNumber());
    }

    public boolean isMyTurn(MySession mySession){
        boolean resalt = false;
        if((turnSession == mySession))
            resalt = true;
        return resalt;
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

    public Game getGame() {//P;ayer
        return game;
    }
}
