package game.logics;

public class GameErrors extends Throwable {
    int cod;
    String message;

    GameErrors(int cod, String message) {
        cod = cod;
        message = message;
    }
}
