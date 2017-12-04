package server.transport;

import game.gameobjects.GameBoard;
import game.logics.GameError;
import game.logics.Player;

import static game.logics.GameError.CANT_REENTER;

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
        System.out.println("Enter: " + myUserName + " tries to connect");
        try {
            if (player.getName() != null) {
                throw CANT_REENTER;
            }
            player.setName(myUserName, player.getSession().getId());
            if (myUserName != null) {
                if (myUserName.equals("root")) {
                    player.getGameMatch().setTable(new GameBoard(1));
                }
            }
            GameState gameState = new GameState(player.getGameMatch(), "",
                    player.getGameMatch().getWhitePlayer().getName() + "s backgammon table created",
                    player.getColor(), player.getName());
            PackageMessage packageMessage = new PackageMessage(gameState);
            if (player == player.getGameMatch().getBlackPlayer()) {
                GameStart gameStart = new GameStart(player.getGameMatch().getWhitePlayer().getName());
                packageMessage.addChange(gameStart);
                packageMessage.addChange(new StateChange(player.getGameMatch()));
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

