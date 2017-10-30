package server;

import game.logics.Game;

public class CubeValue extends AbstractMessage {
    int cubeValues;
    @Override
    public AbstractMessage apply(MySession mySession) {
        return null;
    }

    @Override
    public void getValues(Game game) {
        cubeValues = game.throwDice();
    }
}
