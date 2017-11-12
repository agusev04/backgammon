package server.transport;

import game.logics.Player;

import java.util.ArrayList;

public class PossibleMoves extends AbstractMessage {
    ArrayList<Move> possiblePositions = new ArrayList<>();
    int positionQuantity;

    public PossibleMoves(ArrayList<Move> arrayList) {
        possiblePositions = arrayList;
        positionQuantity = possiblePositions.size();
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public ArrayList<Move> getPossibleMoves() {
        return possiblePositions;
    }

    public int getPositionQuantity() {
        return positionQuantity;
    }
}
