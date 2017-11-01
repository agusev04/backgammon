package server.transport;

import game.logics.Game;
import game.logics.GameErrors;
import game.logics.Player;

public class Error extends AbstractMessage {
    int cod;
    String message;

    //TODO (Michael) Оформить как транспортный объект.
    //TODO (Michael) Подумать над названием, чтобы не было путаницы с GameErrors и вообще о связи с GameErrors.

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }


    public void setError(GameErrors error){
        cod = error.getCod();
        message = error.getMessage();
    }
}
