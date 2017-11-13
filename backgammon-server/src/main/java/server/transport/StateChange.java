package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;

/**
 * Класс {@link StateChange} имплементирует {@link AbstractMessage}. Данный класс
 * содержит информацию о состоянии, которое отправится клиенту
 */
public class StateChange implements Change {
    int code;
    String activePlayerName;

    public StateChange(GameMatch match){
        code = match.getActivePlayerCondition();
        activePlayerName = match.getActivePlayer().getName();
    }
}
