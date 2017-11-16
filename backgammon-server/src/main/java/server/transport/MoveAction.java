package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;

public class MoveAction extends Action {
    public int from;
    public int to;
    public boolean cantMove;


    public MoveAction(int from, int to, boolean cantMove) { // For tests
        this.from = from;
        this.to = to;
        this.cantMove = cantMove;
    }

    @Override
    public String toString() {
        return "MoveAction{" +
                "from=" + from +
                ", to=" + to +
                ", cantMove=" + cantMove +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }

    public MoveAction(boolean cantMove) { // For tests
        this.cantMove = cantMove;
    }

    @Override
    public AbstractMessage apply(Player player) {
        AbstractMessage message;
        System.out.println(player.getName() + " move chip from " + from + " to " + to);
        Change change;
            try {
                GameMatch gameMatch = player.getGameMatch();
                if (cantMove) {
                    change = gameMatch.moveChip(player, this, cantMove);
                } else change = gameMatch.moveChip(player, this, !cantMove); // либо ничего, либо финал, либо смена хода

                PackageMessage packageMessage = new PackageMessage();
                packageMessage.addChange(change);

                PackageMessage packageMessageForOpponent = new PackageMessage();
                packageMessageForOpponent.addChange(change);
                Move move = new Move(from, to);
                packageMessageForOpponent.addChange(move);

                Player otherPlayer = gameMatch.getOtherPlayer(player);

                otherPlayer.sendMessage(packageMessageForOpponent);
                message = packageMessage;
                System.out.println("SERVER SENT: " + message);
                otherPlayer.sendMessage(packageMessageForOpponent);
                message = packageMessage;
            } catch (GameError gameError) {
                message = new ErrorMessage(gameError);
            }
        return message;
    }
}
