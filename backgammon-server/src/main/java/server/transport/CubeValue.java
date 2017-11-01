package server.transport;

import game.logics.Game;
import game.logics.GameErrors;
import game.logics.Player;

public class CubeValue extends AbstractMessage {
    int cubeValues;
    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public void setCubeValues(Player player) throws GameErrors {
        this.cubeValues = player.getGame().throwDice(player);
    }
}
