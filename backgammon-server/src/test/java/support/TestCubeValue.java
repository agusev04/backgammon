package support;

import game.logics.Player;
import server.transport.AbstractMessage;

public class TestCubeValue extends AbstractMessage {
    int cubeValues;

    public TestCubeValue(int cubeValues) {
        this.cubeValues = cubeValues;
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public int getCubeValues() {
        return cubeValues;
    }
}
