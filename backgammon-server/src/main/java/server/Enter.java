package server;

import game.logics.Game;
import game.logics.Player;

import java.util.Date;

public class Enter extends AbstractMessage {
    public String myUserName;
    @Override
    public AbstractMessage apply(MySession mySession) {
        char color;
        if(mySession.getNumber()==0){
            color = 'w';
        }else{
            color = 'b';
        }

        mySession.getPlayer().changeParam(myUserName, color);
        GameState gameState = new GameState();
        gameState.getValues(mySession.getPlayer().getGame());
        gameState.setColor(color);
        gameState.setTurn("");
        Date date = new Date();
        gameState.setTableName(mySession.getHub().getSessions()[0].getPlayer().getName()+"s backgammon table created");
        return gameState;
    }


    @Override
    public void getValues(Game game) {
    }


}

