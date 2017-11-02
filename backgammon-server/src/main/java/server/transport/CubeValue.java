package server.transport;

import game.logics.GameError;
import game.logics.Player;

/**
 * Класс {@link CubeValue} имплементирует {@link AbstractMessage}, содержит информацию о
 * значениях кубиков для передачи клиентам
 */
public class CubeValue extends AbstractMessage {
    int cubeValues;

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public void setCubeValues(Player player) throws GameError {
        this.cubeValues = player.getGame().throwDice(player);
    }
}
