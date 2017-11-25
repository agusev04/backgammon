package server;

import game.logics.GameMatch;
import game.logics.Player;
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

    protected ConcurrentHashMap<Integer, Player> players = new ConcurrentHashMap<>();
    protected volatile GameMatch currentGameMatch = null;
    protected ArrayList<GameMatch> gameMatchArrayList = new ArrayList<>();


    public AbstractMessage request(Action pack, Session session) {
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
            /*
            проверака на финальный ход. возможно следует сделать вызов удаления игроков и матча из места
            где создается FinaleMessage, чтобы убрать лишнюю проверку сообщения (isInstance много жрет)
             */
            if (PackageMessage.class.isInstance(message)) {
                if (checkFinal(((PackageMessage) message).getChangeArrayList())) {
                    Player otherPlayer = thisPlayer.getGameMatch().getOtherPlayer(thisPlayer);
                    deletePlayer(thisPlayer);
                    players.remove(Integer.parseInt(otherPlayer.getSession().getId()));

                }
            }

        }
        return message;
    }

    private AbstractMessage registration(Session session, Action pack) {
        Player thisPlayer;
        AbstractMessage abstractMessage;
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
            PackageMessage packageMessage = new PackageMessage();
            packageMessage.addChange(gameStart);
            packageMessage.addChange(new StateChange(currentGameMatch));
            currentGameMatch.getWhitePlayer().sendMessage(packageMessage);
        }
        players.put(Integer.parseInt(session.getId()), thisPlayer);
        return abstractMessage;
    }

    private boolean checkFinal(ArrayList<Change> arrayList) {
        boolean result = false;
        for (Change change : arrayList) {
            if (Final.class.isInstance(change)) {
                result = true;
            }
        }
        return result;
    }

    public void deleteSession(Session session) {
        Player player = players.remove(Integer.parseInt(session.getId())); //получаем пользователя, если он прошел рег.
        deletePlayer(player);

    }

    private void deletePlayer(Player player) {
        System.out.println("RequestHandler deletePlayer: " + gameMatchArrayList.size() + " games before");
        System.out.println("RequestHandler deletePlayer: " + players.size() + " players before");
        if (player != null) {
            System.out.println("RequestHandler deletePlayer: Player " + player.getName() + " came out");

            GameMatch gameMatch = player.getGameMatch();
            if (gameMatch != null) { // эта проверка может быть использована для реконекта
                if (gameMatch == currentGameMatch) {
                    currentGameMatch = null;
                }
                Player otherPlayer = gameMatch.getOtherPlayer(player);
                player.setGameMatch(null);
                gameMatch.deletePlayer(player);
                if (otherPlayer != null) {
                    otherPlayer.sendMessage(new ErrorMessage(PLAYER_CAME_OUT));
                    otherPlayer.setGameMatch(null);
                    gameMatch.deletePlayer(otherPlayer);
                }
                gameMatchArrayList.remove(gameMatch);
            }
        }
        System.out.println("RequestHandler deletePlayer: " + gameMatchArrayList.size() + " games after");
        System.out.println("RequestHandler deletePlayer: " + players.size() + " players after");
    }

    public ArrayList<GameMatch> getGameMatchArrayList() {
        return gameMatchArrayList;
    }
}
