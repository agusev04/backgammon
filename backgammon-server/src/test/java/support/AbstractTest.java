package support;

import game.logics.ChipsPositions;
import game.logics.GameMatch;
import game.logics.Player;
import junit.framework.TestCase;
import server.Launcher;
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
        Launcher.loadLogger();
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


    protected AbstractMessage throwCube(String sessionId) throws EncodeException {
        ThrowCube pack = new ThrowCube();
        AbstractMessage packageMessage = requestHandler.request(pack, sessions.get(sessionId));
        return packageMessage;
    }

    protected AbstractMessage throwCube(String sessionId, int cubeValue) throws EncodeException {
        TestThrowCube pack = new TestThrowCube(cubeValue);
        //     System.out.println("REQUEST:" + messageEncoder.encode(pack));
        AbstractMessage packageMessage = requestHandler.request(pack, sessions.get(sessionId));
        //     System.out.println("RESPONSE:" + messageEncoder.encode(packageMessage));
        return packageMessage;
    }

    protected AbstractMessage moveChip(String sessionId, int from,  int cubeValue) throws EncodeException {
        MoveAction action = new MoveAction(from, cubeValue);
        //      System.out.println("REQUEST:" + messageEncoder.encode(action));
        AbstractMessage packageMessage = requestHandler.request(action, sessions.get(sessionId));
//        System.out.println("RESPONSE:" + messageEncoder.encode(packageMessage1));
        return packageMessage;
    }

    protected ConcurrentHashMap<Integer, Player> getPlayers() {
        return requestHandler.getPlayers();
    }

    protected void checkPossibleMoves(AbstractMessage response, Move... expectedMoves) {
        PossibleMoves possibleMoves = ((PackageMessage) response).getChange(PossibleMoves.class);
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
