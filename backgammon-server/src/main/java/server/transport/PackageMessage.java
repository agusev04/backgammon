package server.transport;

import game.logics.Player;

public class PackageMessage extends AbstractMessage implements Cloneable {

    GameState gameState;
    Changes changes;

    public PackageMessage(GameState gameState, Changes changes) {
        this.gameState = gameState;
        this.changes = changes;
    }

    @Override
    public AbstractMessage apply(Player player) {
        return null;
    }


    public void setGameStart(GameStart gameStart) {
        changes.setGameStart(gameStart);
    }

    public GameState getGameState() {
        return gameState;
    }

    public Changes getChanges() {
        return changes;
    }
}


