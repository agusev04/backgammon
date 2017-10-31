package game.logics;

public class GameErrors extends Throwable {

    //TODO (Michael) подумать, как лучше назвать этот класс

    //TODO (Michael) здесь должны быть все ошибки


    int cod;
    String message;

    GameErrors(int cod, String message) {
        cod = cod;
        message = message;
    }
}
