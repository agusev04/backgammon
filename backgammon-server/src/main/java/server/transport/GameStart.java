package server.transport;

import game.logics.Game;
import game.logics.Player;
import server.transport.AbstractMessage;

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
