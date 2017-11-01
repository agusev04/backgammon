package server.transport;

import game.logics.Game;
import game.logics.GameErrors;
import game.logics.Player;

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
            GameState gameState = new GameState();
            gameState.setValues(player.getGame());
            gameState.setColor(player.getColor());
            gameState.setTurn("");
            gameState.setTableName(player.getGame().getPlayers()[0].getName() + "s backgammon table created");
            message = gameState;
        }catch (GameErrors gameErrors){
            Error error = new Error();
            error.setError(gameErrors);
            message = error;
        }
        return message;
    }


    public String getMyUserName() {
        return myUserName;
    }
}

