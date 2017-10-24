package server;


import game.logics.Game;

public class GameState extends AbstractMessage {

    Integer whitePositions[];
    Integer blackPositions[];
    int cubeValue;
    char color;
    String turn;

    @Override
    public void getValues(Game game){
        whitePositions = game.getTable().getGameState().getWhitePos().toArray(whitePositions);
        blackPositions = game.getTable().getGameState().getBlackPos().toArray(blackPositions);
        cubeValue = game.getDiceValue();
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
}

