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
            CubeValue cubeValues = new CubeValue(player.getGameMatch().throwDice(player, null));
            message = cubeValues;
            player.getGameMatch().sendObject(cubeValues);
            message = new PossibleMoves(player, cubeValues.getCubeValues());

        } catch (GameError gameErrors) {
            message = new ErrorMessage(gameErrors);
        }


        return message;
    }

}
