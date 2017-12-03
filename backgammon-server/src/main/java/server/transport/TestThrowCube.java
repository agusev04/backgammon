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
            int cube1 = cubeValues.getCubeValues() / 10;
            int cube2 = cubeValues.getCubeValues() % 10;
            PossibleMoves moves = new PossibleMoves(gameMatch.getPossiblePositions(player.getColor(), cube1, cube2));

            PackageMessage packageMessage = new PackageMessage();
            packageMessage.addChange(cubeValues);
            packageMessage.addChange(gameMatch.changeTurn());


            message = packageMessage;

            Player otherPlayer = gameMatch.getOtherPlayer(player);
            otherPlayer.sendMessage(message);

            packageMessage.addChange(moves);
            message = packageMessage;
        } catch (GameError gameErrors) {
            message = new ErrorMessage(gameErrors);
        }
        System.out.println("TestThrowCube: SERVER SENT TO " + player.getName() + ": " + message);
        return message;
    }
}
