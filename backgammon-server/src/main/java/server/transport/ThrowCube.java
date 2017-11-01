package server.transport;

import game.logics.Game;
import game.logics.GameErrors;
import game.logics.Player;
import server.transport.AbstractMessage;
import server.transport.CubeValue;

import javax.websocket.EncodeException;
import java.io.IOException;

import static game.logics.GameErrors.UNABLE_THROW_DICES;

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
