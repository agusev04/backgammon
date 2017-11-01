package server;

import game.logics.Game;
import game.logics.GameErrors;
import game.logics.Player;
import server.transport.AbstractMessage;
import server.transport.Enter;
import server.transport.Error;
import server.transport.GameStart;

import javax.websocket.EncodeException;
import javax.websocket.Session;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class RequestHandler {
//TODO violatile collection and hub??
    protected HashMap<Integer, Player> sessions = new HashMap<>();
    protected Game currentGame = new Game();

//TODO синхронизация!!!!
    public AbstractMessage request(AbstractMessage pack, Session session){
        AbstractMessage message;
        Player thisPlayer = null;
        if(!sessions.containsKey(Integer.parseInt(session.getId()))){
            message = registration(session, pack);
        }else{
            for (Map.Entry<Integer, Player> entry: sessions.entrySet()) {
                if(entry.getKey()==Integer.parseInt(session.getId())){
                    thisPlayer = entry.getValue(); //cought
                    break;
                }
            }
            message = pack.apply(thisPlayer);
        }
        return message;
    }

    private AbstractMessage registration(Session session, AbstractMessage pack){
        Player thisPlayer;
        AbstractMessage abstractMessage = null;
        if(currentGame.getNumberOfPlayer() == 2){
            currentGame = new Game();
        }
        //конкретизировать что пришел энтер???
        thisPlayer = new Player(currentGame, session, currentGame.getNumberOfPlayer());
        currentGame.setPlayer(thisPlayer);
        abstractMessage = pack.apply(thisPlayer);
        sessions.put(Integer.parseInt(session.getId()), thisPlayer);
        if(currentGame.getNumberOfPlayer() == 2){
            this.sendGameStart(currentGame);
        }
        return abstractMessage;
    }

    //TODO (IvchenkoAlexandr) нужно подумать, куда этот код перенести.
    // По сути это рассылка сообщений всем игрокам подключенным к игре (матчу, игровому сеансу).
    private void sendGameStart(Game game){
        Player players[] = game.getPlayers();
        GameStart gameStart = new GameStart();
        gameStart.setEnemyUserName(players[1].getName());
        try {
            players[0].getSession().getBasicRemote().sendObject(gameStart);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
        gameStart.setEnemyUserName(players[0].getName());
        try {
            players[1].getSession().getBasicRemote().sendObject(gameStart);
        } catch (IOException | EncodeException e) {
            e.printStackTrace();
        }
    }
}
