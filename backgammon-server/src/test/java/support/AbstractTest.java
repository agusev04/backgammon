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

    protected PackageMessage enter(String session, String user) throws EncodeException {
        TestSession testSession = new TestSession(session);
        Enter pack = new Enter(user);
    //    System.out.println("REQUEST:" + messageEncoder.encode(pack));
        PackageMessage packageMessage = (PackageMessage) requestHandler.request(pack, testSession);
    //    System.out.println("RESPONSE:" + messageEncoder.encode(packageMessage));
        if (sessions[0] == null) {
            sessions[0] = testSession;
        } else {
            sessions[1] = testSession;
        }
        return packageMessage;
    }

//    protected CubeValue throwDice(String session) throws EncodeException {
//        ThrowCube pack = new ThrowCube();
//        System.out.println("REQUEST:" + messageEncoder.encode(pack));
//        CubeValue cubeValue = (CubeValue) requestHandler.request(pack, new TestSession(session));
//        System.out.println("RESPONSE:" + messageEncoder.encode(cubeValue));
//        return cubeValue;
//    }

    protected PackageMessage throwCube(String session, int cubeValue) throws EncodeException {
        TestThrowCube pack = new TestThrowCube(cubeValue);
   //     System.out.println("REQUEST:" + messageEncoder.encode(pack));
        PackageMessage packageMessage = (PackageMessage) requestHandler.request(pack, new TestSession(session));
   //     System.out.println("RESPONSE:" + messageEncoder.encode(packageMessage));
        return packageMessage;
    }

    protected PackageMessage moveChip(int from, int to, String session) throws EncodeException {
        MoveAction action = new MoveAction(from, to);
        PackageMessage packageMessage = null;
  //      System.out.println("REQUEST:" + messageEncoder.encode(action));
        AbstractMessage packageMessage1 = requestHandler.request(action, new TestSession(session));
//        System.out.println("RESPONSE:" + messageEncoder.encode(packageMessage1));
        return packageMessage;
    }

    protected ConcurrentHashMap<Integer, Player> getPlayers() {
        return requestHandler.getPlayers();
    }
}
