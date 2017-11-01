package support;

import game.logics.Player;
import server.RequestHandler;

import java.util.concurrent.ConcurrentHashMap;

class TestRequestHandler extends RequestHandler {

    TestRequestHandler() {
    }

    ConcurrentHashMap<Integer, Player> getPlayers() {
        return players;
    }
}
