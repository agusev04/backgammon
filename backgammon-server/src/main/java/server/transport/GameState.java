package server.transport;


import game.logics.ChipsPositions;
import game.logics.Game;
import game.logics.Player;

import java.util.ArrayList;

public class GameState extends AbstractMessage {

    ArrayList<Integer> whitePositions;
    ArrayList<Integer> blackPositions;
    int cubeValue;
    char color;


    String tableName;
    String turn;

    //TODO (Michael) Оформить как транспортный объект.


    public void setValues(Game game) {
        ChipsPositions positions = game.getTable().getGameState();
        whitePositions = positions.getWhitePos();
        blackPositions = positions.getBlackPos();
        cubeValue = 0;
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

    public char getColor() {
        return color;
    }

    public void setColor(char color) {
        this.color = color;
    }
}

