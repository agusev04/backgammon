package server.transport;

import game.logics.GameMatch;

/**
 * Класс {@link StateChange} имплементирует {@link AbstractMessage}. Данный класс
 * содержит информацию о состоянии, которое отправится клиенту
 */
public class StateChange extends Response implements Change {
    int activePlayerCode;
    String activePlayerName;

    public StateChange(GameMatch gameMatch) {
        // получение инфы по активному игроку
        activePlayerCode = gameMatch.getActivePlayerCondition();
        activePlayerName = gameMatch.getActivePlayer().getName();
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
