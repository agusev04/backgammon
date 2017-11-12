package server.transport;

import game.logics.GameError;
import game.logics.Player;

/**
 * Класс {@link Enter} имплементирует {@link AbstractMessage}
 * Класс содержит имя клинета и реализеут регистрацию пользователя
 */
public class Enter extends AbstractMessage {
    public String myUserName;

    public Enter(String myUserName) {
        this.myUserName = myUserName;
    }

    @Override
    public AbstractMessage apply(Player player) {
        AbstractMessage message = null;
        try {
            player.setName(myUserName);
            GameState gameState = new GameState(player.getGameMatch(), "",
                    player.getGameMatch().getWhitePlayer().getName() + "s backgammon table created",
                    player.getColor());
            if (player == player.getGameMatch().getBlackPlayer()) {
                GameStart gameStart = new GameStart(player.getGameMatch().getWhitePlayer().getName());
                message = new PackageMessage(gameState, new Changes(gameStart));
            } else {
                message = new PackageMessage(gameState, null);
            }
        } catch (GameError gameErrors) {
            message = new ErrorMessage(gameErrors);

        }
        return message;
    }


    public String getMyUserName() {
        return myUserName;
    }
}

