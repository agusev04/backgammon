package support;

import game.logics.Player;
import junit.framework.TestCase;
import server.transport.*;
import server.MessageEncoder;
import server.transport.*;

import javax.websocket.EncodeException;
import java.util.concurrent.ConcurrentHashMap;

public abstract class AbstractTest extends TestCase {

    protected TestRequestHandler requestHandler;
    protected GameStart[] starts = new GameStart[2];

    MessageEncoder messageEncoder;

    @Override
    public void setUp() throws Exception {
        requestHandler = new TestRequestHandler();
        messageEncoder = new MessageEncoder();
    }

    protected GameState enter(String session, String user) throws EncodeException {
        Enter pack = new Enter(user);
        System.out.println("REQUEST:" + messageEncoder.encode(pack));
        GameState gameState = (GameState) requestHandler.request(pack, new TestSession(session));
        System.out.println("RESPONSE:" + messageEncoder.encode(gameState));
        return gameState;
    }

    protected CubeValue throwDice(String session) throws EncodeException {
        ThrowCube pack = new ThrowCube();
        System.out.println("REQUEST:" + messageEncoder.encode(pack));
        CubeValue cubeValue = (CubeValue) requestHandler.request(pack, new TestSession(session));
        System.out.println("RESPONSE:" + messageEncoder.encode(cubeValue));
        return cubeValue;
    }

    protected PossiblePositions throwCube(String session, int cubeValue) {
        return (PossiblePositions) requestHandler.request(new TestThrowCube(cubeValue), new TestSession(session));
    }

    protected ConcurrentHashMap<Integer, Player> getPlayers() {
        return requestHandler.getPlayers();
    }
}
