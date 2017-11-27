import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;
import server.transport.MoveAction;
import server.transport.PackageMessage;
import support.AbstractTest;

public class PlayerCantMove extends AbstractTest {
    public void testPlayerCantMove() throws Exception, GameError {

        /* тест проверяющий, что игрок НЕ МОЖЕТ сходить и пропускает ход */
        PackageMessage packageMessage = enter("0", "Tom");
        Player whitePlayer = getPlayers().get(0);
        GameMatch gameMatch = whitePlayer.getGameMatch();
        PackageMessage packageMessage1 = enter("1", "Sam");
        Player blackPlayer = getPlayers().get(1);

        System.out.println();
        System.out.println("Active player name: " + gameMatch.getActivePlayer().getName() +
                ". Condition code: " + gameMatch.getActivePlayerCondition());

        System.out.println("Cube value for player " + gameMatch.getActivePlayer().getName() + " is: "
                + gameMatch.throwDice(whitePlayer, 25));
        System.out.println("*****");
        System.out.println("Active player name " + gameMatch.getActivePlayer().getName() + ". Count move: " + gameMatch.getCountMove());
        System.out.println("*****");

        gameMatch.moveChip(whitePlayer, new MoveAction(1, 10, false, 9));

        System.out.println("Active player name " + gameMatch.getActivePlayer().getName() + ". Count move: " + gameMatch.getCountMove());

//        gameMatch.moveChip(whitePlayer, new MoveAction(1, 10, true), false);

        System.out.println("Active player name " + gameMatch.getActivePlayer().getName() + ". Count move: " + gameMatch.getCountMove());

        System.out.println("*****");
        System.out.println("Active player name " + gameMatch.getActivePlayer().getName() + ". Count move: " + gameMatch.getCountMove());
        System.out.println("Waiting player name " + gameMatch.getWaitingPlayer().getName() + ". Waiting player condition " + gameMatch.getWhitePlayerCondition());
    }
}