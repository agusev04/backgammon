package server;

import game.logics.GameMatch;
import game.logics.Player;
import org.apache.log4j.Logger;
import server.transport.*;

import javax.websocket.Session;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static game.logics.GameError.PLAYER_CAME_OUT;

/**
 * Класс {@link RequestHandler} реализует первичную обработку сообщений от пользователя и
 * регистрацию новых пользователей
 */
public class RequestHandler {

    private final Logger logger = Logger.getLogger(this.getClass());
    protected ConcurrentHashMap<String, Player> players = new ConcurrentHashMap<>();
    protected volatile GameMatch currentGameMatch = null;
    protected ArrayList<GameMatch> gameMatchArrayList = new ArrayList<>();

    public AbstractMessage request(Action pack, Session session) {
        AbstractMessage message;
        if (ErrorMessage.class.isInstance(pack)) {
            return pack;
        }
        Player thisPlayer = null;
        if (!players.containsKey(session.getId())) {
            message = registration(session, pack);
        } else {
            for (Map.Entry<String, Player> entry : players.entrySet()) {
                if (entry.getKey().equals(session.getId())) {
                    System.out.println("****************"+entry.getKey()+"****");
                    thisPlayer = entry.getValue();
                    break;
                }
            }
            if(thisPlayer == null){
                System.out.println("-----------------------------------------");
            } else{
                System.out.println("+++++++++++++++" + thisPlayer.getName());
            }
            message = pack.apply(thisPlayer);
            /*
            проверака на финальный ход. возможно следует сделать вызов удаления игроков и матча из места
            где создается FinaleMessage, чтобы убрать лишнюю проверку сообщения (isInstance много жрет)
             */
//            if (PackageMessage.class.isInstance(message)) {
//                // можно заменить на if(packageMessage.getChange("Final") != null)
//                if (checkFinal(((PackageMessage) message).getChangeArrayList())) {
//                    deletePlayer(thisPlayer.getSession()); //удаление происходит после отправки финала второму игроку.
//                } TODO Закомменчено до востребования или корректной доработки
//            }

        }
        return message;
    }

    private AbstractMessage registration(Session session, Action pack) {
        Player thisPlayer;
        AbstractMessage abstractMessage;
        if (currentGameMatch == null) {
            currentGameMatch = new GameMatch();

        }
        if (currentGameMatch.getNumberOfPlayers() == 2) {
            currentGameMatch = new GameMatch();
        }

        thisPlayer = new Player(currentGameMatch, session, currentGameMatch.getNumberOfPlayers());
        currentGameMatch.addPlayer(thisPlayer); // здесь уже может броситься игрокам GameStart если вызывать из GameMatch
        abstractMessage = pack.apply(thisPlayer);// здесь второму игроку имя присвоится, один GameStart будет без имени
        if (currentGameMatch.getNumberOfPlayers() == 2) {
            GameStart gameStart = new GameStart(thisPlayer.getName());
            PackageMessage packageMessage = new PackageMessage();
            packageMessage.addChange(gameStart);
            packageMessage.addChange(new StateChange(currentGameMatch));
            currentGameMatch.getWhitePlayer().sendMessage(packageMessage);
        }
        players.put(session.getId(), thisPlayer);

        if (currentGameMatch.getNumberOfPlayers() == 2) {
            gameMatchArrayList.add(currentGameMatch);
        }
        return abstractMessage;
    }

    private boolean checkFinal(ArrayList<Change> arrayList) {
        boolean result = false;
        for (Change change : arrayList) {
            if (Final.class.isInstance(change)) {
                result = true;
                break;
            }
        }
        return result;
    }

    public void deletePlayer(Session session) {
        Player player = players.remove((session.getId())); //получаем пользователя, если он прошел рег.
        if (player != null) {
            logger.info(gameMatchArrayList.size() + " games before");
            logger.info((players.size() + 1) + " players before");

            GameMatch gameMatch = player.getGameMatch();
            Player otherPlayer = gameMatch.getOtherPlayer(player);
            if (otherPlayer != null) {
                otherPlayer.sendMessage(new ErrorMessage(PLAYER_CAME_OUT));
                players.remove(otherPlayer.getSession().getId());
            }

            gameMatchArrayList.remove(gameMatch);
            if (currentGameMatch == gameMatch) {
                currentGameMatch = new GameMatch();
            }

            logger.info(gameMatchArrayList.size() + " games after");
            logger.info(players.size() + " players after");
        }
    }


    public ArrayList<GameMatch> getGameMatchArrayList() {
        return gameMatchArrayList;
    }
}
