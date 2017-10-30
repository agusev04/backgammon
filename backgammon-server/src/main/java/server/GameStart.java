package server;

import game.logics.Game;

public class GameStart extends AbstractMessage {
    String enemyUserName;
    @Override
    public AbstractMessage apply(MySession mySession) {
        return null;
    }

    @Override
    public void getValues(Game game) {
    }

    public void setEnemyUserName(String enemyUserName) {
        this.enemyUserName = enemyUserName;
    }
}
