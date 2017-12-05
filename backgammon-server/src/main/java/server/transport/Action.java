package server.transport;

import game.logics.Player;

public abstract class Action implements AbstractMessage {
    final String CLASS_NAME = this.getClass().getSimpleName();
    abstract public AbstractMessage apply(Player player);
}
