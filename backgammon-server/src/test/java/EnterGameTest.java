import server.GameState;
import support.AbstractTest;

public class EnterGameTest extends AbstractTest {

    public void testEnter() throws Exception {
        assertTrue(getSessions().isEmpty());

        /*first player enters*/
        GameState gameState = enter("0", "11");
        assertEquals(1, getSessions().size());
        assertNotNull(getSessions().get(0));
        assertEquals('w', gameState.getColor());

        /*second player enters*/
        GameState gameState2 = enter("1", "user 2");
        assertEquals(2, getSessions().size());
        assertNotNull(getSessions().get(1));
        assertEquals('b', gameState2.getColor());
    }
}
