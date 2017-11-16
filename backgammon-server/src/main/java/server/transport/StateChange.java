package server.transport;

import game.logics.GameMatch;

/**
 * Класс {@link StateChange} имплементирует {@link AbstractMessage}. Данный класс
 * содержит информацию о состоянии, которое отправится клиенту
 */
public class StateChange extends Response implements Change {
    int activePlayerCode;
    String activePlayerName;

    public StateChange(GameMatch match) {
        // получение инфы по активному игроку
        activePlayerCode = match.getActivePlayerCondition();
        activePlayerName = match.getActivePlayer().getName();
    }

    @Override
    public String toString() {
        return "StateChange{" +
                "activePlayerCode=" + activePlayerCode +
                ", activePlayerName='" + activePlayerName + '\'' +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
}
