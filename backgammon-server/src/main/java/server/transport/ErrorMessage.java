package server.transport;

import game.logics.GameError;
import game.logics.Player;

/**
 * Класс {@link ErrorMessage} имплементирует {@link AbstractMessage}. Данный класс
 * содержит информацию об ошибке, котораю отправится клиенту
 */
public class ErrorMessage extends AbstractMessage {
    int cod;
    String message;

    //TODO (Michael) Оформить как транспортный объект.
    //TODO (Michael) Подумать над названием, чтобы не было путаницы с GameError и вообще о связи с GameError.

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public ErrorMessage(GameError error){
        cod = error.getCod();
        message = error.getMessage();
    }

}
