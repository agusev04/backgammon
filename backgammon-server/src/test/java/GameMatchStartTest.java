import server.transport.GameStart;
import server.transport.PackageMessage;
import support.AbstractTest;

public class GameMatchStartTest extends AbstractTest {

    public void testGameStart() throws Exception {
        assertTrue(getPlayers().isEmpty());

        /*first player enters*/
        enter("0", "11");


        /*second player enters*/
        PackageMessage packageMessage = enter("1", "user 2");

        GameStart[] starts = new GameStart[2];
        starts[0] = sessions.get("0").getTestBasicRemote().getPackageMessage().getChange(GameStart.class);
        starts[1] = packageMessage.getChange(GameStart.class);
        assertNotNull(starts);

        assertEquals(2, starts.length);

        assertNotNull(starts[0]);
        assertEquals("user 2", starts[0].getEnemyUserName());

        assertNotNull(starts[1]);
        assertEquals("11", starts[1].getEnemyUserName());

    }
}
