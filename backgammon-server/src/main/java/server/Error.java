package server;

import game.logics.Game;
public class Error extends AbstractMessage {
    int cod;
    String message;
    @Override
    public AbstractMessage apply(MySession mySession) throws GameErrors {
        return null;
    }

    @Override
    public void getValues(Game game) {

    }

    public void setError(GameErrors error){
        cod = error.getCod();
        message = error.getMessage();
    }
}
