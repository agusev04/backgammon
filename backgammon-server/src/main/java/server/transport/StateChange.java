package server.transport;

import game.logics.GameMatch;

/**
 * Класс {@link StateChange} имплементирует {@link AbstractMessage}. Данный класс
 * содержит информацию о состоянии, которое отправится клиенту
 */
public class StateChange extends Response implements Change {
    int activePlayerCode;
    char  activePlayerColor;
    String activePlayerName;
    private boolean turnSkipped;

    public StateChange(GameMatch gameMatch) {
        // получение инфы по активному игроку
        activePlayerCode = gameMatch.getActivePlayerCondition();
        activePlayerColor = gameMatch.getActivePlayer().getColor();
        activePlayerName = gameMatch.getActivePlayer().getName();
        if (gameMatch.isTurnSkipped()) {
            turnSkipped = true;
        }
    }

    public boolean isTurnSkipped() {
        return turnSkipped;
    }

    @Override
    public String toString() {
        return "StateChange{" +
                "activePlayerName: " + activePlayerName +
                ", activePlayerCode: " + activePlayerCode +
                ", turnSkipped: " + turnSkipped +
                '}';
    }
}
