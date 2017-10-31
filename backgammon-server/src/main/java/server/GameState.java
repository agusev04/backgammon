package server;


import game.logics.ChipsPositions;
import game.logics.Game;

import java.util.ArrayList;

public class GameState extends AbstractMessage {

    ArrayList<Integer> whitePositions;
    ArrayList<Integer> blackPositions;
    int cubeValue;
    char color;



    String tableName;
    String turn;

    //TODO (Michael) Оформить как транспортный объект.

    @Override
    public void getValues(Game game){
        ChipsPositions positions = game.getTable().getGameState();
        whitePositions = positions.getWhitePos();
        blackPositions = positions.getBlackPos();
        cubeValue = 0;

    }
    @Override
    public AbstractMessage apply(MySession mySession) {
        return null;
    }

    public void setColor(char color){
        this.color = color;
    }

    public void setTurn(String turn){
        this.turn = turn;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public char getColor() {
        return color;
    }
}

