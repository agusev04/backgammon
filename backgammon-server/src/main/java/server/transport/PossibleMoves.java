package server.transport;

import java.util.ArrayList;

public class PossibleMoves extends Response implements Change {
    ArrayList<Move> moves = new ArrayList<>();
    int movesQuantity;

    public PossibleMoves(ArrayList<Move> arrayList) {
        moves = arrayList;
        movesQuantity = moves.size();
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
