package server.transport;

import game.logics.GameErrors;
import game.logics.Player;

public class ThrowCube extends AbstractMessage {


    @Override
    public AbstractMessage apply(Player player) {
        AbstractMessage cubeMessage = null;
        try {
            CubeValue cubeValue = new CubeValue();
            cubeValue.setCubeValues(player);
            cubeMessage = cubeValue;
        } catch (GameErrors gameErrors) {
            Error error = new Error();
            error.setError(gameErrors);
            cubeMessage = error;
        }

        return cubeMessage;
    }

}
