package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;

public class MoveAction extends Action {
    public int from;
    public int to;
    public boolean cantMove;


    public MoveAction(int from, int to) { // For tests
        this.from = from;
        this.to = to;
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
        try {
            GameMatch gameMatch = player.getGameMatch();
            Change change = gameMatch.moveChip(player, this); // либо ничего, либо финал, либо смена хода

            PackageMessage packageMessage = new PackageMessage();
            packageMessage.addChange(change);

            PackageMessage packageMessageForOpponent = new PackageMessage();
            packageMessageForOpponent.addChange(change);
            Move move = new Move(from, to);
            packageMessageForOpponent.addChange(move);

            Player otherPlayer = gameMatch.getOtherPlayer(player);

            otherPlayer.sendMessage(packageMessageForOpponent);
            message = packageMessage;
        } catch (GameError gameError) {
            message = new ErrorMessage(gameError);
        }
        System.out.println("SERVER SENT: " + message);
        return message;
    }
}
