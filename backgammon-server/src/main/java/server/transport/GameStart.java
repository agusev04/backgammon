package server.transport;

import game.logics.Player;

/**
 * Класс {@link GameStart} имплементирует {@link AbstractMessage}, содержит информации о начале игры
 * клиенту, а также имя противника
 */
public class GameStart extends AbstractMessage {
    String enemyUserName;

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public GameStart(String enemyUserName) {
        this.enemyUserName = enemyUserName;
    }

    public String getEnemyUserName() {
        return enemyUserName;
    }
}
