package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;

public class TestThrowCube extends Action {
    int cubeValue;

    public TestThrowCube(int cubeValue) {
        this.cubeValue = cubeValue;
    }

    @Override
    public String toString() {
        return "TestThrowCube{" +
                "cubeValue=" + cubeValue +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }

    @Override
    public AbstractMessage apply(Player player) {
        AbstractMessage message;
        try {
            GameMatch gameMatch = player.getGameMatch();
            CubeValue cubeValues = new CubeValue(gameMatch.throwDice(player, cubeValue));
            System.out.println("TestThrowCube: Player " + player.getName() +
                    " ask to calculate possible position for values " + cubeValue / 10 + " and " + cubeValue % 10);
            // PossibleMoves moves = new PossibleMoves(gameMatch.getPossiblePositions(player.getColor(), cubeValues.getCubeValues()));

            PackageMessage packageMessage = new PackageMessage();
            packageMessage.addChange(cubeValues);
            packageMessage.addChange(new StateChange(gameMatch));
            message = packageMessage;
            if (player == gameMatch.getBlackPlayer()) {
                gameMatch.getWhitePlayer().sendMessage(message);
            } else if (player == gameMatch.getWhitePlayer()) {
                gameMatch.getBlackPlayer().sendMessage(message);
            } else {
                System.out.println("TestThrowCube: WTF!!!!");
            }
            //    packageMessage.addChange(moves);
            message = packageMessage;
        } catch (GameError gameErrors) {
            message = new ErrorMessage(gameErrors);
        }
        System.out.println("TestThrowCube: SERVER SENT TO "+ player.getName()+ ": " + message);
        return message;
    }
}
