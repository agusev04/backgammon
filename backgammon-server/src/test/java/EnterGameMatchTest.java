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
}
