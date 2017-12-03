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
        System.out.println("ThrowCube: " + player.getName() + " is throwing dices");
        AbstractMessage message;
        try {
            GameMatch gameMatch = player.getGameMatch();
            CubeValue cubeValues = new CubeValue(gameMatch.throwDice(player, null));
            int cube1 = cubeValues.getCubeValues() / 10;
            int cube2 = cubeValues.getCubeValues() % 10;
            PossibleMoves moves = new PossibleMoves(gameMatch.getPossiblePositions(player.getColor(), cube1, cube2));
            PackageMessage packageMessage = new PackageMessage();
            packageMessage.addChange(cubeValues);
            packageMessage.addChange(gameMatch.changeTurn());
            message = packageMessage;
            if (player == gameMatch.getBlackPlayer()) {
                gameMatch.getWhitePlayer().sendMessage(message);
            } else if (player == gameMatch.getWhitePlayer()) {
                gameMatch.getBlackPlayer().sendMessage(message);
            } else {
                System.out.println("ThrowCube: пользователь не найден");
            }
            packageMessage.addChange(moves);
            message = packageMessage;
        } catch (GameError gameErrors) {
            message = new ErrorMessage(gameErrors);
        }
        System.out.println("ThrowCube: SERVER SENT TO " + player.getName() + ": " + message);
        return message;
    }

    @Override
    public String toString() {
        return "ThrowCube{" +
                "CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
}
