package server;

import game.logics.Game;
public class Error extends AbstractMessage {
    int cod;
    String message;

    //TODO (Michael) Оформить как транспортный объект.
    //TODO (Michael) Подумать над названием, чтобы не было путаницы с GameErrors и вообще о связи с GameErrors.

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
