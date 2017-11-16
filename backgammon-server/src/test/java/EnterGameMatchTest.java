import game.logics.GameError;
import game.logics.GameMatch;
import game.logics.Player;
import server.transport.ChipsPosition;
import server.transport.GameState;
import server.transport.MoveAction;
import server.transport.PackageMessage;
import support.AbstractTest;

import java.util.ArrayList;

public class EnterGameMatchTest extends AbstractTest {

    public void testEnter() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        PackageMessage gameState = enter("0", "11");

        assertEquals(1, getPlayers().size());
        assertNotNull(getPlayers().get(0));
        assertEquals('w', gameState.getGameState().getColor());

        /*second player enters*/
        PackageMessage gameState2 = enter("1", "user 2");
        assertEquals(2, getPlayers().size());
        assertNotNull(getPlayers().get(1));
        assertEquals('b', gameState2.getGameState().getColor());
    }

    public void testStartPositions() throws Exception {
        /*first player enters*/
        PackageMessage packageMessage1 = enter("0", "11");
        ArrayList<ChipsPosition> expWhitePos = new ArrayList<>();
        expWhitePos.add(new ChipsPosition(1, 2));
        expWhitePos.add(new ChipsPosition(12, 5));
        expWhitePos.add(new ChipsPosition(17, 3));
        expWhitePos.add(new ChipsPosition(19, 5));

        ArrayList<ChipsPosition> expBlackPos = new ArrayList<>();
        expBlackPos.add(new ChipsPosition(6, 5));
        expBlackPos.add(new ChipsPosition(8, 3));
        expBlackPos.add(new ChipsPosition(13, 5));
        expBlackPos.add(new ChipsPosition(24, 2));

        GameState gameState1 = packageMessage1.getGameState();
        ArrayList<ChipsPosition> whitePositions = gameState1.getWhitePositions();
        assertEquals(expWhitePos.toString(), whitePositions.toString());
        assertEquals(expBlackPos.toString(), gameState1.getBlackPositions().toString());
        //еще проверки

        PackageMessage packageMessage2 = enter("1", "22");
        GameState gameState2 = packageMessage2.getGameState();
        assertEquals(whitePositions, gameState2.getWhitePositions());
        assertEquals(expWhitePos.toString(), gameState2.getWhitePositions().toString());
        assertEquals(expBlackPos.toString(), gameState2.getBlackPositions().toString());

        //     CubeValue cubeValue = throwDice("0");
        //    int cubeValues = cubeValue.getCubeValues();
//        проверить каждый кубик

//        assertEquals();

        assertEquals(2, getPlayers().size());
        assertNotNull(getPlayers().get(0));
        assertEquals('w', gameState1.getColor());

        /*second player enters*/
//        GameState gameState2 = enter("1", "user 2");
        assertEquals(2, getPlayers().size());
        assertNotNull(getPlayers().get(1));
        assertEquals('b', gameState2.getColor());
    }

//    public void testOtherPositions() throws Exception, GameError {
//
//        PackageMessage packageMessage = enter("0", "Tom");
//        Player whitePlayer = getPlayers().get(0);
//        GameMatch gameMatch = whitePlayer.getGameMatch();
//        System.out.println();
//        System.out.println("Active player name " + gameMatch.getActivePlayer());
//        PackageMessage packageMessage1 = enter("1", "Sam");
//        Player blackPlayer = getPlayers().get(1);
//        System.out.println("Active player name (0 turn) " + gameMatch.getActivePlayer().getName() +
//                " Condition code: " + gameMatch.getActivePlayerCondition());
//        gameMatch.throwDice(whitePlayer, 25);
//
//        gameMatch.moveChip(whitePlayer, new MoveAction(1, 10));
//        gameMatch.moveChip(whitePlayer, new MoveAction(1, 10));
//
//        gameMatch.moveChip(whitePlayer, new MoveAction(17, 18));
//        gameMatch.moveChip(whitePlayer, new MoveAction(17, 19));
//
//        System.out.println("Active player name (0 turn) " + gameMatch.getActivePlayer().getName() +
//                " Condition code: " + gameMatch.getActivePlayerCondition());
//        System.out.println("*****");
//        gameMatch.changeTurn(); //передача хода
//        System.out.println("Change turn");
//        System.out.println("*****");
//        System.out.println("Not active player condition " + gameMatch.getWhitePlayerCondition());
//        System.out.println("Active player name (1 turn) " + gameMatch.getActivePlayer().getName() +
//                " Condition code: " + gameMatch.getActivePlayerCondition());
//        gameMatch.throwDice(blackPlayer, 25); //черный пытется кинуть кубики, не получив флаг хода.
//
//        System.out.println("Active player name (1 turn) " + gameMatch.getActivePlayer().getName() +
//                " Condition code: " + gameMatch.getActivePlayerCondition());
//
//        gameMatch.moveChip(blackPlayer, new MoveAction(24, 23));
//        gameMatch.moveChip(blackPlayer, new MoveAction(24, 23));
//
//        gameMatch.moveChip(blackPlayer, new MoveAction(8, 6));
//        gameMatch.moveChip(blackPlayer, new MoveAction(8, 7));
//        gameMatch.moveChip(blackPlayer, new MoveAction(8, 7));
//
//
//        ArrayList<ChipsPosition> whitePositions1 = gameMatch.getTable().getGameState().getWhitePos();
//        ArrayList<ChipsPosition> whitePositions2 = gameMatch.getTable().getGameState().getWhitePos();
//        assertEquals(whitePositions1, whitePositions2);
//
//        ArrayList<ChipsPosition> blackPositions1 = gameMatch.getTable().getGameState().getBlackPos();
//        ArrayList<ChipsPosition> blackPositions2 = gameMatch.getTable().getGameState().getBlackPos();
//        assertEquals(blackPositions1, blackPositions2);
//
//        System.out.println();
//        System.out.println("********************");
//        System.out.println("WhitePos in start: " + packageMessage.getGameState().getWhitePositions());
//        System.out.println("********************");
//        System.out.println("BlackPos in start: " + packageMessage1.getGameState().getBlackPositions());
//        System.out.println("********************");
//        System.out.println("********************");
//        System.out.println("WhitePos: " + gameMatch.getTable().getGameState().getWhitePos());
//        System.out.println("********************");
//        System.out.println("BlackPos: " + gameMatch.getTable().getGameState().getBlackPos());
//        System.out.println("********************");
//
//    }


}
