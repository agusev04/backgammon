package server.transport;

import game.logics.GameError;
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
            CubeValue cubeValues = new CubeValue(player.getGameMatch().throwDice(player, cubeValue));
            message = cubeValues;
            System.out.println("TestThrowCube: Player " + player.getName() +
                    " ask to calculate possible position for values " + cubeValue / 10 + " and " + cubeValue % 10);
            player.getGameMatch().sendObject(message);
            message = new PossibleMoves(player, cubeValues.getCubeValues());
        } catch (GameError gameError) {
            message = new ErrorMessage(gameError);
        }

        return message;
    }
}
