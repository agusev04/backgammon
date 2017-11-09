import game.gameobjects.Cell;
import game.gameobjects.GameBoard;
import game.logics.ChipsPositions;
import server.transport.CubeValue;
import server.transport.GameStart;
import server.transport.GameState;
import support.AbstractTest;

import java.util.ArrayList;

public class EnterGameMatchTest extends AbstractTest {

    public void testEnter() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        GameState gameState = enter("0", "11");

        assertEquals(1, getPlayers().size());
        assertNotNull(getPlayers().get(0));
        assertEquals('w', gameState.getColor());

        /*second player enters*/
        GameState gameState2 = enter("1", "user 2");
        assertEquals(2, getPlayers().size());
        assertNotNull(getPlayers().get(1));
        assertEquals('b', gameState2.getColor());
    }

    public void testStartPositions() throws Exception {
        /*first player enters*/
        GameState gameState = enter("0", "11");
        ArrayList<Integer> expWhitePos = new ArrayList<>();
        expWhitePos.add(102);
        expWhitePos.add(1205);
        expWhitePos.add(1703);
        expWhitePos.add(1905);

        ArrayList<Integer> expBlackPos = new ArrayList<>();
        expBlackPos.add(605);
        expBlackPos.add(803);
        expBlackPos.add(1305);
        expBlackPos.add(2402);

        ArrayList<Integer> whitePositions = gameState.getWhitePositions();
        assertEquals(expWhitePos.toString(), whitePositions.toString());
        assertEquals(expBlackPos.toString(), gameState.getBlackPositions().toString());
        //еще проверки

        GameState gameState2 = enter("1", "22");
        assertEquals(whitePositions, gameState2.getWhitePositions());
        assertEquals(expWhitePos.toString(), gameState2.getWhitePositions().toString());
        assertEquals(expBlackPos.toString(), gameState2.getBlackPositions().toString());

        CubeValue cubeValue = throwDice("0");
        int cubeValues = cubeValue.getCubeValues();
//        проверить каждый кубик

//        assertEquals();

//        assertEquals(1, getPlayers().size());
//        assertNotNull(getPlayers().get(0));
//        assertEquals('w', gameState.getColor());
//
//        /*second player enters*/
//        GameState gameState2 = enter("1", "user 2");
//        assertEquals(2, getPlayers().size());
//        assertNotNull(getPlayers().get(1));
//        assertEquals('b', gameState2.getColor());
    }

    public void testOtherPositions() throws Exception {

        GameState gameState = enter("0", "11");
        GameState gameState2 = enter("1", "22");

        getPlayers().get(0).getGameMatch().moveChip(1,10);
        getPlayers().get(0).getGameMatch().moveChip(1,10);

        getPlayers().get(0).getGameMatch().moveChip(17,18);
        getPlayers().get(0).getGameMatch().moveChip(17,18);
        getPlayers().get(0).getGameMatch().moveChip(17,19);

        getPlayers().get(1).getGameMatch().moveChip(24,23);
        getPlayers().get(1).getGameMatch().moveChip(24,23);

        getPlayers().get(1).getGameMatch().moveChip(8,6);
        getPlayers().get(1).getGameMatch().moveChip(8,7);
        getPlayers().get(1).getGameMatch().moveChip(8,7);


        ArrayList<Integer> whitePositions1 = getPlayers().get(0).getGameMatch().getTable().getGameState().getWhitePos();
        ArrayList<Integer> whitePositions2 = getPlayers().get(1).getGameMatch().getTable().getGameState().getWhitePos();
        assertEquals(whitePositions1, whitePositions2 );

        ArrayList<Integer> blackPositions1 = getPlayers().get(0).getGameMatch().getTable().getGameState().getBlackPos();
        ArrayList<Integer> blackPositions2 = getPlayers().get(1).getGameMatch().getTable().getGameState().getBlackPos();
        assertEquals(blackPositions1, blackPositions2 );

        System.out.println();
        System.out.println("********************");
        System.out.println("WhitePos in start: " + gameState.getWhitePositions());
        System.out.println("********************");
        System.out.println("BlackPos in start: " + gameState2.getBlackPositions());
        System.out.println("********************");
        System.out.println("********************");
        System.out.println("WhitePos: " + getPlayers().get(0).getGameMatch().getTable().getGameState().getWhitePos());
        System.out.println("********************");
        System.out.println("BlackPos: " + getPlayers().get(1).getGameMatch().getTable().getGameState().getBlackPos());
        System.out.println("********************");

    }


}
