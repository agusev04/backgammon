package server.transport;

import game.logics.Player;

public class TestThrowCube extends AbstractMessage {
    int cubeValue;

    public TestThrowCube(int cubeValue) {
        this.cubeValue = cubeValue;
    }

    @Override
    public AbstractMessage apply(Player player) {
        AbstractMessage message = null;
        CubeValue cubeValues = new CubeValue(cubeValue);
        message = cubeValues;
        System.out.println("TestThrowCube: Player " + player.getName() +
                "ask to calculate possible position for values" + cubeValue / 10 + " and " + cubeValue % 10);
        player.getGame().sendObject(message);
        message = new PossiblePositions(player, cubeValues.getCubeValues());

        return message;
    }
}
