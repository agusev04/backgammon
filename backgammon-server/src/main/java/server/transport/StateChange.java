package server.transport;

import game.logics.GameMatch;

/**
 * Класс {@link StateChange} имплементирует {@link AbstractMessage}. Данный класс
 * содержит информацию о состоянии, которое отправится клиенту
 */
public class StateChange extends Response implements Change {
    int activePlayerCode;
    String activePlayerName;
    char  activePlayerColor;

    public StateChange(GameMatch gameMatch) {
        // получение инфы по активному игроку
        activePlayerCode = gameMatch.getActivePlayerCondition();
        activePlayerName = gameMatch.getActivePlayer().getName();
        activePlayerColor = gameMatch.getActivePlayer().getColor();
    }

    @Override
    public String toString() {
        return "StateChange{" +
                "activePlayerName: " + activePlayerName +
                ", activePlayerCode: " + activePlayerCode +
                ", CLASS_NAME: " + CLASS_NAME +
                '}';
    }
}
