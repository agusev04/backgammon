package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;

/**
 * Класс {@link StateChange} имплементирует {@link AbstractMessage}. Данный класс
 * содержит информацию о состоянии, которое отправится клиенту
 */
public class StateChange extends AbstractMessage {
    int code;
    Player player;


    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public StateChange(GameMatch match){
        code = match.getActivePlayerCondition();
        player = match.getActivePlayer();
    }
}
