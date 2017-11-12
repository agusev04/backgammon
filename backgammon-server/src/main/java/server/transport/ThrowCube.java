package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
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
            GameMatch gameMatch = player.getGameMatch();
            CubeValue cubeValues = new CubeValue(gameMatch.throwDice(player, null));
            PossibleMoves moves = new PossibleMoves(gameMatch.getPossiblePositions(player.getColor(), cubeValues.getCubeValues()));
            message = new PackageMessage(null, new Changes(cubeValues));
            if (player == gameMatch.getBlackPlayer()) {
                gameMatch.getWhitePlayer().sendMessage(message);
            } else if (player == gameMatch.getWhitePlayer()) {
                gameMatch.getBlackPlayer().sendMessage(message);
            } else {
                System.out.println("ThrowCube: пользователь не найден");
            }
            message = new PackageMessage(null, new Changes(moves, cubeValues));
        } catch (GameError gameErrors) {
            message = new ErrorMessage(gameErrors);
        }
        return message;
    }

}
