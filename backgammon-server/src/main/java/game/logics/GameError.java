package game.logics;

public class GameError extends Throwable {
    public static final GameError UNABLE_THROW_DICES
            = new GameError(2, "you can not throw dices"); //(c) Alexandr
    //TODO (Michael) подумать, как лучше назвать этот класс

    //TODO (Michael) здесь должны быть все ошибки


    int cod;
    String message;

    public GameError(int cod, String message) {
        this.cod = cod;
        this.message = message;
    }

    public int getCod() {
        return cod;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
