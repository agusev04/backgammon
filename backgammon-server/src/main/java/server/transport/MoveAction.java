package server.transport;

import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;
import org.apache.log4j.Logger;

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
                ", cubeValue=" + cubeValue +
                '}';
    }

    @Override
    public AbstractMessage apply(Player player) {
        final Logger logger = Logger.getLogger(this.getClass());

        AbstractMessage message;
        logger.info(player.getName() + " move chip from " + from + " cubeValue " + cubeValue);
        Change change;
        try {
            GameMatch gameMatch = player.getGameMatch();
            PackageMessage packageMessage = new PackageMessage();
            PackageMessage packageMessageForOpponent = new PackageMessage();

            change = gameMatch.moveChip(player, this);

            packageMessage.addChange(change);
            packageMessageForOpponent.addChange(change);

            ArrayList<Move> possiblePositions = gameMatch.getPossiblePositions(player.getColor(), cubeValue);
            PossibleMoves possibleMoves = PossibleMoves.generatePossibleMoves(possiblePositions);
            packageMessage.addChange(possibleMoves);

            int to = gameMatch.formTo(player.getColor(), cubeValue, from);
            Move move = new Move(from, to);
            packageMessageForOpponent.addChange(move);
            packageMessage.addChange(move);

            change = gameMatch.changeTurn();
            packageMessage.addChange(change);
            packageMessageForOpponent.addChange(change);

            Player otherPlayer = gameMatch.getOtherPlayer(player);
            otherPlayer.sendMessage(packageMessageForOpponent);
            message = packageMessage;
        } catch (GameError gameError) {
            logger.error(gameError);
            message = new ErrorMessage(gameError);
        }
        logger.info("SERVER SENT TO " + player.getName() + ": " + message);
        return message;
    }
}
