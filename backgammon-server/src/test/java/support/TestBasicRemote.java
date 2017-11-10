package support;

import server.transport.GameStart;

import javax.websocket.EncodeException;
import javax.websocket.RemoteEndpoint;
import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;
import java.nio.ByteBuffer;

public class TestBasicRemote implements RemoteEndpoint.Basic {

    GameStart gameStart;
    private String sessionId;

    TestBasicRemote(String sessionId) {
        this.sessionId = sessionId;
    }

    public GameStart getGameStart() {
        return gameStart;
    }

    @Override
    public void sendText(String text) throws IOException {
        System.out.println("Message to send to sessionId " + sessionId + " :" + text);
    }

    @Override
    public void sendBinary(ByteBuffer data) throws IOException {

    }

    @Override
    public void sendText(String fragment, boolean isLast) throws IOException {

    }

    @Override
    public void sendBinary(ByteBuffer partialByte, boolean isLast) throws IOException {

    }

    @Override
    public OutputStream getSendStream() throws IOException {
        return null;
    }

    @Override
    public Writer getSendWriter() throws IOException {
        return null;
    }

    @Override
    public void sendObject(Object data) throws IOException, EncodeException {

        if (GameStart.class.isInstance(data)) {
            gameStart = (GameStart) data;
        }

    }

    @Override
    public boolean getBatchingAllowed() {
        return false;
    }

    @Override
    public void setBatchingAllowed(boolean batchingAllowed) throws IOException {

    }

    @Override
    public void flushBatch() throws IOException {

    }

    @Override
    public void sendPing(ByteBuffer applicationData) throws IOException, IllegalArgumentException {

    }

    @Override
    public void sendPong(ByteBuffer applicationData) throws IOException, IllegalArgumentException {

    }
}
