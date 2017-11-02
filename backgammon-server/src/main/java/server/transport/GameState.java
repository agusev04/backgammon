package server.transport;

import game.logics.ChipsPositions;
import game.logics.Game;
import game.logics.Player;

import java.util.ArrayList;

/**
 * Класс {@link GameState} имплементирует {@link AbstractMessage}, содержит в себе
 * состояния стола, необходимое для клиента
 */
public class GameState extends AbstractMessage {

    ArrayList<Integer> whitePositions;
    ArrayList<Integer> blackPositions;
    int cubeValue;
    char color;
    String tableName;
    String turn;
    //TODO (Michael) Оформить как транспортный объект.

    public GameState(Game game, String turn, String tableName, char color) {
        ChipsPositions positions = game.getTable().getGameState();
        whitePositions = positions.getWhitePos();
        blackPositions = positions.getBlackPos();
        cubeValue = 0;
        this.turn = turn;
        this.tableName = tableName;
        this.color = color;
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public void setTurn(String turn) {
        this.turn = turn;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public void setColor(char color) {
        this.color = color;
    }

    public char getColor() {
        return color;
    }
}

