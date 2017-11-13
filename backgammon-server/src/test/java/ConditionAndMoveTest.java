import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;
import server.transport.ChipsPosition;
import server.transport.Move;
import server.transport.MoveAction;
import server.transport.PackageMessage;
import support.AbstractTest;

import java.util.ArrayList;

public class ConditionAndMoveTest extends AbstractTest {
    public void testConditionAndMove() throws Exception, GameError {

        PackageMessage packageMessage = enter("0", "Tom");
        Player whitePlayer = getPlayers().get(0);
        GameMatch gameMatch = whitePlayer.getGameMatch();
        System.out.println();
        System.out.println("Active player name: " + gameMatch.getActivePlayer());
        PackageMessage packageMessage1 = enter("1", "Sam");
        Player blackPlayer = getPlayers().get(1);
        System.out.println("Active player name (0 turn) " + gameMatch.getActivePlayer().getName() +
                " Condition code: "  + gameMatch.getActivePlayerCondition());
        System.out.println("Cube value for player" + gameMatch.getActivePlayer().getName() + " in first turn: "
                + gameMatch.throwDice(whitePlayer, 25));

        gameMatch.moveChip(whitePlayer, new MoveAction(1,10));
        gameMatch.moveChip(whitePlayer, new MoveAction(1,10));

        gameMatch.moveChip(whitePlayer, new MoveAction(17, 18));
        gameMatch.moveChip(whitePlayer, new MoveAction(17, 19));

        System.out.println("Active player name (0 turn) " + gameMatch.getActivePlayer().getName() +
                " Condition code: "  + gameMatch.getActivePlayerCondition());
        System.out.println("*****");
        gameMatch.changeTurn(); //передача хода
        System.out.println("Change turn");
        System.out.println("*****");
        System.out.println("Not active player condition " + gameMatch.getWhitePlayerCondition());
        System.out.println("Active player name (1 turn) " + gameMatch.getActivePlayer().getName() +
                " Condition code: "  + gameMatch.getActivePlayerCondition());
        System.out.println("Cube value for player " + gameMatch.getActivePlayer().getName() + "  in second turn:  " +
                 + gameMatch.throwDice(blackPlayer, 35)); //черный кидает кубики (при комментировании 34 строчки будет исключение, так как ход не передан)
        System.out.println("Active player name (1 turn) " + gameMatch.getActivePlayer().getName() +
                " Condition code: "  + gameMatch.getActivePlayerCondition());

        gameMatch.moveChip(blackPlayer, new MoveAction(24, 23));
        gameMatch.moveChip(blackPlayer, new MoveAction(24, 23));

        gameMatch.moveChip(blackPlayer, new MoveAction(8, 6));
        gameMatch.moveChip(blackPlayer, new MoveAction(8, 7));
        gameMatch.moveChip(blackPlayer, new MoveAction(8, 7));


        ArrayList<ChipsPosition> whitePositions1 = gameMatch.getTable().getGameState().getWhitePos();
        ArrayList<ChipsPosition> whitePositions2 = gameMatch.getTable().getGameState().getWhitePos();
        assertEquals(whitePositions1, whitePositions2);

        ArrayList<ChipsPosition> blackPositions1 = gameMatch.getTable().getGameState().getBlackPos();
        ArrayList<ChipsPosition> blackPositions2 = gameMatch.getTable().getGameState().getBlackPos();
        assertEquals(blackPositions1, blackPositions2);

        System.out.println();
        System.out.println("********************");
        System.out.println("WhitePos in start: " + packageMessage.getGameState().getWhitePositions());
        System.out.println("********************");
        System.out.println("BlackPos in start: " + packageMessage1.getGameState().getBlackPositions());
        System.out.println("********************");
        System.out.println("********************");
        System.out.println("WhitePos: " + gameMatch.getTable().getGameState().getWhitePos());
        System.out.println("********************");
        System.out.println("BlackPos: " + gameMatch.getTable().getGameState().getBlackPos());
        System.out.println("********************");

    }
}
