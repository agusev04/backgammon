package support;

import game.logics.Player;
import server.transport.AbstractMessage;
import server.transport.PossiblePositions;
import server.transport.ThrowCube;

public class TestThrowCube extends ThrowCube {
    TestCubeValue testCubeValue;

    public TestThrowCube(int cubeValues) {
        testCubeValue = new TestCubeValue(cubeValues);
    }

    @Override
    public AbstractMessage apply(Player player) {
        AbstractMessage message = null;
        return new PossiblePositions(player, testCubeValue.getCubeValues());
    }
}
