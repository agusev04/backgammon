package support;

import server.MySession;
import server.RequestHandler;

import java.util.HashMap;

class TestRequestHandler extends RequestHandler{

    TestRequestHandler() {
    }

    HashMap<Integer, MySession> getSessions() {
        return sessions;
    }
}
