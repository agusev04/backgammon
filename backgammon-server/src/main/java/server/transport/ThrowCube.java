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
        AbstractMessage message = null;
        try {
            CubeValue cubeValues = new CubeValue(player);
            message = cubeValues;
            player.getGameMatch().sendObject(message);
            message = new PossiblePositions(player, cubeValues.getCubeValues());

        } catch (GameError gameErrors) {
            message = new ErrorMessage(gameErrors);
        }


        return message;
    }

}
