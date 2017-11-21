package server.transport;

import game.logics.GameError;
import game.logics.Player;

/**
 * Класс {@link Enter} имплементирует {@link AbstractMessage}
 * Класс содержит имя клинета и реализеут регистрацию пользователя
 */
public class Enter extends Action {
    public String myUserName;

    public Enter(String myUserName) {
        this.myUserName = myUserName;
    }

    @Override
    public String toString() {
        return "Enter{" +
                "myUserName='" + myUserName + '\'' +
                ", CLASS_NAME='" + CLASS_NAME + '\'' +
                '}';
    }

    @Override
    public AbstractMessage apply(Player player) {
        AbstractMessage message = null;
        System.out.println("Enter" + myUserName + " tries to connect");
        try {
            player.setName(myUserName);
            GameState gameState = new GameState(player.getGameMatch(), "",
                    player.getGameMatch().getWhitePlayer().getName() + "s backgammon table created",
                    player.getColor());
            PackageMessage packageMessage = new PackageMessage(gameState);
            if (player == player.getGameMatch().getBlackPlayer()) {
                GameStart gameStart = new GameStart(player.getGameMatch().getWhitePlayer().getName());
                packageMessage.addChange(gameStart);
                message = packageMessage;
            } else {
                message = packageMessage;
            }
        } catch (GameError gameErrors) {
            message = new ErrorMessage(gameErrors);

        }
        System.out.println("Enter: SERVER SENT TO " + player.getName() + ": " + message);
        return message;
    }


    public String getMyUserName() {
        return myUserName;
    }
}

