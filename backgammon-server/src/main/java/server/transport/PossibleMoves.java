package server.transport;

import java.util.ArrayList;

public class PossibleMoves extends Response implements Change {
    ArrayList<Move> possiblePositions = new ArrayList<>();
    int positionQuantity;

    public PossibleMoves(ArrayList<Move> arrayList) {
        possiblePositions = arrayList;
        positionQuantity = possiblePositions.size();
    }

    public ArrayList<Move> getPossibleMoves() {
        return possiblePositions;
    }

    public int getPositionQuantity() {
        return positionQuantity;
    }

    @Override
    public String toString() {
        return "PossibleMoves{" +
                "possiblePositions=" + possiblePositions +
                ", positionQuantity=" + positionQuantity +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
}
