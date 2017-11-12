package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;

public class TestThrowCube extends AbstractMessage {
    int cubeValue;

    public TestThrowCube(int cubeValue) {
        this.cubeValue = cubeValue;
    }

    @Override
    public AbstractMessage apply(Player player) {
        AbstractMessage message = null;
        try {
            GameMatch gameMatch = player.getGameMatch();
            CubeValue cubeValues = new CubeValue(gameMatch.throwDice(player, cubeValue));
            System.out.println("TestThrowCube: Player " + player.getName() +
                    " ask to calculate possible position for values " + cubeValue / 10 + " and " + cubeValue % 10);
            PossibleMoves moves = new PossibleMoves(gameMatch.getPossiblePositions(player.getColor(), cubeValues.getCubeValues()));
            message = new PackageMessage(null, new Changes(cubeValues));
            if (player == gameMatch.getBlackPlayer()) {
                gameMatch.getWhitePlayer().sendMessage(message);
            } else if (player == gameMatch.getWhitePlayer()) {
                gameMatch.getBlackPlayer().sendMessage(message);
            } else {
                System.out.println("ThrowCube: WTF!!!!");
            }
            message = new PackageMessage(null, new Changes(moves, cubeValues));
        } catch (GameError gameErrors) {
            message = new ErrorMessage(gameErrors);
        }
        return message;
    }
}
