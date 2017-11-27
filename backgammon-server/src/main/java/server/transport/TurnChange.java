package server.transport;

import game.logics.GameMatch;

/**
 * Класс {@link TurnChange} имплементирует {@link AbstractMessage}. Данный класс
 * содержит сообщение о том, что у игрока нету возможных перемещений фишек и он пропускает ход,
 * которое отправится клиенту
 */
public class TurnChange extends Response implements Change {

    String activePlayerName;
    String message;
    StateChange stateChange;


    public TurnChange(GameMatch gameMatch, StateChange stateChange) {
//        this.activePlayerName = gameMatch.getActivePlayer().getName();
        this.message = gameMatch.getActivePlayer().getName() + " , can not move chips!!!!!! Change turn!!!!!" ;
        this.stateChange = stateChange;
    }

    @Override
    public String toString() {
        return "TurnChange{" +
                "Active Player: " + activePlayerName +
                ", can not move chips!!!!!! Change turn!!!!!"  +
                ", CLASS_NAME: " + CLASS_NAME +
                '}';
    }
}
