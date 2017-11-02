package server;

import game.logics.Game;
import game.logics.Player;
import server.transport.AbstractMessage;
import server.transport.ErrorMessage;

import javax.websocket.Session;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Класс {@link RequestHandler} реализует первичную обработку сообщений от пользователя и
 * регистрацию новых пользователей
 */
public class RequestHandler {

    protected ConcurrentHashMap<Integer, Player> players = new ConcurrentHashMap<>();
    protected volatile Game currentGame = null;
    protected ArrayList<Game> gameArrayList = new ArrayList<>();


    public AbstractMessage request(AbstractMessage pack, Session session) {
        AbstractMessage message;
        if (ErrorMessage.class.isInstance(pack)) {
            return pack;
        }
        Player thisPlayer = null;
        if (!players.containsKey(Integer.parseInt(session.getId()))) {
            message = registration(session, pack);
        } else {
            for (Map.Entry<Integer, Player> entry : players.entrySet()) {
                if (entry.getKey() == Integer.parseInt(session.getId())) {
                    thisPlayer = entry.getValue();
                    break;
                }
            }
            message = pack.apply(thisPlayer);
        }
        return message;
    }

    private AbstractMessage registration(Session session, AbstractMessage pack) {
        Player thisPlayer;
        AbstractMessage abstractMessage = null;
        if (currentGame == null) {
            currentGame = new Game();
            gameArrayList.add(currentGame);
        }
        if (currentGame.getNumberOfPlayers() == 2) {
            currentGame = new Game();
            gameArrayList.add(currentGame);
        }
        thisPlayer = new Player(currentGame, session, currentGame.getNumberOfPlayers());
        currentGame.addPlayer(thisPlayer); //TODO здесь уже может броситься игрокам GameStart если вызывать из Game
        abstractMessage = pack.apply(thisPlayer);//TODO здесь второму игроку имя присвоится, один GameStart будет без имени
        if (currentGame.getNumberOfPlayers() == 2) {
            currentGame.sendGameStart();
        }

        players.put(Integer.parseInt(session.getId()), thisPlayer);
   /*     if (currentGame.getNumberOfPlayers() == 2) {
            this.sendGameStart(currentGame);
        } */
        return abstractMessage;
    }

    //TODO (IvchenkoAlexandr) нужно подумать, куда этот код перенести.
    // По сути это рассылка сообщений всем игрокам подключенным к игре (матчу, игровому сеансу).

    /*private void sendGameStart(Game game) {
        Player players[] = game.getPlayers();
        GameStart gameStart = new GameStart(players[1].getName()); //
        try {
            players[0].getSession().getBasicRemote().sendObject(gameStart);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
        gameStart = new GameStart(players[0].getName()); // больше памяти ради тестов
        try {
            players[1].getSession().getBasicRemote().sendObject(gameStart);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
    }
    */

    public ArrayList<Game> getGameArrayList() {
        return gameArrayList;
    }
}
