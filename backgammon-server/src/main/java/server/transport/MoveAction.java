package server.transport;

import game.logics.GameError;
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
            message = new PackageMessage();
            PackageMessage packageMessage = new PackageMessage();
            packageMessage.addChange(player.getGameMatch().moveChip(player, this));
            message = packageMessage;
        } catch (GameError gameError) {
            message = new ErrorMessage(gameError);
        }
        return message;
    }
}
