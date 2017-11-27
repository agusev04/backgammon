package support;

import game.logics.ChipsPositions;
import game.logics.GameMatch;
import game.logics.Player;
import junit.framework.TestCase;
import server.transport.*;

import javax.websocket.EncodeException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public abstract class AbstractTest extends TestCase {

    protected TestRequestHandler requestHandler;
    protected Map<String, TestSession> sessions;

    @Override
    public void setUp() throws Exception {
        requestHandler = new TestRequestHandler();
        sessions = new HashMap<>();
    }

    protected GameMatch getGameMatch(String sessionId) {
        return requestHandler.getPlayers().get(Integer.valueOf(sessionId)).getGameMatch();
    }

    protected PackageMessage enter(String sessionId, String user) throws EncodeException {
        TestSession testSession = new TestSession(sessionId);

        Enter pack = new Enter(user);
        //    System.out.println("REQUEST:" + messageEncoder.encode(pack));
        PackageMessage packageMessage = (PackageMessage) requestHandler.request(pack, testSession);
        //    System.out.println("RESPONSE:" + messageEncoder.encode(packageMessage));
        sessions.put(sessionId, testSession);
        return packageMessage;
    }


//    protected CubeValue throwDice(String session) throws EncodeException {
//        ThrowCube pack = new ThrowCube();
//        System.out.println("REQUEST:" + messageEncoder.encode(pack));
//        CubeValue cubeValue = (CubeValue) requestHandler.request(pack, new TestSession(session));
//        System.out.println("RESPONSE:" + messageEncoder.encode(cubeValue));
//        return cubeValue;
//    }

    protected AbstractMessage throwCube(String sessionId, int cubeValue) throws EncodeException {
        TestThrowCube pack = new TestThrowCube(cubeValue);
        //     System.out.println("REQUEST:" + messageEncoder.encode(pack));
        AbstractMessage packageMessage = requestHandler.request(pack, sessions.get(sessionId));
        //     System.out.println("RESPONSE:" + messageEncoder.encode(packageMessage));
        return packageMessage;
    }

    protected AbstractMessage moveChip(String sessionId, int from, int to, boolean cantMove, int cubeValue) throws EncodeException {
        MoveAction action = new MoveAction(from, to, cantMove, cubeValue);
        //      System.out.println("REQUEST:" + messageEncoder.encode(action));
        AbstractMessage packageMessage = requestHandler.request(action, sessions.get(sessionId));
//        System.out.println("RESPONSE:" + messageEncoder.encode(packageMessage1));
        return packageMessage;
    }

    protected ConcurrentHashMap<Integer, Player> getPlayers() {
        return requestHandler.getPlayers();
    }

    protected void checkPossibleMoves(AbstractMessage response, Move... expectedMoves) {
        PossibleMoves possibleMoves = (PossibleMoves) ((PackageMessage) response).getChange("PossibleMoves");
        System.out.println(possibleMoves.getPossibleMoves().toString());
        assertEquals(Arrays.asList(expectedMoves).toString(), possibleMoves.getPossibleMoves().toString());
    }

    protected void checkWhitePositions(GameMatch gameMatch, ChipsPosition... expectedWhite) {
        ChipsPositions actualPositions = gameMatch.getTable().getGameState();
        System.out.println(actualPositions.getWhitePos().toString());
        assertEquals(Arrays.asList(expectedWhite).toString(), actualPositions.getWhitePos().toString());
    }

    protected void checkBlackPositions(GameMatch gameMatch, ChipsPosition... expectedBlack) {
        ChipsPositions actualPositions = gameMatch.getTable().getGameState();
        System.out.println(actualPositions.getBlackPos().toString());
        assertEquals(Arrays.asList(expectedBlack).toString(), actualPositions.getBlackPos().toString());
    }
}
