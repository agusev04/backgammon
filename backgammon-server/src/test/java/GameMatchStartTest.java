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
        //TODO (IvchenkoAlexandr) этого синглтона не нужно, ты сперва посмотри, что уже есть, а потом велосипед изобретай :)
        //Есть Тестовая сессия, в ней есть TestBasicRemote.sendText по сути это и есть то, куда отправляется сообщение игроку.
        //сейчас там просто пишется в sout, можно куда-то сохранять (например, в тестовую сессию).
        //Оттуда брать и проверять

        GameStart[] starts = new GameStart[2];
        starts[0] = (GameStart) sessions[0].getTestBasicRemote().getPackageMessage().getChange("GameStart");
        starts[1] = (GameStart) packageMessage.getChange("GameStart");
        assertNotNull(starts);

        assertEquals(2, starts.length);

        assertNotNull(starts[0]);
        assertEquals("user 2", starts[0].getEnemyUserName());

        assertNotNull(starts[1]);
        assertEquals("11", starts[1].getEnemyUserName());

    }
}
