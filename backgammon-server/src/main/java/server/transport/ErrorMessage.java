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

    public ErrorMessage(GameError error) {
        code = error.getCode();
        message = error.getMessage();
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

}
