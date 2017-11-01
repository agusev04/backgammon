import server.transport.GameStart;
import server.transport.GameState;
import support.AbstractTest;
import support.TestGameStartSingleton;

public class GameStartTest extends AbstractTest {
    public void testEnter() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        GameState gameState = enter("0", "11");


        /*second player enters*/
        GameState gameState2 = enter("1", "user 2");


        TestGameStartSingleton testGameStartSingleton = TestGameStartSingleton.getInstance();
        GameStart[]starts = testGameStartSingleton.getStarts();

        assertNotNull(starts);

        assertEquals(2, starts.length);

        assertNotNull(starts[0]);
        assertEquals("user 2", starts[0].getEnemyUserName());

        assertNotNull(starts[1]);

        assertEquals("11", starts[1].getEnemyUserName());

    }
}
