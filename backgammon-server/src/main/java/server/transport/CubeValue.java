package server.transport;

import game.logics.GameError;
import game.logics.Player;

/**
 * Класс {@link CubeValue} имплементирует {@link AbstractMessage}, содержит информацию о
 * значениях кубиков для передачи клиентам
 */
public class CubeValue extends AbstractMessage {
    protected int cubeValues;

    public CubeValue(Player player) throws GameError {
        this.cubeValues = player.getGame().throwDice(player);
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public int getCubeValues() {
        return cubeValues;
    }
}
