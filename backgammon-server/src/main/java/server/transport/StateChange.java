package server.transport;

import game.logics.GameMatch;

/**
 * Класс {@link StateChange} имплементирует {@link AbstractMessage}. Данный класс
 * содержит информацию о состоянии, которое отправится клиенту
 */
public class StateChange implements Change {
    int activePlayerCode;
    String activePlayerName;

    public StateChange(GameMatch match){
        // получение инфы по активному игроку
        activePlayerCode = match.getActivePlayerCondition();
        activePlayerName = match.getActivePlayer().getName();
    }
}
