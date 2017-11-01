package support;

import game.logics.Player;
import junit.framework.TestCase;
import server.transport.Enter;
import server.transport.GameStart;
import server.transport.GameState;

import java.util.concurrent.ConcurrentHashMap;

public abstract class AbstractTest extends TestCase {

    protected TestRequestHandler requestHandler;
    protected GameStart []starts = new GameStart[2];

    @Override
    public void setUp() throws Exception {
        requestHandler = new TestRequestHandler();
    }

    protected GameState enter(String session, String user) {
        return (GameState) requestHandler.request(new Enter(user), new TestSession(session));
    }

    protected ConcurrentHashMap<Integer, Player> getPlayers() {
        return requestHandler.getPlayers();
    }
}
