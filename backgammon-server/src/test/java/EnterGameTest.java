import server.transport.GameStart;
import server.transport.GameState;
import support.AbstractTest;

public class EnterGameTest extends AbstractTest {

    public void testEnter() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        GameState gameState = enter("0", "11");

        assertEquals(1, getPlayers().size());
        assertNotNull(getPlayers().get(0));
        assertEquals('W', gameState.getColor());

        /*second player enters*/
        GameState gameState2 = enter("1", "user 2");
        assertEquals(2, getPlayers().size());
        assertNotNull(getPlayers().get(1));
        assertEquals('B', gameState2.getColor());


    }
}
