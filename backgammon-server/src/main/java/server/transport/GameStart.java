package server.transport;

import game.logics.Player;

public class GameStart extends AbstractMessage {
    String enemyUserName;

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }


    public void setEnemyUserName(String enemyUserName) {
        this.enemyUserName = enemyUserName;
    }
}
