package server;

public class GameState extends AbstractMessage {

    int myPosition[];
    int enemyPosition[];
    int cubeValue;
    int color;
    boolean turn;

    @Override
    public void getValues(GameLogic logic){
        color = logic.getValues();
    }
    @Override
    public AbstractMessage apply(GameLogic logic) {
        return null;
    }
}
