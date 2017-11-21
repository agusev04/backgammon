package game.logics;

public class GameError extends Throwable {

    public static final GameError UNKNOWN_REQUEST = new GameError(0, "Unknown request"); // для клиент части
    public static final GameError INCORRECT_REQUEST = new GameError(1, "Incorrect request");
    public static final GameError UNABLE_THROW_DICES = new GameError(2, "You can not throw dices now");
    public static final GameError UNABLE_TURN = new GameError(3, "It is not your turn now");
    public static final GameError UNABLE_MOVE = new GameError(4, "You can not do this move");
    public static final GameError INCORRECT_NAME = new GameError(5, "You can not choose this name");
    public static final GameError PLAYER_CAME_OUT = new GameError(6, "Your opponent came out");

    int code;
    String message;

    private GameError(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
