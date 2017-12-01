package server.transport;

import java.util.ArrayList;

public class PossibleMoves extends Response implements Change {
    ArrayList<Move> moves;
    int movesQuantity;

    public PossibleMoves(ArrayList<Move> arrayList) {
        moves = arrayList;
        movesQuantity = moves.size();
    }


    public static PossibleMoves generatePossibleMoves(ArrayList<Move> arrayList) {
        PossibleMoves possibleMoves = null;
        if ((arrayList != null) && (arrayList.size() != 0)) {
            possibleMoves = new PossibleMoves(arrayList);
        }

        return possibleMoves;
    }

    public ArrayList<Move> getPossibleMoves() {
        return moves;
    }

    public int getMovesQuantity() {
        return movesQuantity;
    }

    @Override
    public String toString() {
        return "PossibleMoves{" +
                "moves=" + moves +
                ", movesQuantity=" + movesQuantity +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
}
