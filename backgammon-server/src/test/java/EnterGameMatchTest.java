import game.logics.GameMatch;
import server.transport.ChipsPosition;
import server.transport.GameState;
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

    public void testOtherPositions() throws Exception {

        PackageMessage packageMessage = enter("0", "11");
        PackageMessage packageMessage1 = enter("1", "22");

        GameMatch gameMatch0 = getPlayers().get(0).getGameMatch();
        gameMatch0.moveChip(1, 10);
        gameMatch0.moveChip(1, 10);

        gameMatch0.moveChip(17, 18);
        gameMatch0.moveChip(17, 18);
        gameMatch0.moveChip(17, 19);

        GameMatch gameMatch1 = getPlayers().get(1).getGameMatch();
        gameMatch1.moveChip(24, 23);
        gameMatch1.moveChip(24, 23);

        gameMatch1.moveChip(8, 6);
        gameMatch1.moveChip(8, 7);
        gameMatch1.moveChip(8, 7);


        ArrayList<ChipsPosition> whitePositions1 = gameMatch0.getTable().getGameState().getWhitePos();
        ArrayList<ChipsPosition> whitePositions2 = gameMatch1.getTable().getGameState().getWhitePos();
        assertEquals(whitePositions1, whitePositions2);

        ArrayList<ChipsPosition> blackPositions1 = gameMatch0.getTable().getGameState().getBlackPos();
        ArrayList<ChipsPosition> blackPositions2 = gameMatch1.getTable().getGameState().getBlackPos();
        assertEquals(blackPositions1, blackPositions2);

        System.out.println();
        System.out.println("********************");
        System.out.println("WhitePos in start: " + packageMessage.getGameState().getWhitePositions());
        System.out.println("********************");
        System.out.println("BlackPos in start: " + packageMessage1.getGameState().getBlackPositions());
        System.out.println("********************");
        System.out.println("********************");
        System.out.println("WhitePos: " + gameMatch0.getTable().getGameState().getWhitePos());
        System.out.println("********************");
        System.out.println("BlackPos: " + gameMatch1.getTable().getGameState().getBlackPos());
        System.out.println("********************");

    }


}
