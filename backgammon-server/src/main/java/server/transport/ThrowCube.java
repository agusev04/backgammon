package server.transport;

import game.logics.GameError;
import game.logics.Player;

/**
 * Класс {@link ThrowCube} имплементирует {@link AbstractMessage}, реализует запрос от клиента
 * на осуществление броска кубика
 */
public class ThrowCube extends AbstractMessage {

    @Override
    public AbstractMessage apply(Player player) {
        AbstractMessage cubeMessage = null;
        try {
            CubeValue cubeValue = new CubeValue();
            cubeValue.setCubeValues(player);
            cubeMessage = cubeValue;
        } catch (GameError gameErrors) {
            cubeMessage = new ErrorMessage(gameErrors);
        }

        return cubeMessage;
    }

}
