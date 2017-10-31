package support;

import junit.framework.TestCase;
import server.Enter;
import server.GameState;
import server.MySession;

import java.util.HashMap;

public abstract class AbstractTest extends TestCase {

    protected TestRequestHandler requestHandler;

    @Override
    public void setUp() throws Exception {
        requestHandler = new TestRequestHandler();
    }

    protected GameState enter(String session, String user) {
        return (GameState) requestHandler.request(new Enter(user), new TestSession(session));
    }

    protected HashMap<Integer, MySession> getSessions() {
        return requestHandler.getSessions();
    }
}
