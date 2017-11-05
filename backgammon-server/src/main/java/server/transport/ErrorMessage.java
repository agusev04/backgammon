package server.transport;

import game.logics.GameError;
import game.logics.Player;

/**
 * Класс {@link ErrorMessage} имплементирует {@link AbstractMessage}. Данный класс
 * содержит информацию об ошибке, котораю отправится клиенту
 */
public class ErrorMessage extends AbstractMessage {
    int code;
    String message;

    //TODO (Michael) Оформить как транспортный объект.
    //TODO (Michael) Подумать над названием, чтобы не было путаницы с GameError и вообще о связи с GameError.

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public ErrorMessage(GameError error){
        code = error.getCode();
        message = error.getMessage();
    }

}
