package server;

import game.logics.Game;
import game.logics.Player;

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
        mySession.setPlayer(myUserName, color);
        GameState gameState = new GameState();
        gameState.getValues(mySession.getPlayer().getGame());
        gameState.setColor(mySession.getPlayer().getColor());
        gameState.setTurn(mySession.hub.getTurn());
        return gameState;
    }


    @Override
    public void getValues(Game game) {
    }
}

