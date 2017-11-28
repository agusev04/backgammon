package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;

public class MoveAction extends Action {
    public int from;
    public int cubeValue;
    private boolean cantMove;

    public MoveAction(int from, boolean cantMove, int cubeValue) { // For tests
        this.from = from;
        this.cantMove = cantMove;
        this.cubeValue = cubeValue;
    }

    public MoveAction(boolean cantMove) { // For tests
        this.cantMove = cantMove;
    }

    @Override
    public String toString() {
        return "MoveAction{" +
                "from=" + from +
                ", cantMove=" + cantMove +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }

    public boolean isCantMove() {
        return cantMove;
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
            packageMessage.addChange(new PossibleMoves(gameMatch.getPossiblePositions(player.getColor(), cubeValue)));
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
