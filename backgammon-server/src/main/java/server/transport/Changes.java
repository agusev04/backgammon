package server.transport;

import game.logics.Player;

public class Changes extends AbstractMessage implements Cloneable {
    GameStart gameStart;
    PossibleMoves possibleMoves;
    Move move; // для отправки подтвержденного хода пользователям
    CubeValue cubeValue;

    public Changes(GameStart gameStart) {
        this.gameStart = gameStart;
    }

    public Changes(PossibleMoves possibleMoves, CubeValue cubeValue) {
        this.possibleMoves = possibleMoves;
        this.cubeValue = cubeValue;
    }

    public Changes(CubeValue cubeValue) {
        this.cubeValue = cubeValue;
    }

    public Changes(GameStart gameStart, PossibleMoves possibleMoves, Move move, CubeValue cubeValue) {
        this.gameStart = gameStart;
        this.possibleMoves = possibleMoves;
        this.move = move;
        this.cubeValue = cubeValue;
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public GameStart getGameStart() {
        return gameStart;
    }

    public void setGameStart(GameStart gameStart) {
        this.gameStart = gameStart;
    }

    public PossibleMoves getPossibleMoves() {
        return possibleMoves;
    }

    public Move getMove() {
        return move;
    }

    public CubeValue getCubeValue() {
        return cubeValue;
    }
}
