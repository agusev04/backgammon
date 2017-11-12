package server.transport;

import game.logics.Player;

/**
 * Класс {@link GameStart} имплементирует {@link AbstractMessage}, содержит информации о начале игры
 * клиенту, а также имя противника
 */
public class GameStart extends AbstractMessage {
    String enemyUserName;

    public GameStart(String enemyUserName) {
        this.enemyUserName = enemyUserName;
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public String getEnemyUserName() {
        return enemyUserName;
    }
}
