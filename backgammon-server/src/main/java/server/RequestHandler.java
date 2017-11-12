package server;

import game.logics.GameMatch;
import game.logics.Player;
import server.transport.*;

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
    protected volatile GameMatch currentGameMatch = null;
    protected ArrayList<GameMatch> gameMatchArrayList = new ArrayList<>();


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
        if (currentGameMatch == null) {
            currentGameMatch = new GameMatch();
            gameMatchArrayList.add(currentGameMatch);
        }
        if (currentGameMatch.getNumberOfPlayers() == 2) {
            currentGameMatch = new GameMatch();
            gameMatchArrayList.add(currentGameMatch);
        }
        thisPlayer = new Player(currentGameMatch, session, currentGameMatch.getNumberOfPlayers());
        currentGameMatch.addPlayer(thisPlayer); // здесь уже может броситься игрокам GameStart если вызывать из GameMatch
        abstractMessage = pack.apply(thisPlayer);// здесь второму игроку имя присвоится, один GameStart будет без имени
        if (currentGameMatch.getNumberOfPlayers() == 2) {
            GameStart gameStart = new GameStart(thisPlayer.getName());
            PackageMessage packageMessage = new PackageMessage(null, new Changes(gameStart));
            currentGameMatch.getWhitePlayer().sendMessage(packageMessage);
        }

        players.put(Integer.parseInt(session.getId()), thisPlayer);
        return abstractMessage;
    }

    public ArrayList<GameMatch> getGameMatchArrayList() {
        return gameMatchArrayList;
    }
}
