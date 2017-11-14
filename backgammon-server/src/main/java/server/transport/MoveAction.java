package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;

public class MoveAction extends Action {
    public int from;
    public int to;


    public MoveAction(int from, int to) { // For tests
        this.from = from;
        this.to = to;
    }

    @Override
    public AbstractMessage apply(Player player) {
        AbstractMessage message;
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
        return message;
    }
}
