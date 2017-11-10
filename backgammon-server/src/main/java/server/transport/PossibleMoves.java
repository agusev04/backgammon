package server.transport;

import game.logics.Player;

import java.util.ArrayList;

public class PossibleMoves extends AbstractMessage {
    ArrayList<Move> possiblePositions = new ArrayList<>();
    int positionQuantity;

    public PossibleMoves(Player player, int cubeValues) {
        possiblePositions = player.getGameMatch().getPossiblePositions(player.getColor(), cubeValues);
        positionQuantity = possiblePositions.size();
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public ArrayList<Move> getPossiblePositions() {
        return possiblePositions;
    }

    public int getPositionQuantity() {
        return positionQuantity;
    }
}
