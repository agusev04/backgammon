package server.transport;

import game.logics.ChipsPositions;
import game.logics.GameMatch;
import game.logics.Player;

import java.util.ArrayList;

/**
 * Класс {@link GameState} имплементирует {@link AbstractMessage}, содержит в себе
 * состояния стола, необходимое для клиента
 */
public class GameState extends AbstractMessage {

    ArrayList<ChipsPosition> whitePositions;
    ArrayList<ChipsPosition> blackPositions;
    int cubeValue;
    char color;
    String tableName;
    String turn;
    //TODO (Michael) Оформить как транспортный объект.

    public GameState(GameMatch gameMatch, String turn, String tableName, char color) {
        ChipsPositions positions = gameMatch.getTable().getGameState();
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

    public char getColor() {
        return color;
    }

    public void setColor(char color) {
        this.color = color;
    }

    public ArrayList<ChipsPosition> getWhitePositions() {
        return whitePositions;
    }

    public ArrayList<ChipsPosition> getBlackPositions() {
        return blackPositions;
    }

    public int getCubeValue() {
        return cubeValue;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getTurn() {
        return turn;
    }

    public void setTurn(String turn) {
        this.turn = turn;
    }

//    public


}

