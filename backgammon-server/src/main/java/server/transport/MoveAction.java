package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;

import java.util.ArrayList;

public class MoveAction extends Action {
    public int from;
    public int cubeValue;

    public MoveAction(int from, int cubeValue) { // For tests
        this.from = from;
        this.cubeValue = cubeValue;
    }


    @Override
    public String toString() {
        return "MoveAction{" +
                "from=" + from +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }
    @Override
    public AbstractMessage apply(Player player) {
        AbstractMessage message;
        System.out.println("MoveAction: " + player.getName() + " move chip from " + from + " cubeValue " + cubeValue);
        Change change;
        try {
            GameMatch gameMatch = player.getGameMatch();
            change = gameMatch.moveChip(player, this);
            PackageMessage packageMessage = new PackageMessage();
            packageMessage.addChange(change);

            ArrayList<Move> possiblePositions = gameMatch.getPossiblePositions(player.getColor(), cubeValue);
            PossibleMoves possibleMoves = PossibleMoves.generatePossibleMoves(possiblePositions);
            packageMessage.addChange(possibleMoves);
            PackageMessage packageMessageForOpponent = new PackageMessage();
            packageMessageForOpponent.addChange(change);
            int to = gameMatch.formTo(player.getColor(), cubeValue, from);
            Move move = new Move(from, to);
            packageMessageForOpponent.addChange(move);

            change = gameMatch.countersChange(player, to);

            packageMessage.addChange(change);
            packageMessageForOpponent.addChange(change);

            Player otherPlayer = gameMatch.getOtherPlayer(player);

            otherPlayer.sendMessage(packageMessageForOpponent);
            message = packageMessage;
        } catch (GameError gameError) {
            message = new ErrorMessage(gameError);
        }
        System.out.println("MoveAction: SERVER SENT TO " + player.getName() + ": " + message);
        return message;
    }
}
