package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;

/**
 * Класс {@link ThrowCube} имплементирует {@link AbstractMessage}, реализует запрос от клиента
 * на осуществление броска кубика
 */
public class ThrowCube extends Action {


    @Override
    public AbstractMessage apply(Player player) {
        System.out.println(player.getName() + " is throwing dices");
        AbstractMessage message;
        try {
            GameMatch gameMatch = player.getGameMatch();
            CubeValue cubeValues = new CubeValue(gameMatch.throwDice(player, null));
            //    PossibleMoves moves = new PossibleMoves(gameMatch.getPossiblePositions(player.getColor(), cubeValues.getCubeValues()));
            PackageMessage packageMessage = new PackageMessage();
            packageMessage.addChange(cubeValues);
            packageMessage.addChange(new StateChange(gameMatch));
            message = packageMessage;
            if (player == gameMatch.getBlackPlayer()) {
                gameMatch.getWhitePlayer().sendMessage(message);
            } else if (player == gameMatch.getWhitePlayer()) {
                gameMatch.getBlackPlayer().sendMessage(message);
            } else {
                System.out.println("ThrowCube: пользователь не найден");
            }
            //     packageMessage.addChange(moves);
            message = packageMessage;
        } catch (GameError gameErrors) {
            message = new ErrorMessage(gameErrors);
        }
        System.out.println("SERVER SENT: " + message);
        return message;
    }

    @Override
    public String toString() {
        return "ThrowCube{" +
                "CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
}
