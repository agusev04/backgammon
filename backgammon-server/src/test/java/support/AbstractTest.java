package support;

import game.logics.Player;
import junit.framework.TestCase;
import server.MessageEncoder;
import server.transport.*;

import javax.websocket.EncodeException;
import java.util.concurrent.ConcurrentHashMap;

public abstract class AbstractTest extends TestCase {

    protected TestRequestHandler requestHandler;
    protected GameStart[] starts = new GameStart[2];
    protected TestSession[] sessions;

    MessageEncoder messageEncoder;

    @Override
    public void setUp() throws Exception {
        requestHandler = new TestRequestHandler();
        messageEncoder = new MessageEncoder();
        sessions = new TestSession[2];
    }

    protected GameState enter(String session, String user) throws EncodeException {
        TestSession testSession = new TestSession(session);
        Enter pack = new Enter(user);
        System.out.println("REQUEST:" + messageEncoder.encode(pack));
        GameState gameState = (GameState) requestHandler.request(pack, testSession);
        System.out.println("RESPONSE:" + messageEncoder.encode(gameState));
        if (sessions[0] == null) {
            sessions[0] = testSession;
        } else {
            sessions[1] = testSession;
        }
        return gameState;
    }

    protected CubeValue throwDice(String session) throws EncodeException {
        ThrowCube pack = new ThrowCube();
        System.out.println("REQUEST:" + messageEncoder.encode(pack));
        CubeValue cubeValue = (CubeValue) requestHandler.request(pack, new TestSession(session));
        System.out.println("RESPONSE:" + messageEncoder.encode(cubeValue));
        return cubeValue;
    }

    protected PossibleMoves throwCube(String session, int cubeValue) throws EncodeException {
        TestThrowCube pack = new TestThrowCube(cubeValue);
        System.out.println("REQUEST:" + messageEncoder.encode(pack));
        PossibleMoves possibleMoves = (PossibleMoves) requestHandler.request(pack, new TestSession(session));
        System.out.println("RESPONSE:" + messageEncoder.encode(possibleMoves));
        return possibleMoves;
    }

    protected ConcurrentHashMap<Integer, Player> getPlayers() {
        return requestHandler.getPlayers();
    }
}
