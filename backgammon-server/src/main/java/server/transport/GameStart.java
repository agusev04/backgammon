package server.transport;

/**
 * Класс {@link GameStart} имплементирует {@link AbstractMessage}, содержит информации о начале игры
 * клиенту, а также имя противника
 */
public class GameStart extends Response implements Change {
    String enemyUserName;

    public GameStart(String enemyUserName) {
        this.enemyUserName = enemyUserName;
    }

    public String getEnemyUserName() {
        return enemyUserName;
    }

    @Override
    public String toString() {
        return "GameStart{" +
                "enemyUserName='" + enemyUserName + '\'' +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
}
