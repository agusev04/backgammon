package game.logics;

public class GameErrors extends Throwable {
    public static final GameErrors UNABLE_THROW_DICES
            = new GameErrors(2, "you can not throw dices"); //(c) Alexandr
    //TODO (Michael) подумать, как лучше назвать этот класс

    //TODO (Michael) здесь должны быть все ошибки


    int cod;
    String message;

    GameErrors(int cod, String message) {
        cod = cod;
        message = message;
    }

    public int getCod() {
        return cod;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
