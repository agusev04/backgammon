package server.transport;

import game.logics.Player;

import java.util.ArrayList;

public class PossiblePositions extends AbstractMessage {
    ArrayList<Integer> possiblePositions = new ArrayList<>();
    int positionQuantity;
    public PossiblePositions(Player player, int cubeValues) {
        possiblePositions = player.getGame().getPossiblePositions(player.getColor(), cubeValues);
        positionQuantity = possiblePositions.size();
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }

    public ArrayList<Integer> getPossiblePositions() {
        return possiblePositions;
    }

    public int getPositionQuantity() {
        return positionQuantity;
    }
}
