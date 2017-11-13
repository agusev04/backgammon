package server.transport;

/**
 * Класс {@link GameStart} имплементирует {@link AbstractMessage}, содержит информации о начале игры
 * клиенту, а также имя противника
 */
public class GameStart implements Change {
    String enemyUserName;

    public GameStart(String enemyUserName) {
        this.enemyUserName = enemyUserName;
    }


    public String getEnemyUserName() {
        return enemyUserName;
    }
}
