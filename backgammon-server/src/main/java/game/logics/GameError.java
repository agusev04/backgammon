package game.logics;

public class GameError extends Throwable {

    public static final GameError UNKNOWN_REQUEST = new GameError(0, "Unknown request"); // для клиент части
    public static final GameError INCORRECT_REQUEST = new GameError(1, "Incorrect request");
    public static final GameError UNABLE_THROW_DICES = new GameError(2, "You can not throw dices now");
//  добавить Сашин вариант ошибки
//  в енкодер добавить проверку на ошибку

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
