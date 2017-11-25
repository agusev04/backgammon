package server.transport;

import game.logics.GameError;
import game.logics.Player;

/**
 * Класс {@link ErrorMessage} имплементирует {@link AbstractMessage}. Данный класс
 * содержит информацию об ошибке, котораю отправится клиенту
 */
public class ErrorMessage extends Action {
    int code;
    String message;

    public ErrorMessage(GameError error) {
        code = error.getCode();
        message = error.getMessage();
    }

    @Override
    public String toString() {
        return "ErrorMessage{" +
                "code=" + code +
                ", message='" + message + '\'' +
                '}';
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

}
